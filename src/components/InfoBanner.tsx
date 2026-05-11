import type { ReactNode } from "react";

export function InfoBanner({ children, tone = "warning" }: { children: ReactNode; tone?: "warning" | "neutral" }) {
  const cls =
    tone === "warning"
      ? "bg-warning-bg border-brand-orange/15 text-navy"
      : "bg-lavender/60 border-line text-navy";
  return (
    <div className={`rounded-2xl border px-4 py-3 text-sm leading-relaxed ${cls}`}>{children}</div>
  );
}
