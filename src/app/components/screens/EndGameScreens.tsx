import { AssetCard } from '../AssetCard';
import { FullScreenMockup } from '../FullScreenMockup';

export function EndGameScreens() {
  const victoryAssets = [
    {
      title: '5A. VICTORY BACKGROUND',
      size: '1920×1080 PNG',
      description: 'Victory screen backdrop with subtle green glow - shown when player successfully stops the virus before reaching 100% Severity',
      usage: 'Use TextureRect with Stretch Mode "Keep Aspect Covered" as full-screen background. Display when player wins (Severity < 100% and all viruses eliminated).',
      preview: (
        <div className="w-full h-32 bg-[#020a04] relative overflow-hidden">
          <div className="absolute inset-0 bg-[#1D9E75] opacity-5" />
          <svg className="absolute inset-0 w-full h-full opacity-5">
            <pattern id="hexagons-v" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <polygon points="10,0 15,5 15,15 10,20 5,15 5,5" fill="none" stroke="#1D9E75" strokeWidth="0.5"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#hexagons-v)" />
          </svg>
        </div>
      )
    },
    {
      title: '5B. VICTORY EMBLEM',
      size: '300×300 PNG',
      description: 'Green circular badge with concentric rings reading "THREAT NEUTRALIZED" - military medical certification that the viral infection was successfully defeated',
      usage: 'Place TextureRect centered at x=960, y=360. Maintain aspect ratio. Optional: add rotation animation (AnimationPlayer) for subtle spinning effect.',
      preview: (
        <div className="flex items-center justify-center">
          <div className="relative w-24 h-24 border-2 border-[#1D9E75] rounded-full flex items-center justify-center">
            <div className="w-20 h-20 bg-[#0d2016] border border-[#1D9E75] rounded-full flex flex-col items-center justify-center">
              <div className="text-[#1D9E75] text-[8px] tracking-[1px]">THREAT</div>
              <div className="text-[#1D9E75] text-[8px] tracking-[1px]">NEUTRALIZED</div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: '5C. VICTORY TITLE',
      size: '600×80 PNG',
      description: 'Large "VICTORY" title text with subtitle "HOST FULLY RECOVERED" - celebrates player\'s successful defense of the human body',
      usage: 'Center TextureRect horizontally at y=620. Can add fade-in or scale animation with AnimationPlayer for dramatic effect.',
      preview: (
        <div className="text-center">
          <div className="text-[#e8f5f0] text-2xl font-bold tracking-wide">VICTORY</div>
          <div className="text-[#5DCAA5] text-[8px] mt-1">HOST FULLY RECOVERED</div>
        </div>
      )
    },
    {
      title: '5D. RETURN BUTTON',
      size: '200×32 PNG',
      description: 'Blank green filled button template - reusable for victory screen return action',
      usage: 'Use TextureButton centered at y=760. Layer a Label node with dark text on top to show "MAIN MENU". Connect pressed() signal to change scene back to main menu.',
      preview: (
        <div className="bg-[#1D9E75] px-8 py-1.5 rounded-sm inline-block">
          {/* No text - blank button */}
        </div>
      )
    }
  ];

  const gameOverAssets = [
    {
      title: '6A. GAME OVER BACKGROUND',
      size: '1920×1080 PNG',
      description: 'Failure screen backdrop with ominous red tint - shown when Severity reaches 100% and the patient dies',
      usage: 'Use TextureRect with Stretch Mode "Keep Aspect Covered" as full-screen background. Display when player loses (Severity reaches 100%).',
      preview: (
        <div className="w-full h-32 bg-[#0a0202] relative overflow-hidden">
          <div className="absolute inset-0 bg-[#E24B4A] opacity-5" />
          <svg className="absolute inset-0 w-full h-full opacity-5">
            <pattern id="hexagons-go" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <polygon points="10,0 15,5 15,15 10,20 5,15 5,5" fill="none" stroke="#E24B4A" strokeWidth="0.5"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#hexagons-go)" />
          </svg>
        </div>
      )
    },
    {
      title: '6B. GAME OVER EMBLEM',
      size: '300×300 PNG',
      description: 'Red circular warning badge with "HOST COMPROMISED" text - medical alert that the virus won and the patient could not be saved',
      usage: 'Place TextureRect centered at x=960, y=360. Maintain aspect ratio. Optional: add pulsing opacity animation for ominous effect.',
      preview: (
        <div className="flex items-center justify-center">
          <div className="relative w-24 h-24 border-2 border-[#E24B4A] rounded-full flex items-center justify-center">
            <div className="w-20 h-20 bg-[#1a0505] border border-[#E24B4A] rounded-full flex flex-col items-center justify-center">
              <div className="text-[#E24B4A] text-[8px] tracking-[1px]">HOST</div>
              <div className="text-[#E24B4A] text-[8px] tracking-[1px]">COMPROMISED</div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: '6C. GAME OVER TITLE',
      size: '600×80 PNG',
      description: 'Large "GAME OVER" title text with subtitle "SEVERITY REACHED 100%" - informs player they failed to stop the infection in time',
      usage: 'Center TextureRect horizontally at y=620. Can add fade-in animation with AnimationPlayer.',
      preview: (
        <div className="text-center">
          <div className="text-white text-2xl font-bold tracking-wide">GAME OVER</div>
          <div className="text-[#E24B4A] text-[8px] mt-1">SEVERITY REACHED 100%</div>
        </div>
      )
    },
    {
      title: '6D. RETRY BUTTON',
      size: '200×32 PNG',
      description: 'Blank red outlined button template - reusable for game over screen retry action',
      usage: 'Use TextureButton centered at y=760. Layer a Label node with red text on top to show "RETRY". Connect pressed() signal to restart game at same difficulty level.',
      preview: (
        <div className="border border-[#E24B4A] px-8 py-1.5 rounded-sm inline-block">
          {/* No text - blank button */}
        </div>
      )
    }
  ];

  return (
    <div className="space-y-8">
      <div className="mb-8">
        <h2 className="text-[#5DCAA5] text-sm tracking-[5px] mb-2">SCREEN 5 — VICTORY SCREEN</h2>
        <p className="text-[#3d6b55] text-xs">Full-screen victory state with green theme.</p>
      </div>

      <div className="bg-[#1D9E75] bg-opacity-20 border border-[#1D9E75] rounded-sm p-4 mb-6">
        <div className="text-[#e8f5f0] text-xs font-bold mb-2">⚠️ IMPORTANT: BLANK BUTTON TEMPLATES</div>
        <p className="text-[#5DCAA5] text-xs leading-relaxed">
          Buttons (5D Return, 6D Retry) are provided as <span className="text-[#e8f5f0] font-bold">BLANK TEMPLATES</span> without text.
          In Godot, layer <span className="text-[#e8f5f0]">Label nodes</span> on top to add button text dynamically.
        </p>
      </div>

      <FullScreenMockup title="Complete victory screen with emblem, title, and return button">
        <svg width="100%" viewBox="0 0 1920 1080" className="w-full">
          {/* Background */}
          <defs>
            <pattern id="hexagons-vic" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <polygon points="20,0 30,10 30,30 20,40 10,30 10,10" fill="none" stroke="#1D9E75" strokeWidth="0.5" opacity="0.03"/>
            </pattern>
          </defs>
          <rect width="1920" height="1080" fill="#020a04"/>
          <rect width="1920" height="1080" fill="#1D9E75" opacity="0.06"/>
          <rect width="1920" height="1080" fill="url(#hexagons-vic)"/>

          {/* Emblem */}
          <circle cx="960" cy="360" r="176" fill="none" stroke="#1D9E75" strokeWidth="4"/>
          <circle cx="960" cy="360" r="144" fill="#0d2016" stroke="#1D9E75" strokeWidth="2"/>
          <text x="960" y="340" textAnchor="middle" fill="#1D9E75" fontSize="20" fontFamily="'Courier New',monospace" letterSpacing="2">THREAT</text>
          <text x="960" y="380" textAnchor="middle" fill="#1D9E75" fontSize="20" fontFamily="'Courier New',monospace" letterSpacing="2">NEUTRALIZED</text>

          {/* Title */}
          <text x="960" y="620" textAnchor="middle" fill="#e8f5f0" fontSize="96" fontFamily="'Courier New',monospace" fontWeight="bold" letterSpacing="4">VICTORY</text>
          <text x="960" y="680" textAnchor="middle" fill="#5DCAA5" fontSize="16" fontFamily="'Courier New',monospace">HOST FULLY RECOVERED</text>

          {/* Button */}
          <rect x="760" y="760" width="400" height="64" rx="4" fill="#1D9E75"/>
          <text x="960" y="800" textAnchor="middle" fill="#050d0a" fontSize="18" fontFamily="'Courier New',monospace" fontWeight="bold" letterSpacing="6">MAIN MENU</text>
        </svg>
      </FullScreenMockup>

      <div className="mb-8">
        <h3 className="text-[#1D9E75] text-xs tracking-[3px] mb-4">VICTORY SCREEN ASSETS</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {victoryAssets.map((asset, index) => (
          <AssetCard key={index} {...asset} />
        ))}
      </div>

      <div className="mb-8">
        <h2 className="text-[#5DCAA5] text-sm tracking-[5px] mb-2">SCREEN 6 — GAME OVER SCREEN</h2>
        <p className="text-[#3d6b55] text-xs">Full-screen failure state with red theme.</p>
      </div>

      <FullScreenMockup title="Complete game over screen with emblem, title, and retry button">
        <svg width="100%" viewBox="0 0 1920 1080" className="w-full">
          {/* Background */}
          <defs>
            <pattern id="hexagons-go-full" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <polygon points="20,0 30,10 30,30 20,40 10,30 10,10" fill="none" stroke="#E24B4A" strokeWidth="0.5" opacity="0.03"/>
            </pattern>
          </defs>
          <rect width="1920" height="1080" fill="#0a0202"/>
          <rect width="1920" height="1080" fill="#E24B4A" opacity="0.05"/>
          <rect width="1920" height="1080" fill="url(#hexagons-go-full)"/>

          {/* Emblem */}
          <circle cx="960" cy="360" r="176" fill="none" stroke="#E24B4A" strokeWidth="4"/>
          <circle cx="960" cy="360" r="144" fill="#1a0505" stroke="#E24B4A" strokeWidth="2"/>
          <text x="960" y="340" textAnchor="middle" fill="#E24B4A" fontSize="20" fontFamily="'Courier New',monospace" letterSpacing="2">HOST</text>
          <text x="960" y="380" textAnchor="middle" fill="#E24B4A" fontSize="20" fontFamily="'Courier New',monospace" letterSpacing="2">COMPROMISED</text>

          {/* Title */}
          <text x="960" y="620" textAnchor="middle" fill="#fff" fontSize="96" fontFamily="'Courier New',monospace" fontWeight="bold" letterSpacing="4">GAME OVER</text>
          <text x="960" y="680" textAnchor="middle" fill="#E24B4A" fontSize="16" fontFamily="'Courier New',monospace">SEVERITY REACHED 100%</text>

          {/* Button */}
          <rect x="760" y="760" width="400" height="64" rx="4" fill="none" stroke="#E24B4A" strokeWidth="2"/>
          <text x="960" y="800" textAnchor="middle" fill="#E24B4A" fontSize="18" fontFamily="'Courier New',monospace" letterSpacing="6">RETRY</text>
        </svg>
      </FullScreenMockup>

      <div className="mb-8">
        <h3 className="text-[#1D9E75] text-xs tracking-[3px] mb-4">GAME OVER SCREEN ASSETS</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {gameOverAssets.map((asset, index) => (
          <AssetCard key={index} {...asset} />
        ))}
      </div>
    </div>
  );
}
