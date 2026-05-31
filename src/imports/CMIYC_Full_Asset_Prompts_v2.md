# Catch Me If You Can — Complete Gemini Asset Generation Guide v2
**Game:** Catch Me If You Can | Godot 4 | PC (Windows/Mac)
**Theme:** Biological warfare strategy — you are the immune system
**Reference style:** Clinical biohazard terminal UI — dark, monospace, tactical. Similar to a medical monitoring system crossed with a military HQ display. NOT sci-fi/futuristic neon. Think: field hospital data readout meets CDC outbreak dashboard.

---

## MASTER DESIGN LANGUAGE (apply to EVERY asset)

Before generating anything, lock in these rules. Every single asset must follow all of them for visual consistency.

### Color Palette (hardcode these hex values always)
| Role | Hex | Usage |
|------|-----|-------|
| Background deep | `#050d0a` | Main screen backgrounds |
| Background mid | `#0a1f12` | Panel fills, card bodies |
| Background surface | `#0d2016` | Elevated panels, headers |
| Primary green | `#1D9E75` | Main UI color, healthy state, active buttons |
| Light green | `#5DCAA5` | Labels, secondary text, subtitles |
| Dim green | `#3d6b55` | Tertiary text, disabled labels |
| Dark green | `#085041` | Borders, separators |
| Infected red | `#E24B4A` | Infected zones, danger, severity bar |
| Dark red | `#A32D2D` | Critical state fills |
| Deep red bg | `#1a0000` | Danger panel backgrounds |
| Warning amber | `#EF9F27` | Contested zones, mutations, warnings |
| Dark amber bg | `#1a0d00` | Mutation badge backgrounds |
| Virus purple | `#7F77DD` | Virus/mutation indicators |
| Deep purple bg | `#0a001a` | Virus badge backgrounds |
| Text bright | `#e8f5f0` | Titles, primary headings |
| Text white | `#ffffff` | Highest contrast headers only |
| Border line | `#1a3a2a` | Subtle separators |

### Typography
- **Font:** Courier New / any monospace terminal font. NO sans-serif, NO rounded fonts.
- **Letter spacing:** Always add extra — minimum 1px, titles use 3–6px
- **Case:** ALL CAPS for labels, titles, and UI elements. Sentence case only for lore/flavor text.
- **Hierarchy:** Title 28–38px | Section header 10–12px letter-spaced | Data label 8–9px | Data value 20–28px bold

### Shape Language
- Corners: `rx="2"` or `rx="3"` — very subtle, almost square. NOT rounded. NOT pill shapes.
- Borders: 0.5px–1.5px. Active/selected = 1.5px. Inactive = 0.5px.
- Corner bracket decoration: every major panel has small L-shaped corner marks (18×18px) at all 4 corners in `#1D9E75`
- Scanline overlay: subtle repeating horizontal lines at 4px intervals, `rgba(0,180,120,0.012)` — barely visible, adds texture
- Grid line separators: thin 0.5px lines at `#1D9E75` 20–30% opacity dividing major layout areas

### Sound design markers (for context — affects visual design)
- UI feels like a medical terminal. Beeps, not swooshes. Clinical, not flashy.

---

## SCREEN 1 — MAIN MENU

### Overall layout
Full-screen 1920×1080. Dark deep-green background. Centered layout. Three horizontal zones:
- Top: thin status bar with university name
- Middle: game title + menu buttons (centered)
- Bottom: thin info bar with version/credits

### Elements to generate

**1A. Background base (1920×1080 PNG)**
> Dark near-black green background `#050d0a` with a very faint radial pulse of slightly lighter green `#0a1f12` centered on screen. Repeating hexagonal grid or cell membrane pattern at 3% opacity. Flat. No glow. Monochrome. The background must feel like a medical terminal on standby — alive but quiet.

