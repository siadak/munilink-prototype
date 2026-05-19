import type { ReactNode } from "react";

export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="fixed inset-0 flex justify-center overflow-hidden bg-[#e8e9ef]">
      <div className="flex h-full w-full min-w-0 max-w-[430px] flex-col overflow-hidden bg-[#f4f4f6] sm:my-3 sm:h-[calc(100dvh-1.5rem)] sm:max-h-[calc(100dvh-1.5rem)] sm:rounded-2xl sm:shadow-lg">
        {children}
      </div>
    </div>
  );
}
