import { AssetCard } from '../AssetCard';
import { FullScreenMockup } from '../FullScreenMockup';

export function MainMenuScreen() {
  const assets = [
    {
      title: '1A. BACKGROUND BASE',
      size: '1920×1080 PNG',
      description: 'The main menu backdrop - a dark clinical terminal screen with subtle hexagonal biohazard grid pattern suggesting a medical monitoring system',
      usage: 'Use TextureRect with Stretch Mode set to "Keep Aspect Covered" as the background layer for main menu scene. Place behind all other UI elements.',
      preview: (
        <div className="w-full h-32 bg-[#050d0a] rounded-sm relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#0a1f12_0%,_#050d0a_100%)]" />
          <svg className="absolute inset-0 w-full h-full opacity-5">
            <pattern id="hexagons" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <polygon points="10,0 15,5 15,15 10,20 5,15 5,5" fill="none" stroke="#1D9E75" strokeWidth="0.5"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#hexagons)" />
          </svg>
        </div>
      )
    },
    {
      title: '1B. TITLE LOCKUP',
      size: '900×250 PNG',
      description: 'The game logo and title - "CATCH ME IF YOU CAN" with "HOST DEFENSE SYSTEM" header and tagline, styled as a military medical terminal interface',
      usage: 'Apply to TextureRect centered at top-center of screen. Position at approximately y=200-280px. Maintain aspect ratio.',
      preview: (
        <div className="text-center">
          <div className="text-[#5DCAA5] text-[8px] tracking-[4px] mb-1">HOST DEFENSE SYSTEM</div>
          <div className="text-[#e8f5f0] text-xl font-bold tracking-tight">CATCH ME</div>
          <div className="text-[#e8f5f0] text-xl font-bold tracking-tight">IF YOU CAN</div>
          <div className="text-[#5DCAA5] text-[8px] tracking-[2px] mt-1">OUTSMART THE VIRUS. SAVE THE HOST.</div>
        </div>
      )
    },
    {
      title: '1C. MENU BUTTON — NORMAL',
      size: '300×44 PNG',
      description: 'Blank menu button template in default state - green outlined rectangle with tactical corner brackets. Reusable for all main menu options (DEPLOY, DIFFICULTY, TERMINATE)',
      usage: 'Apply to TextureButton "Texture Normal" property. Layer a Label node centered on top to add button text. Reuse this same PNG for all three menu buttons by just changing the Label text.',
      preview: (
        <div className="relative inline-block">
          <div className="w-40 h-8 bg-[#0d2016] border-[1.5px] border-[#1D9E75] rounded-sm flex items-center justify-center">
            {/* No text - blank button */}
          </div>
          <div className="absolute top-1 left-1 w-3 h-3 border-l-2 border-t-2 border-[#1D9E75]" />
          <div className="absolute top-1 right-1 w-3 h-3 border-r-2 border-t-2 border-[#1D9E75]" />
          <div className="absolute bottom-1 left-1 w-3 h-3 border-l-2 border-b-2 border-[#1D9E75]" />
          <div className="absolute bottom-1 right-1 w-3 h-3 border-r-2 border-b-2 border-[#1D9E75]" />
        </div>
      )
    },
    {
      title: '1D. MENU BUTTON — HOVERED',
      size: '300×44 PNG',
      description: 'Blank menu button template when hovered - filled with bright green to indicate it\'s ready to activate. Reusable for all menu buttons',
      usage: 'Apply to TextureButton "Texture Hover" property. Godot will automatically swap between normal and hover states on mouse enter/exit. Layer a Label node (with dark text) on top for button text.',
      preview: (
        <div className="relative inline-block">
          <div className="w-40 h-8 bg-[#1D9E75] border-[1.5px] border-[#1D9E75] rounded-sm flex items-center justify-center">
            {/* No text - blank button */}
          </div>
          <div className="absolute top-1 left-1 w-3 h-3 border-l-2 border-t-2 border-[#1D9E75]" />
          <div className="absolute top-1 right-1 w-3 h-3 border-r-2 border-t-2 border-[#1D9E75]" />
          <div className="absolute bottom-1 left-1 w-3 h-3 border-l-2 border-b-2 border-[#1D9E75]" />
          <div className="absolute bottom-1 right-1 w-3 h-3 border-r-2 border-b-2 border-[#1D9E75]" />
        </div>
      )
    },
    {
      title: '1F. STATUS BAR STRIP',
      size: '1920×32 PNG',
      description: 'Top status bar showing system readiness indicator and version number - mimics a terminal command line interface',
      usage: 'Use TextureRect anchored to top edge (y=0) spanning full screen width. Optional: create as 9-slice NinePatchRect for flexible resizing.',
      preview: (
        <div className="w-full h-6 bg-[#070f09] border-b border-[#1D9E75] border-opacity-30 flex items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-[#1D9E75] opacity-50" />
            <span className="text-[#1D9E75] text-[9px] tracking-[2px] opacity-50">SYS.READY</span>
          </div>
          <span className="text-[#1D9E75] text-[9px] tracking-[1px] opacity-50">v1.0.0 // BSCS 3-1</span>
        </div>
      )
    },
    {
      title: '1G. CORNER BRACKET DECORATION',
      size: '24×24 PNG (4 variants)',
      description: 'Tactical corner brackets used throughout the UI to frame panels and cards - gives the biohazard terminal aesthetic',
      usage: 'Place 4 TextureRect nodes at corners of panels/cards. Position TL at (0,0), TR at (width-24,0), BL at (0,height-24), BR at (width-24,height-24) relative to parent.',
      preview: (
        <div className="flex gap-4">
          <div className="w-6 h-6 border-l-2 border-t-2 border-[#1D9E75]" />
          <div className="w-6 h-6 border-r-2 border-t-2 border-[#1D9E75]" />
          <div className="w-6 h-6 border-l-2 border-b-2 border-[#1D9E75]" />
          <div className="w-6 h-6 border-r-2 border-b-2 border-[#1D9E75]" />
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h2 className="text-[#5DCAA5] text-sm tracking-[5px] mb-2">SCREEN 1 — MAIN MENU</h2>
        <p className="text-[#3d6b55] text-xs">Full-screen 1920×1080. Dark deep-green background. Centered layout with title, menu buttons, and status bars.</p>
      </div>

      <div className="bg-[#1D9E75] bg-opacity-20 border border-[#1D9E75] rounded-sm p-4">
        <div className="text-[#e8f5f0] text-xs font-bold mb-2">⚠️ IMPORTANT: BLANK BUTTON TEMPLATES</div>
        <p className="text-[#5DCAA5] text-xs leading-relaxed">
          Menu buttons (1C, 1D) are provided as <span className="text-[#e8f5f0] font-bold">BLANK TEMPLATES</span> without text.
          In Godot, layer <span className="text-[#e8f5f0]">Label nodes</span> on top to add button text (DEPLOY, DIFFICULTY, TERMINATE).
          This allows you to reuse one PNG for all three menu buttons instead of creating separate images for each.
        </p>
      </div>

      <FullScreenMockup title="Complete main menu layout showing all elements together">
        <svg width="100%" viewBox="0 0 1920 1080" className="w-full">
          {/* Background */}
          <defs>
            <linearGradient id="bggrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0a1a12"/>
              <stop offset="100%" stopColor="#050d0a"/>
            </linearGradient>
            <pattern id="hexagons-main" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <polygon points="20,0 30,10 30,30 20,40 10,30 10,10" fill="none" stroke="#1D9E75" strokeWidth="0.5" opacity="0.03"/>
            </pattern>
          </defs>
          <rect width="1920" height="1080" fill="url(#bggrad)"/>
          <rect width="1920" height="1080" fill="url(#hexagons-main)"/>

          {/* Radial pulse */}
          <ellipse cx="960" cy="540" rx="440" ry="360" fill="#0d2016" opacity="0.6"/>
          <ellipse cx="960" cy="540" rx="300" ry="260" fill="#0d2016" opacity="0.5"/>
          <circle cx="960" cy="540" r="4" fill="#1D9E75" opacity="0.8"/>

          {/* Top status bar */}
          <line x1="0" y1="52" x2="1920" y2="52" stroke="#1D9E75" strokeWidth="0.5" opacity="0.3"/>
          <text x="960" y="36" textAnchor="middle" fill="#1D9E75" fontSize="18" fontFamily="'Courier New',monospace" letterSpacing="8" opacity="0.6">POLYTECHNIC UNIVERSITY OF THE PHILIPPINES</text>
          <rect x="100" y="42" width="12" height="12" fill="#1D9E75" opacity="0.5"/>
          <text x="120" y="54" fill="#1D9E75" fontSize="18" fontFamily="'Courier New',monospace" letterSpacing="4" opacity="0.5">SYS.READY</text>

          {/* Title section */}
          <text x="960" y="280" textAnchor="middle" fill="#5DCAA5" fontSize="22" fontFamily="'Courier New',monospace" letterSpacing="12" opacity="0.7">HOST DEFENSE SYSTEM</text>
          <text x="960" y="400" textAnchor="middle" fill="#e8f5f0" fontSize="96" fontFamily="'Courier New',monospace" fontWeight="bold" letterSpacing="-2">CATCH ME</text>
          <text x="960" y="500" textAnchor="middle" fill="#e8f5f0" fontSize="96" fontFamily="'Courier New',monospace" fontWeight="bold" letterSpacing="-2">IF YOU CAN</text>
          <text x="960" y="560" textAnchor="middle" fill="#5DCAA5" fontSize="24" fontFamily="'Courier New',monospace" opacity="0.6" letterSpacing="4">OUTSMART THE VIRUS. SAVE THE HOST.</text>

          {/* Menu buttons */}
          <rect x="760" y="620" width="400" height="68" rx="4" fill="#1D9E75" stroke="#1D9E75" strokeWidth="3"/>
          <text x="960" y="662" textAnchor="middle" fill="#050d0a" fontSize="24" fontFamily="'Courier New',monospace" fontWeight="bold" letterSpacing="8">DEPLOY</text>

          <rect x="760" y="700" width="400" height="60" rx="4" fill="none" stroke="#1a3a2a" strokeWidth="2"/>
          <text x="960" y="738" textAnchor="middle" fill="#5F5E5A" fontSize="22" fontFamily="'Courier New',monospace" letterSpacing="6">DIFFICULTY</text>

          <rect x="760" y="772" width="400" height="60" rx="4" fill="none" stroke="#1a3a2a" strokeWidth="2"/>
          <text x="960" y="810" textAnchor="middle" fill="#5F5E5A" fontSize="22" fontFamily="'Courier New',monospace" letterSpacing="6">TERMINATE</text>

          {/* Bottom status bar */}
          <line x1="0" y1="1028" x2="1920" y2="1028" stroke="#1D9E75" strokeWidth="0.5" opacity="0.3"/>
          <rect x="100" y="1036" width="12" height="12" fill="#1D9E75" opacity="0.3"/>
          <text x="120" y="1048" fill="#1D9E75" fontSize="18" fontFamily="'Courier New',monospace" opacity="0.5" letterSpacing="4">SYS.READY</text>
          <text x="1820" y="1048" textAnchor="end" fill="#1D9E75" fontSize="18" fontFamily="'Courier New',monospace" opacity="0.5" letterSpacing="2">v1.0.0 // BSCS 3-1</text>
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
