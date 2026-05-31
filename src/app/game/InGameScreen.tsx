import { motion } from "motion/react";
import { useState } from "react";
import BodyImage from "../../imports/Body.png";

type Difficulty = 'CASUAL' | 'EPIDEMIC' | 'PANDEMIC';

interface InGameScreenProps {
  energy: number;
  severity: number;
  difficulty: Difficulty;
  round: number;
  onUseAction: (cost: number) => void;
  onNextRound: () => void;
}

export function InGameScreen({
  energy,
  severity,
  difficulty,
  round,
  onUseAction,
  onNextRound
}: InGameScreenProps) {
  const [showPause, setShowPause] = useState(false);
  const [infectionRate] = useState(34);
  const [activeMutation] = useState("ANTIGENIC DRIFT");
  
  // Organ infection levels (0-100%)
  const [organs] = useState([
    { name: 'BRAIN', infection: 15, color: '#1D9E75' },
    { name: 'LUNGS', infection: 65, color: '#E24B4A' },
    { name: 'HEART', infection: 20, color: '#1D9E75' },
    { name: 'LYMPH', infection: 70, color: '#EF9F27' }
  ]);

  const actions = [
    { name: 'White Blood Cell', description: 'Deploy immune cells to fight virus', cost: 20, color: '#1D9E75' },
    { name: 'Antibody Production', description: 'Generate antibodies to neutralize virus', cost: 25, color: '#1D9E75' },
    { name: 'Fever Response', description: 'Raise temperature to slow virus spread', cost: 15, color: '#EF9F27' },
    { name: 'Inflammation', description: 'Activate inflammatory response', cost: 20, color: '#EF9F27' },
    { name: 'Macrophage', description: 'Send macrophages to consume virus', cost: 30, color: '#1D9E75' },
    { name: 'T-Cell Activation', description: 'Activate T-cells for targeted attack', cost: 25, color: '#1D9E75' }
  ];

  const handleActionClick = (cost: number) => {
    if (energy >= cost) {
      onUseAction(cost);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[#050d0a] p-4 flex flex-col"
    >
      {/* Top bar */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#1a3a2a]">
        <div className="flex items-center gap-6">
          <div>
            <div className="text-[#5DCAA5] text-xs tracking-[2px]">ROUND</div>
            <div className="text-[#e8f5f0] text-2xl font-bold">{round}</div>
          </div>
          <div>
            <div className="text-[#5DCAA5] text-xs tracking-[2px]">DIFFICULTY</div>
            <div className="text-[#EF9F27] text-sm font-bold">{difficulty}</div>
          </div>
        </div>
        
        <button
          onClick={() => setShowPause(true)}
          className="px-6 py-2 border border-[#3d6b55] text-[#3d6b55] text-xs tracking-[2px] hover:border-[#1D9E75] hover:text-[#1D9E75] transition-colors"
        >
          PAUSE
        </button>
      </div>

      {/* Main game area */}
      <div className="flex-1 flex gap-4">
        {/* Left sidebar - HOST STATUS (matching image.png) */}
        <div className="w-64 space-y-4">
          <div className="text-[#5DCAA5] text-xs tracking-[3px] mb-4">HOST STATUS</div>
          
          {/* Severity */}
          <div>
            <div className="text-[#5DCAA5] text-xs tracking-[2px] mb-2">SEVERITY</div>
            <div className="relative">
              <div className="w-full h-4 bg-[#0a1f12] border border-[#1a3a2a] rounded-sm overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${severity}%` }}
                  transition={{ duration: 0.5 }}
                  className="h-full"
                  style={{
                    background: severity > 50 ? '#E24B4A' : '#1D9E75'
                  }}
                />
              </div>
              <div className="absolute right-2 top-0 bottom-0 flex items-center">
                <span className="text-[#e8f5f0] text-xs font-bold">{severity}</span>
              </div>
            </div>
          </div>

          {/* Energy (EP) */}
          <div>
            <div className="text-[#5DCAA5] text-xs tracking-[2px] mb-2">ENERGY (EP)</div>
            <div className="relative">
              <div className="w-full h-4 bg-[#0a1f12] border border-[#1a3a2a] rounded-sm overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${energy}%` }}
                  transition={{ duration: 0.5 }}
                  className="h-full bg-[#1D9E75]"
                />
              </div>
              <div className="absolute right-2 top-0 bottom-0 flex items-center">
                <span className="text-[#e8f5f0] text-xs font-bold">{energy}</span>
              </div>
            </div>
          </div>

          {/* Infection Rate */}
          <div>
            <div className="text-[#5DCAA5] text-xs tracking-[2px] mb-2">INFECTION RATE</div>
            <div className="text-[#EF9F27] text-5xl font-bold tracking-wider">
              {String(infectionRate).padStart(3, '0')}
            </div>
          </div>

          {/* Active Mutation */}
          <div>
            <div className="text-[#5DCAA5] text-xs tracking-[2px] mb-2">ACTIVE MUTATION</div>
            <div className="border-2 border-[#EF9F27] bg-[#1a0d00] px-3 py-2 rounded-sm">
              <div className="text-[#EF9F27] text-xs tracking-[1px] text-center font-bold">
                {activeMutation}
              </div>
            </div>
          </div>

          {/* Organ Status */}
          <div>
            <div className="text-[#5DCAA5] text-xs tracking-[2px] mb-3">ORGAN STATUS</div>
            <div className="space-y-2">
              {organs.map((organ, index) => (
                <div key={index}>
                  <div className="flex items-center gap-2 mb-1">
                    <div
                      className="w-3 h-3 rounded-sm"
                      style={{ backgroundColor: organ.color }}
                    />
                    <div className="text-[#5DCAA5] text-xs">{organ.name}</div>
                  </div>
                  <div className="w-full h-2 bg-[#0a1f12] border border-[#1a3a2a] rounded-sm overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${organ.infection}%` }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="h-full"
                      style={{ backgroundColor: organ.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Next Round Button - Always clickable */}
          <motion.button
            onClick={onNextRound}
            whileHover={{
              scale: 1.05,
              backgroundColor: "#1D9E75",
              boxShadow: "0 0 30px rgba(29, 158, 117, 0.5)"
            }}
            whileTap={{ scale: 0.95 }}
            className="w-full py-4 rounded-sm text-sm tracking-[4px] font-bold bg-[#0d2016] border-2 border-[#1D9E75] text-[#1D9E75] transition-all mt-4"
          >
            NEXT ROUND
          </motion.button>
        </div>

        {/* Center - Body Map */}
        <div className="flex-1 flex items-center justify-center border-2 border-[#1a3a2a] rounded-sm bg-[#0a1f12] bg-opacity-30">
          <div className="text-center">
            <img
              src={BodyImage}
              alt="Human body infection map"
              className="max-w-full max-h-[600px] object-contain"
            />
          </div>
        </div>

        {/* Right sidebar - Actions */}
        <div className="w-80 space-y-3 overflow-y-auto">
          <div className="text-[#5DCAA5] text-xs tracking-[3px] mb-2">IMMUNE ACTIONS</div>
          {actions.map((action, index) => {
            const canAfford = energy >= action.cost;
            return (
              <motion.button
                key={index}
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handleActionClick(action.cost)}
                disabled={!canAfford}
                whileHover={canAfford ? {
                  scale: 1.02,
                  boxShadow: `0 0 20px ${action.color}40`
                } : {}}
                whileTap={canAfford ? { scale: 0.98 } : {}}
                className={`w-full text-left rounded-sm overflow-hidden transition-all ${
                  canAfford ? 'cursor-pointer' : 'cursor-not-allowed opacity-40'
                }`}
                style={{
                  border: `1px solid ${action.color}`,
                  backgroundColor: canAfford ? '#0a1f12' : '#0a1210'
                }}
              >
                {/* Header */}
                <div
                  className="px-3 py-2 border-b"
                  style={{
                    borderColor: action.color,
                    backgroundColor: canAfford ? `${action.color}20` : `${action.color}10`
                  }}
                >
                  <div className="text-xs font-bold tracking-[1px]" style={{ color: action.color }}>
                    {action.name}
                  </div>
                </div>

                {/* Body */}
                <div className="p-3">
                  <div className="text-[#5DCAA5] text-xs mb-2">{action.description}</div>
                  <div className="flex items-center justify-between">
                    <div className="text-[#7F77DD] text-xs">COST:</div>
                    <div className="text-[#7F77DD] text-sm font-bold">{action.cost} EP</div>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Pause Menu Overlay */}
      {showPause && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-[#050d0a] bg-opacity-90 flex items-center justify-center z-50"
        >
          <div className="bg-[#0a1f12] border-2 border-[#1D9E75] rounded-sm p-8 w-96">
            <h2 className="text-[#1D9E75] text-2xl font-bold tracking-[4px] mb-6 text-center">PAUSED</h2>
            <div className="space-y-3">
              <button
                onClick={() => setShowPause(false)}
                className="w-full py-3 bg-[#1D9E75] text-[#050d0a] font-bold tracking-[3px] text-sm rounded-sm hover:bg-[#2DB88A] transition-colors"
              >
                RESUME
              </button>
              <button className="w-full py-3 border border-[#3d6b55] text-[#3d6b55] font-bold tracking-[3px] text-sm rounded-sm hover:border-[#1D9E75] hover:text-[#1D9E75] transition-colors">
                SETTINGS
              </button>
              <button className="w-full py-3 border border-[#E24B4A] text-[#E24B4A] font-bold tracking-[3px] text-sm rounded-sm hover:bg-[#E24B4A] hover:text-white transition-colors">
                QUIT TO MENU
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
