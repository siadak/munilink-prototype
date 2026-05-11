import { useState } from "react";
import { ArrowLeft, Bell, Check, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import { Logo } from "./Logo";
import { DEMO_MODE_META, DEMO_MODE_ORDER, useDemoMode, type DemoMode } from "../context/DemoContext";

export function Header({ showBack }: { showBack?: boolean }) {
  const navigate = useNavigate();
  const { mode, setMode } = useDemoMode();
  const [profileOpen, setProfileOpen] = useState(false);

  const selectMode = (m: DemoMode) => {
    setMode(m);
    setProfileOpen(false);
  };

  return (
    <header className="z-40 flex shrink-0 flex-col border-b border-line/60 bg-surface-light/95 shadow-sm backdrop-blur-md">
      <div className="flex items-center gap-2 px-4 pb-3 pt-[max(1rem,env(safe-area-inset-top))]">
        <div className="w-11 shrink-0 flex justify-start">
          {showBack ? (
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white border border-line shadow-sm text-navy"
              aria-label="Wstecz"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
          ) : (
            <span className="h-11 w-11" />
          )}
        </div>
        <div className="flex-1 flex justify-center">
          <Logo className="text-xl" />
        </div>
        <div className="w-[104px] shrink-0 flex items-center justify-end gap-2">
          <motion.button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white border border-line shadow-sm text-navy"
            aria-label="Powiadomienia"
            initial={{ rotate: 0, scale: 0.9, opacity: 0 }}
            animate={{ rotate: [0, -10, 8, -6, 0], scale: 1, opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.7, ease: "easeOut" }}
          >
            <Bell className="h-5 w-5" />
          </motion.button>
          <motion.button
            type="button"
            whileTap={{ scale: 0.94 }}
            onClick={() => setProfileOpen((v) => !v)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-brand-orange to-brand-orangeDeep text-white shadow-soft"
            aria-label="Profil i tryb demo"
          >
            <User className="h-5 w-5" />
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {profileOpen ? (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
            className="px-4 pb-4"
          >
              <div className="rounded-[1.5rem] border border-line/90 bg-card shadow-card">
                <div className="border-b border-line/70 px-4 py-3">
                  <p className="text-[11px] font-bold uppercase tracking-wide text-muted">Tryb demo</p>
                  <p className="mt-1 text-[15px] font-bold text-navy leading-snug">
                    {DEMO_MODE_META[mode].label}
                  </p>
                  <p className="mt-1 text-xs text-muted leading-relaxed">{DEMO_MODE_META[mode].hint}</p>
                  <p className="mt-2 text-[11px] font-medium text-navy/70">
                    Karol • <span className="text-brand-orangeDeep">warsztat</span>
                  </p>
                </div>
                <div className="max-h-[min(52vh,420px)] overflow-y-auto overscroll-y-contain px-2 py-2">
                  <p className="px-2 pb-1 text-[11px] font-semibold uppercase tracking-wide text-muted">
                    Wybierz scenariusz
                  </p>
                  <ul className="space-y-1">
                    {DEMO_MODE_ORDER.map((m) => {
                      const active = mode === m;
                      const meta = DEMO_MODE_META[m];
                      return (
                        <li key={m}>
                          <button
                            type="button"
                            onClick={() => selectMode(m)}
                            className={clsx(
                              "flex w-full items-start gap-3 rounded-2xl px-3 py-3 text-left transition",
                              active ? "bg-lavender/70 ring-2 ring-brand-orange/25" : "hover:bg-lavender/30",
                            )}
                          >
                            <span
                              className={clsx(
                                "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2",
                                active
                                  ? "border-brand-orange bg-brand-orange text-white"
                                  : "border-line bg-white text-transparent",
                              )}
                            >
                              <Check className="h-3.5 w-3.5" strokeWidth={3} />
                            </span>
                            <span className="min-w-0">
                              <span className="block text-sm font-semibold text-navy leading-snug">{meta.label}</span>
                              <span className="mt-0.5 block text-[11px] text-muted leading-snug">{meta.hint}</span>
                            </span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
