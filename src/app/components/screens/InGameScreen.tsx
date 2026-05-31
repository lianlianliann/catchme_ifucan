import { AssetCard } from '../AssetCard';
import { FullScreenMockup } from '../FullScreenMockup';

export function InGameScreen() {
  const assets = [
    {
      title: '3A. TOP STATUS BAR',
      size: '1920×38 PNG',
      description: 'Top HUD bar showing "HOST STATUS", current round number (e.g., "ROUND 05"), and threat level status during gameplay',
      usage: 'Use TextureRect anchored to top edge of game screen. Overlay dynamic Label nodes on top to display current round number and threat status text.',
      preview: (
        <div className="w-full h-8 bg-[#050d0a] border-b border-[#1D9E75] border-opacity-40 flex items-center justify-between px-4">
          <span className="text-[#1D9E75] text-[8px] tracking-[2px]">HOST STATUS</span>
          <span className="text-[#5DCAA5] text-[8px] tracking-[3px]">ROUND 05</span>
          <span className="text-[#E24B4A] text-[8px] tracking-[1px]">THREAT: ACTIVE</span>
        </div>
      )
    },
    {
      title: '3B. LEFT SIDEBAR PANEL',
      size: '160×720 PNG',
      description: 'Left info panel displaying critical game stats: Severity % (how close to death), Energy Points available, current Infection Rate number, active virus mutation badge, and status of all 6 organ zones',
      usage: 'Use as static TextureRect background for left sidebar. Layer TextureProgressBar nodes on top for dynamic Severity/EP bars. Update organ status indicators with script.',
      preview: (
        <div className="w-40 bg-[#050d0a] border-r border-[#1D9E75] border-opacity-20 p-3 space-y-4">
          <div>
            <div className="text-[#5DCAA5] text-[9px] tracking-[2px] mb-1">SEVERITY</div>
            <div className="w-full h-2 bg-[#0a1f12] border border-[#1D9E75] rounded-sm overflow-hidden">
              <div className="h-full w-3/5 bg-[#E24B4A]" />
            </div>
            <div className="text-[#E24B4A] text-[9px] mt-0.5">60%</div>
          </div>
          <div>
            <div className="text-[#5DCAA5] text-[9px] tracking-[2px] mb-1">ENERGY (EP)</div>
            <div className="w-full h-2 bg-[#0a1f12] border border-[#1D9E75] rounded-sm overflow-hidden">
              <div className="h-full w-3/4 bg-[#1D9E75]" />
            </div>
            <div className="text-[#1D9E75] text-[9px] mt-0.5">75</div>
          </div>
          <div>
            <div className="text-[#5DCAA5] text-[9px] tracking-[2px] mb-1">INFECTION RATE</div>
            <div className="text-[#EF9F27] text-lg font-bold">034</div>
          </div>
          <div>
            <div className="text-[#5DCAA5] text-[9px] tracking-[1px] mb-1">ACTIVE MUTATION</div>
            <div className="bg-[#1a0d00] border border-[#EF9F27] rounded-sm px-2 py-1">
              <div className="text-[#EF9F27] text-[9px] tracking-[1px]">ANTIGENIC DRIFT</div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: '3F. ACTION BUTTON — ACTIVE',
      size: '140×52 PNG',
      description: 'Blank active immune button template with green header bar and body area. Add 3 Label nodes in Godot: title (top), description (middle), EP cost (bottom-right).',
      usage: 'Reuse this for all 6 immune actions. Layer Label nodes for: action name, description text, and EP cost. Update text dynamically per button.',
      preview: (
        <div className="relative w-36 bg-[#0a1f12] border border-[#1D9E75] rounded-sm overflow-hidden">
          <div className="absolute top-0.5 left-0.5 w-2 h-2 border-l border-t border-[#1D9E75]" />
          <div className="absolute top-0.5 right-0.5 w-2 h-2 border-r border-t border-[#1D9E75]" />
          <div className="absolute bottom-0.5 left-0.5 w-2 h-2 border-l border-b border-[#1D9E75]" />
          <div className="absolute bottom-0.5 right-0.5 w-2 h-2 border-r border-b border-[#1D9E75]" />
          <div className="bg-[#1D9E75] bg-opacity-30 py-1 h-6">
            {/* Add Label here for action name */}
          </div>
          <div className="p-2 h-10">
            {/* Add Labels here for description and EP cost */}
          </div>
        </div>
      )
    },
    {
      title: '3G. ACTION BUTTON — INACTIVE',
      size: '140×52 PNG',
      description: 'Blank grayed out button template - swap to this when player lacks EP. Same Label nodes as active state, just dimmer colors.',
      usage: 'Swap texture when insufficient EP. Use same Label nodes but change text color to dim (#3d6b55). Set button.disabled = true.',
      preview: (
        <div className="relative w-36 bg-[#0a1000] border-[0.5px] border-[#1a3a2a] rounded-sm overflow-hidden opacity-60">
          <div className="bg-[#1a3a2a] bg-opacity-30 py-1 h-6">
            {/* Same Label positions as active */}
          </div>
          <div className="p-2 h-10">
            {/* Labels stay in same position */}
          </div>
        </div>
      )
    },
    {
      title: '3H. ACTION BUTTON — DANGER',
      size: '140×52 PNG',
      description: 'Blank red danger button template - use for high-risk actions. Add Label nodes for "CYTOKINE BURST" or other dangerous actions.',
      usage: 'Use for dangerous actions. Layer red-colored (#E24B4A) Label nodes on top for title, description, and EP cost.',
      preview: (
        <div className="relative w-36 bg-[#1a0000] border-[0.5px] border-[#E24B4A] border-opacity-60 rounded-sm overflow-hidden">
          <div className="absolute top-0.5 left-0.5 w-2 h-2 border-l border-t border-[#E24B4A]" />
          <div className="absolute top-0.5 right-0.5 w-2 h-2 border-r border-t border-[#E24B4A]" />
          <div className="absolute bottom-0.5 left-0.5 w-2 h-2 border-l border-b border-[#E24B4A]" />
          <div className="absolute bottom-0.5 right-0.5 w-2 h-2 border-r border-b border-[#E24B4A]" />
          <div className="bg-[#E24B4A] bg-opacity-20 py-1 h-6">
            {/* Add Label for action name */}
          </div>
          <div className="p-2 h-10">
            {/* Add Labels for description and EP cost */}
          </div>
        </div>
      )
    },
    {
      title: '3D. ZONE STATUS INDICATOR SQUARE',
      size: '16×16 PNG (4 states)',
      description: 'Small colored squares next to each organ name showing its current condition: Green = healthy, Red = infected by virus, Amber = currently fighting, Dim Green = virus eliminated',
      usage: 'Place next to each organ name in left sidebar organ status list. Swap texture based on zone state: green=healthy, red=infected, amber=contested, dim green=cleared.',
      preview: (
        <div className="flex gap-2">
          <div className="w-4 h-4 bg-[#1D9E75] rounded-sm" title="Healthy" />
          <div className="w-4 h-4 bg-[#E24B4A] rounded-sm" title="Infected" />
          <div className="w-4 h-4 bg-[#EF9F27] rounded-sm" title="Contested" />
          <div className="w-4 h-4 bg-[#3d6b55] rounded-sm" title="Cleared" />
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h2 className="text-[#5DCAA5] text-sm tracking-[5px] mb-2">SCREEN 3 — IN-GAME UI (MAIN GAMEPLAY)</h2>
        <p className="text-[#5DCAA5] text-xs mb-3">Three-column layout with organ status sidebar, central game board, and immune action button panel.</p>
        <div className="bg-[#1D9E75] bg-opacity-20 border border-[#1D9E75] rounded-sm p-3 mt-3">
          <p className="text-[#e8f5f0] text-xs"><span className="font-bold">Note:</span> Action buttons (3F, 3G, 3H) are blank templates. Add Label nodes in Godot for action names, descriptions, and EP costs.</p>
        </div>
      </div>

      <FullScreenMockup title="Complete in-game UI showing left sidebar, central game area, and right action panel">
        <svg width="100%" viewBox="0 0 1920 1080" className="w-full">
          {/* Background */}
          <rect width="1920" height="1080" fill="#050d0a"/>

          {/* Top bar */}
          <rect width="1920" height="76" fill="#050d0a"/>
          <line x1="0" y1="76" x2="1920" y2="76" stroke="#1D9E75" strokeWidth="1" opacity="0.4"/>
          <text x="40" y="48" fill="#1D9E75" fontSize="20" fontFamily="'Courier New',monospace" letterSpacing="4">HOST STATUS</text>
          <text x="960" y="48" textAnchor="middle" fill="#5DCAA5" fontSize="20" fontFamily="'Courier New',monospace" letterSpacing="6">ROUND 05</text>
          <text x="1880" y="48" textAnchor="end" fill="#E24B4A" fontSize="20" fontFamily="'Courier New',monospace" letterSpacing="2">THREAT: ACTIVE</text>

          {/* Left sidebar */}
          <line x1="320" y1="76" x2="320" y2="1004" stroke="#1D9E75" strokeWidth="1" opacity="0.2"/>
          <text x="40" y="112" fill="#5DCAA5" fontSize="16" fontFamily="'Courier New',monospace" letterSpacing="4" opacity="0.8">SEVERITY</text>
          <rect x="40" y="120" width="240" height="20" rx="2" fill="#0a1f12" stroke="#1D9E75" strokeWidth="1"/>
          <rect x="40" y="120" width="144" height="20" rx="2" fill="#E24B4A"/>
          <text x="290" y="136" fill="#E24B4A" fontSize="16" fontFamily="'Courier New',monospace">60%</text>

          <text x="40" y="172" fill="#5DCAA5" fontSize="16" fontFamily="'Courier New',monospace" letterSpacing="4" opacity="0.8">ENERGY (EP)</text>
          <rect x="40" y="180" width="240" height="20" rx="2" fill="#0a1f12" stroke="#1D9E75" strokeWidth="1"/>
          <rect x="40" y="180" width="180" height="20" rx="2" fill="#1D9E75"/>
          <text x="290" y="196" fill="#1D9E75" fontSize="16" fontFamily="'Courier New',monospace">75</text>

          <text x="40" y="232" fill="#5DCAA5" fontSize="16" fontFamily="'Courier New',monospace" letterSpacing="4" opacity="0.8">INFECTION RATE</text>
          <text x="40" y="284" fill="#EF9F27" fontSize="44" fontFamily="'Courier New',monospace" fontWeight="bold">034</text>

          <text x="40" y="324" fill="#5DCAA5" fontSize="16" fontFamily="'Courier New',monospace" letterSpacing="2" opacity="0.8">ACTIVE MUTATION</text>
          <rect x="40" y="332" width="256" height="40" rx="4" fill="#1a0d00" stroke="#EF9F27" strokeWidth="1"/>
          <text x="168" y="358" textAnchor="middle" fill="#EF9F27" fontSize="16" fontFamily="'Courier New',monospace" letterSpacing="2">ANTIGENIC DRIFT</text>

          <line x1="40" y1="396" x2="296" y2="396" stroke="#1a3a2a" strokeWidth="1"/>
          <text x="40" y="424" fill="#5DCAA5" fontSize="16" fontFamily="'Courier New',monospace" letterSpacing="2">ORGAN STATUS</text>

          {/* Organ list */}
          <rect x="40" y="442" width="32" height="32" rx="4" fill="#1D9E75" opacity="0.7"/>
          <text x="84" y="464" fill="#5DCAA5" fontSize="16" fontFamily="'Courier New',monospace">BRAIN</text>
          <rect x="200" y="450" width="96" height="16" rx="2" fill="#0a1f12" stroke="#1a3a2a" strokeWidth="1"/>
          <rect x="200" y="450" width="80" height="16" rx="2" fill="#1D9E75"/>

          <rect x="40" y="486" width="32" height="32" rx="4" fill="#E24B4A" opacity="0.9"/>
          <text x="84" y="508" fill="#5DCAA5" fontSize="16" fontFamily="'Courier New',monospace">LUNGS</text>
          <rect x="200" y="494" width="96" height="16" rx="2" fill="#0a1f12" stroke="#1a3a2a" strokeWidth="1"/>
          <rect x="200" y="494" width="40" height="16" rx="2" fill="#E24B4A"/>

          <rect x="40" y="530" width="32" height="32" rx="4" fill="#1D9E75" opacity="0.7"/>
          <text x="84" y="552" fill="#5DCAA5" fontSize="16" fontFamily="'Courier New',monospace">HEART</text>
          <rect x="200" y="538" width="96" height="16" rx="2" fill="#0a1f12" stroke="#1a3a2a" strokeWidth="1"/>
          <rect x="200" y="538" width="88" height="16" rx="2" fill="#1D9E75"/>

          <rect x="40" y="574" width="32" height="32" rx="4" fill="#EF9F27" opacity="0.8"/>
          <text x="84" y="596" fill="#5DCAA5" fontSize="16" fontFamily="'Courier New',monospace">LYMPH</text>
          <rect x="200" y="582" width="96" height="16" rx="2" fill="#0a1f12" stroke="#1a3a2a" strokeWidth="1"/>
          <rect x="200" y="582" width="64" height="16" rx="2" fill="#EF9F27"/>

          {/* Center game area - simplified body diagram */}
          <ellipse cx="960" cy="540" rx="200" ry="300" fill="none" stroke="#1D9E75" strokeWidth="1" opacity="0.15"/>
          <ellipse cx="960" cy="370" rx="120" ry="140" fill="none" stroke="#7F77DD" strokeWidth="1" opacity="0.2"/>
          <rect x="840" y="448" width="240" height="160" rx="12" fill="none" stroke="#1D9E75" strokeWidth="1" opacity="0.25"/>
          <rect x="886" y="632" width="148" height="120" rx="6" fill="none" stroke="#EF9F27" strokeWidth="1" opacity="0.3"/>
          <text x="960" y="920" textAnchor="middle" fill="#E24B4A" fontSize="16" fontFamily="'Courier New',monospace" opacity="0.5">LUNGS — INFECTED</text>

          {/* Right sidebar */}
          <line x1="1600" y1="76" x2="1600" y2="1004" stroke="#1D9E75" strokeWidth="1" opacity="0.2"/>
          <text x="1624" y="112" fill="#5DCAA5" fontSize="16" fontFamily="'Courier New',monospace" letterSpacing="2">DEPLOY IMMUNE ACTION</text>

          {/* Action buttons */}
          <rect x="1624" y="132" width="280" height="104" rx="4" fill="#0a1f12" stroke="#1D9E75" strokeWidth="2"/>
          <rect x="1624" y="132" width="280" height="28" rx="4" fill="#1D9E75" opacity="0.3"/>
          <text x="1764" y="154" textAnchor="middle" fill="#1D9E75" fontSize="16" fontFamily="'Courier New',monospace" letterSpacing="4">WHITE BLOOD CELL</text>
          <text x="1634" y="180" fill="#5DCAA5" fontSize="14" fontFamily="'Courier New',monospace">Patrol zone // reduce spread</text>
          <text x="1884" y="220" textAnchor="end" fill="#5DCAA5" fontSize="20" fontFamily="'Courier New',monospace">10 EP</text>

          <rect x="1624" y="252" width="280" height="104" rx="4" fill="#0a1000" stroke="#1a3a2a" strokeWidth="1" opacity="0.6"/>
          <text x="1764" y="286" textAnchor="middle" fill="#5DCAA5" fontSize="16" fontFamily="'Courier New',monospace" letterSpacing="4">ANTIBODY</text>
          <text x="1634" y="312" fill="#5DCAA5" fontSize="14" fontFamily="'Courier New',monospace">Target specific strain</text>
          <text x="1884" y="340" textAnchor="end" fill="#5DCAA5" fontSize="20" fontFamily="'Courier New',monospace">25 EP</text>

          <rect x="1624" y="772" width="280" height="104" rx="4" fill="#1a0000" stroke="#E24B4A" strokeWidth="1" opacity="0.6"/>
          <text x="1764" y="806" textAnchor="middle" fill="#E24B4A" fontSize="16" fontFamily="'Courier New',monospace" letterSpacing="4">CYTOKINE BURST</text>
          <text x="1634" y="832" fill="#E24B4A" fontSize="14" fontFamily="'Courier New',monospace">Nuke all zones // +10% sev</text>
          <text x="1884" y="860" textAnchor="end" fill="#E24B4A" fontSize="20" fontFamily="'Courier New',monospace">50 EP</text>

          {/* Bottom bar */}
          <line x1="0" y1="1004" x2="1920" y2="1004" stroke="#1D9E75" strokeWidth="1" opacity="0.4"/>
          <text x="40" y="1050" fill="#5DCAA5" fontSize="16" fontFamily="'Courier New',monospace" letterSpacing="2">STATUS // TURN-BASED // EPIDEMIC MODE</text>
          <text x="1880" y="1050" textAnchor="end" fill="#5DCAA5" fontSize="16" fontFamily="'Courier New',monospace">NEXT ROUND &gt;</text>
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
