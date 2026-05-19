import clsx from "clsx";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { Check } from "lucide-react";

export function LifeSurveyOptionCard({
  label,
  icon: Icon,
  active,
  onClick,
  layout = "grid",
  index = 0,
}: {
  label: string;
  icon?: LucideIcon;
  active: boolean;
  onClick: () => void;
  layout?: "grid" | "list";
  index?: number;
}) {
  return (
    <motion.li
      variants={{
        hidden: { opacity: 0, y: 10 },
        show: { opacity: 1, y: 0, transition: { duration: 0.22, delay: index * 0.04 } },
      }}
    >
      <motion.button
        type="button"
        onClick={onClick}
        whileTap={{ scale: 0.97 }}
        animate={
          active
            ? {
                scale: [1, 1.02, 1],
                boxShadow: "0 6px 20px rgba(255, 138, 0, 0.18)",
              }
            : { scale: 1, boxShadow: "0 2px 10px rgba(23, 26, 74, 0.06)" }
        }
        transition={{ duration: 0.2 }}
        className={clsx(
          "relative w-full rounded-2xl border-2 bg-white text-left transition-colors",
          layout === "grid" ? "min-h-[88px] p-4" : "flex min-h-[60px] items-center gap-3 px-4 py-3.5",
          active
            ? "border-brand-orange bg-gradient-to-br from-warning-bg/40 to-white ring-2 ring-brand-orange/20"
            : "border-line/60 hover:border-brand-orange/35 hover:bg-lavender-soft/30",
        )}
      >
        {active ? (
          <motion.span
            className="absolute right-2.5 top-2.5 flex h-6 w-6 items-center justify-center rounded-full bg-brand-orange text-white shadow-sm"
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 20 }}
          >
            <Check className="h-3.5 w-3.5" strokeWidth={3} />
          </motion.span>
        ) : null}
        {Icon ? (
          <span
            className={clsx(
              "flex shrink-0 items-center justify-center rounded-xl border border-lavender/80 bg-lavender-soft/80",
              layout === "grid" ? "mb-2.5 h-10 w-10" : "h-10 w-10",
            )}
          >
            <Icon className="h-5 w-5 text-brand-orange" strokeWidth={1.5} />
          </span>
        ) : null}
        <span
          className={clsx(
            "font-semibold text-navy",
            layout === "grid" ? "block pr-7 text-sm leading-snug" : "flex-1 text-sm leading-snug",
          )}
        >
          {label}
        </span>
      </motion.button>
    </motion.li>
  );
}
