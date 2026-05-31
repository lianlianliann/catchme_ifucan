import { AssetCard } from '../AssetCard';

export function SpriteSheet() {
  const buttonSprites = [
    {
      title: 'BTN-PRIMARY-NORMAL',
      size: '200×36 PNG',
      description: 'Blank button template - green outlined rectangle with corner brackets. Add a Label node on top in Godot to display button text (DEPLOY, RESUME, etc.)',
      usage: 'Apply to TextureButton "Texture Normal" property. Layer a Label node centered on top to add text. Reuse this same button for all primary actions.',
      preview: (
        <div className="relative inline-block">
          <div className="w-32 h-7 bg-[#0d2016] border border-[#1D9E75] rounded-sm flex items-center justify-center">
            {/* No text - blank button */}
          </div>
          <div className="absolute top-0.5 left-0.5 w-2 h-2 border-l border-t border-[#1D9E75]" />
          <div className="absolute top-0.5 right-0.5 w-2 h-2 border-r border-t border-[#1D9E75]" />
          <div className="absolute bottom-0.5 left-0.5 w-2 h-2 border-l border-b border-[#1D9E75]" />
          <div className="absolute bottom-0.5 right-0.5 w-2 h-2 border-r border-b border-[#1D9E75]" />
        </div>
      )
    },
    {
      title: 'BTN-PRIMARY-HOVER',
      size: '200×36 PNG',
      description: 'Blank button hover state - filled with bright green. Add a Label node on top with dark text color (#050d0a) for hover state.',
      usage: 'Apply to TextureButton "Texture Hover" property. Use the same Label node - just change its color to dark when hovering.',
      preview: (
        <div className="relative inline-block">
          <div className="w-32 h-7 bg-[#1D9E75] border border-[#1D9E75] rounded-sm flex items-center justify-center">
            {/* No text - blank button */}
          </div>
          <div className="absolute top-0.5 left-0.5 w-2 h-2 border-l border-t border-[#1D9E75]" />
          <div className="absolute top-0.5 right-0.5 w-2 h-2 border-r border-t border-[#1D9E75]" />
          <div className="absolute bottom-0.5 left-0.5 w-2 h-2 border-l border-b border-[#1D9E75]" />
          <div className="absolute bottom-0.5 right-0.5 w-2 h-2 border-r border-b border-[#1D9E75]" />
        </div>
      )
    },
    {
      title: 'BTN-DANGER-NORMAL',
      size: '200×36 PNG',
      description: 'Blank danger button template - red outlined for warnings. Add Label node with text like "QUIT", "CYTOKINE BURST", etc.',
      usage: 'Use for destructive actions. Layer a Label node with red text (#E24B4A) on top. Reuse for all dangerous buttons.',
      preview: (
        <div className="relative inline-block">
          <div className="w-32 h-7 bg-[#1a0000] border border-[#E24B4A] rounded-sm flex items-center justify-center">
            {/* No text - blank button */}
          </div>
          <div className="absolute top-0.5 left-0.5 w-2 h-2 border-l border-t border-[#E24B4A]" />
          <div className="absolute top-0.5 right-0.5 w-2 h-2 border-r border-t border-[#E24B4A]" />
          <div className="absolute bottom-0.5 left-0.5 w-2 h-2 border-l border-b border-[#E24B4A]" />
          <div className="absolute bottom-0.5 right-0.5 w-2 h-2 border-r border-b border-[#E24B4A]" />
        </div>
      )
    },
    {
      title: 'BTN-PRIMARY-DISABLED',
      size: '200×36 PNG',
      description: 'Blank grayed-out button - shown when unavailable. Add dimmed Label text on top.',
      usage: 'Apply to TextureButton "Texture Disabled" property. Layer Label with dim text color (#3d6b55). Reuse for all disabled states.',
      preview: (
        <div className="relative inline-block opacity-40">
          <div className="w-32 h-7 bg-[#050d0a] border border-[#1a3a2a] rounded-sm flex items-center justify-center">
            {/* No text - blank button */}
          </div>
          <div className="absolute top-0.5 left-0.5 w-2 h-2 border-l border-t border-[#1a3a2a]" />
          <div className="absolute top-0.5 right-0.5 w-2 h-2 border-r border-t border-[#1a3a2a]" />
          <div className="absolute bottom-0.5 left-0.5 w-2 h-2 border-l border-b border-[#1a3a2a]" />
          <div className="absolute bottom-0.5 right-0.5 w-2 h-2 border-r border-b border-[#1a3a2a]" />
        </div>
      )
    }
  ];

  const progressBars = [
    {
      title: 'BAR-FILL-HEALTHY',
      size: '200×10 PNG',
      description: 'Green progress bar fill indicating good status - used for Energy Points bar and healthy zone metrics',
      usage: 'Use as TextureProgressBar "Fill" texture when value > 50%. Apply to EP bar, zone health bars, or any positive metric displays.',
      preview: (
        <div className="w-48 h-2 bg-[#0a1f12] border border-[#1D9E75] rounded-sm overflow-hidden">
          <div className="h-full w-full bg-[#1D9E75]" />
        </div>
      )
    },
    {
      title: 'BAR-FILL-WARNING',
      size: '200×10 PNG',
      description: 'Amber/orange progress bar fill indicating moderate danger - Severity is getting worrisome but not critical yet',
      usage: 'Swap to this texture when value is 25-50%. Use for Severity bar in medium range or contested zone health. Signals caution to player.',
      preview: (
        <div className="w-48 h-2 bg-[#0a1f12] border border-[#1D9E75] rounded-sm overflow-hidden">
          <div className="h-full w-2/3 bg-[#EF9F27]" />
        </div>
      )
    },
    {
      title: 'BAR-FILL-CRITICAL',
      size: '200×10 PNG',
      description: 'Red progress bar fill indicating emergency - Severity is above 75% and patient is close to death',
      usage: 'Swap to this texture when Severity > 75% or health < 25%. Critical visual warning for danger states. Can add pulsing animation for urgency.',
      preview: (
        <div className="w-48 h-2 bg-[#0a1f12] border border-[#1D9E75] rounded-sm overflow-hidden">
          <div className="h-full w-1/3 bg-[#E24B4A]" />
        </div>
      )
    },
    {
      title: 'BAR-TRACK',
      size: '200×10 PNG',
      description: 'Empty dark container that holds progress bar fills - the background "track" that colored bars fill into',
      usage: 'Use as TextureProgressBar "Background" texture. This is the unfilled portion of progress bars. Pair with fill textures above.',
      preview: (
        <div className="w-48 h-2 bg-[#0a1f12] border border-[#1D9E75] rounded-sm" />
      )
    }
  ];

  const badges = [
    {
      title: 'BADGE-VIRUS-AMBER',
      size: '160×20 PNG',
      description: 'Blank amber badge background - use for standard virus mutations. Add Label node with mutation name dynamically in Godot.',
      usage: 'Display in left sidebar. Layer Label node on top with amber text (#EF9F27). Update Label.text when mutation changes.',
      preview: (
        <div className="bg-[#1a0d00] border border-[#EF9F27] px-3 py-1 rounded-sm inline-block h-6 w-40">
          {/* No text - blank badge */}
        </div>
      )
    },
    {
      title: 'BADGE-VIRUS-RED',
      size: '160×20 PNG',
      description: 'Blank red badge background - use for dangerous virus mutations. Add Label node dynamically.',
      usage: 'Layer Label node with red text (#E24B4A). Swap badge color based on mutation threat level.',
      preview: (
        <div className="bg-[#1a0000] border border-[#E24B4A] px-3 py-1 rounded-sm inline-block h-6 w-40">
          {/* No text - blank badge */}
        </div>
      )
    },
    {
      title: 'BADGE-VIRUS-PURPLE',
      size: '160×20 PNG',
      description: 'Blank purple badge background - use for defensive virus mutations. Add Label node dynamically.',
      usage: 'Layer Label node with purple text (#7F77DD) for evasive abilities.',
      preview: (
        <div className="bg-[#0a001a] border border-[#7F77DD] px-3 py-1 rounded-sm inline-block h-6 w-40">
          {/* No text - blank badge */}
        </div>
      )
    }
  ];

  const zoneIndicators = [
    {
      title: 'ZONE-HEALTHY',
      size: '20×20 PNG',
      description: 'Small green square showing this organ zone is virus-free and functioning normally',
      usage: 'Place next to organ names in sidebar. Display when zone has no virus presence and full health.',
      preview: <div className="w-5 h-5 bg-[#1D9E75] rounded-sm" />
    },
    {
      title: 'ZONE-INFECTED',
      size: '20×20 PNG',
      description: 'Small red square showing this organ zone is currently infected with virus and needs urgent treatment',
      usage: 'Swap to this when zone contains active virus. Red signals immediate threat requiring player action.',
      preview: <div className="w-5 h-5 bg-[#E24B4A] rounded-sm" />
    },
    {
      title: 'ZONE-CONTESTED',
      size: '20×20 PNG',
      description: 'Small amber/orange square showing this organ zone is currently being fought over by immune cells and virus',
      usage: 'Display when immune cells and virus are both present in zone. Indicates active battle for zone control.',
      preview: <div className="w-5 h-5 bg-[#EF9F27] rounded-sm" />
    },
    {
      title: 'ZONE-CLEARED',
      size: '20×20 PNG',
      description: 'Small dim green square showing this organ zone was infected but player successfully eliminated the virus',
      usage: 'Show when zone was infected but player successfully eliminated virus. Dimmer green indicates recovered but not pristine state.',
      preview: <div className="w-5 h-5 bg-[#3d6b55] rounded-sm" />
    }
  ];

  const virusSprites = [
    {
      title: 'BASE VIRUS',
      size: '256×256 PNG',
      description: 'The main enemy - a sickly yellow-green viral cell with spike proteins sticking out, spreading through the body',
      usage: 'Assign to Sprite2D or AnimatedSprite2D texture. Use as default virus appearance. Swap texture when Decision Tree AI selects mutation.',
      preview: (
        <div className="flex items-center justify-center">
          <svg width="64" height="64" viewBox="0 0 64 64">
            <circle cx="32" cy="32" r="20" fill="#97C459" />
            <circle cx="32" cy="32" r="6" fill="#3B6D11" />
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
              const rad = (angle * Math.PI) / 180;
              const x = 32 + 20 * Math.cos(rad);
              const y = 32 + 20 * Math.sin(rad);
              const tipX = 32 + 26 * Math.cos(rad);
              const tipY = 32 + 26 * Math.sin(rad);
              return <line key={i} x1={x} y1={y} x2={tipX} y2={tipY} stroke="#97C459" strokeWidth="2" />;
            })}
          </svg>
        </div>
      )
    },
    {
      title: 'WHITE BLOOD CELL (NEUTROPHIL)',
      size: '256×256 PNG',
      description: 'Immune defender - an irregular lumpy white/gray cell that patrols zones and attacks viruses when player deploys it',
      usage: 'Spawn as Sprite2D when player deploys WBC action. Move toward virus using pathfinding. Animate movement and position in contested zones.',
      preview: (
        <div className="flex items-center justify-center">
          <svg width="64" height="64" viewBox="0 0 64 64">
            <circle cx="32" cy="32" r="20" fill="#D3D1C7" />
            <path d="M 28 28 Q 30 26 32 28 Q 34 26 36 28 Q 34 30 32 28 Q 30 30 28 28 Z" fill="#888780" />
          </svg>
        </div>
      )
    },
    {
      title: 'ANTIBODY (IgG)',
      size: '256×256 PNG',
      description: 'Precision weapon - Y-shaped antibody protein in blue-white that targets and neutralizes specific virus strains',
      usage: 'Spawn when player uses Antibody action. Animate floating toward target virus. Can add particle effects when binding to virus for elimination.',
      preview: (
        <div className="flex items-center justify-center">
          <svg width="64" height="64" viewBox="0 0 64 64">
            <path d="M 24 16 L 28 28 L 32 28 L 32 48 M 40 16 L 36 28 L 32 28" stroke="#85B7EB" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      )
    },
    {
      title: 'MEMORY CELL (LYMPHOCYTE)',
      size: '256×256 PNG',
      description: 'Long-term defender - smooth round purple cell with a star marking that "remembers" past infections and provides lasting protection',
      usage: 'Display when player activates Memory Cells action. Position near previously infected zones. Can add glow effect to show long-term immunity bonus.',
      preview: (
        <div className="flex items-center justify-center">
          <svg width="64" height="64" viewBox="0 0 64 64">
            <circle cx="32" cy="32" r="20" fill="#AFA9EC" />
            <path d="M 32 22 L 34 28 L 40 28 L 35 32 L 37 38 L 32 34 L 27 38 L 29 32 L 24 28 L 30 28 Z" fill="#7F77DD" />
          </svg>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-8">
      <div className="mb-8">
        <h2 className="text-[#5DCAA5] text-sm tracking-[5px] mb-2">SPRITE SHEET — REUSABLE UI COMPONENTS</h2>
        <p className="text-[#5DCAA5] text-xs mb-3">Individual sprites used throughout the game with transparent backgrounds.</p>
        <div className="bg-[#1D9E75] bg-opacity-20 border border-[#1D9E75] rounded-sm p-4 mt-4">
          <div className="text-[#e8f5f0] text-xs font-bold mb-2">⚠️ IMPORTANT: BLANK TEMPLATES</div>
          <p className="text-[#5DCAA5] text-xs leading-relaxed">
            Buttons and badges are provided as <span className="text-[#e8f5f0] font-bold">BLANK TEMPLATES</span> without text.
            In Godot, layer <span className="text-[#e8f5f0]">Label nodes</span> on top to add text dynamically.
            This allows you to <span className="text-[#e8f5f0]">reuse one button image</span> for multiple actions by just changing the Label text,
            instead of creating separate PNGs for every button.
          </p>
        </div>
      </div>

      <div>
        <h3 className="text-[#1D9E75] text-xs tracking-[3px] mb-4">BUTTONS</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {buttonSprites.map((asset, index) => (
            <AssetCard key={index} {...asset} />
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-[#1D9E75] text-xs tracking-[3px] mb-4">PROGRESS BARS</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {progressBars.map((asset, index) => (
            <AssetCard key={index} {...asset} />
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-[#1D9E75] text-xs tracking-[3px] mb-4">MUTATION BADGES</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {badges.map((asset, index) => (
            <AssetCard key={index} {...asset} />
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-[#1D9E75] text-xs tracking-[3px] mb-4">ZONE STATUS INDICATORS</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {zoneIndicators.map((asset, index) => (
            <AssetCard key={index} {...asset} />
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-[#1D9E75] text-xs tracking-[3px] mb-4">VIRUS AND IMMUNE CELL SPRITES</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {virusSprites.map((asset, index) => (
            <AssetCard key={index} {...asset} />
          ))}
        </div>
      </div>
    </div>
  );
}