**1B. Title lockup (transparent PNG, 900×250)**
> Large monospace bold text in two lines: "CATCH ME" / "IF YOU CAN" — font Courier New, bold, 72px, color `#e8f5f0`, letter-spacing -1px. Below it a subtitle line: "OUTSMART THE VIRUS. SAVE THE HOST." in `#5DCAA5`, 16px, letter-spacing 3px. Above the title a small category tag: "HOST DEFENSE SYSTEM" in `#5DCAA5` 11px, letter-spacing 6px. Clean transparent PNG. No effects.

**1C. Menu button — NORMAL state (transparent PNG, 300×44)**
> Flat rectangle, `rx=2`. Outline only — `1.5px` border in `#1D9E75`. Fill: `#0d2016`. Text centered: ALL CAPS label in `#1D9E75`, Courier New 12px, letter-spacing 4px. Corner bracket marks at all 4 corners in `#1D9E75`. Transparent background.

**1D. Menu button — HOVERED state (transparent PNG, 300×44)**
> Same as 1C but fill becomes `#1D9E75` and text becomes `#050d0a` (dark). Border stays same. Slightly brighter corner marks.

**1E. Menu button — SELECTED/PRESSED state (transparent PNG, 300×44)**
> Same shape. Border `2px` `#5DCAA5`. Fill `#085041`. Text `#5DCAA5`.

**1F. Status bar strip (1920×32 PNG)**
> Very thin horizontal bar, background `#070f09`, 0.5px bottom border `#1D9E75` 30% opacity. Left side: small square `6×6px` in `#1D9E75` + text "SYS.READY" in Courier New 9px, letter-spacing 2px, color `#1D9E75` 50% opacity. Right side: "v1.0.0 // BSCS 3-1" same style. Dark, barely visible.

**1G. Corner bracket decoration (transparent PNG, 24×24)**
> L-shaped bracket made of two thin rectangles (`2px` wide, `18px` long), color `#1D9E75`. Four variants: top-left, top-right, bottom-left, bottom-right. Used on all major panels game-wide. Transparent background.

---

## SCREEN 2 — DIFFICULTY SELECT

### Layout
Full-screen 1920×1080. Same background as main menu. Header strip at top. Three side-by-side cards centered on screen. Footer instruction text at bottom.

**2A. Header strip (1920×52 PNG)**
> Same style as main menu header. Center text: "SELECT INFECTION SCENARIO" in `#5DCAA5`, Courier New 10px, letter-spacing 5px. 0.5px bottom border `#1D9E75` 30% opacity.

**2B. Difficulty card — CASUAL (280×340 PNG)**
> Card body: `#0a1f12` background, `1px` border `#1D9E75`. Header bar (top 36px): filled `#1D9E75`, text "CASUAL" in `#050d0a` bold Courier New 12px, letter-spacing 2px. Body content below header (Courier New, 9px, `#3d6b55`): four stats lines — "TURN-BASED", "Mutation telegraphed every 2 rounds", "Generous EP regeneration", "Entry point: Lungs only". Large roman numeral "I" centered at bottom in `#1D9E75` 28px. Corner brackets in `#1D9E75`. `rx=3`.

**2C. Difficulty card — EPIDEMIC (280×340 PNG)**
> Same structure as 2B. Header bar: filled `#BA7517` amber. Text "EPIDEMIC" in `#050d0a`. Small pill badge inside header: "STANDARD" on `#412402` background, text `#EF9F27`. Body text color `#633806`. Roman numeral "II" in `#EF9F27`. Border `1.5px` `#EF9F27`.

**2D. Difficulty card — PANDEMIC (280×340 PNG)**
> Same structure. Header bar: `#A32D2D`. Text "PANDEMIC" in `#ffffff`. Body text `#791F1F`. Roman numeral "III" in `#E24B4A`. Border `1.5px` `#E24B4A`. Subtle red tint on body background `#1a0000`.

**2E. Card — SELECTED state overlay (280×340 PNG)**
> Same as respective card but border becomes `2px`, outer glow replaced by a thin outer rectangle frame offset by 3px. Background slightly brighter. Used as selected indicator.

---

## SCREEN 3 — IN-GAME UI (MAIN GAMEPLAY SCREEN)

