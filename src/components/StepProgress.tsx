import type { ReactNode } from "react";
import clsx from "clsx";

/** `step` — aktywny krok ankiety od 1 do 5. */
export function StepProgress({ step }: { step: number }) {
  const clamped = Math.min(5, Math.max(1, step));
  const progress = (clamped / 5) * 100;

  return (
    <div className="space-y-2">
      <p className="text-sm text-muted">
        Krok <span className="font-semibold text-navy">{clamped}</span> z 5
      </p>
      <div className="h-1.5 overflow-hidden rounded-full bg-line">
        <div
          className="h-full rounded-full bg-brand-orange transition-[width] duration-200"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

export function SurveyOptionCard({
  active,
  onClick,
  children,
  className,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        "rounded-2xl border bg-white p-4 text-left text-sm font-semibold text-navy shadow-[0_2px_8px_rgba(23,26,74,0.05)] transition",
        active ? "border-brand-orange" : "border-line/60",
        className,
      )}
    >
      {children}
    </button>
  );
}
