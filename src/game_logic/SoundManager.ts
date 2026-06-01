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

  // Play a specified sound effect with optional volume control
  public play(soundName: keyof typeof this.sounds, volume: number = 1.0) {
    const audio = this.sounds[soundName];
    if (audio) {
      // Do not reset currentTime for looping background tracks to prevent stuttering
      if (!audio.loop) {
        audio.currentTime = 0;
      }
      audio.volume = volume;
      audio
        .play()
        .catch((err) => console.warn("Audio playback prevented:", err));
    }
  }

  // Stop a specified sound effect
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
        crisisAudio.volume = 0.2; // Low volume configuration
        if (crisisAudio.paused) this.play("crisis", 0.2);
        break;
      case "red":
        crisisAudio.volume = 1.0; // Maximum volume configuration
        if (crisisAudio.paused) this.play("crisis", 1.0);
        break;
    }
  }
}

export const soundManager = SoundManager.getInstance();
