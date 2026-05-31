import { AssetCard } from '../AssetCard';

export function VirusMutations() {
  const mutationAssets = [
    {
      title: 'VIRUS — EVADE PHAGOCYTOSIS',
      size: '256×256 PNG',
      description: 'Virus with a defensive shield membrane coating - evolved to dodge and escape from White Blood Cell attacks',
      usage: 'Swap to this Sprite2D texture when Decision Tree AI selects Evade Phagocytosis mutation. Reduces effectiveness of WBC immune action.',
      preview: (
        <div className="flex items-center justify-center">
          <svg width="80" height="80" viewBox="0 0 80 80">
            {/* Outer shield membrane */}
            <circle cx="40" cy="40" r="30" fill="#D3D1C7" opacity="0.6" />
            {/* Virus body */}
            <circle cx="40" cy="40" r="24" fill="#97C459" />
            {/* Nucleus */}
            <circle cx="40" cy="40" r="7" fill="#3B6D11" />
            {/* Spikes */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
              const rad = (angle * Math.PI) / 180;
              const x = 40 + 24 * Math.cos(rad);
              const y = 40 + 24 * Math.sin(rad);
              const tipX = 40 + 30 * Math.cos(rad);
              const tipY = 40 + 30 * Math.sin(rad);
              return <line key={i} x1={x} y1={y} x2={tipX} y2={tipY} stroke="#97C459" strokeWidth="2.5" />;
            })}
          </svg>
        </div>
      )
    },
    {
      title: 'VIRUS — ANTIGENIC DRIFT',
      size: '256×256 PNG',
      description: 'Virus with slightly changed forked spike proteins - a minor mutation that makes it harder for antibodies to recognize',
      usage: 'Apply when virus mutates to evade existing antibodies (minor). Triggers purple mutation badge display in sidebar. Reduces Antibody action effectiveness by 30%.',
      preview: (
        <div className="flex items-center justify-center">
          <svg width="80" height="80" viewBox="0 0 80 80">
            {/* Virus body */}
            <circle cx="40" cy="40" r="24" fill="#97C459" />
            <circle cx="40" cy="40" r="7" fill="#3B6D11" />
            {/* Forked spikes */}
            {[0, 60, 120, 180, 240, 300].map((angle, i) => {
              const rad = (angle * Math.PI) / 180;
              const x = 40 + 24 * Math.cos(rad);
              const y = 40 + 24 * Math.sin(rad);
              const tipX = 40 + 32 * Math.cos(rad);
              const tipY = 40 + 32 * Math.sin(rad);
              const fork1X = tipX + 3 * Math.cos(rad + 0.5);
              const fork1Y = tipY + 3 * Math.sin(rad + 0.5);
              const fork2X = tipX + 3 * Math.cos(rad - 0.5);
              const fork2Y = tipY + 3 * Math.sin(rad - 0.5);
              return (
                <g key={i}>
                  <line x1={x} y1={y} x2={tipX} y2={tipY} stroke="#97C459" strokeWidth="2.5" />
                  <line x1={tipX} y1={tipY} x2={fork1X} y2={fork1Y} stroke="#97C459" strokeWidth="1.5" />
                  <line x1={tipX} y1={tipY} x2={fork2X} y2={fork2Y} stroke="#97C459" strokeWidth="1.5" />
                </g>
              );
            })}
            {/* Tilde marks */}
            <text x="28" y="20" fill="#3B6D11" fontSize="10">~</text>
            <text x="48" y="25" fill="#3B6D11" fontSize="10">~</text>
          </svg>
        </div>
      )
    },
    {
      title: 'VIRUS — ANTIGENIC SHIFT',
      size: '256×256 PNG',
      description: 'Virus with dramatically different two-tone structure - a major genetic reshuffling that completely changes its appearance and makes all existing antibodies useless',
      usage: 'Major mutation event - swap texture and display red mutation badge. Resets all antibody progress, forcing player to redeploy antibody actions.',
      preview: (
        <div className="flex items-center justify-center">
          <svg width="80" height="80" viewBox="0 0 80 80">
            {/* Base body */}
            <circle cx="40" cy="40" r="24" fill="#97C459" />
            {/* Mutated sector */}
            <path d="M 40 40 L 64 40 A 24 24 0 0 1 40 64 Z" fill="#EF9F27" />
            <circle cx="40" cy="40" r="7" fill="#3B6D11" />
            {/* Original spikes (top half) */}
            {[0, 60, 120].map((angle, i) => {
              const rad = (angle * Math.PI) / 180;
              const x = 40 + 24 * Math.cos(rad);
              const y = 40 + 24 * Math.sin(rad);
              const tipX = 40 + 30 * Math.cos(rad);
              const tipY = 40 + 30 * Math.sin(rad);
              return <line key={i} x1={x} y1={y} x2={tipX} y2={tipY} stroke="#97C459" strokeWidth="2" />;
            })}
            {/* New longer spikes (bottom half) */}
            {[180, 240, 300].map((angle, i) => {
              const rad = (angle * Math.PI) / 180;
              const x = 40 + 24 * Math.cos(rad);
              const y = 40 + 24 * Math.sin(rad);
              const tipX = 40 + 34 * Math.cos(rad);
              const tipY = 40 + 34 * Math.sin(rad);
              return <line key={`new-${i}`} x1={x} y1={y} x2={tipX} y2={tipY} stroke="#EF9F27" strokeWidth="3" />;
            })}
          </svg>
        </div>
      )
    },
    {
      title: 'VIRUS — THERMAL RESISTANCE',
      size: '256×256 PNG',
      description: 'Virus covered in orange hexagonal armor plates - evolved heat resistance to survive high-temperature immune responses like inflammation',
      usage: 'Apply when virus develops heat resistance. Counters Inflammation action. Visual armor plates signal defensive adaptation.',
      preview: (
        <div className="flex items-center justify-center">
          <svg width="80" height="80" viewBox="0 0 80 80">
            <circle cx="40" cy="40" r="24" fill="#97C459" />
            <circle cx="40" cy="40" r="7" fill="#3B6D11" />
            {/* Hexagonal armor plates */}
            {[0, 60, 120, 180, 240, 300].map((angle, i) => {
              const rad = (angle * Math.PI) / 180;
              const cx = 40 + 18 * Math.cos(rad);
              const cy = 40 + 18 * Math.sin(rad);
              return (
                <polygon
                  key={i}
                  points={`${cx},${cy - 4} ${cx + 3.5},${cy - 2} ${cx + 3.5},${cy + 2} ${cx},${cy + 4} ${cx - 3.5},${cy + 2} ${cx - 3.5},${cy - 2}`}
                  fill="#BA7517"
                  stroke="#3B6D11"
                  strokeWidth="0.5"
                />
              );
            })}
            {/* Spikes */}
            {[30, 90, 150, 210, 270, 330].map((angle, i) => {
              const rad = (angle * Math.PI) / 180;
              const x = 40 + 24 * Math.cos(rad);
              const y = 40 + 24 * Math.sin(rad);
              const tipX = 40 + 30 * Math.cos(rad);
              const tipY = 40 + 30 * Math.sin(rad);
              return <line key={i} x1={x} y1={y} x2={tipX} y2={tipY} stroke="#97C459" strokeWidth="2" />;
            })}
          </svg>
        </div>
      )
    },
    {
      title: 'VIRUS — HEAT SHOCK PROTEINS',
      size: '256×256 PNG',
      description: 'Virus surrounded by purple protective protein bubbles - special molecules that shield it from fever-based immune attacks',
      usage: 'Swap texture when virus develops Fever Response immunity. Purple bubbles show protective proteins. Reduces Fever action effectiveness significantly.',
      preview: (
        <div className="flex items-center justify-center">
          <svg width="80" height="80" viewBox="0 0 80 80">
            <circle cx="40" cy="40" r="24" fill="#97C459" />
            <circle cx="40" cy="40" r="7" fill="#3B6D11" />
            {/* Heat shock protein bubbles */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
              const rad = (angle * Math.PI) / 180;
              const cx = 40 + 28 * Math.cos(rad);
              const cy = 40 + 28 * Math.sin(rad);
              return <circle key={i} cx={cx} cy={cy} r="4" fill="#7F77DD" opacity="0.8" />;
            })}
            {/* Additional protein bubbles */}
            {[22, 67, 112, 157, 202, 247, 292, 337].map((angle, i) => {
              const rad = (angle * Math.PI) / 180;
              const cx = 40 + 26 * Math.cos(rad);
              const cy = 40 + 26 * Math.sin(rad);
              return <circle key={`inner-${i}`} cx={cx} cy={cy} r="3" fill="#7F77DD" opacity="0.6" />;
            })}
            {/* Spikes */}
            {[0, 90, 180, 270].map((angle, i) => {
              const rad = (angle * Math.PI) / 180;
              const x = 40 + 24 * Math.cos(rad);
              const y = 40 + 24 * Math.sin(rad);
              const tipX = 40 + 30 * Math.cos(rad);
              const tipY = 40 + 30 * Math.sin(rad);
              return <line key={i} x1={x} y1={y} x2={tipX} y2={tipY} stroke="#97C459" strokeWidth="2" />;
            })}
          </svg>
        </div>
      )
    },
    {
      title: 'VIRUS — ACCELERATED REPLICATION',
      size: '256×256 PNG',
      description: 'Virus rapidly duplicating itself - three smaller daughter viruses budding off the main cell to spread infection faster',
      usage: 'Display when virus mutation increases replication rate. Use AnimatedSprite2D to animate budding cells. Triggers faster Infection Rate increase per round.',
      preview: (
        <div className="flex items-center justify-center">
          <svg width="80" height="80" viewBox="0 0 80 80">
            {/* Main virus */}
            <circle cx="40" cy="40" r="18" fill="#97C459" />
            <circle cx="40" cy="40" r="5" fill="#3B6D11" />
            {/* Daughter cells */}
            {[0, 120, 240].map((angle, i) => {
              const rad = (angle * Math.PI) / 180;
              const cx = 40 + 28 * Math.cos(rad);
              const cy = 40 + 28 * Math.sin(rad);
              const bridgeX = 40 + 18 * Math.cos(rad);
              const bridgeY = 40 + 18 * Math.sin(rad);
              return (
                <g key={i}>
                  {/* Bridge */}
                  <line x1={bridgeX} y1={bridgeY} x2={cx} y2={cy} stroke="#97C459" strokeWidth="2" />
                  {/* Daughter cell */}
                  <circle cx={cx} cy={cy} r="10" fill="#97C459" opacity="0.8" />
                  <circle cx={cx} cy={cy} r="3" fill="#3B6D11" opacity="0.8" />
                  {/* Small spikes */}
                  {[0, 90, 180, 270].map((spikeAngle, j) => {
                    const spikeRad = ((angle + spikeAngle) * Math.PI) / 180;
                    const sx = cx + 10 * Math.cos(spikeRad);
                    const sy = cy + 10 * Math.sin(spikeRad);
                    const tipX = cx + 14 * Math.cos(spikeRad);
                    const tipY = cy + 14 * Math.sin(spikeRad);
                    return <line key={j} x1={sx} y1={sy} x2={tipX} y2={tipY} stroke="#97C459" strokeWidth="1.5" opacity="0.8" />;
                  })}
                </g>
              );
            })}
            {/* Main cell spikes */}
            {[30, 90, 150, 210, 270, 330].map((angle, i) => {
              const rad = (angle * Math.PI) / 180;
              const x = 40 + 18 * Math.cos(rad);
              const y = 40 + 18 * Math.sin(rad);
              const tipX = 40 + 24 * Math.cos(rad);
              const tipY = 40 + 24 * Math.sin(rad);
              return <line key={i} x1={x} y1={y} x2={tipX} y2={tipY} stroke="#97C459" strokeWidth="2" />;
            })}
          </svg>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h2 className="text-[#5DCAA5] text-sm tracking-[5px] mb-2">VIRUS MUTATION VARIANTS</h2>
        <p className="text-[#5DCAA5] text-xs">All sprites: 256×256px transparent PNG. Each mutation adds visual changes to the base virus, representing how it adapts to counter player defenses.</p>
      </div>

      <div className="border border-[#EF9F27] bg-[#1a0d00] rounded-sm p-6 mb-8">
        <h3 className="text-[#EF9F27] text-xs tracking-[3px] mb-3 font-bold">MUTATION MECHANICS</h3>
        <div className="space-y-2 text-[#5DCAA5] text-xs">
          <p>• <span className="text-[#5DCAA5]">Evade Phagocytosis:</span> Counters White Blood Cells with shield membrane</p>
          <p>• <span className="text-[#5DCAA5]">Antigenic Drift:</span> Minor antibody evasion with forked spikes</p>
          <p>• <span className="text-[#5DCAA5]">Antigenic Shift:</span> Major mutation completely changing virus structure</p>
          <p>• <span className="text-[#5DCAA5]">Thermal Resistance:</span> Armored plates counter Inflammation</p>
          <p>• <span className="text-[#5DCAA5]">Heat Shock Proteins:</span> Protein bubbles counter Fever Response</p>
          <p>• <span className="text-[#5DCAA5]">Accelerated Replication:</span> Rapid budding increases spread rate</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mutationAssets.map((asset, index) => (
          <AssetCard key={index} {...asset} />
        ))}
      </div>
    </div>
  );
}
