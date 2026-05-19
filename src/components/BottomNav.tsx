import { HelpCircle, LayoutGrid, MoreHorizontal, ShieldCheck, UserRound } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import clsx from "clsx";
import { moreTabActivePaths } from "../data/moreMenu";
import { useDemoMode } from "../context/DemoContext";
import { useMoreSheet } from "../context/MoreSheetContext";

const items = [
  { to: "/menu", label: "Menu", icon: LayoutGrid, end: true },
  {
    to: "/policies",
    label: "Polisy",
    icon: ShieldCheck,
    match: ["/policies", "/policies-empty", "/fetch-policies", "/policy", "/add-external-policy"],
  },
  { to: "/help", label: "Pomoc", icon: HelpCircle, match: ["/help"] },
  { to: "/agent", label: "Agent", icon: UserRound, match: ["/agent", "/change-agent", "/send-document"] },
] as const;

const MORE_TAB = {
  to: "/more",
  label: "Więcej",
  icon: MoreHorizontal,
} as const;

function isActivePath(pathname: string, to: string, match?: readonly string[], end?: boolean) {
  if (match?.some((p) => pathname === p || pathname.startsWith(p + "/"))) return true;
  if (end) return pathname === to;
  return pathname === to || pathname.startsWith(to + "/");
}

function isMoreTabRouteActive(pathname: string) {
  if (pathname === "/more") return true;
  return moreTabActivePaths.some((p) => pathname === p || pathname.startsWith(p + "/"));
}

export function BottomNav() {
  const { pathname } = useLocation();
  const { navigationVariant } = useDemoMode();
  const { isOpen: moreSheetOpen, toggle: toggleMoreSheet } = useMoreSheet();

  const moreSheetNav = navigationVariant === "more-sheet";
  const moreActive = isMoreTabRouteActive(pathname) || (moreSheetNav && moreSheetOpen);

  return (
    <nav className="relative z-40 w-full shrink-0 border-t border-navy-deep/20 bg-navy-deep px-1 pb-[max(8px,env(safe-area-inset-bottom))] pt-1.5">
      <ul className="grid grid-cols-5 gap-0">
        {items.map(({ to, label, icon: Icon, match, end }) => {
          const active = isActivePath(pathname, to, match, end);
          return (
            <li key={to} className="min-w-0">
              <NavLink to={to} className="block">
                {({ isActive }) => {
                  const selected = active || isActive;
                  return (
                    <div
                      className={clsx(
                        "flex min-h-[56px] flex-col items-center justify-center gap-0.5 px-0.5 py-2",
                        selected ? "text-brand-orange" : "text-white/85",
                      )}
                    >
                      <Icon className="h-6 w-6" strokeWidth={1.75} />
                      <span className="text-center text-[10px] font-medium leading-tight">{label}</span>
                    </div>
                  );
                }}
              </NavLink>
            </li>
          );
        })}
        <li className="min-w-0">
          {moreSheetNav ? (
            <button
              type="button"
              className="block w-full"
              aria-expanded={moreSheetOpen}
              aria-haspopup="dialog"
              onClick={toggleMoreSheet}
            >
              <div
                className={clsx(
                  "flex min-h-[56px] flex-col items-center justify-center gap-0.5 px-0.5 py-2",
                  moreActive ? "text-brand-orange" : "text-white/85",
                )}
              >
                <MoreHorizontal className="h-6 w-6" strokeWidth={1.75} />
                <span className="text-center text-[10px] font-medium leading-tight">{MORE_TAB.label}</span>
              </div>
            </button>
          ) : (
            <NavLink to={MORE_TAB.to} className="block">
              {({ isActive }) => {
                const selected = moreActive || isActive;
                return (
                  <div
                    className={clsx(
                      "flex min-h-[56px] flex-col items-center justify-center gap-0.5 px-0.5 py-2",
                      selected ? "text-brand-orange" : "text-white/85",
                    )}
                  >
                    <MoreHorizontal className="h-6 w-6" strokeWidth={1.75} />
                    <span className="text-center text-[10px] font-medium leading-tight">{MORE_TAB.label}</span>
                  </div>
                );
              }}
            </NavLink>
          )}
        </li>
      </ul>
    </nav>
  );
}
