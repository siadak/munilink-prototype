import type { ReactNode } from "react";

export function RegisterShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex h-full min-h-0 flex-col overflow-hidden bg-[#EEEEF3]">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-40"
        style={{
          background:
            "radial-gradient(ellipse 100% 70% at 50% 0%, rgba(255,255,255,0.65) 0%, transparent 70%), radial-gradient(ellipse 60% 40% at 20% 10%, rgba(23,26,74,0.03) 0%, transparent 55%)",
        }}
        aria-hidden
      />
      {children}
    </div>
  );
}