### Layout — Three-column
- Left panel (160px wide): organ status sidebar + EP/Severity HUD
- Center (360px): organ zone body map (interactive game board)
- Right panel (160px): immune action button list
- Top bar (38px): global status — round counter, mode, threat level
- Bottom bar (38px): mode label + next round button

**3A. Top status bar (1920×38 PNG)**
> Background `#050d0a`. Left: "HOST STATUS" text. Center: "ROUND 05" highlighted. Right: "THREAT: ACTIVE" in `#E24B4A`. Full-width 0.5px bottom border `#1D9E75` 40% opacity. Monospace 10px, letter-spacing 2–3px.

**3B. Left sidebar panel (160×720 PNG)**
> Background `#050d0a`. Right border 0.5px `#1D9E75` 20% opacity. Contains stacked sections:
>
> Section 1 — Severity bar:
> Label "SEVERITY" in `#5DCAA5` 8px monospace. Bar: 120×10px rectangle, background `#0a1f12` with 0.5px border `#1D9E75`. Filled portion `#E24B4A`. Percentage text right of bar.
>
> Section 2 — EP bar:
> Label "ENERGY (EP)". Same bar style but fill `#1D9E75`.
>
> Section 3 — Infection rate:
> Label "INFECTION RATE" 8px. Large value "034" in `#EF9F27` 22px bold monospace.
>
> Section 4 — Active mutation badge:
> Label "ACTIVE MUTATION". Pill badge 128×20px, background `#1a0d00`, border 0.5px `#EF9F27`, text `#EF9F27` Courier New 8px letter-spacing 1px. Shows current mutation name.
>
> Divider line. Then:
>
> Section 5 — Organ status list (6 rows):
> Each row: 16×16px color square indicator (green=healthy, red=infected, amber=contested) + zone name in `#5DCAA5` 8px + small 48×8px health bar. Zones: BRAIN, LUNGS, HEART, LYMPH, GUT, BLOOD.

**3C. Organ zone health bar (48×8 PNG, 4 states)**
> Tiny horizontal bar, `rx=1`. Background `#0a1f12`, border 0.5px. Four fill states:
> - Full: `#1D9E75` fill
> - Partial: `#EF9F27` fill (50%)
> - Critical: `#E24B4A` fill (20%)
> - Empty/Infected: `#E24B4A` fill full (inverted meaning — fully infected)

**3D. Zone status indicator square (16×16 PNG, 4 states)**
> Simple square `rx=2`. Colors: Healthy `#1D9E75`, Infected `#E24B4A`, Contested `#EF9F27`, Cleared `#3d6b55`. Transparent background. Very clean, no border.

**3E. Right sidebar — action button panel (160×720 PNG)**
> Background `#050d0a`. Left border 0.5px `#1D9E75` 20% opacity. Label at top "DEPLOY IMMUNE ACTION" in `#3d6b55` 8px. Below: 6 stacked action buttons.

**3F. Action button — ACTIVE state (140×52 PNG)**
> Rectangle, `rx=2`. Background `#0a1f12`, border `1px` `#1D9E75`. Header strip (top 14px): `#1D9E75` 30% opacity fill. Action name centered in header strip: ALL CAPS Courier New 8px `#1D9E75` letter-spacing 2px. Below header: description text 7px `#3d6b55`. Bottom-right: EP cost "XX EP" in `#5DCAA5` 10px. Corner brackets. Transparent bg.

**3G. Action button — INACTIVE/DIMMED state (140×52 PNG)**
> Same layout but background `#0a1000`, border 0.5px `#1a3a2a`, text all `#2a4a35`. Dimmed, clearly unavailable.

**3H. Action button — DANGER (Cytokine Burst) state (140×52 PNG)**
> Background `#1a0000`, border 0.5px `#E24B4A` 60% opacity. Name text `#E24B4A`. Description `#791F1F`. EP cost `#E24B4A`.

