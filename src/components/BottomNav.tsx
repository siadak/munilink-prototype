import { ShoppingCart, FileText, HelpCircle, UserRound, LayoutGrid } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";

const items = [
  { to: "/menu", label: "Menu", icon: LayoutGrid, end: true },
  {
    to: "/policies",
    label: "Polisy",
    icon: FileText,
    match: [
      "/policies",
      "/policies-empty",
      "/add-external-policy",
      "/fetch-policies",
      "/policy",
    ],
  },
  { to: "/help", label: "Pomoc", icon: HelpCircle, match: ["/help", "/ai-assistant"] },
  { to: "/agent", label: "Agent", icon: UserRound, match: ["/agent", "/send-document", "/change-agent"] },
  {
    to: "/buy",
    label: "Kup",
    icon: ShoppingCart,
    match: ["/buy", "/cashback", "/benefits", "/benefit-checkout"],
  },
] as const;

function isActivePath(pathname: string, to: string, match?: readonly string[], end?: boolean) {
  if (match?.some((p) => pathname === p || pathname.startsWith(p + "/"))) return true;
  if (end) return pathname === to;
  return pathname === to || pathname.startsWith(to + "/");
}

export function BottomNav() {
  const { pathname } = useLocation();

  return (
    <nav className="z-40 w-full shrink-0 px-3 pb-[max(10px,env(safe-area-inset-bottom))] pt-2">
      <div className="rounded-[1.75rem] border border-white/5 bg-navy-deep px-2 py-3 shadow-2xl shadow-black/40">
        <ul className="grid grid-cols-5 gap-1">
          {items.map(({ to, label, icon: Icon, match, end }) => {
            const active = isActivePath(pathname, to, match, end);
            return (
              <li key={to} className="min-w-0">
                <NavLink to={to} className="block">
                  {({ isActive }) => {
                    const selected = active || isActive;
                    return (
                      <motion.div
                        whileTap={{ scale: 0.94 }}
                        className={clsx(
                          "relative flex flex-col items-center justify-center gap-1 rounded-2xl py-2 px-1 min-h-[68px] transition-colors",
                          selected ? "text-brand-orange" : "text-white/75 hover:text-white",
                        )}
                      >
                        <div className="relative flex items-center justify-center">
                          <AnimatePresence>
                            {selected && (
                              <motion.span
                                layoutId="nav-pill"
                                className="absolute h-9 w-14 rounded-full bg-white/12 blur-[1px]"
                                initial={{ opacity: 0, scale: 0.82 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.82 }}
                                transition={{ type: "spring", stiffness: 420, damping: 34 }}
                              />
                            )}
                          </AnimatePresence>
                          <span className="relative inline-flex h-10 w-10 items-center justify-center rounded-2xl">
                            <Icon
                              className={clsx(
                                "h-5 w-5",
                                selected ? "text-brand-orange" : "text-white",
                              )}
                              strokeWidth={2}
                            />
                          </span>
                        </div>
                        <span className="text-[10px] font-semibold leading-none text-center">
                          {label}
                        </span>
                      </motion.div>
                    );
                  }}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
