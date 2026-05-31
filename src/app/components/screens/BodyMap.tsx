import { AssetCard } from '../AssetCard';

export function BodyMap() {
  const bodyMapAssets = [
    {
      title: 'BODY MAP BASE',
      size: '1080×1080 PNG',
      description: 'The main game board - a clinical top-down schematic of the human body showing all 6 organ zones (Brain, Lungs, Heart, Lymph Nodes, Gut, Bloodstream) in a simplified medical diagram style',
      usage: 'Use TextureRect as base layer for central game board. Position at center of screen. Layer infected/cleared overlays on top using CanvasLayer for zone states.',
      preview: (
        <div className="flex items-center justify-center">
          <svg width="200" height="200" viewBox="0 0 200 200">
            <rect width="200" height="200" fill="#050d0a" />

            {/* Head */}
            <ellipse cx="100" cy="40" rx="25" ry="30" fill="none" stroke="#1a3a2a" strokeWidth="1" />

            {/* Brain zone */}
            <ellipse cx="100" cy="40" rx="18" ry="22" fill="#7F77DD" opacity="0.3" stroke="#7F77DD" strokeWidth="1" />
            <text x="100" y="43" textAnchor="middle" fill="#e8f5f0" fontSize="6" fontFamily="'Courier New',monospace">BRAIN</text>

            {/* Torso */}
            <rect x="70" y="65" width="60" height="100" rx="8" fill="none" stroke="#1a3a2a" strokeWidth="1" />

            {/* Lungs */}
            <ellipse cx="85" cy="85" rx="12" ry="18" fill="#1D9E75" opacity="0.3" stroke="#1D9E75" strokeWidth="1" />
            <ellipse cx="115" cy="85" rx="12" ry="18" fill="#1D9E75" opacity="0.3" stroke="#1D9E75" strokeWidth="1" />
            <text x="100" y="88" textAnchor="middle" fill="#e8f5f0" fontSize="5" fontFamily="'Courier New',monospace">LUNGS</text>

            {/* Heart */}
            <path d="M 100 105 L 95 100 L 95 95 Q 95 90 100 92 Q 105 90 105 95 L 105 100 Z" fill="#D85A30" opacity="0.3" stroke="#D85A30" strokeWidth="1" />
            <text x="100" y="103" textAnchor="middle" fill="#e8f5f0" fontSize="5" fontFamily="'Courier New',monospace">HEART</text>

            {/* Lymph Nodes */}
            <circle cx="75" cy="75" r="3" fill="#378ADD" opacity="0.5" />
            <circle cx="125" cy="75" r="3" fill="#378ADD" opacity="0.5" />
            <circle cx="75" cy="95" r="3" fill="#378ADD" opacity="0.5" />
            <circle cx="125" cy="95" r="3" fill="#378ADD" opacity="0.5" />
            <text x="75" y="108" textAnchor="middle" fill="#e8f5f0" fontSize="4" fontFamily="'Courier New',monospace">LYMPH</text>

            {/* Gut */}
            <ellipse cx="100" cy="135" rx="18" ry="22" fill="#BA7517" opacity="0.3" stroke="#BA7517" strokeWidth="1" />
            <text x="100" y="138" textAnchor="middle" fill="#e8f5f0" fontSize="5" fontFamily="'Courier New',monospace">GUT</text>

            {/* Bloodstream (dashed lines connecting organs) */}
            <line x1="100" y1="62" x2="100" y2="72" stroke="#E24B4A" strokeWidth="1" strokeDasharray="2,2" opacity="0.5" />
            <line x1="100" y1="103" x2="100" y2="113" stroke="#E24B4A" strokeWidth="1" strokeDasharray="2,2" opacity="0.5" />
            <line x1="85" y1="103" x2="75" y2="95" stroke="#E24B4A" strokeWidth="1" strokeDasharray="2,2" opacity="0.5" />
            <line x1="115" y1="103" x2="125" y2="95" stroke="#E24B4A" strokeWidth="1" strokeDasharray="2,2" opacity="0.5" />
            <text x="100" y="180" textAnchor="middle" fill="#E24B4A" fontSize="5" fontFamily="'Courier New',monospace">BLOODSTREAM</text>
          </svg>
        </div>
      )
    },
    {
      title: 'ZONE OVERLAY — INFECTED (6 variants)',
      size: '1080×1080 PNG each',
      description: 'Six versions (one for each organ) showing red infection spreading through that specific zone - red tint with biohazard dots indicates virus presence (example shown: infected lungs)',
      usage: 'Generate 6 separate overlays (one per organ). Show corresponding overlay when BFS algorithm propagates virus to that zone. Toggle visibility based on infection state.',
      preview: (
        <div className="space-y-4">
          <div className="text-[#5DCAA5] text-xs">Example: Lungs Infected</div>
          <div className="flex items-center justify-center">
            <svg width="200" height="200" viewBox="0 0 200 200">
              <rect width="200" height="200" fill="#050d0a" />
              <ellipse cx="100" cy="40" rx="25" ry="30" fill="none" stroke="#1a3a2a" strokeWidth="1" />
              <ellipse cx="100" cy="40" rx="18" ry="22" fill="#7F77DD" opacity="0.2" stroke="#7F77DD" strokeWidth="1" />
              <rect x="70" y="65" width="60" height="100" rx="8" fill="none" stroke="#1a3a2a" strokeWidth="1" />

              {/* Infected lungs with overlay */}
              <ellipse cx="85" cy="85" rx="12" ry="18" fill="#E24B4A" opacity="0.4" stroke="#E24B4A" strokeWidth="1.5" />
              <ellipse cx="115" cy="85" rx="12" ry="18" fill="#E24B4A" opacity="0.4" stroke="#E24B4A" strokeWidth="1.5" />

              {/* Biohazard dots */}
              <circle cx="82" cy="82" r="1.5" fill="#E24B4A" />
              <circle cx="88" cy="85" r="1.5" fill="#E24B4A" />
              <circle cx="85" cy="89" r="1.5" fill="#E24B4A" />
              <circle cx="112" cy="82" r="1.5" fill="#E24B4A" />
              <circle cx="118" cy="85" r="1.5" fill="#E24B4A" />
              <circle cx="115" cy="89" r="1.5" fill="#E24B4A" />

              <text x="100" y="88" textAnchor="middle" fill="#E24B4A" fontSize="5" fontFamily="'Courier New',monospace">INFECTED</text>

              {/* Other organs normal */}
              <path d="M 100 105 L 95 100 L 95 95 Q 95 90 100 92 Q 105 90 105 95 L 105 100 Z" fill="#D85A30" opacity="0.2" stroke="#D85A30" strokeWidth="1" />
              <ellipse cx="100" cy="135" rx="18" ry="22" fill="#BA7517" opacity="0.2" stroke="#BA7517" strokeWidth="1" />
            </svg>
          </div>
          <div className="text-[#5DCAA5] text-xs">Generate 6 variants: Brain, Lungs, Heart, Lymph, Gut, Blood infected</div>
        </div>
      )
    },
    {
      title: 'ZONE OVERLAY — CLEARED (6 variants)',
      size: '1080×1080 PNG each',
      description: 'Six versions (one for each organ) showing green healing in that specific zone - green tint with checkmarks indicates player successfully eliminated the virus (example shown: cleared lungs)',
      usage: 'Generate 6 cleared overlays matching infected zones. Display when player successfully eliminates virus from zone. Replaces infected overlay with green checkmark version.',
      preview: (
        <div className="space-y-4">
          <div className="text-[#5DCAA5] text-xs">Example: Lungs Cleared</div>
          <div className="flex items-center justify-center">
            <svg width="200" height="200" viewBox="0 0 200 200">
              <rect width="200" height="200" fill="#050d0a" />
              <ellipse cx="100" cy="40" rx="25" ry="30" fill="none" stroke="#1a3a2a" strokeWidth="1" />
              <ellipse cx="100" cy="40" rx="18" ry="22" fill="#7F77DD" opacity="0.2" stroke="#7F77DD" strokeWidth="1" />
              <rect x="70" y="65" width="60" height="100" rx="8" fill="none" stroke="#1a3a2a" strokeWidth="1" />

              {/* Cleared lungs with overlay */}
              <ellipse cx="85" cy="85" rx="12" ry="18" fill="#1D9E75" opacity="0.3" stroke="#1D9E75" strokeWidth="1.5" />
              <ellipse cx="115" cy="85" rx="12" ry="18" fill="#1D9E75" opacity="0.3" stroke="#1D9E75" strokeWidth="1.5" />

              {/* Checkmarks */}
              <path d="M 82 85 L 84 87 L 88 82" fill="none" stroke="#1D9E75" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M 112 85 L 114 87 L 118 82" fill="none" stroke="#1D9E75" strokeWidth="1.5" strokeLinecap="round" />

              <text x="100" y="88" textAnchor="middle" fill="#1D9E75" fontSize="5" fontFamily="'Courier New',monospace">CLEARED</text>

              {/* Other organs normal */}
              <path d="M 100 105 L 95 100 L 95 95 Q 95 90 100 92 Q 105 90 105 95 L 105 100 Z" fill="#D85A30" opacity="0.2" stroke="#D85A30" strokeWidth="1" />
              <ellipse cx="100" cy="135" rx="18" ry="22" fill="#BA7517" opacity="0.2" stroke="#BA7517" strokeWidth="1" />
            </svg>
          </div>
          <div className="text-[#5DCAA5] text-xs">Generate 6 variants: Brain, Lungs, Heart, Lymph, Gut, Blood cleared</div>
        </div>
      )
    },
    {
      title: 'ZONE EFFECT — INFLAMMATION',
      size: '512×512 PNG',
      description: 'Red-orange glow effect with jagged edges - visual indicator when player triggers inflammation immune response in a specific zone to burn out viruses',
      usage: 'Layer over specific zone when player activates Inflammation immune action. Position centered on target zone. Can add pulsing animation for active effect.',
      preview: (
        <div className="flex items-center justify-center">
          <svg width="120" height="120" viewBox="0 0 120 120">
            <rect width="120" height="120" fill="#050d0a" opacity="0.5" />
            <circle cx="60" cy="60" r="45" fill="#E24B4A" opacity="0.25" />
            <path d="M 60 15 L 62 20 L 58 20 Z M 105 60 L 100 62 L 100 58 Z M 60 105 L 62 100 L 58 100 Z M 15 60 L 20 62 L 20 58 Z" fill="#E24B4A" opacity="0.4" />
            <text x="60" y="65" textAnchor="middle" fill="#E24B4A" fontSize="8" fontFamily="'Courier New',monospace">INFLAME</text>
          </svg>
        </div>
      )
    },
    {
      title: 'ZONE EFFECT — FEVER',
      size: '512×512 PNG',
      description: 'Amber glow with wavy heat distortion lines - visual indicator when player activates fever response, raising body temperature across all zones to slow virus spread',
      usage: 'Apply to ALL zones when player triggers Fever Response. Global effect covering entire body map. Add wavy animation for heat distortion effect.',
      preview: (
        <div className="flex items-center justify-center">
          <svg width="120" height="120" viewBox="0 0 120 120">
            <rect width="120" height="120" fill="#050d0a" opacity="0.5" />
            <circle cx="60" cy="60" r="45" fill="#EF9F27" opacity="0.2" />
            {/* Wavy heat lines */}
            <path d="M 30 40 Q 35 38 40 40 Q 45 42 50 40" stroke="#EF9F27" strokeWidth="1" fill="none" opacity="0.5" />
            <path d="M 30 50 Q 35 48 40 50 Q 45 52 50 50" stroke="#EF9F27" strokeWidth="1" fill="none" opacity="0.5" />
            <path d="M 70 40 Q 75 38 80 40 Q 85 42 90 40" stroke="#EF9F27" strokeWidth="1" fill="none" opacity="0.5" />
            <path d="M 70 50 Q 75 48 80 50 Q 85 52 90 50" stroke="#EF9F27" strokeWidth="1" fill="none" opacity="0.5" />
            <text x="60" y="75" textAnchor="middle" fill="#EF9F27" fontSize="8" fontFamily="'Courier New',monospace">FEVER</text>
          </svg>
        </div>
      )
    },
    {
      title: 'ZONE EFFECT — HEALED',
      size: '512×512 PNG',
      description: 'Soft teal glow with checkmark - brief congratulatory effect that flashes when player successfully defends and heals a zone',
      usage: 'Display briefly over zone after successful virus elimination. Can fade out after 1-2 seconds. Visual feedback for completed immune action.',
      preview: (
        <div className="flex items-center justify-center">
          <svg width="120" height="120" viewBox="0 0 120 120">
            <rect width="120" height="120" fill="#050d0a" opacity="0.5" />
            <circle cx="60" cy="60" r="45" fill="#1D9E75" opacity="0.15" />
            <path d="M 50 60 L 56 68 L 72 48" stroke="#1D9E75" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
            <text x="60" y="85" textAnchor="middle" fill="#1D9E75" fontSize="8" fontFamily="'Courier New',monospace">HEALED</text>
          </svg>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h2 className="text-[#5DCAA5] text-sm tracking-[5px] mb-2">ORGAN ZONE MAP (BODY SILHOUETTE)</h2>
        <p className="text-[#5DCAA5] text-xs">The main game board - a top-down 2D schematic of the human body divided into 6 interconnected organ zones. Flat, clinical medical diagram style.</p>
      </div>

      <div className="border border-[#1D9E75] bg-[#0a1f12] rounded-sm p-6 mb-8">
        <h3 className="text-[#1D9E75] text-xs tracking-[3px] mb-3 font-bold">ORGAN ZONES</h3>
        <div className="grid grid-cols-2 gap-4 text-xs">
          <div>
            <div className="text-[#7F77DD] mb-1">• <span className="text-[#e8f5f0]">BRAIN</span> — Purple #7F77DD</div>
            <div className="text-[#3d6b55]">Critical final zone, +25% severity if infected</div>
          </div>
          <div>
            <div className="text-[#1D9E75] mb-1">• <span className="text-[#e8f5f0]">LUNGS</span> — Teal #1D9E75</div>
            <div className="text-[#3d6b55]">Primary entry point in most modes</div>
          </div>
          <div>
            <div className="text-[#D85A30] mb-1">• <span className="text-[#e8f5f0]">HEART</span> — Coral-red #D85A30</div>
            <div className="text-[#3d6b55]">Central organ, high importance</div>
          </div>
          <div>
            <div className="text-[#378ADD] mb-1">• <span className="text-[#e8f5f0]">LYMPH NODES</span> — Blue #378ADD</div>
            <div className="text-[#3d6b55]">Main EP resource generator</div>
          </div>
          <div>
            <div className="text-[#BA7517] mb-1">• <span className="text-[#e8f5f0]">GUT</span> — Amber #BA7517</div>
            <div className="text-[#3d6b55]">Lower abdomen zone</div>
          </div>
          <div>
            <div className="text-[#E24B4A] mb-1">• <span className="text-[#e8f5f0]">BLOODSTREAM</span> — Crimson #E24B4A</div>
            <div className="text-[#3d6b55]">Dashed lines connecting all zones</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {bodyMapAssets.map((asset, index) => (
          <AssetCard key={index} {...asset} />
        ))}
      </div>
    </div>
  );
}
