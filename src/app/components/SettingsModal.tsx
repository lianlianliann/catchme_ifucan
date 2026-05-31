// src/app/components/SettingsModal.tsx
import { motion } from "motion/react";
import { useState, useEffect } from "react";

interface SettingsModalProps {
  onClose: () => void;
  difficulty?: string;
}

export function SettingsModal({ onClose, difficulty }: SettingsModalProps) {
  const [volume, setVolume] = useState(80);
  const [crtFilter, setCrtFilter] = useState(true);

  // Load saved settings when the modal opens
  useEffect(() => {
    const savedVolume = localStorage.getItem('cmiyc_volume');
    const savedCrt = localStorage.getItem('cmiyc_crt');
    
    if (savedVolume !== null) setVolume(Number(savedVolume));
    if (savedCrt !== null) setCrtFilter(savedCrt === 'true');
  }, []);

  // Save settings and close
  const handleSave = () => {
    localStorage.setItem('cmiyc_volume', volume.toString());
    localStorage.setItem('cmiyc_crt', crtFilter.toString());
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-[#050d0a] bg-opacity-95 flex items-center justify-center z-[60]"
    >
      <div className="bg-[#0a1f12] border-2 border-[#1D9E75] rounded-sm p-8 w-96 shadow-[0_0_15px_rgba(29,158,117,0.2)]">
        <h2 className="text-[#1D9E75] text-2xl font-bold tracking-[4px] mb-6 text-center">SYSTEM SETTINGS</h2>
        
        <div className="space-y-6">
          {difficulty && (
            <div className="pb-4 border-b border-[#1a3a2a]">
              <div className="text-[#5DCAA5] text-xs tracking-[2px] mb-1">CURRENT DIFFICULTY</div>
              <div className="text-[#EF9F27] font-bold tracking-[2px]">{difficulty}</div>
            </div>
          )}

          <div>
            <div className="text-[#5DCAA5] text-xs tracking-[2px] mb-2 flex justify-between">
              <span>MASTER VOLUME</span>
              <span>{volume}%</span>
            </div>
            <input 
              type="range" 
              min="0" max="100" 
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="w-full accent-[#1D9E75]" 
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="text-[#5DCAA5] text-xs tracking-[2px]">CRT SCANLINE FILTER</div>
            <button 
              onClick={() => setCrtFilter(!crtFilter)}
              className={`px-4 py-1 border text-xs font-bold tracking-[2px] ${
                crtFilter 
                  ? 'bg-[#1D9E75] text-[#050d0a] border-[#1D9E75]' 
                  : 'border-[#3d6b55] text-[#3d6b55]'
              }`}
            >
              {crtFilter ? 'ON' : 'OFF'}
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-8">
          <button
            onClick={onClose}
            className="flex-1 py-3 border border-[#3d6b55] text-[#3d6b55] font-bold tracking-[3px] text-sm rounded-sm hover:border-[#E24B4A] hover:text-[#E24B4A] transition-colors"
          >
            CANCEL
          </button>
          <button
            onClick={handleSave}
            className="flex-1 py-3 bg-[#1D9E75] text-[#050d0a] font-bold tracking-[3px] text-sm rounded-sm hover:bg-[#2DB88A] transition-colors shadow-[0_0_10px_rgba(29,158,117,0.3)]"
          >
            SAVE
          </button>
        </div>
      </div>
    </motion.div>
  );
}