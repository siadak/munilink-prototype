import clsx from "clsx";
import { motion } from "framer-motion";
import { Check, Clock } from "lucide-react";
import { SURVEY_STEPS, TOTAL_STEPS } from "./constants";

export function LifeSurveyStepper({ step }: { step: number }) {
  const current = Math.min(TOTAL_STEPS, Math.max(1, step));
  const progressPct = ((current - 1) / (TOTAL_STEPS - 1)) * 100;

  return (
    <motion.div
      className="space-y-3"
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="flex items-center justify-between gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.05 }}
      >
        <p className="text-sm font-bold text-brand-orange">
          Krok {current} z {TOTAL_STEPS}
        </p>
        <span className="flex shrink-0 items-center gap-1 text-xs font-semibold text-muted">
          <Clock className="h-3.5 w-3.5" aria-hidden />
          2 min • 5 krótkich pytań
        </span>
      </motion.div>

      <div className="h-1.5 overflow-hidden rounded-full bg-line/80">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-brand-orange to-brand-orangeDeep"
          initial={{ width: 0 }}
          animate={{ width: `${Math.max(8, (current / TOTAL_STEPS) * 100)}%` }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      <motion.div
        className="relative px-0.5 pt-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <motion.div
          className="pointer-events-none absolute left-[10%] right-[10%] top-[1.125rem] h-0.5 origin-left rounded-full bg-brand-orange"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: progressPct / 100 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: "left center" }}
          aria-hidden
        />
        <motion.div
          className="pointer-events-none absolute left-[10%] right-[10%] top-[1.125rem] h-0.5 rounded-full bg-line"
          aria-hidden
        />

        <div className="relative flex justify-between">
          {SURVEY_STEPS.map((label, i) => {
            const n = i + 1;
            const done = current > n;
            const active = current === n;
            const upcoming = !done && !active;

            return (
              <div key={label} className="flex w-[18%] max-w-[4.25rem] flex-col items-center">
                <motion.div
                  className={clsx(
                    "relative z-10 flex h-9 w-9 items-center justify-center rounded-full border-2 text-xs font-bold transition-colors",
                    active && "border-brand-orange bg-brand-orange text-white shadow-[0_4px_14px_rgba(255,138,0,0.35)]",
                    done && "border-brand-orange bg-brand-orange text-white",
                    upcoming && "border-line bg-white text-navy",
                  )}
                  animate={active ? { scale: [1, 1.08, 1] } : { scale: 1 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                >
                  {done ? (
                    <motion.span
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 420, damping: 22 }}
                    >
                      <Check className="h-4 w-4" strokeWidth={3} aria-hidden />
                    </motion.span>
                  ) : (
                    <span className={clsx(active ? "text-white" : "text-navy")}>{n}</span>
                  )}
                </motion.div>
                <span
                  className={clsx(
                    "mt-2 text-center text-[10px] font-semibold leading-tight",
                    active && "text-brand-orange",
                    done && !active && "text-navy",
                    upcoming && "text-muted",
                  )}
                >
                  {label}
                </span>
              </div>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
}
