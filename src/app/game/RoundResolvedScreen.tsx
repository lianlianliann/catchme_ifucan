import { motion } from "motion/react";

interface RoundEvent {
  type: 'positive' | 'negative' | 'warning' | 'info';
  text: string;
  value: string;
}

interface RoundResolvedScreenProps {
  round: number;
  events: RoundEvent[];
  newSeverity: number;
  onContinue: () => void;
}

export function RoundResolvedScreen({
  round,
  events,
  newSeverity,
  onContinue
}: RoundResolvedScreenProps) {
  const eventColors = {
    positive: '#1D9E75',
    negative: '#E24B4A',
    warning: '#EF9F27',
    info: '#7F77DD'
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[#050d0a] bg-opacity-85 flex items-center justify-center"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[#050d0a] opacity-85" />

      {/* Popup card - slides in from right */}
      <motion.div
        initial={{ x: 500, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: "spring", damping: 20, stiffness: 100 }}
        className="relative bg-[#070f09] border-2 border-[#1D9E75] rounded-md w-[800px] z-10"
      >
        {/* Corner brackets */}
        <div className="absolute top-2 left-2 w-8 h-8 border-l-2 border-t-2 border-[#1D9E75]" />
        <div className="absolute top-2 right-2 w-8 h-8 border-r-2 border-t-2 border-[#1D9E75]" />
        <div className="absolute bottom-2 left-2 w-8 h-8 border-l-2 border-b-2 border-[#1D9E75]" />
        <div className="absolute bottom-2 right-2 w-8 h-8 border-r-2 border-b-2 border-[#1D9E75]" />

        {/* Header */}
        <div className="bg-[#0d2016] border-b border-[#1D9E75] py-4">
          <div className="text-[#5DCAA5] text-sm tracking-[4px] text-center">
            ROUND {String(round).padStart(2, '0')} — RESOLVED
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Outcome log */}
          <div className="text-[#5DCAA5] text-xs tracking-[2px] mb-3">OUTCOME LOG</div>
          <div className="border-t border-[#1a3a2a] pt-4 space-y-4 mb-6">
            {events.map((event, index) => (
              <motion.div
                key={index}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-3"
              >
                <div
                  className="w-4 h-4 rounded-sm"
                  style={{ backgroundColor: eventColors[event.type] }}
                />
                <div className="flex-1 text-[#5DCAA5] text-sm">{event.text}</div>
                <div
                  className="text-sm font-bold"
                  style={{ color: eventColors[event.type] }}
                >
                  {event.value}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Severity bar */}
          <div className="border-t border-[#1a3a2a] pt-4 mb-6">
            <div className="text-[#5DCAA5] text-xs tracking-[1px] mb-2">SEVERITY INDEX</div>
            <div className="flex items-center gap-3">
              <div className="flex-1 h-4 bg-[#0a1f12] border border-[#1a3a2a] rounded-sm overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${newSeverity}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="h-full bg-[#E24B4A]"
                />
              </div>
              <div className="text-[#E24B4A] text-sm font-bold w-20 text-right">{newSeverity}%</div>
            </div>
          </div>

          {/* Continue button */}
          <div className="flex justify-end">
            <motion.button
              onClick={onContinue}
              whileHover={{
                scale: 1.05,
                backgroundColor: "#1D9E75",
                boxShadow: "0 0 30px rgba(29, 158, 117, 0.5)"
              }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#0d2016] border-2 border-[#1D9E75] text-[#1D9E75] px-12 py-3 rounded-sm text-xs tracking-[3px] font-bold transition-colors"
            >
              CONTINUE
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
