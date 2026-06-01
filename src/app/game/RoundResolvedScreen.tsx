import { motion } from "motion/react";
import { useGame } from "../../context/GameContext";
import { useState, useEffect } from "react";
import { TipEngine, TipCategory } from "../../game_logic/TipEngine";
import { DEFENSE_EP_COSTS } from "../../game_logic/GameLogic";

interface RoundResolvedScreenProps {
  onContinue: () => void;
}

// Persist last tip category across re-mounts (screen transitions)
let globalLastTipCategory: TipCategory | null = null;

const DEFENSE_DISPLAY_NAMES: Record<string, string> = {
  WhiteBloodCells: "White Blood Cells",
  Antibodies:      "Antibodies",
  Inflammation:    "Inflammation",
  FeverResponse:   "Fever Response",
  MemoryCells:     "Memory Cells",
  CytokineBurst:   "Cytokine Burst",
};

export function RoundResolvedScreen({ onContinue }: RoundResolvedScreenProps) {
  const { state } = useGame();
  const context   = state.currentTurnContext;

  const [tip] = useState(() =>
    TipEngine.generateTip(state, globalLastTipCategory)
  );

  // Update the persisted category after render
  useEffect(() => {
    if (tip) globalLastTipCategory = tip.category;
  }, [tip]);

  if (!context) return null;

  const scores        = state.lastDefenseScores ?? [];
  const hasScores     = scores.length > 0;
  const showTips      = state.difficulty !== 'Pandemic';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[#050d0a] bg-opacity-85 flex items-center justify-center"
    >
      <div className="absolute inset-0 bg-[#050d0a] opacity-85" />

      <motion.div
        initial={{ x: 500, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: "spring", damping: 20, stiffness: 100 }}
        className="relative bg-[#070f09] border-2 border-[#1D9E75] rounded-md w-[860px] z-10 max-h-[92vh] flex flex-col"
      >
        {/* Corner brackets */}
        <div className="absolute top-2 left-2 w-8 h-8 border-l-2 border-t-2 border-[#1D9E75]" />
        <div className="absolute top-2 right-2 w-8 h-8 border-r-2 border-t-2 border-[#1D9E75]" />
        <div className="absolute bottom-2 left-2 w-8 h-8 border-l-2 border-b-2 border-[#1D9E75]" />
        <div className="absolute bottom-2 right-2 w-8 h-8 border-r-2 border-b-2 border-[#1D9E75]" />

        {/* Header */}
        <div className="bg-[#0d2016] border-b border-[#1D9E75] py-4 px-6 flex justify-between items-center">
          <div className="text-[#5DCAA5] text-sm tracking-[4px] font-bold">
            {context.title}
          </div>
          <div className="text-[#EF9F27] text-xs tracking-[2px]">
            SEVERITY: {state.severityIndex}%
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="p-8 space-y-6">

            {/* Virus Actions */}
            <div>
              <div className="text-[#EF9F27] text-xs tracking-[2px] mb-3 border-b border-[#1a3a2a] pb-1">
                VIRAL PATHOLOGY UPDATE
              </div>
              <ul className="space-y-2">
                {context.virusActions.map((action, i) => (
                  <li key={i} className="text-[#e8f5f0] text-sm flex gap-3">
                    <span className="text-[#E24B4A]">⯈</span> {action}
                  </li>
                ))}
              </ul>
            </div>

            {/* Body Condition */}
            <div>
              <div className="text-[#1D9E75] text-xs tracking-[2px] mb-3 border-b border-[#1a3a2a] pb-1">
                HOST TISSUE STATUS
              </div>
              <ul className="space-y-2">
                {context.bodyCondition.map((condition, i) => (
                  <li key={i} className="text-[#e8f5f0] text-sm flex gap-3">
                    <span className="text-[#1D9E75]">⯈</span> {condition}
                  </li>
                ))}
              </ul>
            </div>

            {/* Severity Assessment */}
            <div className="bg-[#0a1f12] border border-[#3d6b55] p-4 rounded-sm">
              <div className="text-[#7F77DD] text-xs tracking-[2px] mb-2">SYSTEM ASSESSMENT</div>
              <div className={`text-sm font-bold ${state.severityIndex > 75 ? 'text-[#E24B4A]' : 'text-[#5DCAA5]'}`}>
                {context.severityAssessment}
              </div>
            </div>

            {/* ── IMMUNE EFFICACY REPORT ───────────────────────────────── */}
            {hasScores && (
              <div>
                <div className="text-[#5DCAA5] text-xs tracking-[2px] mb-3 border-b border-[#1a3a2a] pb-1 flex items-center gap-2">
                  <span>IMMUNE EFFICACY REPORT</span>
                  <span className="text-[#3d6b55] text-[10px] tracking-[1px] normal-case">
                    — WEIGHTED RESPONSE ANALYSIS
                  </span>
                </div>
                <div className="space-y-3">
                  {scores.map((ds) => {
                    const barColor = ds.score >= 70
                      ? '#1D9E75'
                      : ds.score >= 40
                      ? '#EF9F27'
                      : '#E24B4A';
                    const label = DEFENSE_DISPLAY_NAMES[ds.defenseType] ?? ds.defenseType;
                    return (
                      <div key={ds.defenseType}>
                        <div className="flex items-center justify-between mb-1">
                          <div className="text-[#e8f5f0] text-xs tracking-[1px]">{label}</div>
                          <div
                            className="text-xs font-bold tracking-[1px]"
                            style={{ color: barColor }}
                          >
                            {ds.score}%
                          </div>
                        </div>
                        {/* Bar */}
                        <div className="w-full h-2 bg-[#0a1f12] border border-[#1a3a2a] rounded-sm overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${ds.score}%` }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className="h-full rounded-sm"
                            style={{ backgroundColor: barColor }}
                          />
                        </div>
                        {/* Mutation penalty note */}
                        {ds.mutationPenalty && (
                          <div className="text-[10px] tracking-[0.5px] mt-1" style={{ color: ds.score < 50 ? '#E24B4A' : '#EF9F27' }}>
                            ⚑ {ds.mutationPenalty}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ── TIP PANEL (Casual + Epidemic only) ───────────────────── */}
            {showTips && tip && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className={`border rounded-sm p-4 ${
                  tip.category === 'critical_severity'
                    ? 'border-[#E24B4A] bg-[#1a0505]'
                    : tip.category === 'good_play'
                    ? 'border-[#1D9E75] bg-[#071a0e]'
                    : 'border-[#EF9F27] bg-[#110d00]'
                }`}
              >
                <div className={`text-xs tracking-[2px] mb-2 font-bold ${
                  tip.category === 'critical_severity'
                    ? 'text-[#E24B4A]'
                    : tip.category === 'good_play'
                    ? 'text-[#1D9E75]'
                    : 'text-[#EF9F27]'
                }`}>
                  {tip.category === 'critical_severity' && '⚠ CRITICAL ADVISORY'}
                  {tip.category === 'mutation_counter'  && '🧬 MUTATION ADVISORY'}
                  {tip.category === 'reclamation'       && '⯈ RECLAMATION ADVISORY'}
                  {tip.category === 'ep_efficiency'     && '⚡ EP EFFICIENCY NOTE'}
                  {tip.category === 'good_play'         && '✓ EFFECTIVE DEPLOYMENT'}
                  {tip.category === 'general'           && '💡 TACTICAL BRIEF'}
                </div>
                <div className="text-[#e8f5f0] text-sm leading-relaxed">
                  {tip.highlight
                    ? tip.text.split(tip.highlight).map((part, i, arr) => (
                        <span key={i}>
                          {part}
                          {i < arr.length - 1 && (
                            <span className="font-bold" style={{
                              color: tip.category === 'critical_severity' ? '#E24B4A'
                                   : tip.category === 'good_play' ? '#1D9E75'
                                   : '#EF9F27'
                            }}>
                              {tip.highlight}
                            </span>
                          )}
                        </span>
                      ))
                    : tip.text
                  }
                </div>
              </motion.div>
            )}

          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-[#1a3a2a] flex justify-end bg-[#070f09]">
          <motion.button
            onClick={onContinue}
            whileHover={{ scale: 1.05, backgroundColor: "#1D9E75", color: "#050d0a" }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#0d2016] border-2 border-[#1D9E75] text-[#1D9E75] px-12 py-3 rounded-sm text-xs tracking-[3px] font-bold transition-colors"
          >
            ACKNOWLEDGE & CONTINUE
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}