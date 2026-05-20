import type { ReactNode } from "react";

type Tone = "default" | "orange" | "success" | "muted";

export function Badge({
  children,
  tone = "default",
  className = "",
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  const tones: Record<Tone, string> = {
    default: "bg-lavender/70 text-navy",
    orange: "bg-warning-bg text-brand-orangeDeep",
    success: "bg-emerald-50 text-success",
    muted: "bg-surface-alt text-muted",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
