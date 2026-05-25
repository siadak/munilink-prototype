import { useState } from "react";
import { ArrowLeft, Bell, Check, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import { Logo } from "./Logo";
import {
  DEMO_MODE_META,
  DEMO_MODE_ORDER,
  NAV_VARIANT_META,
  NAV_VARIANT_ORDER,
  VISUAL_VARIANT_META,
  VISUAL_VARIANT_ORDER,
  useDemoMode,
  type AppVisualVariant,
  type DemoMode,
  type NavigationVariant,
} from "../context/DemoContext";
import { AGENT_WORKSHOP_LINKS } from "../data/agentScenarios";

export function Header({ showBack }: { showBack?: boolean }) {
  const navigate = useNavigate();
  const { mode, setMode, navigationVariant, setNavigationVariant, appVisualVariant, setAppVisualVariant } =
    useDemoMode();
  const [profileOpen, setProfileOpen] = useState(false);

  const selectMode = (m: DemoMode) => {
    setMode(m);
    setProfileOpen(false);
  };

  const selectNavVariant = (v: NavigationVariant) => {
    setNavigationVariant(v);
    setProfileOpen(false);
  };

  const selectVisualVariant = (v: AppVisualVariant) => {
    setAppVisualVariant(v);
    setProfileOpen(false);
  };

  return (
    <header className="z-40 flex shrink-0 flex-col border-b border-line/70 bg-white">
      <HeaderBar showBack={showBack} onBack={() => navigate(-1)} onToggleProfile={() => setProfileOpen((v) => !v)} />
      {profileOpen ? (
        <div className="border-t border-line/70 bg-white px-3 pb-3">
          <div className="rounded-xl border border-line bg-white shadow-sm">
            <DemoPanelHeader
              mode={mode}
              navigationVariant={navigationVariant}
              appVisualVariant={appVisualVariant}
            />
            <div className="max-h-[min(55vh,420px)] overflow-y-auto overscroll-y-contain px-2 py-2 space-y-3">
              <section>
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
                            "flex w-full items-start gap-2.5 rounded-lg px-2.5 py-2.5 text-left",
                            active ? "bg-lavender/60" : "hover:bg-[#f4f4f6]",
                          )}
                        >
                          <span
                            className={clsx(
                              "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2",
                              active ? "border-brand-orange bg-brand-orange text-white" : "border-line bg-white",
                            )}
                          >
                            {active ? <Check className="h-3 w-3" strokeWidth={3} /> : null}
                          </span>
                          <span className="min-w-0">
                            <span className="block text-sm font-semibold text-navy">{meta.label}</span>
                            <span className="mt-0.5 block text-[11px] text-muted leading-snug">{meta.hint}</span>
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </section>

              <section className="border-t border-line/70 pt-2">
                <p className="px-2 pb-1 text-[11px] font-semibold uppercase tracking-wide text-muted">
                  Wariant nawigacji
                </p>
                <ul className="space-y-1">
                  {NAV_VARIANT_ORDER.map((v) => {
                    const active = navigationVariant === v;
                    const meta = NAV_VARIANT_META[v];
                    return (
                      <li key={v}>
                        <button
                          type="button"
                          onClick={() => selectNavVariant(v)}
                          className={clsx(
                            "flex w-full items-start gap-2.5 rounded-lg px-2.5 py-2.5 text-left",
                            active ? "bg-lavender/60" : "hover:bg-[#f4f4f6]",
                          )}
                        >
                          <span
                            className={clsx(
                              "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2",
                              active ? "border-brand-orange bg-brand-orange text-white" : "border-line bg-white",
                            )}
                          >
                            {active ? <Check className="h-3 w-3" strokeWidth={3} /> : null}
                          </span>
                          <span className="min-w-0">
                            <span className="block text-sm font-semibold text-navy">{meta.label}</span>
                            <span className="mt-0.5 block text-[11px] text-muted leading-snug">{meta.hint}</span>
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </section>

              <section className="border-t border-line/70 pt-2">
                <p className="px-2 pb-1 text-[11px] font-semibold uppercase tracking-wide text-muted">
                  Scenariusze — zakładka Agent
                </p>
                <ul className="space-y-1">
                  {AGENT_WORKSHOP_LINKS.map((link) => (
                    <li key={link.path}>
                      <button
                        type="button"
                        onClick={() => {
                          navigate(link.path);
                          setProfileOpen(false);
                        }}
                        className="flex w-full items-center rounded-lg px-2.5 py-2.5 text-left text-sm font-semibold text-navy hover:bg-[#f4f4f6]"
                      >
                        {link.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="border-t border-line/70 pt-2">
                <p className="px-2 pb-1 text-[11px] font-semibold uppercase tracking-wide text-muted">
                  Wariant wyglądu
                </p>
                <ul className="space-y-1">
                  {VISUAL_VARIANT_ORDER.map((v) => {
                    const active = appVisualVariant === v;
                    const meta = VISUAL_VARIANT_META[v];
                    return (
                      <li key={v}>
                        <button
                          type="button"
                          onClick={() => selectVisualVariant(v)}
                          className={clsx(
                            "flex w-full items-start gap-2.5 rounded-lg px-2.5 py-2.5 text-left",
                            active ? "bg-lavender/60" : "hover:bg-[#f4f4f6]",
                          )}
                        >
                          <span
                            className={clsx(
                              "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2",
                              active ? "border-brand-orange bg-brand-orange text-white" : "border-line bg-white",
                            )}
                          >
                            {active ? <Check className="h-3 w-3" strokeWidth={3} /> : null}
                          </span>
                          <span className="min-w-0">
                            <span className="block text-sm font-semibold text-navy">{meta.label}</span>
                            <span className="mt-0.5 block text-[11px] text-muted leading-snug">{meta.hint}</span>
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </section>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}

function HeaderBar({
  showBack,
  onBack,
  onToggleProfile,
}: {
  showBack?: boolean;
  onBack: () => void;
  onToggleProfile: () => void;
}) {
  return (
    <div className="flex items-center gap-2 px-3 pb-2.5 pt-[max(0.75rem,env(safe-area-inset-top))]">
      <div className="w-10 shrink-0">
        {showBack ? (
          <button
            type="button"
            onClick={onBack}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-orange text-white shadow-sm"
            aria-label="Wstecz"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
        ) : (
          <span className="block h-10 w-10" />
        )}
      </div>
      <div className="flex flex-1 justify-center">
        <Logo className="text-xl" />
      </div>
      <div className="flex w-[88px] shrink-0 items-center justify-end gap-2">
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white text-navy shadow-sm"
          aria-label="Powiadomienia"
        >
          <Bell className="h-5 w-5" strokeWidth={1.75} />
        </button>
        <button
          type="button"
          onClick={onToggleProfile}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-orange text-white shadow-sm"
          aria-label="Profil i tryb demo"
        >
          <User className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

function DemoPanelHeader({
  mode,
  navigationVariant,
  appVisualVariant,
}: {
  mode: DemoMode;
  navigationVariant: NavigationVariant;
  appVisualVariant: AppVisualVariant;
}) {
  const meta = DEMO_MODE_META[mode];
  const navMeta = NAV_VARIANT_META[navigationVariant];
  const visualMeta = VISUAL_VARIANT_META[appVisualVariant];
  return (
    <div className="border-b border-line/70 px-3 py-2.5 space-y-2">
      <div>
        <p className="text-[11px] font-bold uppercase tracking-wide text-muted">Tryb demo</p>
        <p className="mt-0.5 text-sm font-bold text-navy">{meta.label}</p>
        <p className="mt-0.5 text-xs text-muted leading-snug">{meta.hint}</p>
      </div>
      <p className="text-[11px] text-muted">
        Nawigacja: <span className="font-semibold text-navy">{navMeta.label}</span>
      </p>
      <p className="text-[11px] text-muted">
        Wygląd: <span className="font-semibold text-navy">{visualMeta.label}</span>
      </p>
    </div>
  );
}
