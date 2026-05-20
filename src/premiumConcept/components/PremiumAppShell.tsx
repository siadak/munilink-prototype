import type { ReactNode } from "react";
import { PremiumPhoneFrame } from "./PremiumPhoneFrame";
import { Header } from "../../components/Header";
import { PremiumBottomNav } from "./PremiumBottomNav";

export function PremiumAppShell({
  children,
  showBack,
  withNav = true,
}: {
  children: ReactNode;
  showBack?: boolean;
  withNav?: boolean;
}) {
  return (
    <PremiumPhoneFrame>
      <div className="flex min-h-0 flex-1 flex-col">
        <Header showBack={showBack} />
        <main
          className={`min-h-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-y-contain scroll-smooth ${
            withNav ? "pb-4" : "pb-6"
          }`}
        >
          {children}
        </main>
        {withNav ? <PremiumBottomNav /> : null}
      </div>
    </PremiumPhoneFrame>
  );
}