**3I. Bottom action bar (1920×38 PNG)**
> Background `#050d0a`. Left: mode text "STATUS // TURN-BASED // EPIDEMIC MODE" in `#3d6b55`. Right: "NEXT ROUND >" in `#3d6b55`. 0.5px top border `#1D9E75` 40% opacity.

---

## SCREEN 4 — ROUND RESOLVE POPUP

### Layout
Centered modal over darkened game screen. 480×260px card.

**4A. Popup card (480×260 PNG)**
> Background `#070f09`, border `1.5px` `#1D9E75`, `rx=4`. Corner brackets. Header bar (top 36px): background `#0d2016`, bottom border 0.5px `#1D9E75`. Title centered: "ROUND 05 — RESOLVED" `#5DCAA5` 11px monospace letter-spacing 4px. Body: "OUTCOME LOG" label 8px `#3d6b55`. 4 log rows, each with: 8×8px color square + event text + right-aligned value. Colors per event type: green for positive, red for negative, amber for virus action, purple for RL/EP. Divider line. Severity index bar at bottom. "NEXT ROUND" button right-aligned.

**4B. Log row sprites (4 variants, 300×16 PNG each)**
> Each is: 8×8 `rx=1` colored square + text line + right value. Backgrounds transparent.
> - Positive (cleared): square `#1D9E75`, text `#5DCAA5`, value `#1D9E75`
> - Negative (infected): square `#E24B4A`, text `#5DCAA5`, value `#E24B4A`
> - Warning (mutation): square `#EF9F27`, text `#5DCAA5`, value `#EF9F27`
> - Info (EP regen): square `#7F77DD`, text `#5DCAA5`, value `#7F77DD`

**4C. Popup backdrop (1920×1080 PNG)**
> Solid `#050d0a` at 70% opacity — used as overlay behind the popup. Pure flat dark tint. No blur.

---

## SCREEN 5 — VICTORY SCREEN

**5A. Background (1920×1080 PNG)**
> `#020a04` base. Very subtle radial lighter patch at center. Green tint `#1D9E75` at 6% opacity over full screen. Faint repeating hex/cell pattern barely visible.

**5B. Victory emblem (300×300 transparent PNG)**
> Two concentric circles, outer ring `1px` `#1D9E75`, inner ring `0.5px` `#1D9E75`. Center circle filled `#0d2016`. Inside circle: two text lines — "THREAT" and "NEUTRALIZED" — Courier New 10px `#1D9E75` letter-spacing 1px. Clean, clinical. No stars, no decorative elements. Just the circle and text.

**5C. Victory title (600×80 transparent PNG)**
> Text "VICTORY" — Courier New bold 48px `#e8f5f0` letter-spacing 2px. Below: "HOST FULLY RECOVERED" 8px `#5DCAA5`.

**5D. Return button (200×32 PNG)**
> Filled rectangle `#1D9E75`. Text "MAIN MENU" `#050d0a` bold 9px letter-spacing 3px. `rx=2`.

---

## SCREEN 6 — GAME OVER SCREEN

**6A. Background (1920×1080 PNG)**
> `#0a0202` base. Red tint `#E24B4A` at 5% opacity. Same faint hex pattern.

**6B. Game over emblem (300×300 transparent PNG)**
> Same circle structure as victory emblem. Rings in `#E24B4A`. Center fill `#1a0505`. Text: "HOST" and "COMPROMISED" in `#E24B4A` 10px.

**6C. Game over title (600×80 transparent PNG)**
> "GAME OVER" — Courier New bold 48px `#ffffff` letter-spacing 2px. Below: "SEVERITY REACHED 100%" 8px `#E24B4A`.

**6D. Retry button (200×32 PNG)**
> Outline only, border `1px` `#E24B4A`. Background transparent. Text "RETRY" `#E24B4A` 9px letter-spacing 3px. `rx=2`.

---

## SPRITE SHEET — REUSABLE UI COMPONENTS

These are individual sprites used many times throughout the game. Generate each separately at the listed size with transparent backgrounds.

