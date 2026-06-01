import { motion } from "motion/react";
import { useState, useEffect, useRef } from "react";
import { useGame } from "../../context/GameContext";
import { DEFENSE_EP_COSTS, RECLAMATION_THRESHOLD } from "../../game_logic/GameLogic";
import { DecisionTree } from "../../game_logic/DecisionTree";
import { SettingsModal } from "../components/SettingsModal";
import BodyMap from "../components/BodyMap";

// Global tracker to persist acknowledgment state across React screen transitions
let globalAcknowledgedCount = 0;

interface InGameScreenProps {
  onNextRound: () => void;
  onQuitToMenu: () => void;
}

const DEFENSE_DISPLAY_NAMES: Record<string, string> = {
  WhiteBloodCells: "White Blood Cells",
  Antibodies:      "Antibodies",
  Inflammation:    "Inflammation",
  FeverResponse:   "Fever Response",
  MemoryCells:     "Memory Cells",
  CytokineBurst:   "Cytokine Burst",
};

const MUTATION_READABLE: Record<string, string> = {
  Evade_Phagocytosis_Mutation:     "Evade Phagocytosis",
  Antigenic_Drift_Mutation:        "Antigenic Drift",
  Antigenic_Shift_Mutation:        "Antigenic Shift",
  Thermal_Resistance_Mutation:     "Thermal Resistance",
  Heat_Shock_Proteins_Mutation:    "Heat Shock Proteins",
  Accelerated_Replication_Mutation:"Accelerated Replication",
  Membrane_Hardening_Mutation:     "Membrane Hardening",
  Cytokine_Suppressor_Mutation:    "Cytokine Suppressor",
};

