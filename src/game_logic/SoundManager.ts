// src/game_logic/SoundManager.ts

// Import all sound assets from the SFX folder
import winSfx from "../imports/SFX/Win.mp3";
import loseSfx from "../imports/SFX/Lose.mp3";
import roundTransitionSfx from "../imports/SFX/Round.mp3";
import inGameSfx from "../imports/SFX/ing.mp3";
import menuSfx from "../imports/SFX/menu.mp3";
import buttonSfx from "../imports/SFX/button.mp3";
import accessDeniedSfx from "../imports/SFX/access.mp3";
import crisisSfx from "../imports/SFX/crisis.mp3";

export type InfectionLevel = "green" | "yellow" | "red";

class SoundManager {
  private static instance: SoundManager;
  private sounds: Record<string, HTMLAudioElement>;
  private soundVolumes: Record<string, number>;
  private masterVolume = 1.0;

  private constructor() {
    // Initialize HTMLAudioElement instances for each sound effect
    this.sounds = {
      win: new Audio(winSfx),
      lose: new Audio(loseSfx),
      roundTransition: new Audio(roundTransitionSfx),
      inGame: new Audio(inGameSfx),
      menu: new Audio(menuSfx),
      button: new Audio(buttonSfx),
      accessDenied: new Audio(accessDeniedSfx),
      crisis: new Audio(crisisSfx),
    };

    this.soundVolumes = {
      win: 1,
      lose: 1,
      roundTransition: 1,
      inGame: 1,
      menu: 1,
      button: 1,
      accessDenied: 1,
      crisis: 1,
    };

    this.masterVolume = this.loadSavedVolume();
    this.applyMasterVolume();

    // Configure continuous looping for background music and ambient sounds
    this.sounds.menu.loop = true;
    this.sounds.inGame.loop = true;
    this.sounds.crisis.loop = true;
  }

  // Singleton pattern to ensure only one instance manages the audio
  public static getInstance(): SoundManager {
    if (!SoundManager.instance) {
      SoundManager.instance = new SoundManager();
    }
    return SoundManager.instance;
  }

  private loadSavedVolume(): number {
    if (
      typeof window === "undefined" ||
      typeof window.localStorage === "undefined"
    ) {
      return 1.0;
    }

    const savedVolume = window.localStorage.getItem("cmiyc_volume");
    if (!savedVolume) return 1.0;

    const parsed = Number(savedVolume);
    if (!Number.isFinite(parsed)) return 1.0;

    return Math.min(1, Math.max(0, parsed / 100));
  }

  private getEffectiveVolume(volume: number): number {
    return Math.min(1, Math.max(0, volume * this.masterVolume));
  }

  private applyMasterVolume() {
    for (const [soundName, relativeVolume] of Object.entries(
      this.soundVolumes,
    )) {
      const audio = this.sounds[soundName];
      if (audio) {
        audio.volume = this.getEffectiveVolume(relativeVolume);
      }
    }
  }

  public setMasterVolume(volume: number) {
    this.masterVolume = Math.min(1, Math.max(0, volume));

    if (
      typeof window !== "undefined" &&
      typeof window.localStorage !== "undefined"
    ) {
      window.localStorage.setItem(
        "cmiyc_volume",
        String(Math.round(this.masterVolume * 100)),
      );
    }

    this.applyMasterVolume();
  }

  public getMasterVolume(): number {
    return this.masterVolume;
  }

  private setSoundVolume(soundName: keyof typeof this.sounds, volume: number) {
    this.soundVolumes[soundName] = volume;
    const audio = this.sounds[soundName];
    if (audio) {
      audio.volume = this.getEffectiveVolume(volume);
    }
  }

  // Play a specified sound effect with optional volume control
  public play(soundName: keyof typeof this.sounds, volume: number = 1.0) {
    const audio = this.sounds[soundName];
    if (audio) {
      if (!audio.loop) {
        audio.currentTime = 0; // Reset lang kung hindi background music
      }
      this.setSoundVolume(soundName, volume);
      const playPromise = audio.play();

      // Ayusin ang Browser Autoplay Block (Bugs sa Menu & InGame BG)
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn(
            `Autoplay blocked for ${soundName}. Waiting for interaction.`,
            err,
          );
          // Magpi-play agad ang music sa unang click mo sa screen
          const resumeAudio = () => {
            audio.play();
            document.removeEventListener("click", resumeAudio);
          };
          document.addEventListener("click", resumeAudio);
        });
      }
    }
  }

  // Pause audio without resetting time (Para sa Pause Menu)
  public pause(soundName: keyof typeof this.sounds) {
    const audio = this.sounds[soundName];
    if (audio) {
      audio.pause();
    }
  }

  // Stop a specified sound effect (Reset to 0)
  public stop(soundName: keyof typeof this.sounds) {
    const audio = this.sounds[soundName];
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
  }

  // Adjust the crisis audio playback and volume based on the current infection level
  public updateCrisisLevel(level: InfectionLevel) {
    const crisisAudio = this.sounds.crisis;

    switch (level) {
      case "green":
        this.stop("crisis");
        break;
      case "yellow":
        this.setSoundVolume("crisis", 0.2); // Low volume configuration
        if (crisisAudio.paused) this.play("crisis", 0.2);
        break;
      case "red":
        this.setSoundVolume("crisis", 1.0); // Maximum volume configuration
        if (crisisAudio.paused) this.play("crisis", 1.0);
        break;
    }
  }
}

export const soundManager = SoundManager.getInstance();
