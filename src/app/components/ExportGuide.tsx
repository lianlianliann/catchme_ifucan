export function ExportGuide() {
  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h2 className="text-[#5DCAA5] text-sm tracking-[5px] mb-2">EXPORTING ASSETS FOR GODOT</h2>
        <p className="text-[#3d6b55] text-xs">Step-by-step guide to convert these mockups into usable game assets</p>
      </div>

      {/* Method 1: AI Image Generation (Recommended) */}
      <div className="border-2 border-[#1D9E75] bg-[#0a1f12] rounded-sm p-6">
        <h3 className="text-[#1D9E75] text-sm tracking-[3px] mb-4 font-bold">✅ METHOD 1: AI IMAGE GENERATION (RECOMMENDED)</h3>

        <div className="space-y-4 text-xs text-[#3d6b55]">
          <div className="bg-[#050d0a] border border-[#1a3a2a] rounded-sm p-4">
            <div className="text-[#5DCAA5] mb-2 font-bold">Step 1: Use the Original Guide</div>
            <p>Reference the file: <span className="text-[#e8f5f0]">src/imports/CMIYC_Full_Asset_Prompts_v2.md</span></p>
            <p className="mt-2">This guide contains the original Gemini prompts for each asset with exact specifications.</p>
          </div>

          <div className="bg-[#050d0a] border border-[#1a3a2a] rounded-sm p-4">
            <div className="text-[#5DCAA5] mb-2 font-bold">Step 2: Generate with AI</div>
            <p className="mb-2">Use AI image generators like:</p>
            <ul className="list-disc list-inside space-y-1 text-[#3d6b55]">
              <li><span className="text-[#e8f5f0]">Google Gemini</span> (recommended in guide)</li>
              <li><span className="text-[#e8f5f0]">DALL-E 3</span> via ChatGPT</li>
              <li><span className="text-[#e8f5f0]">Midjourney</span></li>
              <li><span className="text-[#e8f5f0]">Stable Diffusion</span></li>
            </ul>
          </div>

          <div className="bg-[#050d0a] border border-[#1a3a2a] rounded-sm p-4">
            <div className="text-[#5DCAA5] mb-2 font-bold">Step 3: Format Your Prompts</div>
            <div className="bg-[#0a1f12] p-3 rounded-sm mt-2 border-l-2 border-[#1D9E75]">
              <p className="text-[#e8f5f0] mb-2">Template:</p>
              <p className="text-[#3d6b55] font-mono text-[10px] leading-relaxed">
                "Flat vector game UI asset, transparent PNG background, Courier New monospace font,
                dark biohazard terminal aesthetic — NO gradients, NO glow, NO neon, NO drop shadows,
                NO rounded corners beyond rx=3. [SPECIFIC ASSET DESCRIPTION]. Consistent with a
                clinical military medical terminal UI, muted dark green and black color scheme."
              </p>
            </div>
          </div>

          <div className="bg-[#050d0a] border border-[#1a3a2a] rounded-sm p-4">
            <div className="text-[#5DCAA5] mb-2 font-bold">Step 4: Export as PNG</div>
            <ul className="list-disc list-inside space-y-1">
              <li>Save generated images at exact sizes (e.g., 256×256, 1920×1080)</li>
              <li>Ensure transparent backgrounds for UI elements</li>
              <li>Use PNG format for compatibility with Godot</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Method 2: Vector Graphics Tools */}
      <div className="border border-[#EF9F27] bg-[#1a0d00] rounded-sm p-6">
        <h3 className="text-[#EF9F27] text-sm tracking-[3px] mb-4 font-bold">METHOD 2: VECTOR GRAPHICS TOOLS</h3>

        <div className="space-y-4 text-xs text-[#3d6b55]">
          <div className="bg-[#050d0a] border border-[#1a3a2a] rounded-sm p-4">
            <div className="text-[#5DCAA5] mb-2 font-bold">Recommended Tools</div>
            <ul className="list-disc list-inside space-y-1">
              <li><span className="text-[#e8f5f0]">Figma</span> (free, browser-based)</li>
              <li><span className="text-[#e8f5f0]">Inkscape</span> (free, open-source)</li>
              <li><span className="text-[#e8f5f0]">Adobe Illustrator</span> (paid)</li>
            </ul>
          </div>

          <div className="bg-[#050d0a] border border-[#1a3a2a] rounded-sm p-4">
            <div className="text-[#5DCAA5] mb-2 font-bold">Process</div>
            <ol className="list-decimal list-inside space-y-1">
              <li>Use this toolkit's mockups as visual reference</li>
              <li>Recreate assets using vector shapes and text</li>
              <li>Apply exact colors from the Design Guide tab</li>
              <li>Export as PNG at specified dimensions</li>
            </ol>
          </div>
        </div>
      </div>

      {/* Method 3: Screenshot (Quick but not ideal) */}
      <div className="border border-[#3d6b55] bg-[#0a1f12] rounded-sm p-6">
        <h3 className="text-[#3d6b55] text-sm tracking-[3px] mb-4 font-bold">METHOD 3: SCREENSHOT (QUICK PROTOTYPING ONLY)</h3>

        <div className="space-y-4 text-xs text-[#3d6b55]">
          <div className="bg-[#050d0a] border border-[#1a3a2a] rounded-sm p-4">
            <div className="text-[#5DCAA5] mb-2 font-bold">⚠️ Use Only for Rapid Prototyping</div>
            <p>Screenshot the previews from this toolkit for quick placeholder assets while developing game mechanics.</p>
          </div>

          <div className="bg-[#050d0a] border border-[#1a3a2a] rounded-sm p-4">
            <div className="text-[#5DCAA5] mb-2 font-bold">How to Screenshot</div>
            <ol className="list-decimal list-inside space-y-1">
              <li>Open browser DevTools (F12)</li>
              <li>Right-click on the preview element</li>
              <li>Select "Capture node screenshot"</li>
              <li>Or use tools like Snipping Tool, Lightshot, or Greenshot</li>
            </ol>
          </div>

          <div className="bg-[#1a0000] border border-[#E24B4A] rounded-sm p-4">
            <div className="text-[#E24B4A] mb-2 font-bold">⚠️ Limitations</div>
            <ul className="list-disc list-inside space-y-1">
              <li>Lower quality than vector or AI-generated</li>
              <li>May not have transparent backgrounds</li>
              <li>Might not be exact dimensions needed</li>
              <li>Not suitable for final production</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Importing to Godot */}
      <div className="border-2 border-[#5DCAA5] bg-[#0a1f12] rounded-sm p-6">
        <h3 className="text-[#5DCAA5] text-sm tracking-[3px] mb-4 font-bold">📦 IMPORTING TO GODOT 4</h3>

        <div className="space-y-4 text-xs text-[#3d6b55]">
          <div className="bg-[#050d0a] border border-[#1a3a2a] rounded-sm p-4">
            <div className="text-[#5DCAA5] mb-2 font-bold">Step 1: Organize Your Assets</div>
            <div className="bg-[#0a1f12] p-3 rounded-sm mt-2 border-l-2 border-[#1D9E75]">
              <p className="text-[#e8f5f0] mb-2">Recommended folder structure:</p>
              <pre className="text-[#3d6b55] font-mono text-[10px] leading-relaxed">
{`res://assets/
  ├── ui/
  │   ├── backgrounds/
  │   ├── buttons/
  │   ├── panels/
  │   └── indicators/
  ├── sprites/
  │   ├── virus/
  │   ├── immune_cells/
  │   └── effects/
  ├── body_map/
  │   ├── base/
  │   ├── overlays_infected/
  │   └── overlays_cleared/
  └── screens/
      ├── main_menu/
      ├── difficulty/
      └── end_screens/`}
              </pre>
            </div>
          </div>

          <div className="bg-[#050d0a] border border-[#1a3a2a] rounded-sm p-4">
            <div className="text-[#5DCAA5] mb-2 font-bold">Step 2: Import Settings in Godot</div>
            <ul className="list-disc list-inside space-y-1">
              <li>Drag PNG files into your Godot project folder</li>
              <li>Select the imported texture in Godot</li>
              <li>In Import tab, set <span className="text-[#e8f5f0]">Compress Mode: Lossless</span></li>
              <li>For sprites, enable <span className="text-[#e8f5f0]">Filter: Off</span> for pixel-perfect rendering</li>
              <li>For UI elements with transparency, ensure <span className="text-[#e8f5f0]">Alpha: Clip</span> or <span className="text-[#e8f5f0]">Blend</span></li>
            </ul>
          </div>

          <div className="bg-[#050d0a] border border-[#1a3a2a] rounded-sm p-4">
            <div className="text-[#5DCAA5] mb-2 font-bold">Step 3: Create Nodes</div>
            <div className="space-y-2 mt-2">
              <div>
                <p className="text-[#e8f5f0]">For UI Elements:</p>
                <p className="text-[#3d6b55] ml-4">Use <span className="text-[#1D9E75]">TextureRect</span> or <span className="text-[#1D9E75]">TextureButton</span> nodes</p>
              </div>
              <div>
                <p className="text-[#e8f5f0]">For Game Sprites:</p>
                <p className="text-[#3d6b55] ml-4">Use <span className="text-[#1D9E75]">Sprite2D</span> nodes</p>
              </div>
              <div>
                <p className="text-[#e8f5f0]">For Backgrounds:</p>
                <p className="text-[#3d6b55] ml-4">Use <span className="text-[#1D9E75]">TextureRect</span> with stretch mode set to "Keep Aspect Covered"</p>
              </div>
            </div>
          </div>

          <div className="bg-[#050d0a] border border-[#1a3a2a] rounded-sm p-4">
            <div className="text-[#5DCAA5] mb-2 font-bold">Step 4: Apply to Nodes</div>
            <ol className="list-decimal list-inside space-y-1">
              <li>Select your TextureRect/Sprite2D node</li>
              <li>In Inspector, find "Texture" property</li>
              <li>Drag your PNG asset into the Texture slot</li>
              <li>Adjust size and position as needed</li>
            </ol>
          </div>
        </div>
      </div>

      {/* Asset Usage Examples */}
      <div className="border border-[#7F77DD] bg-[#0a001a] rounded-sm p-6">
        <h3 className="text-[#7F77DD] text-sm tracking-[3px] mb-4 font-bold">📋 ASSET USAGE EXAMPLES IN GODOT</h3>

        <div className="space-y-4 text-xs text-[#3d6b55]">
          <div className="bg-[#050d0a] border border-[#1a3a2a] rounded-sm p-4">
            <div className="text-[#5DCAA5] mb-2 font-bold">Main Menu Button (Interactive)</div>
            <pre className="text-[#3d6b55] font-mono text-[10px] leading-relaxed mt-2">
{`# TextureButton node
- Texture Normal: btn-primary-normal.png
- Texture Pressed: btn-primary-selected.png
- Texture Hover: btn-primary-hover.png
- Label: "DEPLOY" (Courier New, size 12)`}
            </pre>
          </div>

          <div className="bg-[#050d0a] border border-[#1a3a2a] rounded-sm p-4">
            <div className="text-[#5DCAA5] mb-2 font-bold">Virus Sprite (Animated)</div>
            <pre className="text-[#3d6b55] font-mono text-[10px] leading-relaxed mt-2">
{`# Sprite2D or AnimatedSprite2D
- Default: virus-base.png
- Swap texture when mutation applied:
  - virus-evade-phagocytosis.png
  - virus-antigenic-drift.png
  - etc.`}
            </pre>
          </div>

          <div className="bg-[#050d0a] border border-[#1a3a2a] rounded-sm p-4">
            <div className="text-[#5DCAA5] mb-2 font-bold">Organ Zone (Clickable Area)</div>
            <pre className="text-[#3d6b55] font-mono text-[10px] leading-relaxed mt-2">
{`# Area2D with TextureRect child
- Base: body-map-base.png
- Layer on top when infected:
  zone-lungs-infected-overlay.png
- Layer on top when cleared:
  zone-lungs-cleared-overlay.png`}
            </pre>
          </div>

          <div className="bg-[#050d0a] border border-[#1a3a2a] rounded-sm p-4">
            <div className="text-[#5DCAA5] mb-2 font-bold">Progress Bar (Dynamic)</div>
            <pre className="text-[#3d6b55] font-mono text-[10px] leading-relaxed mt-2">
{`# TextureProgressBar node
- Background: bar-track.png
- Fill: bar-fill-healthy.png (or warning/critical)
- Value: 0-100 based on current EP/Severity`}
            </pre>
          </div>
        </div>
      </div>

      {/* Tips */}
      <div className="border border-[#1D9E75] bg-[#0a1f12] rounded-sm p-6">
        <h3 className="text-[#1D9E75] text-sm tracking-[3px] mb-4 font-bold">💡 PRO TIPS</h3>

        <div className="space-y-3 text-xs text-[#3d6b55]">
          <div className="flex gap-3">
            <div className="text-[#1D9E75] text-lg">•</div>
            <div>
              <span className="text-[#5DCAA5] font-bold">Start with low-res prototypes:</span> Use screenshots or simple shapes to test game mechanics first, then replace with final assets
            </div>
          </div>
          <div className="flex gap-3">
            <div className="text-[#1D9E75] text-lg">•</div>
            <div>
              <span className="text-[#5DCAA5] font-bold">Use 9-slice scaling:</span> For panels and buttons that need to resize, use Godot's NinePatchRect to prevent distortion
            </div>
          </div>
          <div className="flex gap-3">
            <div className="text-[#1D9E75] text-lg">•</div>
            <div>
              <span className="text-[#5DCAA5] font-bold">Create atlases for animations:</span> Combine multiple virus mutation sprites into a sprite sheet for easier animation
            </div>
          </div>
          <div className="flex gap-3">
            <div className="text-[#1D9E75] text-lg">•</div>
            <div>
              <span className="text-[#5DCAA5] font-bold">Maintain aspect ratios:</span> Always preserve the original aspect ratio when scaling assets in Godot
            </div>
          </div>
          <div className="flex gap-3">
            <div className="text-[#1D9E75] text-lg">•</div>
            <div>
              <span className="text-[#5DCAA5] font-bold">Test on target resolution:</span> Preview your game at 1920×1080 to ensure assets look crisp
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
