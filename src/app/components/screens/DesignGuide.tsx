export function DesignGuide() {
  const colors = [
    { role: 'Background deep', hex: '#050d0a', usage: 'Main screen backgrounds' },
    { role: 'Background mid', hex: '#0a1f12', usage: 'Panel fills, card bodies' },
    { role: 'Background surface', hex: '#0d2016', usage: 'Elevated panels, headers' },
    { role: 'Primary green', hex: '#1D9E75', usage: 'Main UI color, healthy state, active buttons' },
    { role: 'Light green', hex: '#5DCAA5', usage: 'Labels, secondary text, subtitles' },
    { role: 'Dim green', hex: '#3d6b55', usage: 'Tertiary text, disabled labels' },
    { role: 'Dark green', hex: '#085041', usage: 'Borders, separators' },
    { role: 'Infected red', hex: '#E24B4A', usage: 'Infected zones, danger, severity bar' },
    { role: 'Dark red', hex: '#A32D2D', usage: 'Critical state fills' },
    { role: 'Deep red bg', hex: '#1a0000', usage: 'Danger panel backgrounds' },
    { role: 'Warning amber', hex: '#EF9F27', usage: 'Contested zones, mutations, warnings' },
    { role: 'Dark amber bg', hex: '#1a0d00', usage: 'Mutation badge backgrounds' },
    { role: 'Virus purple', hex: '#7F77DD', usage: 'Virus/mutation indicators' },
    { role: 'Deep purple bg', hex: '#0a001a', usage: 'Virus badge backgrounds' },
    { role: 'Text bright', hex: '#e8f5f0', usage: 'Titles, primary headings' },
    { role: 'Text white', hex: '#ffffff', usage: 'Highest contrast headers only' },
    { role: 'Border line', hex: '#1a3a2a', usage: 'Subtle separators' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-[#5DCAA5] text-sm tracking-[5px] mb-4">MASTER DESIGN LANGUAGE</h2>
        <p className="text-[#3d6b55] text-xs mb-6">
          Clinical biohazard terminal UI — dark, monospace, tactical. Similar to a medical monitoring system crossed with a military HQ display. NOT sci-fi/futuristic neon.
        </p>
      </div>

      {/* Color Palette */}
      <div className="border border-[#1D9E75] bg-[#0a1f12] rounded-sm p-6">
        <h3 className="text-[#1D9E75] text-xs tracking-[3px] mb-4 font-bold">COLOR PALETTE</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {colors.map((color) => (
            <div key={color.hex} className="bg-[#050d0a] p-3 rounded-sm border border-[#1a3a2a]">
              <div className="flex items-center gap-3 mb-2">
                <div
                  className="w-10 h-10 rounded-sm border border-[#1a3a2a]"
                  style={{ backgroundColor: color.hex }}
                />
                <div>
                  <div className="text-[#e8f5f0] text-xs font-bold">{color.role}</div>
                  <div className="text-[#5DCAA5] text-xs">{color.hex}</div>
                </div>
              </div>
              <div className="text-[#3d6b55] text-xs">{color.usage}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Typography */}
      <div className="border border-[#1D9E75] bg-[#0a1f12] rounded-sm p-6">
        <h3 className="text-[#1D9E75] text-xs tracking-[3px] mb-4 font-bold">TYPOGRAPHY</h3>
        <div className="space-y-4">
          <div className="bg-[#050d0a] p-4 rounded-sm border border-[#1a3a2a]">
            <div className="text-[#5DCAA5] text-xs mb-2">Font</div>
            <div className="text-[#e8f5f0] text-sm">Courier New / any monospace terminal font</div>
          </div>
          <div className="bg-[#050d0a] p-4 rounded-sm border border-[#1a3a2a]">
            <div className="text-[#5DCAA5] text-xs mb-2">Letter Spacing</div>
            <div className="text-[#e8f5f0] text-sm">Always add extra — minimum 1px, titles use 3–6px</div>
          </div>
          <div className="bg-[#050d0a] p-4 rounded-sm border border-[#1a3a2a]">
            <div className="text-[#5DCAA5] text-xs mb-2">Case</div>
            <div className="text-[#e8f5f0] text-sm">ALL CAPS for labels, titles, and UI elements</div>
          </div>
          <div className="bg-[#050d0a] p-4 rounded-sm border border-[#1a3a2a]">
            <div className="text-[#5DCAA5] text-xs mb-2">Hierarchy</div>
            <div className="space-y-2">
              <div className="text-[#e8f5f0]" style={{ fontSize: '28px' }}>Title 28–38px</div>
              <div className="text-[#5DCAA5]" style={{ fontSize: '11px', letterSpacing: '3px' }}>SECTION HEADER 10–12PX LETTER-SPACED</div>
              <div className="text-[#3d6b55]" style={{ fontSize: '8px' }}>Data label 8–9px</div>
              <div className="text-[#1D9E75] font-bold" style={{ fontSize: '22px' }}>Data value 20–28px bold</div>
            </div>
          </div>
        </div>
      </div>

      {/* Shape Language */}
      <div className="border border-[#1D9E75] bg-[#0a1f12] rounded-sm p-6">
        <h3 className="text-[#1D9E75] text-xs tracking-[3px] mb-4 font-bold">SHAPE LANGUAGE</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[#050d0a] p-4 rounded-sm border border-[#1a3a2a]">
            <div className="text-[#5DCAA5] text-xs mb-3">Corners</div>
            <div className="w-20 h-20 bg-[#0d2016] border border-[#1D9E75] rounded-sm" />
            <div className="text-[#3d6b55] text-xs mt-2">rx="2" or rx="3" — very subtle, almost square</div>
          </div>
          <div className="bg-[#050d0a] p-4 rounded-sm border border-[#1a3a2a]">
            <div className="text-[#5DCAA5] text-xs mb-3">Corner Brackets</div>
            <div className="relative w-20 h-20 bg-[#0d2016]">
              <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-[#1D9E75]" />
              <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-[#1D9E75]" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-[#1D9E75]" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-[#1D9E75]" />
            </div>
            <div className="text-[#3d6b55] text-xs mt-2">18×18px L-shaped marks at all 4 corners</div>
          </div>
        </div>
      </div>

    </div>
  );
}
