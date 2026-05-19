import { ScanLine } from "lucide-react";
import { TooltipIcon } from "./Tooltip";
import { Button } from "./Button";

export function OCRCard({
  label,
  tooltip,
  primaryLabel,
  secondaryLabel,
  onPrimary,
  onSecondary,
  compact = false,
}: {
  label: string;
  tooltip: string;
  primaryLabel: string;
  secondaryLabel: string;
  onPrimary: () => void;
  onSecondary: () => void;
  compact?: boolean;
}) {
  return (
    <div className="space-y-3 rounded-2xl border border-line/60 bg-white p-4 shadow-[0_2px_8px_rgba(23,26,74,0.05)]">
      <div className="flex items-center justify-between gap-2">
        <span className="flex items-center gap-2 text-sm font-semibold text-navy">
          <ScanLine className="h-4 w-4 text-brand-orange" strokeWidth={1.75} aria-hidden />
          {label}
        </span>
        <TooltipIcon text={tooltip} />
      </div>
      {!compact ? (
        <p className="text-sm text-muted leading-relaxed">Zeskanuj dokument, aby uzupełnić pola formularza.</p>
      ) : null}
      <div className="flex flex-col gap-2">
        <Button fullWidth type="button" onClick={onPrimary}>
          {primaryLabel}
        </Button>
        <Button fullWidth variant="secondary" type="button" onClick={onSecondary}>
          {secondaryLabel}
        </Button>
      </div>
    </div>
  );
}
