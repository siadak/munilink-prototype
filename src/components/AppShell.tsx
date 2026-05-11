import type { ReactNode } from "react";
import { PhoneFrame } from "./PhoneFrame";
import { Header } from "./Header";
import { BottomNav } from "./BottomNav";

export function AppShell({
  children,
  showBack,
  withNav = true,
}: {
  children: ReactNode;
  showBack?: boolean;
  withNav?: boolean;
}) {
  return (
    <PhoneFrame>
      <div className="flex min-h-0 flex-1 flex-col">
        <Header showBack={showBack} />
        <main
          className={`min-h-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-y-contain scroll-smooth ${
            withNav ? "pb-4" : "pb-6"
          }`}
        >
          {children}
        </main>
        {withNav ? <BottomNav /> : null}
      </div>
    </PhoneFrame>
  );
}
