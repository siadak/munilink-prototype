import { motion } from "framer-motion";
import { TooltipIcon } from "./Tooltip";
import { Button } from "./Button";

export function OCRCard({
  label,
  tooltip,
  headline,
  description,
  primaryLabel,
  secondaryLabel,
  onPrimary,
  onSecondary,
}: {
  label: string;
  tooltip: string;
  headline: string;
  description: string;
  primaryLabel: string;
  secondaryLabel: string;
  onPrimary: () => void;
  onSecondary: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
      className="rounded-[1.75rem] border border-lavender/80 bg-gradient-to-br from-lavender/50 via-card to-lavender-soft/30 p-5 shadow-card space-y-4"
    >
      <div className="flex items-center justify-between gap-2">
        <span className="text-[10px] font-bold uppercase tracking-wider text-navy/80">{label}</span>
        <TooltipIcon text={tooltip} />
      </div>
      <div>
        <h3 className="text-lg font-bold text-navy leading-snug">{headline}</h3>
        <p className="mt-1.5 text-sm text-muted leading-relaxed">{description}</p>
      </div>
      <div className="flex flex-col gap-2">
        <Button fullWidth onClick={onPrimary}>
          {primaryLabel}
        </Button>
        <Button fullWidth variant="secondary" type="button" onClick={onSecondary}>
          {secondaryLabel}
        </Button>
      </div>
    </motion.div>
  );
}