export function InGameScreen({ onNextRound, onQuitToMenu }: InGameScreenProps) {
  const { state, deployDefenseUnit } = useGame();

  if (state.roundNumber === 1 && globalAcknowledgedCount > 0) {
    globalAcknowledgedCount = 0;
  }

  const [showRoundBanner, setShowRoundBanner] = useState(true);
  const [showStartPopup,  setShowStartPopup]  = useState(false);
  const [mutationPopup,   setMutationPopup]   = useState<{ name: string; counter: string | null } | null>(null);

  const [acknowledgedMutations, setAcknowledgedMutations] = useState<string[]>(
    state.activeMutations.slice(0, globalAcknowledgedCount)
  );

  const [isLogMaximized, setIsLogMaximized] = useState(false);
  const [showPause,       setShowPause]      = useState(false);
  const [showSettings,    setShowSettings]   = useState(false);
  const [selectedZone,    setSelectedZone]   = useState<string>("Lungs");

  const logEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [state.logFeed, isLogMaximized]);

  useEffect(() => {
    const t1 = setTimeout(() => {
      setShowRoundBanner(false);

      if (state.roundNumber === 1) {
        setShowStartPopup(true);
      } else if (state.activeMutations.length > globalAcknowledgedCount) {
        const newMutation = state.activeMutations[state.activeMutations.length - 1];
        const displayName = newMutation.replace('_Mutation', '').replace(/_/g, ' ').toUpperCase();
        // Attach the recommended counter for this mutation
        const counter     = DecisionTree.MutationCounters[newMutation] ?? null;
        const counterName = counter ? DEFENSE_DISPLAY_NAMES[counter] ?? counter : null;
        setMutationPopup({ name: displayName, counter: counterName });
      }
    }, 1500);

    return () => clearTimeout(t1);
  }, []);

  // ── Dominant defense warning ──────────────────────────────────────────────
  // Shows when the same defense has been top-scored ≥2 consecutive rounds
  const dominantWarning: string | null = (() => {
    const scores = state.lastUsedDefenses;
    if (!scores || Object.keys(scores).length === 0) return null;
    const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    if (sorted.length === 0) return null;
    const topDefense = sorted[0][0];
    // Only warn if there's a mutation that counters whatever the dominant defense is
    // (i.e., the virus is likely to adapt)
    const hasActiveMutationTargeting = state.activeMutations.some(m => {
      const counter = DecisionTree.MutationCounters[m];
      return counter === topDefense;
    });
    if (hasActiveMutationTargeting) return topDefense;
    return null;
  })();

  const actions = [
    { id: 'WhiteBloodCells', name: 'White Blood Cell',   description: 'Deploy immune cells to patrol the zone',           color: '#1D9E75' },
    { id: 'Antibodies',      name: 'Antibody Production',description: 'Target specific viral strains',                    color: '#1D9E75' },
    { id: 'Inflammation',    name: 'Inflammation',        description: 'Quarantine the zone (causes minor host damage)',   color: '#EF9F27' },
    { id: 'FeverResponse',   name: 'Fever Response',      description: 'Global viral slowdown for two rounds',             color: '#EF9F27' },
    { id: 'MemoryCells',     name: 'Memory Cells',        description: 'Counter previously seen mutations rapidly',        color: '#1D9E75' },
    { id: 'CytokineBurst',   name: 'Cytokine Burst',      description: 'Massive damage (+10% Severity penalty)',           color: '#E24B4A' },
  ];

  // Per-action: is this action the recommended counter for any active mutation?
  const getMutationCounterLabel = (actionId: string): string | null => {
    for (const mutation of state.activeMutations) {
      if (DecisionTree.MutationCounters[mutation] === actionId) {
        const mutName = MUTATION_READABLE[mutation] ?? mutation.replace('_Mutation', '');
        return `Counters: ${mutName}`;
      }
    }
    return null;
  };

  const organNames = Object.keys(state.organGraph.zones);

  const mappedOrgansForBodyMap = Object.values(state.organGraph.zones).map((organ: any) => {
    let infectionPercentage = 0;
    if (organ.isInfected) {
      const cureProgress = (organ.reclamationProgress / RECLAMATION_THRESHOLD) * 100;
      infectionPercentage = Math.max(1, 100 - cureProgress);
    }
    return {
      name: organ.name.toUpperCase(),
      infection: Math.round(infectionPercentage),
    };
  });

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
        <button
          onClick={() => setShowPause(true)}
          className="px-6 py-2 border border-[#3d6b55] text-[#3d6b55] text-xs tracking-[2px] hover:border-[#1D9E75] hover:text-[#1D9E75] transition-colors"
        >
          PAUSE
        </button>
      </div>

      <div className="flex-1 flex gap-4">

        {/* ── LEFT SIDEBAR ───────────────────────────────────────────────── */}
        <div className="w-64 flex flex-col space-y-4">
          <div className="text-[#5DCAA5] text-xs tracking-[3px] mb-2">HOST STATUS</div>

          {/* Severity */}
          <div>
            <div className="text-[#5DCAA5] text-xs tracking-[2px] mb-2">SEVERITY INDEX</div>
            <div className="relative">
              <div className="w-full h-4 bg-[#0a1f12] border border-[#1a3a2a] rounded-sm overflow-hidden">
                <motion.div
                  animate={{ width: `${state.severityIndex}%` }}
                  transition={{ duration: 0.5 }}
                  className="h-full"
                  style={{ background: state.severityIndex > 75 ? '#E24B4A' : state.severityIndex > 40 ? '#EF9F27' : '#1D9E75' }}
                />
              </div>
              <div className="absolute right-2 top-0 bottom-0 flex items-center">
                <span className="text-[#e8f5f0] text-xs font-bold">{state.severityIndex}%</span>
              </div>
            </div>
          </div>

          {/* EP + projected next round */}
          <div>
            <div className="text-[#5DCAA5] text-xs tracking-[2px] mb-1">ENERGY (EP)</div>
            <div className="text-[#1D9E75] text-3xl font-bold tracking-wider">{state.playerEp}</div>
            {state.projectedEpNextRound !== undefined && (
              <div className="text-[#3d6b55] text-[10px] tracking-[1px] mt-1">
                NEXT ROUND: ~{state.projectedEpNextRound} EP
              </div>
            )}
          </div>

          {/* Active infections */}
          <div>
            <div className="text-[#5DCAA5] text-xs tracking-[2px] mb-2">ACTIVE INFECTIONS</div>
            <div className="text-[#EF9F27] text-3xl font-bold tracking-wider">{state.infectionRate}</div>
          </div>

          {/* Active Mutations */}
          <div>
            <div className="text-[#5DCAA5] text-xs tracking-[2px] mb-2">ACTIVE MUTATIONS</div>
            <div className="border-2 border-[#EF9F27] bg-[#1a0d00] p-2 rounded-sm min-h-[40px]">
              {acknowledgedMutations.length === 0 ? (
                <div className="text-[#EF9F27] text-xs tracking-[1px] text-center opacity-50">NONE</div>
              ) : (
                acknowledgedMutations.map(m => (
                  <div key={m} className="text-[#EF9F27] text-xs tracking-[1px] text-center font-bold mb-1">
                    {m.replace('_Mutation', '').replace(/_/g, ' ')}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* ── DOMINANT DEFENSE WARNING ─────────────────────────────────── */}
          {dominantWarning && (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="border border-[#EF9F27] bg-[#110d00] p-3 rounded-sm"
            >
              <div className="text-[#EF9F27] text-[10px] tracking-[2px] font-bold mb-1">⚠ ADAPTATION RISK</div>
              <div className="text-[#e8f5f0] text-[10px] leading-relaxed">
                The virus has mutated to counter{" "}
                <span className="text-[#EF9F27] font-bold">
                  {DEFENSE_DISPLAY_NAMES[dominantWarning] ?? dominantWarning}
                </span>
                . Consider diversifying your immune response.
              </div>
            </motion.div>
          )}

          {/* Organ Status */}
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
                    <div className="text-[10px] text-[#3d6b55]">Def: {organ.activeDefenseCount}</div>
                  </div>
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

          <motion.button
            onClick={onNextRound}
            whileHover={{ scale: 1.05, backgroundColor: "#1D9E75", boxShadow: "0 0 30px rgba(29, 158, 117, 0.5)" }}
            whileTap={{ scale: 0.95 }}
            className="w-full py-4 rounded-sm text-sm tracking-[4px] font-bold bg-[#0d2016] border-2 border-[#1D9E75] text-[#1D9E75] transition-all"
          >
            END TURN
          </motion.button>
        </div>

        {/* ── CENTER ─────────────────────────────────────────────────────── */}
        <div className="flex-1 flex flex-col gap-4">
          <div className="flex-1 flex items-center justify-center border-2 border-[#1a3a2a] rounded-sm bg-[#0a1f12] bg-opacity-30 relative p-4 overflow-hidden">
            <BodyMap organs={mappedOrgansForBodyMap} />
          </div>

          {/* Terminal log */}
          <div className="h-48 border-2 border-[#1a3a2a] bg-[#050d0a] rounded-sm p-4 flex flex-col font-mono text-xs transition-colors hover:border-[#3d6b55]">
            <div className="flex items-center justify-between text-[#5DCAA5] tracking-[2px] mb-2 pb-2 border-b border-[#1a3a2a]">
              <span>&gt; SYSTEM_LOG_FEED</span>
              <button
                onClick={() => setIsLogMaximized(true)}
                className="text-[#3d6b55] hover:text-[#1D9E75] transition-colors"
                title="Maximize Log"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
                </svg>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              {state.logFeed.map((log, i) => (
                <div key={i} className={`mb-1 ${
                  log.includes('CRITICAL') || log.includes('WARNING') || log.includes('✗')
                    ? 'text-[#E24B4A]'
                    : log.includes('✓') || log.includes('RECLAIMED')
                    ? 'text-[#1D9E75]'
                    : 'text-[#8ba89a]'
                }`}>
                  {log}
                </div>
              ))}
              <div ref={logEndRef} />
            </div>
          </div>
        </div>

        {/* ── RIGHT SIDEBAR — Actions ─────────────────────────────────────── */}
        <div className="w-80 flex flex-col">
          <div className="mb-4">
            <div className="text-[#5DCAA5] text-xs tracking-[3px] mb-2">1. SELECT TARGET ZONE</div>
            <select
              value={selectedZone}
              onChange={(e) => setSelectedZone(e.target.value)}
              className="w-full bg-[#0a1f12] border border-[#1D9E75] text-[#e8f5f0] text-xs p-2 focus:outline-none"
            >
              {organNames.map(name => (
                <option key={name} value={name}>{name.toUpperCase()}</option>
              ))}
            </select>
          </div>

          <div className="text-[#5DCAA5] text-xs tracking-[3px] mb-2">2. DEPLOY IMMUNE ACTION</div>
          <div className="space-y-3 overflow-y-auto pb-4">
            {actions.map((action, index) => {
              const baseCost  = DEFENSE_EP_COSTS[action.id] || 0;
              const timesUsed = state.defenseUsedThisRound[action.id] || 0;
              const actualCost = Math.ceil(baseCost * Math.pow(1.5, timesUsed));
              const cooldown  = state.defenseCooldowns[action.id] || 0;
              const isCooldown = cooldown > 0;
              const canAfford  = state.playerEp >= actualCost;
              const isDisabled = isCooldown || !canAfford;

              // Counter hint for this action
              const counterLabel = getMutationCounterLabel(action.id);

              return (
                <motion.button
                  key={index}
                  onClick={() => deployDefenseUnit(selectedZone, action.id)}
                  disabled={isDisabled}
                  whileHover={!isDisabled ? { scale: 1.02, boxShadow: `0 0 20px ${action.color}40` } : {}}
                  whileTap={!isDisabled ? { scale: 0.98 } : {}}
                  className={`w-full text-left rounded-sm overflow-hidden transition-all ${isDisabled ? 'cursor-not-allowed opacity-40 grayscale' : 'cursor-pointer'}`}
                  style={{ border: `1px solid ${action.color}`, backgroundColor: !isDisabled ? '#0a1f12' : '#0a1210' }}
                >
                  <div
                    className="px-3 py-2 border-b flex justify-between items-center"
                    style={{ borderColor: action.color, backgroundColor: `${action.color}20` }}
                  >
                    <div className="text-xs font-bold tracking-[1px]" style={{ color: action.color }}>
                      {action.name}
                    </div>
                    <div className="flex items-center gap-2">
                      {/* Mutation counter badge */}
                      {counterLabel && !isCooldown && (
                        <div className="text-[9px] font-bold tracking-[0.5px] px-1.5 py-0.5 rounded-sm border border-[#7F77DD] text-[#7F77DD]">
                          {counterLabel}
                        </div>
                      )}
                      {isCooldown && (
                        <div className="text-xs font-bold text-[#E24B4A]">CD: {cooldown}</div>
                      )}
                    </div>
                  </div>
                  <div className="p-3">
                    <div className="text-[#5DCAA5] text-xs mb-2 h-8">{action.description}</div>
                    <div className="flex items-center justify-between">
                      <div className="text-[#7F77DD] text-xs">COST:</div>
                      <div className={`text-sm font-bold ${canAfford ? 'text-[#7F77DD]' : 'text-[#E24B4A]'}`}>
                        {actualCost} EP{timesUsed > 0 && <span className="text-[10px] text-[#E24B4A]"> (SURCHARGE)</span>}
                      </div>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── ROUND BANNER ────────────────────────────────────────────────── */}
      {showRoundBanner && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 bg-[#050d0a] z-[80] flex flex-col items-center justify-center"
        >
          <motion.div animate={{ scale: [1, 1.02, 1] }} transition={{ duration: 1.5, ease: "easeInOut" }} className="flex flex-col items-center">
            <div className="text-[#1D9E75] text-xl tracking-[12px] mb-2 font-mono">INITIATING</div>
            <div className="text-[#e8f5f0] text-7xl font-bold tracking-widest mb-6">
              ROUND {String(state.roundNumber).padStart(2, '0')}
            </div>
            <div className="w-64 h-1 bg-[#1D9E75]"></div>
          </motion.div>
        </motion.div>
      )}

      {/* ── START POPUP (Round 1) ─────────────────────────────────────────── */}
      {showStartPopup && !showRoundBanner && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 bg-[#050d0a] bg-opacity-95 flex items-center justify-center z-[70]">
          <div className="bg-[#0a1f12] border-2 border-[#E24B4A] rounded-sm p-8 w-[500px] shadow-[0_0_30px_rgba(226,75,74,0.2)]">
            <h2 className="text-[#E24B4A] text-2xl font-bold tracking-[4px] mb-4 text-center animate-pulse">
              🚨 EMERGENCY CASE DIAGNOSTIC INITIALIZED
            </h2>
            <div className="text-[#e8f5f0] font-mono text-sm space-y-4 mb-8 text-center border-y border-[#1a3a2a] py-4">
              <p>A pathogenetic agent has breached primary skin filters.</p>
              <p>Host body is currently under viral threat.</p>
              <p className="text-[#EF9F27] font-bold">Awaiting immune system deployment...</p>
            </div>
            <button
              onClick={() => setShowStartPopup(false)}
              className="w-full py-3 bg-[#E24B4A] text-[#050d0a] font-bold tracking-[3px] text-sm rounded-sm hover:bg-[#ff5c5c] transition-colors"
            >
              ACKNOWLEDGE & DEPLOY
            </button>
          </div>
        </motion.div>
      )}

      {/* ── MUTATION DETECTED POPUP ─────────────────────────────────────── */}
      {mutationPopup && !showRoundBanner && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
          className="fixed inset-0 bg-[#050d0a] bg-opacity-95 flex items-center justify-center z-[75]"
        >
          <div className="bg-[#0a1f12] border-2 border-[#EF9F27] rounded-sm p-10 w-[500px] shadow-[0_0_30px_rgba(239,159,39,0.2)] flex flex-col items-center">
            <div className="text-[#EF9F27] text-xl tracking-[4px] mb-4 flex items-center gap-4">
              <span>⚠️</span> WARNING <span>⚠️</span>
            </div>
            <h2 className="text-[#EF9F27] text-3xl font-bold tracking-[6px] mb-6 text-center">
              MUTATION INCOMING
            </h2>
            <div className="text-[#5DCAA5] text-2xl font-mono font-bold tracking-[2px] mb-4 text-center uppercase">
              {mutationPopup.name}
            </div>

            {/* ── Counter hint ─────────────────────────────────────────────── */}
            {mutationPopup.counter && (
              <div className="w-full bg-[#0d1a0f] border border-[#7F77DD] rounded-sm px-4 py-3 mb-8 text-center">
                <div className="text-[#7F77DD] text-[10px] tracking-[2px] mb-1">RECOMMENDED COUNTER</div>
                <div className="text-[#e8f5f0] text-sm font-bold tracking-[1px]">
                  {mutationPopup.counter}
                </div>
              </div>
            )}
            {!mutationPopup.counter && <div className="mb-8" />}

            <button
              onClick={() => {
                globalAcknowledgedCount = state.activeMutations.length;
                setAcknowledgedMutations(state.activeMutations);
                setMutationPopup(null);
              }}
              className="w-full py-3 bg-transparent border border-[#EF9F27] text-[#EF9F27] font-bold tracking-[3px] text-sm rounded-sm hover:bg-[#EF9F27] hover:text-[#050d0a] transition-colors"
            >
              ACKNOWLEDGE
            </button>
          </div>
        </motion.div>
      )}

      {/* MAXIMIZED LOG OVERLAY */}
      {isLogMaximized && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="fixed inset-0 bg-[#050d0a] bg-opacity-95 flex items-center justify-center z-[60] p-8"
        >
          <div className="w-full h-full max-w-5xl border-2 border-[#1D9E75] bg-[#0a1f12] rounded-sm p-6 flex flex-col font-mono text-sm shadow-[0_0_30px_rgba(29,158,117,0.2)]">
            <div className="flex items-center justify-between text-[#5DCAA5] tracking-[2px] mb-4 pb-4 border-b border-[#1a3a2a]">
              <span className="text-xl font-bold">&gt; SYSTEM_LOG_FEED</span>
              <button onClick={() => setIsLogMaximized(false)} className="text-[#E24B4A] hover:text-[#ff5c5c] text-lg font-bold tracking-[2px] transition-colors">
                [CLOSE]
              </button>
            </div>
            <div className="flex-1 overflow-y-auto pr-4 space-y-2">
              {state.logFeed.map((log, i) => (
                <div key={i} className={`${
                  log.includes('CRITICAL') || log.includes('WARNING') || log.includes('✗')
                    ? 'text-[#E24B4A]'
                    : log.includes('✓') || log.includes('RECLAIMED')
                    ? 'text-[#1D9E75]'
                    : 'text-[#8ba89a]'
                }`}>{log}</div>
              ))}
              <div ref={logEndRef} />
            </div>
          </div>
        </motion.div>
      )}

      {/* PAUSE MENU */}
      {showPause && !showSettings && !showStartPopup && !mutationPopup && !showRoundBanner && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 bg-[#050d0a] bg-opacity-90 flex items-center justify-center z-50">
          <div className="bg-[#0a1f12] border-2 border-[#1D9E75] rounded-sm p-8 w-96">
            <h2 className="text-[#1D9E75] text-2xl font-bold tracking-[4px] mb-6 text-center">PAUSED</h2>
            <div className="space-y-3">
              <button onClick={() => setShowPause(false)} className="w-full py-3 bg-[#1D9E75] text-[#050d0a] font-bold tracking-[3px] text-sm rounded-sm hover:bg-[#2DB88A] transition-colors">RESUME</button>
              <button onClick={() => setShowSettings(true)} className="w-full py-3 border border-[#3d6b55] text-[#3d6b55] font-bold tracking-[3px] text-sm rounded-sm hover:border-[#1D9E75] hover:text-[#1D9E75] transition-colors">SETTINGS</button>
              <button onClick={onQuitToMenu} className="w-full py-3 border border-[#E24B4A] text-[#E24B4A] font-bold tracking-[3px] text-sm rounded-sm hover:bg-[#E24B4A] hover:text-white transition-colors">QUIT TO MENU</button>
            </div>
          </div>
        </motion.div>
      )}

      {/* SETTINGS MODAL */}
      {showSettings && !showStartPopup && !mutationPopup && !showRoundBanner && (
        <SettingsModal onClose={() => setShowSettings(false)} difficulty={state.difficulty} />
      )}
    </motion.div>
  );
}