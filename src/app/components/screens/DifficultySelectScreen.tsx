import { AssetCard } from '../AssetCard';
import { FullScreenMockup } from '../FullScreenMockup';

export function DifficultySelectScreen() {
  const assets = [
    {
      title: '2A. HEADER STRIP',
      size: '1920×52 PNG',
      description: 'Screen header reading "SELECT INFECTION SCENARIO" - prompts player to choose their difficulty level',
      usage: 'Use TextureRect anchored to top of screen. Spans full width. Place at y=0 or just below top status bar if reusing menu bar.',
      preview: (
        <div className="w-full h-10 bg-[#050d0a] border-b border-[#1D9E75] border-opacity-30 flex items-center justify-center">
          <span className="text-[#5DCAA5] text-[8px] tracking-[4px]">SELECT INFECTION SCENARIO</span>
        </div>
      )
    },
    {
      title: '2B. DIFFICULTY CARD — CASUAL',
      size: '280×340 PNG',
      description: 'Easy mode card (Level I) - turn-based gameplay with mutation warnings every 2 rounds, generous energy regeneration, single entry point',
      usage: 'Use as TextureButton for clickable difficulty selection. Position at x=420 centered vertically. Connect pressed() signal to start game with CASUAL difficulty.',
      preview: (
        <div className="relative w-56 bg-[#0a1f12] border border-[#1D9E75] rounded-sm overflow-hidden">
          <div className="absolute top-1 left-1 w-3 h-3 border-l-2 border-t-2 border-[#1D9E75]" />
          <div className="absolute top-1 right-1 w-3 h-3 border-r-2 border-t-2 border-[#1D9E75]" />
          <div className="absolute bottom-1 left-1 w-3 h-3 border-l-2 border-b-2 border-[#1D9E75]" />
          <div className="absolute bottom-1 right-1 w-3 h-3 border-r-2 border-b-2 border-[#1D9E75]" />
          <div className="bg-[#1D9E75] py-2 text-center">
            <span className="text-[#050d0a] text-[10px] tracking-[2px] font-bold">CASUAL</span>
          </div>
          <div className="p-4 space-y-2 text-center">
            <div className="text-[#5DCAA5] text-[8px]">TURN-BASED</div>
            <div className="text-[#5DCAA5] text-[9px]">Mutation telegraphed</div>
            <div className="text-[#5DCAA5] text-[9px]">Every 2 rounds</div>
            <div className="text-[#5DCAA5] text-[9px]">Generous EP regen</div>
            <div className="text-[#5DCAA5] text-[9px]">Entry: Lungs only</div>
            <div className="text-[#1D9E75] text-2xl font-bold mt-4">I</div>
          </div>
        </div>
      )
    },
    {
      title: '2C. DIFFICULTY CARD — EPIDEMIC',
      size: '280×340 PNG',
      description: 'Medium mode card (Level II) - turn-based with no mutation warnings, mutations every round, standard energy regen, single entry point',
      usage: 'Use as TextureButton for clickable difficulty selection. Position at x=820 (center card). Connect pressed() signal to start game with EPIDEMIC difficulty.',
      preview: (
        <div className="relative w-56 bg-[#0f1a0a] border-[1.5px] border-[#EF9F27] rounded-sm overflow-hidden">
          <div className="absolute top-1 left-1 w-3 h-3 border-l-2 border-t-2 border-[#EF9F27]" />
          <div className="absolute top-1 right-1 w-3 h-3 border-r-2 border-t-2 border-[#EF9F27]" />
          <div className="absolute bottom-1 left-1 w-3 h-3 border-l-2 border-b-2 border-[#EF9F27]" />
          <div className="absolute bottom-1 right-1 w-3 h-3 border-r-2 border-b-2 border-[#EF9F27]" />
          <div className="bg-[#BA7517] py-2 text-center">
            <span className="text-[#050d0a] text-[10px] tracking-[2px] font-bold">EPIDEMIC</span>
          </div>
          <div className="p-4 space-y-2 text-center">
            <div className="text-[#EF9F27] text-[8px]">TURN-BASED</div>
            <div className="text-[#EF9F27] text-[9px]">No mutation warning</div>
            <div className="text-[#EF9F27] text-[9px]">Every round</div>
            <div className="text-[#EF9F27] text-[9px]">Standard EP regen</div>
            <div className="text-[#EF9F27] text-[9px]">Entry: Lungs only</div>
            <div className="text-[#EF9F27] text-2xl font-bold mt-4">II</div>
          </div>
        </div>
      )
    },
    {
      title: '2D. DIFFICULTY CARD — PANDEMIC',
      size: '280×340 PNG',
      description: 'Hard mode card (Level III) - hybrid real-time gameplay, no warnings, mutations every round, reduced energy regen, virus enters from 3 random zones',
      usage: 'Use as TextureButton for clickable difficulty selection. Position at x=1220 centered vertically. Connect pressed() signal to start game with PANDEMIC difficulty.',
      preview: (
        <div className="relative w-56 bg-[#1a0a0a] border-[1.5px] border-[#E24B4A] rounded-sm overflow-hidden">
          <div className="absolute top-1 left-1 w-3 h-3 border-l-2 border-t-2 border-[#E24B4A]" />
          <div className="absolute top-1 right-1 w-3 h-3 border-r-2 border-t-2 border-[#E24B4A]" />
          <div className="absolute bottom-1 left-1 w-3 h-3 border-l-2 border-b-2 border-[#E24B4A]" />
          <div className="absolute bottom-1 right-1 w-3 h-3 border-r-2 border-b-2 border-[#E24B4A]" />
          <div className="bg-[#A32D2D] py-2 text-center">
            <span className="text-white text-[10px] tracking-[2px] font-bold">PANDEMIC</span>
          </div>
          <div className="p-4 space-y-2 text-center">
            <div className="text-[#E24B4A] text-[8px]">HYBRID REAL-TIME</div>
            <div className="text-[#E24B4A] text-[9px]">No mutation warning</div>
            <div className="text-[#E24B4A] text-[9px]">Every round</div>
            <div className="text-[#E24B4A] text-[9px]">Reduced EP regen</div>
            <div className="text-[#E24B4A] text-[9px]">3 random entry points</div>
            <div className="text-[#E24B4A] text-2xl font-bold mt-4">III</div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h2 className="text-[#5DCAA5] text-sm tracking-[5px] mb-2">SCREEN 2 — DIFFICULTY SELECT</h2>
        <p className="text-[#3d6b55] text-xs">Full-screen 1920×1080. Three side-by-side cards centered on screen with difficulty options.</p>
      </div>

      <FullScreenMockup title="Complete difficulty selection screen with all three difficulty cards">
        <svg width="100%" viewBox="0 0 1920 1080" className="w-full">
          {/* Background */}
          <rect width="1920" height="1080" fill="#050d0a"/>

          {/* Header */}
          <line x1="0" y1="96" x2="1920" y2="96" stroke="#1D9E75" strokeWidth="0.5" opacity="0.3"/>
          <text x="960" y="72" textAnchor="middle" fill="#5DCAA5" fontSize="20" fontFamily="'Courier New',monospace" letterSpacing="10" opacity="0.7">SELECT INFECTION SCENARIO</text>

          {/* Casual Card */}
          <rect x="420" y="200" width="280" height="440" rx="6" fill="#0a1f12" stroke="#1D9E75" strokeWidth="2"/>
          <rect x="420" y="200" width="280" height="56" rx="6" fill="#1D9E75"/>
          <text x="560" y="238" textAnchor="middle" fill="#050d0a" fontSize="24" fontFamily="'Courier New',monospace" fontWeight="bold" letterSpacing="4">CASUAL</text>
          <text x="560" y="304" textAnchor="middle" fill="#5DCAA5" fontSize="18" fontFamily="'Courier New',monospace" letterSpacing="2">TURN-BASED</text>
          <text x="560" y="344" textAnchor="middle" fill="#3d6b55" fontSize="16" fontFamily="'Courier New',monospace">Mutation telegraphed</text>
          <text x="560" y="376" textAnchor="middle" fill="#3d6b55" fontSize="16" fontFamily="'Courier New',monospace">Every 2 rounds</text>
          <text x="560" y="408" textAnchor="middle" fill="#3d6b55" fontSize="16" fontFamily="'Courier New',monospace">Generous EP regen</text>
          <text x="560" y="440" textAnchor="middle" fill="#3d6b55" fontSize="16" fontFamily="'Courier New',monospace">Entry: Lungs only</text>
          <text x="560" y="570" textAnchor="middle" fill="#1D9E75" fontSize="56" fontFamily="'Courier New',monospace">I</text>

          {/* Epidemic Card */}
          <rect x="820" y="200" width="280" height="440" rx="6" fill="#0f1a0a" stroke="#EF9F27" strokeWidth="3"/>
          <rect x="820" y="200" width="280" height="56" rx="6" fill="#BA7517"/>
          <text x="960" y="238" textAnchor="middle" fill="#050d0a" fontSize="24" fontFamily="'Courier New',monospace" fontWeight="bold" letterSpacing="4">EPIDEMIC</text>
          <text x="960" y="304" textAnchor="middle" fill="#EF9F27" fontSize="18" fontFamily="'Courier New',monospace" letterSpacing="2">TURN-BASED</text>
          <text x="960" y="344" textAnchor="middle" fill="#EF9F27" fontSize="16" fontFamily="'Courier New',monospace">No mutation warning</text>
          <text x="960" y="376" textAnchor="middle" fill="#EF9F27" fontSize="16" fontFamily="'Courier New',monospace">Every round</text>
          <text x="960" y="408" textAnchor="middle" fill="#EF9F27" fontSize="16" fontFamily="'Courier New',monospace">Standard EP regen</text>
          <text x="960" y="440" textAnchor="middle" fill="#EF9F27" fontSize="16" fontFamily="'Courier New',monospace">Entry: Lungs only</text>
          <text x="960" y="570" textAnchor="middle" fill="#EF9F27" fontSize="56" fontFamily="'Courier New',monospace">II</text>

          {/* Pandemic Card */}
          <rect x="1220" y="200" width="280" height="440" rx="6" fill="#1a0a0a" stroke="#E24B4A" strokeWidth="3"/>
          <rect x="1220" y="200" width="280" height="56" rx="6" fill="#A32D2D"/>
          <text x="1360" y="238" textAnchor="middle" fill="#fff" fontSize="24" fontFamily="'Courier New',monospace" fontWeight="bold" letterSpacing="4">PANDEMIC</text>
          <text x="1360" y="304" textAnchor="middle" fill="#E24B4A" fontSize="18" fontFamily="'Courier New',monospace" letterSpacing="2">HYBRID REAL-TIME</text>
          <text x="1360" y="344" textAnchor="middle" fill="#E24B4A" fontSize="16" fontFamily="'Courier New',monospace">No mutation warning</text>
          <text x="1360" y="376" textAnchor="middle" fill="#E24B4A" fontSize="16" fontFamily="'Courier New',monospace">Every round</text>
          <text x="1360" y="408" textAnchor="middle" fill="#E24B4A" fontSize="16" fontFamily="'Courier New',monospace">Reduced EP regen</text>
          <text x="1360" y="440" textAnchor="middle" fill="#E24B4A" fontSize="16" fontFamily="'Courier New',monospace">3 random entry points</text>
          <text x="1360" y="570" textAnchor="middle" fill="#E24B4A" fontSize="56" fontFamily="'Courier New',monospace">III</text>

          {/* Bottom instruction */}
          <text x="960" y="720" textAnchor="middle" fill="#3d6b55" fontSize="18" fontFamily="'Courier New',monospace" letterSpacing="4">CLICK CARD TO SELECT SCENARIO</text>
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
