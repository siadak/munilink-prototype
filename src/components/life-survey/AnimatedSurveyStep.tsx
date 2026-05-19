import { AnimatePresence, motion } from "framer-motion";
import type { ReactNode } from "react";

export function AnimatedSurveyStep({ stepKey, children }: { stepKey: string | number; children: ReactNode }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={stepKey}
        initial={{ opacity: 0, x: 28 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="space-y-4"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

export function SurveyQuestionCard({ children }: { children: ReactNode }) {
  return (
    <motion.div
      className="space-y-4 rounded-[1.35rem] border border-white/80 bg-white p-4 shadow-[0_8px_28px_rgba(23,26,74,0.08)]"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, delay: 0.05 }}
    >
      {children}
    </motion.div>
  );
}
