import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
  padding?: "md" | "lg" | "none";
};

export function Card({ children, className = "", padding = "md" }: CardProps) {
  const p = padding === "lg" ? "p-5" : padding === "none" ? "" : "p-4";
  return (
    <div className={`rounded-2xl border border-line/60 bg-white shadow-[0_2px_8px_rgba(23,26,74,0.05)] ${p} ${className}`}>
      {children}
    </div>
  );
}
