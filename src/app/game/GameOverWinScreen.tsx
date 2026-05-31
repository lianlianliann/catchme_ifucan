import { motion } from "motion/react";

interface GameOverWinScreenProps {
  onRestart: () => void;
}

export function GameOverWinScreen({ onRestart }: GameOverWinScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[#020a04] flex flex-col items-center justify-center relative overflow-hidden"
    >
      {/* Green glow background */}
      <div className="absolute inset-0 bg-[#1D9E75] opacity-5" />

      {/* Hexagonal background */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full">
          <pattern id="hex-win" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <polygon points="20,0 30,10 30,30 20,40 10,30 10,10" fill="none" stroke="#1D9E75" strokeWidth="0.5" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#hex-win)" />
        </svg>
      </div>

      {/* Scaling emblem with pulsing glow */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", damping: 15, stiffness: 80 }}
        className="relative mb-16 z-10"
      >
        <motion.div
          animate={{ boxShadow: ["0 0 20px rgba(29, 158, 117, 0.3)", "0 0 40px rgba(29, 158, 117, 0.6)", "0 0 20px rgba(29, 158, 117, 0.3)"] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-64 h-64 rounded-full border-4 border-[#1D9E75] flex items-center justify-center"
        >
          <div className="w-52 h-52 rounded-full bg-[#0d2016] border-2 border-[#1D9E75] flex flex-col items-center justify-center">
            <div className="text-[#1D9E75] text-lg tracking-[2px]">THREAT</div>
            <div className="text-[#1D9E75] text-lg tracking-[2px]">NEUTRALIZED</div>
          </div>
        </motion.div>
      </motion.div>

      {/* Title */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center mb-12 z-10"
      >
        <h1 className="text-[#e8f5f0] text-8xl font-bold mb-4 tracking-wide">VICTORY</h1>
        <div className="text-[#5DCAA5] text-lg">HOST FULLY RECOVERED</div>
      </motion.div>

      {/* Button */}
      <motion.button
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7 }}
        onClick={onRestart}
        whileHover={{
          scale: 1.05,
          boxShadow: "0 0 30px rgba(29, 158, 117, 0.5)",
          backgroundColor: "#1D9E75"
        }}
        whileTap={{ scale: 0.95 }}
        className="bg-[#0d2016] border-2 border-[#1D9E75] text-[#1D9E75] px-16 py-4 rounded-sm text-sm tracking-[6px] font-bold transition-colors z-10"
      >
        MAIN MENU
      </motion.button>
    </motion.div>
  );
}
