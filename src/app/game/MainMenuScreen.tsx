import { motion } from "motion/react";

interface MainMenuScreenProps {
  onStartGame: () => void;
}

export function MainMenuScreen({ onStartGame }: MainMenuScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[#050d0a] flex flex-col items-center justify-center relative overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#0a1f12_0%,_#050d0a_100%)]" />

      {/* Hexagonal background */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full">
          <pattern id="hexagons" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <polygon points="20,0 30,10 30,30 20,40 10,30 10,10" fill="none" stroke="#1D9E75" strokeWidth="0.5" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#hexagons)" />
        </svg>
      </div>

      {/* Pulsing center */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute w-96 h-96 rounded-full bg-[#0d2016] blur-3xl"
      />

      {/* Top status bar */}
      <div className="absolute top-0 left-0 right-0 border-b border-[#1D9E75] border-opacity-30 py-3 px-6 flex items-center justify-between z-10">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-[#1D9E75] opacity-50" />
          <span className="text-[#1D9E75] text-xs tracking-[2px] opacity-50">SYS.READY</span>
        </div>
        <span className="text-[#1D9E75] text-xs tracking-[1px] opacity-50">POLYTECHNIC UNIVERSITY OF THE PHILIPPINES</span>
      </div>

      {/* Title section */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="text-center mb-16 z-10"
      >
        <div className="text-[#5DCAA5] text-sm tracking-[12px] mb-4 opacity-70">HOST DEFENSE SYSTEM</div>
        <h1 className="text-8xl font-bold text-[#e8f5f0] mb-2 tracking-tight">CATCH ME</h1>
        <h1 className="text-8xl font-bold text-[#e8f5f0] mb-6 tracking-tight">IF YOU CAN</h1>
        <div className="text-[#5DCAA5] text-base tracking-[4px] opacity-60">OUTSMART THE VIRUS. SAVE THE HOST.</div>
      </motion.div>

      {/* Menu buttons */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="flex flex-col gap-3 z-10"
      >
        <motion.button
          onClick={onStartGame}
          whileHover={{
            scale: 1.05,
            backgroundColor: "#1D9E75",
            boxShadow: "0 0 30px rgba(29, 158, 117, 0.5)"
          }}
          whileTap={{ scale: 0.95 }}
          className="relative w-96 h-16 bg-[#0d2016] border-2 border-[#1D9E75] rounded-sm flex items-center justify-center group transition-colors"
        >
          <span className="text-[#1D9E75] group-hover:text-[#050d0a] text-sm tracking-[8px] font-bold transition-colors">DEPLOY</span>
          <div className="absolute top-1 left-1 w-4 h-4 border-l-2 border-t-2 border-[#1D9E75]" />
          <div className="absolute top-1 right-1 w-4 h-4 border-r-2 border-t-2 border-[#1D9E75]" />
          <div className="absolute bottom-1 left-1 w-4 h-4 border-l-2 border-b-2 border-[#1D9E75]" />
          <div className="absolute bottom-1 right-1 w-4 h-4 border-r-2 border-b-2 border-[#1D9E75]" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          className="w-96 h-14 bg-transparent border border-[#1a3a2a] rounded-sm flex items-center justify-center"
        >
          <span className="text-[#3d6b55] text-sm tracking-[6px]">SETTINGS</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          className="w-96 h-14 bg-transparent border border-[#1a3a2a] rounded-sm flex items-center justify-center"
        >
          <span className="text-[#3d6b55] text-sm tracking-[6px]">TERMINATE</span>
        </motion.button>
      </motion.div>

      {/* Bottom status bar */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-[#1D9E75] border-opacity-30 py-3 px-6 flex items-center justify-between z-10">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-[#1D9E75] opacity-30" />
          <span className="text-[#1D9E75] text-xs tracking-[4px] opacity-50">SYS.READY</span>
        </div>
        <span className="text-[#1D9E75] text-xs tracking-[2px] opacity-50">v1.0.0 // BSCS 3-1</span>
      </div>
    </motion.div>
  );
}
