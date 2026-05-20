import type { ReactNode } from "react";

export function PremiumPhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-[100dvh] w-full justify-center overflow-x-hidden bg-gradient-to-b from-[#060716] via-[#0b0c23] to-[#050612] px-2.5 py-0 sm:px-3 sm:py-8">
      <div className="flex h-[100dvh] max-h-[100dvh] w-full min-w-0 max-w-[430px] flex-col overflow-x-hidden rounded-none bg-surface-light shadow-2xl shadow-black/45 ring-1 ring-white/5 sm:h-[min(100dvh,calc(100dvh-4rem))] sm:max-h-[min(100dvh,calc(100dvh-4rem))] sm:rounded-[2.25rem]">
        {children}
      </div>
    </div>
  );
}
