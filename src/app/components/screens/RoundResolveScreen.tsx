import { AssetCard } from '../AssetCard';
import { FullScreenMockup } from '../FullScreenMockup';

export function RoundResolveScreen() {
  const assets = [
    {
      title: '4A. POPUP CARD',
      size: '480×260 PNG',
      description: 'Round summary popup showing "ROUND X — RESOLVED" with a log of what happened (zones infected/cleared, mutations activated, EP regenerated) and updated Severity bar',
      usage: 'Use TextureRect centered on screen (x=560, y=240). Overlay dynamic Label nodes for outcome text. Update TextureProgressBar for severity. Use with backdrop asset.',
      preview: (
        <div className="relative w-96 bg-[#070f09] border-[1.5px] border-[#1D9E75] rounded">
          <div className="absolute top-1 left-1 w-3 h-3 border-l-2 border-t-2 border-[#1D9E75]" />
          <div className="absolute top-1 right-1 w-3 h-3 border-r-2 border-t-2 border-[#1D9E75]" />
          <div className="absolute bottom-1 left-1 w-3 h-3 border-l-2 border-b-2 border-[#1D9E75]" />
          <div className="absolute bottom-1 right-1 w-3 h-3 border-r-2 border-b-2 border-[#1D9E75]" />

          <div className="bg-[#0d2016] border-b border-[#1D9E75] py-2">
            <div className="text-[#5DCAA5] text-[9px] tracking-[4px] text-center">ROUND 05 — RESOLVED</div>
          </div>

          <div className="p-4">
            <div className="text-[#5DCAA5] text-[9px] tracking-[2px] mb-2">OUTCOME LOG</div>
            <div className="border-t border-[#1a3a2a] pt-2 space-y-1.5">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#1D9E75] rounded-sm" />
                <div className="flex-1 text-[#5DCAA5] text-[10px]">Zone cleared: Gut</div>
                <div className="text-[#1D9E75] text-[10px]">-8 INFECTION</div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#E24B4A] rounded-sm" />
                <div className="flex-1 text-[#5DCAA5] text-[10px]">New zone infected: Blood</div>
                <div className="text-[#E24B4A] text-[10px]">+5% SEVERITY</div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#EF9F27] rounded-sm" />
                <div className="flex-1 text-[#5DCAA5] text-[10px]">Mutation selected by virus</div>
                <div className="text-[#EF9F27] text-[10px]">ANTIGENIC DRIFT</div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#7F77DD] rounded-sm" />
                <div className="flex-1 text-[#5DCAA5] text-[10px]">EP regenerated from 4 zones</div>
                <div className="text-[#7F77DD] text-[10px]">+40 EP</div>
              </div>
            </div>

            <div className="border-t border-[#1a3a2a] mt-3 pt-3">
              <div className="text-[#5DCAA5] text-[9px] tracking-[1px] mb-1">SEVERITY INDEX</div>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-2 bg-[#0a1f12] border border-[#1a3a2a] rounded-sm overflow-hidden">
                  <div className="h-full bg-[#E24B4A]" style={{ width: '65%' }} />
                </div>
                <div className="text-[#E24B4A] text-[10px]">65% +5%</div>
              </div>
            </div>

            <div className="flex justify-end mt-3">
              <div className="bg-[#1D9E75] px-6 py-1.5 rounded-sm">
                <div className="text-[#050d0a] text-[10px] tracking-[3px] font-bold">NEXT ROUND</div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: '4B. LOG ROW SPRITES',
      size: '300×16 PNG each (4 variants)',
      description: 'Individual event lines in the round log with color-coded dots: Green = good news (zone cleared), Red = bad news (zone infected), Amber = warning (mutation), Purple = neutral info (EP gain)',
      usage: 'Stack 4-6 TextureRect nodes vertically inside popup card. Generate log entries dynamically based on round events. Use green for positive, red for negative, amber for warnings, purple for info.',
      preview: (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-[#1D9E75] rounded-sm" />
            <div className="flex-1 text-[#5DCAA5] text-[10px]">Positive event</div>
            <div className="text-[#1D9E75] text-[10px]">+VALUE</div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-[#E24B4A] rounded-sm" />
            <div className="flex-1 text-[#5DCAA5] text-[10px]">Negative event</div>
            <div className="text-[#E24B4A] text-[10px]">-VALUE</div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-[#EF9F27] rounded-sm" />
            <div className="flex-1 text-[#5DCAA5] text-[10px]">Warning event</div>
            <div className="text-[#EF9F27] text-[10px]">VALUE</div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-[#7F77DD] rounded-sm" />
            <div className="flex-1 text-[#5DCAA5] text-[10px]">Info event</div>
            <div className="text-[#7F77DD] text-[10px]">+VALUE</div>
          </div>
        </div>
      )
    },
    {
      title: '4C. POPUP BACKDROP',
      size: '1920×1080 PNG',
      description: 'Semi-transparent dark overlay that dims the game board in the background while the round results popup is showing',
      usage: 'Use CanvasLayer with TextureRect covering full screen at 70-85% opacity. Place behind popup card to darken game board during round resolution.',
      preview: (
        <div className="w-full h-32 bg-[#050d0a] opacity-70" />
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h2 className="text-[#5DCAA5] text-sm tracking-[5px] mb-2">SCREEN 4 — ROUND RESOLVE POPUP</h2>
        <p className="text-[#3d6b55] text-xs">Centered modal over darkened game screen showing round outcome summary.</p>
      </div>

      <FullScreenMockup title="Complete round resolve screen with darkened background and centered popup">
        <svg width="100%" viewBox="0 0 1920 1080" className="w-full">
          {/* Darkened background */}
          <rect width="1920" height="1080" fill="#050d0a" opacity="0.85"/>

          {/* Popup card */}
          <rect x="560" y="240" width="800" height="600" rx="8" fill="#070f09" stroke="#1D9E75" strokeWidth="3"/>

          {/* Corner brackets */}
          <rect x="576" y="256" width="32" height="4" fill="#1D9E75"/>
          <rect x="576" y="256" width="4" height="32" fill="#1D9E75"/>
          <rect x="1328" y="256" width="32" height="4" fill="#1D9E75"/>
          <rect x="1356" y="256" width="4" height="32" fill="#1D9E75"/>
          <rect x="576" y="808" width="4" height="32" fill="#1D9E75"/>
          <rect x="576" y="836" width="32" height="4" fill="#1D9E75"/>
          <rect x="1328" y="836" width="32" height="4" fill="#1D9E75"/>
          <rect x="1356" y="808" width="4" height="32" fill="#1D9E75"/>

          {/* Header */}
          <rect x="560" y="240" width="800" height="80" rx="8" fill="#0d2016"/>
          <line x1="560" y1="320" x2="1360" y2="320" stroke="#1D9E75" strokeWidth="1"/>
          <text x="960" y="290" textAnchor="middle" fill="#5DCAA5" fontSize="28" fontFamily="'Courier New',monospace" letterSpacing="10">ROUND 05 — RESOLVED</text>

          {/* Outcome log label */}
          <text x="600" y="370" fill="#5DCAA5" fontSize="18" fontFamily="'Courier New',monospace" letterSpacing="4">OUTCOME LOG</text>
          <line x1="600" y1="382" x2="1320" y2="382" stroke="#1a3a2a" strokeWidth="1"/>

          {/* Log entries - more spaced out */}
          <rect x="600" y="410" width="20" height="20" rx="2" fill="#1D9E75"/>
          <text x="635" y="428" fill="#5DCAA5" fontSize="20" fontFamily="'Courier New',monospace">Zone cleared: Gut</text>
          <text x="1300" y="428" textAnchor="end" fill="#1D9E75" fontSize="20" fontFamily="'Courier New',monospace">-8</text>

          <rect x="600" y="460" width="20" height="20" rx="2" fill="#E24B4A"/>
          <text x="635" y="478" fill="#5DCAA5" fontSize="20" fontFamily="'Courier New',monospace">Zone infected: Blood</text>
          <text x="1300" y="478" textAnchor="end" fill="#E24B4A" fontSize="20" fontFamily="'Courier New',monospace">+5%</text>

          <rect x="600" y="510" width="20" height="20" rx="2" fill="#EF9F27"/>
          <text x="635" y="528" fill="#5DCAA5" fontSize="20" fontFamily="'Courier New',monospace">Mutation active</text>
          <text x="1300" y="528" textAnchor="end" fill="#EF9F27" fontSize="20" fontFamily="'Courier New',monospace">DRIFT</text>

          <rect x="600" y="560" width="20" height="20" rx="2" fill="#7F77DD"/>
          <text x="635" y="578" fill="#5DCAA5" fontSize="20" fontFamily="'Courier New',monospace">EP regenerated</text>
          <text x="1300" y="578" textAnchor="end" fill="#7F77DD" fontSize="20" fontFamily="'Courier New',monospace">+40</text>

          {/* Severity bar */}
          <line x1="600" y1="630" x2="1320" y2="630" stroke="#1a3a2a" strokeWidth="1"/>
          <text x="600" y="670" fill="#5DCAA5" fontSize="18" fontFamily="'Courier New',monospace" letterSpacing="2">SEVERITY INDEX</text>
          <rect x="600" y="690" width="500" height="28" rx="2" fill="#0a1f12" stroke="#1a3a2a" strokeWidth="1"/>
          <rect x="600" y="690" width="325" height="28" rx="2" fill="#E24B4A"/>
          <text x="1120" y="710" fill="#E24B4A" fontSize="24" fontFamily="'Courier New',monospace">65%  +5%</text>

          {/* Next round button */}
          <rect x="1060" y="760" width="260" height="60" rx="4" fill="#1D9E75"/>
          <text x="1190" y="798" textAnchor="middle" fill="#050d0a" fontSize="24" fontFamily="'Courier New',monospace" fontWeight="bold" letterSpacing="8">NEXT ROUND</text>
        </svg>
      </FullScreenMockup>

      <div className="mb-8">
        <h3 className="text-[#1D9E75] text-xs tracking-[3px] mb-4">INDIVIDUAL ASSETS</h3>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {assets.map((asset, index) => (
          <AssetCard key={index} {...asset} />
        ))}
      </div>
    </div>
  );
}
