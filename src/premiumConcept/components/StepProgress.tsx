import { motion } from "framer-motion";
import clsx from "clsx";
import { Clock } from "lucide-react";

const labels = ["Start", "Zdrowie", "Ochrona", "Kontakt", "Oferta"] as const;

/** `step` — aktywny krok ankiety od 1 do 5 (zgodnie z etykietami). */
export function StepProgress({ step }: { step: number }) {
  const clamped = Math.min(5, Math.max(1, step));
  const progress = ((clamped - 1) / 4) * 100;

  return (
    <div className="space-y-3">
      <div className="flex items-start justify-between gap-3">
        <motion.span
          key={clamped}
          initial={{ opacity: 0.6, x: -4 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-sm font-bold text-brand-orangeDeep"
        >
          Krok {clamped} z 5
        </motion.span>
        <span className="flex shrink-0 items-center gap-1.5 text-xs font-semibold text-muted">
          <Clock className="h-3.5 w-3.5" aria-hidden />
          2 min · 5 krótkich pytań
        </span>
      </div>

      <div className="relative px-1 pt-1">
        <div className="pointer-events-none absolute left-[9%] right-[9%] top-[1.125rem] h-0.5 rounded-full bg-line overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-brand-orange to-brand-orangeDeep"
            initial={false}
            animate={{ width: `${progress}%` }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
          />
        </div>

        <div className="relative flex justify-between">
          {labels.map((label, i) => {
            const n = i + 1;
            const done = clamped > n;
            const active = clamped === n;
            return (
              <div key={label} className="flex w-[18%] max-w-[4.5rem] flex-col items-center">
                <motion.div
                  layout
                  initial={false}
                  animate={{
                    scale: active ? 1.06 : 1,
                    boxShadow: active ? "0 8px 24px rgba(255, 138, 0, 0.35)" : "0 2px 8px rgba(23, 26, 74, 0.08)",
                  }}
                  transition={{ type: "spring", stiffness: 380, damping: 26 }}
                  className={clsx(
                    "relative z-10 flex h-9 w-9 items-center justify-center rounded-full border-2 text-xs font-bold bg-card",
                    active && "border-brand-orange bg-brand-orange text-white",
                    done && !active && "border-brand-orange/70 bg-brand-orange/90 text-white",
                    !done && !active && "border-line text-muted",
                  )}
                >
                  {n}
                </motion.div>
                <span
                  className={clsx(
                    "mt-2 text-center text-[10px] font-semibold leading-tight",
                    active ? "text-brand-orangeDeep" : "text-navy",
                  )}
                >
                  {label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
