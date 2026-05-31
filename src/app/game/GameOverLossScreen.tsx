import { motion } from "motion/react";

interface GameOverLossScreenProps {
  onRestart: () => void;
}

export function GameOverLossScreen({ onRestart }: GameOverLossScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[#0a0202] flex flex-col items-center justify-center relative overflow-hidden"
    >
      {/* Pulsing red background */}
      <motion.div
        animate={{ opacity: [0.05, 0.1, 0.05] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute inset-0 bg-[#E24B4A]"
      />

      {/* Hexagonal background */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full">
          <pattern id="hex-loss" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <polygon points="20,0 30,10 30,30 20,40 10,30 10,10" fill="none" stroke="#E24B4A" strokeWidth="0.5" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#hex-loss)" />
        </svg>
      </div>

      {/* Harsh drop-in emblem */}
      <motion.div
        initial={{ y: -500, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", damping: 12, stiffness: 100 }}
        className="relative mb-16 z-10"
      >
        <div className="w-64 h-64 rounded-full border-4 border-[#E24B4A] flex items-center justify-center">
          <div className="w-52 h-52 rounded-full bg-[#1a0505] border-2 border-[#E24B4A] flex flex-col items-center justify-center">
            <div className="text-[#E24B4A] text-lg tracking-[2px]">HOST</div>
            <div className="text-[#E24B4A] text-lg tracking-[2px]">COMPROMISED</div>
          </div>
        </div>
      </motion.div>

      {/* Title */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-center mb-12 z-10"
      >
        <h1 className="text-white text-8xl font-bold mb-4 tracking-wide">GAME OVER</h1>
        <div className="text-[#E24B4A] text-lg">SEVERITY REACHED 100%</div>
      </motion.div>

      {/* Button */}
      <motion.button
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        onClick={onRestart}
        whileHover={{
          scale: 1.05,
          boxShadow: "0 0 30px rgba(226, 75, 74, 0.5)",
          backgroundColor: "#E24B4A"
        }}
        whileTap={{ scale: 0.95 }}
        className="border-2 border-[#E24B4A] text-[#E24B4A] px-16 py-4 rounded-sm text-sm tracking-[6px] font-bold transition-colors z-10"
      >
        RETRY
      </motion.button>
    </motion.div>
  );
}