### Buttons
| Sprite | Size | Description |
|--------|------|-------------|
| btn-primary-normal | 200×36px | Outline `#1D9E75`, fill `#0d2016`, text `#1D9E75` |
| btn-primary-hover | 200×36px | Fill `#1D9E75`, text `#050d0a` |
| btn-primary-disabled | 200×36px | Outline `#1a3a2a`, fill `#050d0a`, text `#2a4a35`, 40% opacity |
| btn-danger-normal | 200×36px | Outline `#E24B4A`, fill `#1a0000`, text `#E24B4A` |
| btn-danger-hover | 200×36px | Fill `#A32D2D`, text `#fff` |
| btn-secondary-normal | 200×36px | Outline `#1a3a2a`, no fill, text `#3d6b55` |

> All buttons: Courier New 9–12px, ALL CAPS, letter-spacing 3px, `rx=2`, corner bracket marks at 4 corners.

### Progress bars
| Sprite | Size | Description |
|--------|------|-------------|
| bar-track | 200×10px | Background `#0a1f12`, border 0.5px `#1D9E75`, `rx=1` |
| bar-fill-healthy | 200×10px | Solid fill `#1D9E75`, `rx=1` |
| bar-fill-warning | 200×10px | Solid fill `#EF9F27` |
| bar-fill-critical | 200×10px | Solid fill `#E24B4A` |

> Generate at 200px width (full). In Godot, clip/scale fill to represent percentage. Transparent background.

### Zone indicator squares
| Sprite | Size | Color |
|--------|------|-------|
| zone-healthy | 20×20px | `#1D9E75` fill, `rx=2` |
| zone-infected | 20×20px | `#E24B4A` fill, `rx=2` |
| zone-contested | 20×20px | `#EF9F27` fill, `rx=2` |
| zone-cleared | 20×20px | `#3d6b55` fill, `rx=2` |

### Mutation badges
| Sprite | Size | Style |
|--------|------|-------|
| badge-virus-amber | 160×20px | `#1a0d00` bg, 0.5px `#EF9F27` border, `#EF9F27` text, `rx=2` |
| badge-virus-red | 160×20px | `#1a0000` bg, 0.5px `#E24B4A` border |
| badge-virus-purple | 160×20px | `#0a001a` bg, 0.5px `#7F77DD` border |

### Panel decorations
| Sprite | Size | Description |
|--------|------|-------------|
| corner-tl | 24×24px | L-bracket, top-left orientation, `2px` `#1D9E75` |
| corner-tr | 24×24px | Top-right |
| corner-bl | 24×24px | Bottom-left |
| corner-br | 24×24px | Bottom-right |
| divider-h | 400×1px | Horizontal rule `#1D9E75` 30% opacity |
| panel-border | 1×1px tileable | 0.5px `#1D9E75` border tile for nine-slice |

### Scanline overlay
| Sprite | Size | Description |
|--------|------|-------------|
| scanline-tile | 4×4px | 1px dark line at top, 3px transparent. Tile this over UI. `rgba(0,0,0,0.06)` |

---

## VIRUS AND IMMUNE CELL SPRITES

> All sprites: 256×256px, transparent PNG, flat vector, Courier New labels not needed (these are in-game entities, not UI).

### Virus sprites
**Base virus (healthy/spreading)**
> Round cell body, sickly yellow-green `#97C459`. Irregular bumpy outline (not perfect circle). 8–12 short spike proteins around perimeter (like coronavirus cross-section seen from above). Small darker oval nucleus inside `#3B6D11`. Flat fill, no glow, no gradients. Simple bold shapes. Transparent background.

**Mutation variants** — keep base shape, add visual change:

| Mutation | Visual change |
|----------|--------------|
| Evade Phagocytosis | Add a smooth flat white/gray outer membrane ring around the cell — like a shield coat |
| Antigenic Drift | Slightly shift spike shapes — some now have forked tips. Small `~` marks to show subtle change |
| Antigenic Shift | Drastically different spikes — two types visible (original + new longer spikes). Two-tone body: `#97C459` core + `#EF9F27` half-sector |
| Thermal Resistance | Orange `#BA7517` hexagonal plate segments over the outer membrane — looks armored |
| Heat Shock Proteins | Small round protein chaperone bubbles `#7F77DD` clustered around the cell exterior |
| Accelerated Replication | 3 smaller daughter cells budding off the main cell, connected by thin bridges |

