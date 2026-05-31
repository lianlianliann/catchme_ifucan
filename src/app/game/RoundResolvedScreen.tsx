import { motion } from "motion/react";
import { useGame } from "../../context/GameContext";

interface RoundResolvedScreenProps {
  onContinue: () => void;
}

export function RoundResolvedScreen({ onContinue }: RoundResolvedScreenProps) {
  const { state } = useGame();
  const context = state.currentTurnContext;

  // Fallback in case of quick renders before context is set
  if (!context) return null;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-h-screen bg-[#050d0a] bg-opacity-85 flex items-center justify-center">
      <div className="absolute inset-0 bg-[#050d0a] opacity-85" />
      <motion.div initial={{ x: 500, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ type: "spring", damping: 20, stiffness: 100 }} className="relative bg-[#070f09] border-2 border-[#1D9E75] rounded-md w-[800px] z-10 max-h-[90vh] flex flex-col">
        <div className="absolute top-2 left-2 w-8 h-8 border-l-2 border-t-2 border-[#1D9E75]" />
        <div className="absolute top-2 right-2 w-8 h-8 border-r-2 border-t-2 border-[#1D9E75]" />
        <div className="absolute bottom-2 left-2 w-8 h-8 border-l-2 border-b-2 border-[#1D9E75]" />
        <div className="absolute bottom-2 right-2 w-8 h-8 border-r-2 border-b-2 border-[#1D9E75]" />

        <div className="bg-[#0d2016] border-b border-[#1D9E75] py-4 px-6 flex justify-between items-center">
          <div className="text-[#5DCAA5] text-sm tracking-[4px] font-bold">
            {context.title}
          </div>
          <div className="text-[#EF9F27] text-xs tracking-[2px]">
            SEVERITY: {state.severityIndex}%
          </div>
        </div>

        <div className="p-8 overflow-y-auto space-y-6">
          <div>
            <div className="text-[#EF9F27] text-xs tracking-[2px] mb-3 border-b border-[#1a3a2a] pb-1">VIRAL PATHOLOGY UPDATE</div>
            <ul className="space-y-2">
              {context.virusActions.map((action, i) => (
                <li key={i} className="text-[#e8f5f0] text-sm flex gap-3"><span className="text-[#E24B4A]">⯈</span> {action}</li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-[#1D9E75] text-xs tracking-[2px] mb-3 border-b border-[#1a3a2a] pb-1">HOST TISSUE STATUS</div>
            <ul className="space-y-2">
              {context.bodyCondition.map((condition, i) => (
                <li key={i} className="text-[#e8f5f0] text-sm flex gap-3"><span className="text-[#1D9E75]">⯈</span> {condition}</li>
              ))}
            </ul>
          </div>

          <div className="bg-[#0a1f12] border border-[#3d6b55] p-4 rounded-sm">
            <div className="text-[#7F77DD] text-xs tracking-[2px] mb-2">SYSTEM ASSESSMENT</div>
            <div className={`text-sm font-bold ${state.severityIndex > 75 ? 'text-[#E24B4A]' : 'text-[#5DCAA5]'}`}>
              {context.severityAssessment}
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-[#1a3a2a] flex justify-end bg-[#070f09]">
          <motion.button onClick={onContinue} whileHover={{ scale: 1.05, backgroundColor: "#1D9E75", color: "#050d0a" }} whileTap={{ scale: 0.95 }} className="bg-[#0d2016] border-2 border-[#1D9E75] text-[#1D9E75] px-12 py-3 rounded-sm text-xs tracking-[3px] font-bold transition-colors">
            ACKNOWLEDGE & CONTINUE
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}