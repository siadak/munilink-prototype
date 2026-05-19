import type { ReactNode } from "react";
import { MAIN_NAV_PADDING } from "../layout";
import { PhoneFrame } from "./PhoneFrame";
import { Header } from "./Header";
import { BottomNav } from "./BottomNav";
import { MoreSheetOverlay } from "./MoreSheetOverlay";

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
      <div className="relative flex h-full min-h-0 flex-col">
        <Header showBack={showBack} />
        <main
          className={`min-h-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-y-contain scroll-smooth bg-[#f4f4f6] ${
            withNav ? MAIN_NAV_PADDING : "pb-6"
          }`}
        >
          {children}
        </main>
        {withNav ? <BottomNav /> : null}
        <MoreSheetOverlay />
      </div>
    </PhoneFrame>
  );
}
