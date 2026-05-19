import { Bike, Dumbbell, HeartPulse, Salad, Stethoscope } from "lucide-react";
import type { BenefitVisualTheme } from "../data/mocks";
import clsx from "clsx";

const themes: Record<
  BenefitVisualTheme,
  { gradient: string; icon: typeof Dumbbell; label: string }
> = {
  fitness: {
    gradient: "from-[#fff4e8] via-[#ffe8cc] to-[#efedff]",
    icon: Dumbbell,
    label: "Trening",
  },
  diet: {
    gradient: "from-[#f0fdf4] via-[#ecfdf5] to-[#fff4e8]",
    icon: Salad,
    label: "Dieta",
  },
  health: {
    gradient: "from-[#eff6ff] via-[#f0f4ff] to-[#efedff]",
    icon: Stethoscope,
    label: "Zdrowie",
  },
  bike: {
    gradient: "from-[#f4f4f6] via-[#e8e9ef] to-[#fff4e8]",
    icon: Bike,
    label: "Rower",
  },
  wellness: {
    gradient: "from-[#faf5ff] via-[#efedff] to-[#fff4e8]",
    icon: HeartPulse,
    label: "Profilaktyka",
  },
};

export function BenefitVisual({
  theme,
  className = "",
  compact,
}: {
  theme: BenefitVisualTheme;
  className?: string;
  compact?: boolean;
}) {
  const t = themes[theme];
  const Icon = t.icon;

  return (
    <div
      className={clsx(
        "relative overflow-hidden rounded-t-2xl bg-gradient-to-br",
        t.gradient,
        compact ? "h-36" : "h-44",
        className,
      )}
      aria-hidden
    >
      <div className="pointer-events-none absolute -right-6 top-4 h-24 w-24 rounded-full bg-brand-orange/10 blur-2xl" />
      <div className="pointer-events-none absolute -left-4 bottom-2 h-20 w-20 rounded-full bg-navy/5 blur-xl" />
      <div className="relative flex h-full flex-col items-center justify-center gap-2 px-4">
        <div
          className={clsx(
            "flex items-center justify-center rounded-2xl border border-white/80 bg-white/70 shadow-sm",
            compact ? "h-14 w-14" : "h-16 w-16",
          )}
        >
          <Icon className={clsx("text-brand-orange", compact ? "h-7 w-7" : "h-8 w-8")} strokeWidth={1.35} />
        </div>
        <span className="text-[11px] font-semibold uppercase tracking-wide text-navy/50">{t.label}</span>
      </div>
    </div>
  );
}
