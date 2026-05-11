import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, Shield, Sparkles } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { AppShell } from "../components/AppShell";
import { AnimatedPage } from "../components/AnimatedPage";
import { PolicyCard } from "../components/PolicyCard";
import { Button } from "../components/Button";
import { policies } from "../data/mocks";
import { useDemoMode } from "../context/DemoContext";

const tabs = ["Wszystkie", "Komunikacyjne", "Majątkowe", "Turystyczne", "Zewnętrzne"] as const;

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
      <AnimatedPage className="space-y-4">
        <div className="px-1">
          <h1 className="text-2xl font-bold text-navy">Moje ubezpieczenia</h1>
          <p className="mt-1 text-sm font-semibold text-muted">
            {showPolicyList ? `${policies.length} polisy • ${activeCount} aktywne` : "Brak polis do wyświetlenia"}
          </p>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-hide">
          {tabs.map((t) => {
            const active = tab === t;
            return (
              <button
                key={t}
                type="button"
                onClick={() => showPolicyList && setTab(t)}
                disabled={!showPolicyList}
                className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold border transition ${
                  active && showPolicyList
                    ? "bg-lavender/70 text-brand-orangeDeep border-lavender shadow-soft"
                    : "bg-white text-muted border-line hover:border-line"
                } ${!showPolicyList ? "opacity-50 pointer-events-none" : ""}`}
              >
                {t}
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          {showPolicyList ? (
            <motion.div
              key="list"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="space-y-3 pt-2"
            >
              <AnimatePresence initial={false}>
                {filtered.length === 0 ? (
                  <motion.div
                    key="empty-tab"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="py-10 text-center text-sm text-muted"
                  >
                    Brak polis w tej kategorii.
                  </motion.div>
                ) : (
                  filtered.map((p, idx) => (
                    <motion.div
                      key={p.id}
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.28, ease: "easeOut", delay: idx * 0.06 }}
                    >
                      <Link to={`/policy/${p.id}`} className="block">
                        <PolicyCard policy={p} />
                      </Link>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              key="empty-mode"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28 }}
              className="space-y-5 pt-2"
            >
              <div className="flex justify-center">
                <div className="flex h-24 w-24 items-center justify-center rounded-[1.75rem] bg-lavender/50 text-navy shadow-card ring-1 ring-line/80">
                  <Shield className="h-12 w-12 text-brand-orange" strokeWidth={1.25} />
                </div>
              </div>

              {mode === "BEFORE_FETCH" ? (
                <div className="space-y-2 text-center">
                  <h2 className="text-xl font-bold text-navy">Jesteś klientem Unilink?</h2>
                  <p className="text-lg font-semibold text-navy">Pobierz swoje polisy</p>
                  <p className="text-sm text-muted leading-relaxed">
                    Masz konto — teraz potwierdź dane i pobierz polisy z UniWersum do aplikacji.
                  </p>
                  <Button fullWidth className="mt-2" onClick={() => navigate("/fetch-policies")}>
                    Pobierz swoje polisy
                  </Button>
                  <Button variant="secondary" fullWidth type="button" onClick={() => navigate("/buy")}>
                    Nie jestem jeszcze klientem
                  </Button>
                </div>
              ) : null}

              {mode === "NO_PESEL" ? (
                <div className="space-y-2 text-center">
                  <h2 className="text-xl font-bold text-navy">Brak polis w aplikacji</h2>
                  <p className="text-sm text-muted leading-relaxed">
                    To konto techniczne — nie zweryfikowano jeszcze PESEL. Możesz już korzystać z zakupów online,
                    benefitów i dodać polisę spoza Unilink. Polisy z Unilink pojawią się po weryfikacji.
                  </p>
                  <div className="flex flex-col gap-2 pt-2">
                    <Button fullWidth type="button" onClick={() => navigate("/fetch-policies")}>
                      Pobierz polisy (po weryfikacji)
                    </Button>
                    <Button variant="secondary" fullWidth type="button" onClick={() => navigate("/add-external-policy")}>
                      Dodaj polisę spoza Unilink
                    </Button>
                    <Button variant="secondary" fullWidth type="button" onClick={() => navigate("/buy")}>
                      Kup ubezpieczenie online
                    </Button>
                  </div>
                </div>
              ) : null}

              {mode === "HISTORICAL" ? (
                <div className="space-y-2 text-center">
                  <h2 className="text-xl font-bold text-navy">Nie znaleźliśmy aktywnych polis do wyświetlenia</h2>
                  <p className="text-sm text-muted leading-relaxed">
                    Ostatnia polisa jest starsza niż 3 lata — możesz kupić nową ochronę, dodać polisę z zewnątrz lub
                    porozmawiać z Agentem.
                  </p>
                  <div className="flex flex-col gap-2 pt-2">
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
            </motion.div>
          )}
        </AnimatePresence>
      </AnimatedPage>

      <div className="fixed left-1/2 -translate-x-1/2 bottom-[calc(120px+env(safe-area-inset-bottom))] w-full max-w-[430px] px-4 pointer-events-none z-50">
        <div className="flex justify-end pointer-events-auto">
          <div className="relative">
            <AnimatePresence>
              {fabOpen ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute bottom-[70px] right-0 w-[250px] rounded-[1.5rem] bg-card border border-line/90 shadow-2xl p-2"
                >
                  {[
                    { label: "Dodaj polisę ręcznie", to: "/add-external-policy" },
                    { label: "Zrób zdjęcie polisy", to: "/add-external-policy" },
                    { label: "Kup ubezpieczenie", to: "/buy" },
                  ].map((item, i) => (
                    <motion.button
                      key={item.to + i}
                      type="button"
                      onClick={() => {
                        setFabOpen(false);
                        navigate(item.to);
                      }}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.18, delay: i * 0.04 }}
                      className="w-full flex items-center justify-between gap-3 rounded-[1.25rem] px-4 py-3 text-left hover:bg-lavender/40 transition"
                    >
                      <span className="font-semibold text-navy">{item.label}</span>
                      <Sparkles className="h-4 w-4 text-brand-orangeDeep" />
                    </motion.button>
                  ))}
                </motion.div>
              ) : null}
            </AnimatePresence>

            <motion.button
              type="button"
              aria-label="Dodaj polisę"
              whileTap={{ scale: 0.9 }}
              whileHover={{ y: -1 }}
              animate={{ rotate: fabOpen ? 45 : 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
              onClick={() => setFabOpen((v) => !v)}
              className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-brand-orange to-brand-orangeDeep text-white shadow-2xl border border-white/25"
            >
              <Plus className="h-7 w-7" strokeWidth={2.5} />
            </motion.button>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
