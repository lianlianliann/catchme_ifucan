import { motion } from "motion/react";
import { useState, useEffect, useRef } from "react";
import BodyImage from "../../imports/Body.png";
import { useGame } from "../../context/GameContext";
import { DEFENSE_EP_COSTS, RECLAMATION_THRESHOLD } from "../../game_logic/GameLogic";

interface InGameScreenProps {
  onNextRound: () => void;
  onQuitToMenu: () => void;
}

export function InGameScreen({ onNextRound, onQuitToMenu }: InGameScreenProps) {
  const { state, deployDefenseUnit } = useGame();
  const [showPause, setShowPause] = useState(false);
  const [selectedZone, setSelectedZone] = useState<string>("Lungs");
  const logEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [state.logFeed]);

  const actions = [
    { id: 'WhiteBloodCells', name: 'White Blood Cell', description: 'Deploy immune cells to patrol the zone', color: '#1D9E75' },
    { id: 'Antibodies', name: 'Antibody Production', description: 'Target specific viral strains', color: '#1D9E75' },
    { id: 'Inflammation', name: 'Inflammation', description: 'Quarantine the zone (causes minor host damage)', color: '#EF9F27' },
    { id: 'FeverResponse', name: 'Fever Response', description: 'Global viral slowdown for two rounds', color: '#EF9F27' },
    { id: 'MemoryCells', name: 'Memory Cells', description: 'Counter previously seen mutations rapidly', color: '#1D9E75' },
    { id: 'CytokineBurst', name: 'Cytokine Burst', description: 'Massive damage (+10% Severity penalty)', color: '#E24B4A' }
  ];

  const organNames = Object.keys(state.organGraph.zones);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-h-screen bg-[#050d0a] p-4 flex flex-col">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#1a3a2a]">
        <div className="flex items-center gap-6">
          <div>
            <div className="text-[#5DCAA5] text-xs tracking-[2px]">ROUND</div>
            <div className="text-[#e8f5f0] text-2xl font-bold">{state.roundNumber}</div>
          </div>
          <div>
            <div className="text-[#5DCAA5] text-xs tracking-[2px]">DIFFICULTY</div>
            <div className="text-[#EF9F27] text-sm font-bold uppercase">{state.difficulty}</div>
          </div>
        </div>
        <button onClick={() => setShowPause(true)} className="px-6 py-2 border border-[#3d6b55] text-[#3d6b55] text-xs tracking-[2px] hover:border-[#1D9E75] hover:text-[#1D9E75] transition-colors">
          PAUSE
        </button>
      </div>

      <div className="flex-1 flex gap-4">
        {/* Left sidebar - HOST STATUS */}
        <div className="w-64 flex flex-col space-y-4">
          <div className="text-[#5DCAA5] text-xs tracking-[3px] mb-2">HOST STATUS</div>
          
          <div>
            <div className="text-[#5DCAA5] text-xs tracking-[2px] mb-2">SEVERITY INDEX</div>
            <div className="relative">
              <div className="w-full h-4 bg-[#0a1f12] border border-[#1a3a2a] rounded-sm overflow-hidden">
                <motion.div animate={{ width: `${state.severityIndex}%` }} transition={{ duration: 0.5 }} className="h-full" style={{ background: state.severityIndex > 75 ? '#E24B4A' : state.severityIndex > 40 ? '#EF9F27' : '#1D9E75' }} />
              </div>
              <div className="absolute right-2 top-0 bottom-0 flex items-center"><span className="text-[#e8f5f0] text-xs font-bold">{state.severityIndex}%</span></div>
            </div>
          </div>

          <div>
            <div className="text-[#5DCAA5] text-xs tracking-[2px] mb-2">ENERGY (EP)</div>
            <div className="text-[#1D9E75] text-3xl font-bold tracking-wider">{state.playerEp}</div>
          </div>

          <div>
            <div className="text-[#5DCAA5] text-xs tracking-[2px] mb-2">ACTIVE INFECTIONS</div>
            <div className="text-[#EF9F27] text-3xl font-bold tracking-wider">{state.infectionRate}</div>
          </div>

          <div>
            <div className="text-[#5DCAA5] text-xs tracking-[2px] mb-2">ACTIVE MUTATIONS</div>
            <div className="border-2 border-[#EF9F27] bg-[#1a0d00] p-2 rounded-sm min-h-[40px]">
              {state.activeMutations.length === 0 ? (
                <div className="text-[#EF9F27] text-xs tracking-[1px] text-center opacity-50">NONE</div>
              ) : (
                state.activeMutations.map(m => (
                  <div key={m} className="text-[#EF9F27] text-xs tracking-[1px] text-center font-bold mb-1">
                    {m.replace('_Mutation', '').replace(/_/g, ' ')}
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="flex-1">
            <div className="text-[#5DCAA5] text-xs tracking-[2px] mb-3 mt-4">ORGAN STATUS</div>
            <div className="space-y-3">
              {Object.values(state.organGraph.zones).map((organ) => (
                <div key={organ.name} className="mb-2">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-sm ${organ.isInfected ? 'bg-[#E24B4A]' : 'bg-[#1D9E75]'}`} />
                      <div className="text-[#5DCAA5] text-xs">{organ.name.toUpperCase()}</div>
                    </div>
                    <div className="text-[10px] text-[#3d6b55]">Defenses: {organ.activeDefenseCount}</div>
                  </div>
                  
                  {/* NEW: Reclamation Progress Bar (Only visible when zone is infected) */}
                  {organ.isInfected && (
                    <div className="w-full h-1 bg-[#0a1f12] border border-[#1a3a2a] rounded-sm overflow-hidden">
                      <motion.div 
                        animate={{ width: `${Math.min(100, (organ.reclamationProgress / RECLAMATION_THRESHOLD) * 100)}%` }} 
                        transition={{ duration: 0.5 }} 
                        className="h-full bg-[#7F77DD]" 
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <motion.button onClick={onNextRound} whileHover={{ scale: 1.05, backgroundColor: "#1D9E75", boxShadow: "0 0 30px rgba(29, 158, 117, 0.5)" }} whileTap={{ scale: 0.95 }} className="w-full py-4 rounded-sm text-sm tracking-[4px] font-bold bg-[#0d2016] border-2 border-[#1D9E75] text-[#1D9E75] transition-all">
            END TURN
          </motion.button>
        </div>

        {/* Center - Body Map & Terminal */}
        <div className="flex-1 flex flex-col gap-4">
          <div className="flex-1 flex items-center justify-center border-2 border-[#1a3a2a] rounded-sm bg-[#0a1f12] bg-opacity-30 relative p-4">
            <img src={BodyImage} alt="Human body infection map" className="max-w-full max-h-[500px] object-contain" />
          </div>
          
          <div className="h-48 border-2 border-[#1a3a2a] bg-[#050d0a] rounded-sm p-4 overflow-y-auto font-mono text-xs">
            <div className="text-[#5DCAA5] tracking-[2px] mb-2 sticky top-0 bg-[#050d0a] pb-2 border-b border-[#1a3a2a]">&gt; SYSTEM_LOG_FEED</div>
            {state.logFeed.map((log, i) => (
              <div key={i} className={`mb-1 ${log.includes('CRITICAL') || log.includes('WARNING') ? 'text-[#E24B4A]' : log.includes('✓') || log.includes('RECLAIMED') ? 'text-[#1D9E75]' : 'text-[#8ba89a]'}`}>
                {log}
              </div>
            ))}
            <div ref={logEndRef} />
          </div>
        </div>

        {/* Right sidebar - Actions */}
        <div className="w-80 flex flex-col">
          <div className="mb-4">
            <div className="text-[#5DCAA5] text-xs tracking-[3px] mb-2">1. SELECT TARGET ZONE</div>
            <select value={selectedZone} onChange={(e) => setSelectedZone(e.target.value)} className="w-full bg-[#0a1f12] border border-[#1D9E75] text-[#e8f5f0] text-xs p-2 focus:outline-none">
              {organNames.map(name => <option key={name} value={name}>{name.toUpperCase()}</option>)}
            </select>
          </div>

          <div className="text-[#5DCAA5] text-xs tracking-[3px] mb-2">2. DEPLOY IMMUNE ACTION</div>
          <div className="space-y-3 overflow-y-auto pb-4">
            {actions.map((action, index) => {
              const baseCost = DEFENSE_EP_COSTS[action.id] || 0;
              const timesUsed = state.defenseUsedThisRound[action.id] || 0;
              const actualCost = Math.ceil(baseCost * Math.pow(1.5, timesUsed));
              const cooldown = state.defenseCooldowns[action.id] || 0;
              const isCooldown = cooldown > 0;
              const canAfford = state.playerEp >= actualCost;
              const isDisabled = isCooldown || !canAfford;

              return (
                <motion.button key={index} onClick={() => deployDefenseUnit(selectedZone, action.id)} disabled={isDisabled} whileHover={!isDisabled ? { scale: 1.02, boxShadow: `0 0 20px ${action.color}40` } : {}} whileTap={!isDisabled ? { scale: 0.98 } : {}} className={`w-full text-left rounded-sm overflow-hidden transition-all ${isDisabled ? 'cursor-not-allowed opacity-40 grayscale' : 'cursor-pointer'}`} style={{ border: `1px solid ${action.color}`, backgroundColor: !isDisabled ? '#0a1f12' : '#0a1210' }}>
                  <div className="px-3 py-2 border-b flex justify-between" style={{ borderColor: action.color, backgroundColor: `${action.color}20` }}>
                    <div className="text-xs font-bold tracking-[1px]" style={{ color: action.color }}>{action.name}</div>
                    {isCooldown && <div className="text-xs font-bold text-[#E24B4A]">COOLDOWN: {cooldown}</div>}
                  </div>
                  <div className="p-3">
                    <div className="text-[#5DCAA5] text-xs mb-2 h-8">{action.description}</div>
                    <div className="flex items-center justify-between">
                      <div className="text-[#7F77DD] text-xs">COST:</div>
                      <div className={`text-sm font-bold ${canAfford ? 'text-[#7F77DD]' : 'text-[#E24B4A]'}`}>
                        {actualCost} EP {timesUsed > 0 && <span className="text-[10px] text-[#E24B4A]">(SURCHARGE)</span>}
                      </div>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      {showPause && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 bg-[#050d0a] bg-opacity-90 flex items-center justify-center z-50">
          <div className="bg-[#0a1f12] border-2 border-[#1D9E75] rounded-sm p-8 w-96">
            <h2 className="text-[#1D9E75] text-2xl font-bold tracking-[4px] mb-6 text-center">PAUSED</h2>
            <div className="space-y-3">
              <button onClick={() => setShowPause(false)} className="w-full py-3 bg-[#1D9E75] text-[#050d0a] font-bold tracking-[3px] text-sm rounded-sm hover:bg-[#2DB88A] transition-colors">RESUME</button>
              <button onClick={onQuitToMenu} className="w-full py-3 border border-[#E24B4A] text-[#E24B4A] font-bold tracking-[3px] text-sm rounded-sm hover:bg-[#E24B4A] hover:text-white transition-colors">QUIT TO MENU</button>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}