### Immune cell sprites
**White Blood Cell (Neutrophil)**
> Irregular lumpy round cell. White/light gray `#D3D1C7`. Multi-lobed nucleus visible inside in darker gray `#888780`. Slightly translucent feel but flat. Transparent bg. 256×256px.

**Antibody (IgG)**
> Clean Y-shape (fork/trident). Two arms up, one trunk down. Color `#85B7EB` (blue-white). Thick flat strokes `6px`. No fill inside the Y — outline style. 256×256px.

**Memory Cell (Lymphocyte)**
> Smooth round cell. Purple tint `#AFA9EC`. Small star mark `★` or bookmark shape on the cell surface in `#7F77DD`. Simple flat circle with the marker. 256×256px.

**Zone effect overlays (512×512px each)**
> These are tinted overlays placed on organ zones in-game:
> - Inflammation overlay: red-orange `#E24B4A` at 25% opacity, with faint jagged edge border marks
> - Fever overlay: amber `#EF9F27` at 20% opacity, with faint wavy heat lines
> - Clear/healed overlay: teal `#1D9E75` at 15% opacity, clean

---

## ORGAN ZONE MAP (BODY SILHOUETTE)

**Body map base (1080×1080 PNG)**
> Top-down 2D schematic of a human body from head to torso. NOT realistic — simplified, clean, clinical. Think a medical diagram or anatomy poster rendered flat. Head (ellipse) connects to torso (rounded rectangle). All internal organs visible as distinct labeled flat zones:
>
> - Brain: purple `#7F77DD` zone inside head
> - Lungs: teal `#1D9E75` two-lobe shape in upper chest
> - Heart: coral-red `#D85A30` small shape center chest
> - Lymph Nodes: blue `#378ADD` small clusters along neck and chest sides
> - Gut: amber `#BA7517` rounded shape lower abdomen
> - Bloodstream: dashed crimson `#E24B4A` thin vein lines connecting all zones
>
> Each zone clearly outlined (1px border, same hue but darker). Zone name label inside each zone in Courier New 10px white. Dark background `#050d0a`. All flat, no gradients, no glow.

**Body map — infected state overlay per zone (6 separate 1080×1080 PNGs)**
> One per zone. Same map, but target zone is overlaid with `#E24B4A` at 40% opacity + small biohazard or dot cluster marks inside that zone only.

**Body map — cleared state overlay per zone (6 PNGs)**
> Same but `#1D9E75` overlay at 30%, with a small checkmark or clean indicator.

---

## TIPS FOR GENERATING IN GEMINI

1. Start every prompt with: `"Flat vector game UI asset, transparent PNG background, Courier New monospace font, dark biohazard terminal aesthetic — NO gradients, NO glow, NO neon, NO drop shadows, NO rounded corners beyond rx=3"`

2. For consistency across all assets add at the end: `"Consistent with a clinical military medical terminal UI, muted dark green and black color scheme, same art direction as all other assets in this game set"`

3. If output is too bright/neon, add: `"Desaturated, muted tones only, no electric glow, think CDC data dashboard not sci-fi"`

4. If output is too futuristic, add: `"NOT futuristic. NOT holographic. Clinical, grounded, medical records aesthetic"`

5. If fonts look wrong, add: `"Monospace terminal font only, Courier New, no sans-serif, no rounded typefaces"`

6. For sprites (cells, viruses), if output is too detailed: `"Simple flat shapes, bold outlines, 4-color maximum, like vector clip art not illustration"`

7. Export all files at listed sizes. Godot handles PNG sprites well. Use 256×256 for entities, exact pixel sizes for UI panels. Always transparent backgrounds.
