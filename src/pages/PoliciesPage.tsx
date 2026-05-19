import { useMemo, useState } from "react";
import { Plus, Shield } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { AppShell } from "../components/AppShell";
import { AnimatedPage } from "../components/AnimatedPage";
import { PolicyCard } from "../components/PolicyCard";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { FAB_ABOVE_NAV } from "../layout";
import { policies } from "../data/mocks";
import { useDemoMode } from "../context/DemoContext";

const tabs = ["Wszystkie", "Komunikacyjne", "Majątkowe", "Turystyczne"] as const;

const fabItems = [
  { label: "Dodaj polisę ręcznie", to: "/add-external-policy" },
  { label: "Zrób zdjęcie polisy", to: "/add-external-policy" },
  { label: "Kup ubezpieczenie", to: "/buy" },
] as const;

export function PoliciesPage() {
  const { mode } = useDemoMode();
  const [tab, setTab] = useState<(typeof tabs)[number]>("Wszystkie");
  const [fabOpen, setFabOpen] = useState(false);
  const navigate = useNavigate();

  const showPolicyList = mode === "VERIFIED" || mode === "NO_AGENT";

  const filtered = useMemo(() => {
    if (!showPolicyList) return [];
    if (tab === "Wszystkie") return policies;
    return policies.filter((p) => p.category === tab);
  }, [tab, showPolicyList]);

  const activeCount = policies.filter((p) => p.status === "Aktywna").length;

  return (
    <AppShell>
      <AnimatedPage className={`space-y-4 ${showPolicyList ? "pb-20" : ""}`}>
        <div className="px-1">
          <h1 className="text-lg font-bold text-brand-orange">Moje ubezpieczenia</h1>
          {showPolicyList ? (
            <p className="mt-0.5 text-xs text-muted">
              {policies.length} polisy • {activeCount} aktywne
            </p>
          ) : null}
        </div>

        <div className="flex gap-4 overflow-x-auto border-b border-line scrollbar-hide">
          {tabs.map((t) => {
            const active = tab === t;
            return (
              <button
                key={t}
                type="button"
                onClick={() => showPolicyList && setTab(t)}
                disabled={!showPolicyList}
                className={`shrink-0 -mb-px border-b-2 pb-2.5 text-sm font-semibold transition ${
                  active && showPolicyList
                    ? "border-brand-orange text-navy"
                    : "border-transparent text-muted"
                } ${!showPolicyList ? "pointer-events-none opacity-50" : ""}`}
              >
                {t}
              </button>
            );
          })}
        </div>

        {showPolicyList ? (
          <ul className="space-y-3 pt-1">
            {filtered.length === 0 ? (
              <li className="py-8 text-center text-sm text-muted">Brak polis w tej kategorii.</li>
            ) : (
              filtered.map((p) => (
                <li key={p.id}>
                  <Link to={`/policy/${p.id}`} className="block">
                    <PolicyCard policy={p} />
                  </Link>
                </li>
              ))
            )}
          </ul>
        ) : (
          <Card padding="md" className="space-y-4 text-center">
            <Shield className="mx-auto h-12 w-12 text-brand-orange" strokeWidth={1.25} />

            {mode === "BEFORE_FETCH" ? (
              <div className="space-y-2">
                <h2 className="text-base font-bold text-navy">Jesteś klientem Unilink?</h2>
                <p className="text-sm text-muted leading-relaxed">
                  Potwierdź dane i pobierz polisy z UniWersum do aplikacji.
                </p>
                <Button fullWidth type="button" onClick={() => navigate("/fetch-policies")}>
                  Pobierz swoje polisy
                </Button>
                <Button variant="secondary" fullWidth type="button" onClick={() => navigate("/buy")}>
                  Nie jestem jeszcze klientem
                </Button>
              </div>
            ) : null}

            {mode === "NO_PESEL" ? (
              <div className="space-y-2">
                <h2 className="text-base font-bold text-navy">Brak polis w aplikacji</h2>
                <p className="text-sm text-muted leading-relaxed">
                  Konto bez weryfikacji PESEL. Możesz kupować online, korzystać z benefitów i dodać polisę spoza
                  Unilink.
                </p>
                <div className="flex flex-col gap-2 pt-1">
                  <Button fullWidth type="button" onClick={() => navigate("/fetch-policies")}>
                    Pobierz polisy
                  </Button>
                  <Button variant="secondary" fullWidth type="button" onClick={() => navigate("/add-external-policy")}>
                    Dodaj polisę spoza Unilink
                  </Button>
                </div>
              </div>
            ) : null}

            {mode === "HISTORICAL" ? (
              <div className="space-y-2">
                <h2 className="text-base font-bold text-navy">Brak aktywnych polis</h2>
                <p className="text-sm text-muted leading-relaxed">
                  Ostatnia polisa jest starsza niż 3 lata. Kup nową ochronę lub dodaj polisę z zewnątrz.
                </p>
                <div className="flex flex-col gap-2 pt-1">
                  <Button fullWidth type="button" onClick={() => navigate("/buy")}>
                    Kup ubezpieczenie
                  </Button>
                  <Button variant="secondary" fullWidth type="button" onClick={() => navigate("/add-external-policy")}>
                    Dodaj polisę spoza Unilink
                  </Button>
                  <Button variant="secondary" fullWidth type="button" onClick={() => navigate("/agent")}>
                    Skontaktuj się z Agentem
                  </Button>
                </div>
              </div>
            ) : null}
          </Card>
        )}
      </AnimatedPage>

      {showPolicyList ? (
        <div
          className={`pointer-events-none fixed left-1/2 z-30 w-full max-w-[430px] -translate-x-1/2 px-4 ${FAB_ABOVE_NAV}`}
        >
          <div className="pointer-events-auto flex justify-end">
            <div className="relative">
              {fabOpen ? (
                <div className="absolute bottom-16 right-0 w-[240px] rounded-2xl border border-line/60 bg-white p-2 shadow-[0_4px_16px_rgba(23,26,74,0.12)]">
                  {fabItems.map((item) => (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => {
                        setFabOpen(false);
                        navigate(item.to);
                      }}
                      className="w-full rounded-xl px-3 py-2.5 text-left text-sm font-semibold text-navy hover:bg-[#f4f4f6]"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              ) : null}
              <button
                type="button"
                aria-label="Dodaj polisę"
                aria-expanded={fabOpen}
                onClick={() => setFabOpen((v) => !v)}
                className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-brand-orange text-white shadow-md"
              >
                <Plus className={`h-7 w-7 transition-transform ${fabOpen ? "rotate-45" : ""}`} strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </AppShell>
  );
}
