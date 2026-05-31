import { AssetCard } from '../AssetCard';

export function AdditionalUI() {
  const pauseMenuAssets = [
    {
      title: 'PAUSE SCREEN OVERLAY',
      size: '1920×1080 PNG',
      description: 'Dark semi-transparent overlay that dims the game screen when paused - lets player see the frozen game state underneath',
      usage: 'Use CanvasLayer with TextureRect covering full screen when player pauses. Set to 80% opacity. Place behind pause menu panel.',
      preview: (
        <div className="w-full h-32 bg-[#050d0a] opacity-80 relative">
          <div className="absolute inset-0" style={{
            background: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,180,120,0.012) 3px, rgba(0,180,120,0.012) 4px)'
          }} />
        </div>
      )
    },
    {
      title: 'PAUSE MENU PANEL',
      size: '600×400 PNG',
      description: 'Pause menu popup panel with "PAUSED" header and three blank button slots. The panel frame provides structure for placing Resume, Settings, and Quit buttons',
      usage: 'Center on screen when player presses ESC/Pause. Use TextureRect as background, layer blank button sprites (from sprite sheet) with Label nodes for Resume/Settings/Quit text.',
      preview: (
        <div className="flex items-center justify-center">
          <div className="relative w-80 bg-[#070f09] border-[1.5px] border-[#1D9E75] rounded p-6">
            <div className="absolute top-1 left-1 w-4 h-4 border-l-2 border-t-2 border-[#1D9E75]" />
            <div className="absolute top-1 right-1 w-4 h-4 border-r-2 border-t-2 border-[#1D9E75]" />
            <div className="absolute bottom-1 left-1 w-4 h-4 border-l-2 border-b-2 border-[#1D9E75]" />
            <div className="absolute bottom-1 right-1 w-4 h-4 border-r-2 border-b-2 border-[#1D9E75]" />

            <div className="text-[#5DCAA5] text-lg tracking-[6px] text-center mb-6">PAUSED</div>
            <div className="space-y-3">
              <div className="bg-[#1D9E75] py-2 px-4 text-center rounded-sm">
                {/* Resume button - use blank template + Label */}
              </div>
              <div className="border border-[#1D9E75] py-2 px-4 text-center rounded-sm">
                {/* Settings button - use blank template + Label */}
              </div>
              <div className="border border-[#E24B4A] py-2 px-4 text-center rounded-sm">
                {/* Quit button - use blank template + Label */}
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'SETTINGS PANEL',
      size: '700×500 PNG',
      description: 'Settings screen showing Music Volume slider, SFX Volume slider, and current Difficulty level (from pause menu or main menu)',
      usage: 'Display when player clicks Settings from pause menu. Use as TextureRect background, layer HSlider nodes for volume controls on top.',
      preview: (
        <div className="flex items-center justify-center">
          <div className="relative w-96 bg-[#070f09] border border-[#1D9E75] rounded p-4">
            <div className="text-[#5DCAA5] text-sm tracking-[4px] text-center mb-4 border-b border-[#1a3a2a] pb-2">SETTINGS</div>
            <div className="space-y-3 text-xs">
              <div>
                <div className="text-[#5DCAA5] mb-1">MUSIC VOLUME</div>
                <div className="h-2 bg-[#0a1f12] border border-[#1D9E75] rounded-sm overflow-hidden">
                  <div className="h-full w-3/4 bg-[#1D9E75]" />
                </div>
              </div>
              <div>
                <div className="text-[#5DCAA5] mb-1">SFX VOLUME</div>
                <div className="h-2 bg-[#0a1f12] border border-[#1D9E75] rounded-sm overflow-hidden">
                  <div className="h-full w-2/3 bg-[#1D9E75]" />
                </div>
              </div>
              <div className="border-t border-[#1a3a2a] pt-2">
                <div className="text-[#5DCAA5] mb-1">DIFFICULTY</div>
                <div className="text-[#3d6b55]">EPIDEMIC MODE</div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  const transitionAssets = [
    {
      title: 'ROUND TRANSITION',
      size: '1920×1080 PNG',
      description: 'Blank full-screen round transition template with "INITIATING" header and decorative line - the round number is added dynamically via Label node',
      usage: 'Display for 1-2 seconds between rounds. Use AnimationPlayer to fade in/out. Layer a large Label node in the center to show current round number (e.g., "ROUND 06").',
      preview: (
        <div className="flex items-center justify-center bg-[#050d0a] h-40">
          <div className="text-center">
            <div className="text-[#5DCAA5] text-xs tracking-[4px] mb-2">INITIATING</div>
            <div className="text-[#e8f5f0] text-4xl font-bold tracking-wide">{/* Round number via Label */}</div>
            <div className="w-32 h-1 bg-[#1D9E75] mx-auto mt-2" />
          </div>
        </div>
      )
    },
    {
      title: 'MUTATION TELEGRAPH (CASUAL)',
      size: '800×200 PNG',
      description: 'Amber warning banner template that appears in Casual mode only - shows "MUTATION INCOMING" header with space for mutation type to be added dynamically',
      usage: 'Only display in CASUAL difficulty 1 round before mutation. Center at top of screen. Layer a Label node at the bottom to show mutation type (e.g., "ANTIGENIC DRIFT", "RAPID REPLICATION").',
      preview: (
        <div className="border-2 border-[#EF9F27] bg-[#1a0d00] p-4 rounded-sm">
          <div className="text-center">
            <div className="text-[#EF9F27] text-xs tracking-[2px] mb-1">⚠ WARNING ⚠</div>
            <div className="text-[#EF9F27] text-sm tracking-[4px] font-bold">MUTATION INCOMING</div>
            <div className="text-[#5DCAA5] text-xs mt-2">{/* Mutation name via Label */}</div>
          </div>
        </div>
      )
    },
    {
      title: 'LOADING INDICATOR',
      size: '200×200 PNG (animation frames)',
      description: 'Spinning green loading icon (rotating circle with "LOAD" text) - shown during scene transitions or when AI is calculating virus moves',
      usage: 'Use AnimatedSprite2D with 8-12 frame rotation. Display during scene transitions or AI calculation delays. Center on screen while loading.',
      preview: (
        <div className="flex items-center justify-center">
          <svg width="60" height="60" viewBox="0 0 60 60">
            <circle cx="30" cy="30" r="25" fill="none" stroke="#1D9E75" strokeWidth="2" opacity="0.2" />
            <circle cx="30" cy="30" r="25" fill="none" stroke="#1D9E75" strokeWidth="2" strokeDasharray="40 120" opacity="0.8">
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 30 30"
                to="360 30 30"
                dur="1.5s"
                repeatCount="indefinite"
              />
            </circle>
            <text x="30" y="35" textAnchor="middle" fill="#1D9E75" fontSize="8" fontFamily="'Courier New',monospace">LOAD</text>
          </svg>
        </div>
      )
    }
  ];

  const feedbackAssets = [
    {
      title: 'CONFIRMATION DIALOG',
      size: '500×250 PNG',
      description: 'Amber-bordered popup panel with "CONFIRM ACTION" header and two blank button slots - reusable for any confirmation prompt (quit, restart, etc.)',
      usage: 'Display as popup when player attempts destructive action. Center on screen. Layer Label nodes for: question text (middle), YES button text, NO button text. Reuse for different confirmation prompts.',
      preview: (
        <div className="flex items-center justify-center">
          <div className="relative w-72 bg-[#070f09] border-[1.5px] border-[#EF9F27] rounded p-4">
            <div className="absolute top-1 left-1 w-3 h-3 border-l-2 border-t-2 border-[#EF9F27]" />
            <div className="absolute top-1 right-1 w-3 h-3 border-r-2 border-t-2 border-[#EF9F27]" />
            <div className="absolute bottom-1 left-1 w-3 h-3 border-l-2 border-b-2 border-[#EF9F27]" />
            <div className="absolute bottom-1 right-1 w-3 h-3 border-r-2 border-b-2 border-[#EF9F27]" />

            <div className="text-[#EF9F27] text-sm tracking-[3px] text-center mb-4">CONFIRM ACTION</div>
            <div className="text-[#5DCAA5] text-xs text-center mb-4">{/* Question text via Label */}</div>
            <div className="flex gap-3">
              <div className="flex-1 bg-[#1D9E75] py-2 text-center rounded-sm">
                {/* YES button - use Label */}
              </div>
              <div className="flex-1 border border-[#E24B4A] py-2 text-center rounded-sm">
                {/* NO button - use Label */}
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'ALERT/WARNING POPUP',
      size: '600×150 PNG',
      description: 'Red alert banner template with exclamation mark and "CRITICAL ALERT" header - message area is blank for dynamic event text',
      usage: 'Display at top-center when critical event occurs (Brain infected, Severity > 75%). Auto-dismiss after 3 seconds. Layer a Label node below header to show specific event text.',
      preview: (
        <div className="border-2 border-[#E24B4A] bg-[#1a0000] p-4 rounded-sm">
          <div className="flex items-center gap-3">
            <div className="text-[#E24B4A] text-3xl">!</div>
            <div>
              <div className="text-[#E24B4A] text-xs tracking-[3px] font-bold">CRITICAL ALERT</div>
              <div className="text-[#5DCAA5] text-xs mt-1">{/* Event description via Label */}</div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'FLOATING DAMAGE NUMBERS',
      size: '100×50 PNG (multiple variants)',
      description: 'Numbers that pop up and float away when actions happen: red "-8" when virus damages, green "+15 EP" when energy gained, amber "IMMUNE" when attack blocked',
      usage: 'Spawn Label2D at action position. Animate upward float and fade out over 1 second using Tween. Red for damage, green for EP gain, amber for IMMUNE.',
      preview: (
        <div className="flex gap-6 items-center justify-center">
          <div className="text-[#E24B4A] text-2xl font-bold">-8</div>
          <div className="text-[#1D9E75] text-xl font-bold">+15 EP</div>
          <div className="text-[#EF9F27] text-lg">IMMUNE</div>
        </div>
      )
    },
    {
      title: 'ZONE HOVER INDICATOR',
      size: 'Variable overlay',
      description: 'Pulsing green glow that appears when player hovers mouse over a clickable organ zone - shows which zone they\'re about to target',
      usage: 'Create Area2D for each clickable organ zone. On mouse_entered(), show this highlight overlay. Animate pulsing opacity for glow effect.',
      preview: (
        <div className="flex items-center justify-center">
          <div className="relative w-24 h-24">
            <div className="absolute inset-0 border-2 border-[#5DCAA5] rounded-sm animate-pulse" />
            <div className="absolute inset-0 bg-[#1D9E75] opacity-10" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-[#5DCAA5] text-xs">LUNG</div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'WEIGHTED RESPONSE FEEDBACK',
      size: '400×120 PNG',
      description: 'Round summary showing "MOST EFFECTIVE DEFENSE" with bar graphs - tells player which immune action worked best (e.g., Antibodies 80%, WBC 40%)',
      usage: 'Display in round resolve popup. Use TextureProgressBar for effectiveness bars. Calculate percentages from Weighted Response System metrics.',
      preview: (
        <div className="bg-[#0a1f12] border border-[#1D9E75] p-3 rounded-sm">
          <div className="text-[#5DCAA5] text-xs tracking-[2px] mb-2">MOST EFFECTIVE DEFENSE</div>
          <div className="flex items-center gap-2 mb-1">
            <div className="text-[#5DCAA5] text-xs w-24">Antibodies</div>
            <div className="flex-1 h-2 bg-[#0a1f12] border border-[#1D9E75] rounded-sm overflow-hidden">
              <div className="h-full w-4/5 bg-[#1D9E75]" />
            </div>
            <div className="text-[#1D9E75] text-xs">80%</div>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-[#5DCAA5] text-xs w-24">WBC</div>
            <div className="flex-1 h-2 bg-[#0a1f12] border border-[#1D9E75] rounded-sm overflow-hidden">
              <div className="h-full w-2/5 bg-[#5DCAA5]" />
            </div>
            <div className="text-[#5DCAA5] text-xs">40%</div>
          </div>
        </div>
      )
    }
  ];

  const miscAssets = [
    {
      title: 'SCANLINE OVERLAY TILE',
      size: '4×4 PNG (tileable)',
      description: 'Tiny tileable pattern that creates subtle horizontal scanlines across the entire screen - gives the game a retro CRT monitor aesthetic',
      usage: 'Use TextureRect with repeat enabled covering full screen. Place on highest CanvasLayer at 5-10% opacity for subtle CRT terminal effect.',
      preview: (
        <div className="relative w-full h-24 bg-[#0d2016]">
          <div className="absolute inset-0" style={{
            background: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.06) 0px, rgba(0,0,0,0.06) 1px, transparent 1px, transparent 4px)'
          }} />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[#5DCAA5] text-xs">Scanline texture overlay</span>
          </div>
        </div>
      )
    },
    {
      title: 'TOOLTIP BACKGROUND',
      size: 'Variable (9-slice)',
      description: 'Small dark info box that pops up when hovering over buttons - shows helpful text like "White Blood Cells: Patrol zone and reduce virus spread rate. Cost: 10 EP"',
      usage: 'Use NinePatchRect for flexible sizing. Display on mouse_entered() for buttons. Position near cursor with offset. Layer Label nodes for tooltip text.',
      preview: (
        <div className="inline-block bg-[#0a1f12] border border-[#1D9E75] px-3 py-2 rounded-sm">
          <div className="text-[#5DCAA5] text-xs font-bold mb-1">White Blood Cells</div>
          <div className="text-[#5DCAA5] text-xs">Patrol zone and reduce virus</div>
          <div className="text-[#5DCAA5] text-xs">spread rate. Cost: 10 EP</div>
        </div>
      )
    },
    {
      title: 'PANEL DIVIDER LINE',
      size: '400×1 PNG (tileable)',
      description: 'Thin green horizontal line used to visually separate different sections within panels and menus',
      usage: 'Use TextureRect stretched horizontally to separate sections in sidebars and panels. Set height to 1px. Tile horizontally for variable widths.',
      preview: (
        <div className="w-full">
          <div className="h-px bg-[#1D9E75] opacity-30" />
        </div>
      )
    }
  ];

  return (
    <div className="space-y-8">
      <div className="mb-8">
        <h2 className="text-[#5DCAA5] text-sm tracking-[5px] mb-2">ADDITIONAL UI ELEMENTS</h2>
        <p className="text-[#5DCAA5] text-xs">Menus, transitions, feedback indicators, and utility UI components to complete the game experience.</p>
      </div>

      <div className="bg-[#1D9E75] bg-opacity-20 border border-[#1D9E75] rounded-sm p-4">
        <div className="text-[#e8f5f0] text-xs font-bold mb-2">⚠️ IMPORTANT: BLANK TEMPLATES</div>
        <p className="text-[#5DCAA5] text-xs leading-relaxed">
          Many assets here are <span className="text-[#e8f5f0] font-bold">BLANK TEMPLATES</span> where dynamic content
          (button text, round numbers, mutation names, event descriptions) should be added via <span className="text-[#e8f5f0]">Label nodes</span> in Godot.
          This makes assets reusable for different contexts instead of creating separate PNGs for every variation.
        </p>
      </div>

      <div>
        <h3 className="text-[#1D9E75] text-xs tracking-[3px] mb-4">PAUSE & SETTINGS</h3>
        <div className="grid grid-cols-1 gap-6 mb-8">
          {pauseMenuAssets.map((asset, index) => (
            <AssetCard key={index} {...asset} />
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-[#1D9E75] text-xs tracking-[3px] mb-4">TRANSITIONS & LOADING</h3>
        <div className="grid grid-cols-1 gap-6 mb-8">
          {transitionAssets.map((asset, index) => (
            <AssetCard key={index} {...asset} />
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-[#1D9E75] text-xs tracking-[3px] mb-4">FEEDBACK & ALERTS</h3>
        <div className="grid grid-cols-1 gap-6 mb-8">
          {feedbackAssets.map((asset, index) => (
            <AssetCard key={index} {...asset} />
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-[#1D9E75] text-xs tracking-[3px] mb-4">MISCELLANEOUS</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {miscAssets.map((asset, index) => (
            <AssetCard key={index} {...asset} />
          ))}
        </div>
      </div>
    </div>
  );
}
