import { motion } from "motion/react";
import { DifficultyMode } from "../../game_logic/GameLogic";

interface DifficultySelectScreenProps {
  onSelectDifficulty: (difficulty: DifficultyMode) => void;
}

export function DifficultySelectScreen({ onSelectDifficulty }: DifficultySelectScreenProps) {
  const difficulties = [
    {
      id: 'Casual' as const, // Changed to match GameLogic
      title: 'CASUAL',
      level: 'I',
      color: '#1D9E75',
      bgColor: '#0a1f12',
      features: [
        'TURN-BASED',
        'Mutation telegraphed',
        'Every 2 rounds',
        'Generous EP regen',
        'Entry: Lungs only'
      ]
    },
    {
      id: 'Epidemic' as const, // Changed to match GameLogic
      title: 'EPIDEMIC',
      level: 'II',
      color: '#EF9F27',
      bgColor: '#0f1a0a',
      features: [
        'TURN-BASED',
        'No mutation warning',
        'Every round',
        'Standard EP regen',
        'Entry: Lungs only'
      ]
    },
    {
      id: 'Pandemic' as const, // Changed to match GameLogic
      title: 'PANDEMIC',
      level: 'III',
      color: '#E24B4A',
      bgColor: '#1a0a0a',
      features: [
        'HYBRID REAL-TIME',
        'No mutation warning',
        'Every round',
        'Reduced EP regen',
        '3 random entry points'
      ]
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[#050d0a] flex flex-col items-center justify-center p-8"
    >
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mb-12 text-center"
      >
        <div className="text-[#5DCAA5] text-xs tracking-[10px] mb-4 opacity-70">SELECT INFECTION SCENARIO</div>
        <div className="w-full h-px bg-[#1D9E75] opacity-30" />
      </motion.div>

      {/* Difficulty cards */}
      <div className="flex gap-12 mb-8">
        {difficulties.map((diff, index) => (
          <motion.button
            key={diff.id}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.15 }}
            onClick={() => onSelectDifficulty(diff.id)}
            whileHover={{
              scale: 1.05,
              boxShadow: `0 0 40px ${diff.color}50`
            }}
            whileTap={{ scale: 0.98 }}
            className="relative w-72 rounded-sm overflow-hidden"
            style={{
              backgroundColor: diff.bgColor,
              border: `2px solid ${diff.color}`
            }}
          >
            {/* Corner brackets */}
            <div className="absolute top-1 left-1 w-4 h-4 border-l-2 border-t-2" style={{ borderColor: diff.color }} />
            <div className="absolute top-1 right-1 w-4 h-4 border-r-2 border-t-2" style={{ borderColor: diff.color }} />
            <div className="absolute bottom-1 left-1 w-4 h-4 border-l-2 border-b-2" style={{ borderColor: diff.color }} />
            <div className="absolute bottom-1 right-1 w-4 h-4 border-r-2 border-b-2" style={{ borderColor: diff.color }} />

            {/* Header - Updated conditional checks to match Title Case */}
            <div className="py-4" style={{ backgroundColor: diff.id === 'Casual' ? '#1D9E75' : diff.id === 'Epidemic' ? '#BA7517' : '#A32D2D' }}>
              <span className={`text-xs tracking-[2px] font-bold ${diff.id === 'Pandemic' ? 'text-white' : 'text-[#050d0a]'}`}>
                {diff.title}
              </span>
            </div>

            {/* Features */}
            <div className="p-6 space-y-3 text-center">
              {diff.features.map((feature, i) => (
                <div
                  key={i}
                  className={`text-xs ${i === 0 ? 'tracking-[2px] font-semibold' : ''}`}
                  style={{ color: diff.color }}
                >
                  {feature}
                </div>
              ))}

              {/* Level */}
              <div className="pt-4 text-4xl font-bold" style={{ color: diff.color }}>
                {diff.level}
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Instruction */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-[#3d6b55] text-xs tracking-[4px]"
      >
        CLICK CARD TO SELECT SCENARIO
      </motion.div>
    </motion.div>
  );
}