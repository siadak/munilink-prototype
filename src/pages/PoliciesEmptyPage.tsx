import { useNavigate } from "react-router-dom";
import { FilePlus2, Shield, Sparkles, Wallet, ListChecks } from "lucide-react";
import { motion } from "framer-motion";
import { AppShell } from "../components/AppShell";
import { AnimatedPage } from "../components/AnimatedPage";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { useDemoMode } from "../context/DemoContext";

const tabs = ["Wszystkie", "Komunikacyjne", "Majątkowe", "Turystyczne"] as const;

export function PoliciesEmptyPage() {
  const navigate = useNavigate();
  const { mode } = useDemoMode();

  const hasPoliciesInApp = mode === "VERIFIED" || mode === "NO_AGENT";

  if (hasPoliciesInApp) {
    return (
      <AppShell>
        <AnimatedPage className="space-y-6">
          <div className="px-1">
            <h1 className="text-2xl font-bold text-navy">Moje ubezpieczenia</h1>
            <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
              {tabs.map((t) => (
                <span
                  key={t}
                  className="shrink-0 rounded-full px-4 py-2 text-sm font-semibold border bg-white text-muted border-line"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="flex flex-col items-center text-center space-y-4"
          >
            <div className="flex h-28 w-28 items-center justify-center rounded-[2rem] bg-lavender/50 text-navy shadow-card border border-line">
              <ListChecks className="h-14 w-14 text-brand-orange" strokeWidth={1.25} />
            </div>
            <Card padding="lg" className="w-full max-w-sm border-lavender/70 bg-lavender/20 text-center">
              <p className="text-lg font-bold text-navy">Masz już polisy w aplikacji</p>
              <p className="mt-2 text-sm text-muted leading-relaxed">
                Ten ekran służy do onboardingu — przejdź do listy polis, aby zobaczyć szczegóły i statusy.
              </p>
              <Button fullWidth className="mt-4" type="button" onClick={() => navigate("/policies")}>
                Otwórz listę polis
              </Button>
            </Card>
          </motion.div>
        </AnimatedPage>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <AnimatedPage className="space-y-6">
        <div className="px-1">
          <h1 className="text-2xl font-bold text-navy">Moje ubezpieczenia</h1>
          <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
            {tabs.map((t) => (
              <span
                key={t}
                className="shrink-0 rounded-full px-4 py-2 text-sm font-semibold border bg-white text-muted border-line"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
          className="flex flex-col items-center text-center space-y-4"
        >
          <div className="flex h-28 w-28 items-center justify-center rounded-[2rem] bg-lavender/50 text-navy shadow-card border border-line">
            <Shield className="h-14 w-14 text-brand-orange" strokeWidth={1.25} />
          </div>

          {mode === "BEFORE_FETCH" ? (
            <>
              <div className="space-y-2 max-w-sm">
                <h2 className="text-xl font-bold text-navy">Jesteś klientem Unilink?</h2>
                <p className="text-lg font-semibold text-navy">Pobierz swoje polisy</p>
                <p className="text-sm text-muted leading-relaxed">
                  Masz konto — uzupełnij weryfikację i pobierz polisy z UniWersum do aplikacji.
                </p>
              </div>

              <div className="w-full max-w-sm">
                <div className="relative rounded-[2rem] overflow-hidden bg-lavender/40 border border-line/80 shadow-soft">
                  <img
                    src="/design-references/if-you-have-policy-type-your-personal-data.jpg"
                    alt="Pobierz polisy"
                    className="w-full h-[220px] object-cover object-top"
                  />
                </div>
              </div>
            </>
          ) : null}

          {mode === "NO_PESEL" ? (
            <div className="space-y-2 max-w-sm text-center">
              <h2 className="text-xl font-bold text-navy">Brak polis w aplikacji</h2>
              <p className="text-sm text-muted leading-relaxed">
                Konto techniczne — bez weryfikacji PESEL nie widzimy polis z Unilink. Możesz korzystać z benefitów,
                zakupów online i dodać polisę spoza Unilink.
              </p>
            </div>
          ) : null}

          {mode === "HISTORICAL" ? (
            <div className="space-y-2 max-w-sm text-center">
              <h2 className="text-xl font-bold text-navy">Nie znaleźliśmy aktywnych polis do wyświetlenia</h2>
              <p className="text-sm text-muted leading-relaxed">
                Ostatnia polisa jest starsza niż 3 lata — możesz kupić nową ochronę, dodać polisę z zewnątrz lub
                porozmawiać z Agentem.
              </p>
            </div>
          ) : null}
        </motion.div>

        <div className="w-full max-w-sm space-y-3 pt-2 mx-auto">
          {mode === "BEFORE_FETCH" ? (
            <>
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
                <Button fullWidth onClick={() => navigate("/fetch-policies")}>
                  Pobierz swoje polisy
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: 0.05 }}
              >
                <Button variant="secondary" fullWidth type="button" onClick={() => navigate("/buy")}>
                  Nie jestem jeszcze klientem
                </Button>
              </motion.div>
            </>
          ) : null}

          {mode === "NO_PESEL" ? (
            <div className="space-y-2">
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
          ) : null}

          {mode === "HISTORICAL" ? (
            <div className="space-y-2">
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
          ) : null}

          {mode === "BEFORE_FETCH" ? (
            <motion.button
              type="button"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: 0.1 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("/buy")}
              className="w-full rounded-2xl border border-line/80 bg-white/70 px-5 py-3 flex items-center justify-between text-brand-orangeDeep font-semibold"
            >
              <span>Kup ubezpieczenie</span>
              <span className="inline-flex items-center justify-center rounded-full bg-lavender/60 h-8 w-8 border border-line/70">
                <Sparkles className="h-4 w-4 text-brand-orangeDeep" />
              </span>
            </motion.button>
          ) : null}

          <div className="pt-2 space-y-3">
            {[
              { icon: FilePlus2, title: "Dodaj polisę spoza Unilink", to: "/add-external-policy" },
              { icon: Wallet, title: "Kup nowe ubezpieczenie", to: "/buy" },
              { icon: Sparkles, title: "Skorzystaj z benefitów", to: "/benefits" },
            ].map((it, idx) => (
              <motion.button
                key={it.to + idx}
                type="button"
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate(it.to)}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: 0.12 + idx * 0.06 }}
                className="w-full rounded-[1.65rem] border border-line/80 bg-lavender/25 px-4 py-4 flex items-start gap-3 text-left hover:bg-lavender/40 transition"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-card border border-line/80">
                  <it.icon className="h-5 w-5 text-brand-orangeDeep" />
                </span>
                <span className="font-semibold text-navy leading-snug">{it.title}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </AnimatedPage>
    </AppShell>
  );
}
