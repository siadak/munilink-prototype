import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { AppShell } from "../components/AppShell";
import { AnimatedPage } from "../components/AnimatedPage";
import { Input } from "../components/Input";
import { Checkbox } from "../components/Checkbox";
import { Button } from "../components/Button";
import { SuccessModal } from "../components/SuccessModal";

export function FetchPoliciesPage() {
  const navigate = useNavigate();
  const [smsSent, setSmsSent] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [demoErrorOpen, setDemoErrorOpen] = useState(false);

  const [pesel, setPesel] = useState("");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");

  useEffect(() => {
    if (!toastOpen) return;
    const t = window.setTimeout(() => setToastOpen(false), 2400);
    return () => window.clearTimeout(t);
  }, [toastOpen]);

  return (
    <AppShell>
      <AnimatedPage className="space-y-5">
        <div className="relative">
          <AnimatePresence>
            {toastOpen ? (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="w-full rounded-[1.5rem] border border-line/90 bg-card shadow-card px-4 py-3"
              >
                <p className="text-sm font-semibold text-navy">Kod SMS został wysłany</p>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-navy">Pobierz swoje polisy</h1>
          <p className="text-sm text-muted leading-relaxed">
            Wpisz PESEL i numer telefonu. Wyślemy kod SMS, aby potwierdzić, że to Twój numer.
          </p>
        </div>

        <div className="relative rounded-[2rem] overflow-hidden bg-lavender/30 border border-line/80 shadow-soft">
          <img
            src="/design-references/check-your-policy-set-pesel-phonenumber.jpg"
            alt="Weryfikacja danych"
            className="w-full h-[220px] object-cover object-top"
          />
        </div>

        <div className="space-y-4">
          <Input
            label="PESEL"
            name="pesel"
            inputMode="numeric"
            placeholder="Wpisz swój PESEL"
            value={pesel}
            onChange={(e) => setPesel(e.target.value)}
          />
          <Input
            label="Numer telefonu"
            name="phone"
            type="tel"
            placeholder="Wpisz numer telefonu"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          {smsSent ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
            >
              <Input
                label="Kod weryfikacyjny"
                name="code"
                placeholder="Wpisz kod"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
            </motion.div>
          ) : (
            <p className="text-xs text-muted -mt-2">Na podany numer telefonu wyślemy kod weryfikacyjny SMS.</p>
          )}
        </div>

        <div className="space-y-3 pt-1">
          <p className="text-sm font-semibold text-navy">Wymagane zgody</p>
          <Checkbox label="Potwierdzam, że podane dane dotyczą mnie." name="c1" id="c1" />
          <Checkbox
            label="Wyrażam zgodę na przetwarzanie danych w celu weryfikacji i pobrania polis."
            name="c2"
            id="c2"
          />
          <Checkbox label="Akceptuję Regulamin i Politykę prywatności." name="c3" id="c3" />

          <button
            type="button"
            onClick={() => setDemoErrorOpen(true)}
            className="text-sm font-semibold text-brand-orangeDeep underline underline-offset-2 pt-2"
          >
            Pokaż przykład błędu
          </button>

          <AnimatePresence>
            {demoErrorOpen ? (
              <motion.div
                key="demo-error"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.22 }}
                className="rounded-[1.5rem] border border-brand-orange/25 bg-warning-bg px-4 py-3 text-sm text-navy/90"
              >
                Nie możemy automatycznie potwierdzić danych. Sprawdź numer telefonu lub skontaktuj się z Unilink.
                <div className="mt-2">
                  <button
                    type="button"
                    className="font-semibold text-brand-orangeDeep underline underline-offset-2"
                    onClick={() => setDemoErrorOpen(false)}
                  >
                    Zwiń
                  </button>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
          <Button
            fullWidth
            onClick={() => {
              setDemoErrorOpen(false);
              if (!smsSent) {
                setSmsSent(true);
                setToastOpen(true);
                return;
              }
              setSuccessOpen(true);
            }}
          >
            {smsSent ? "Pobierz polisy" : "Wyślij kod SMS"}
          </Button>
        </motion.div>
      </AnimatedPage>

      <SuccessModal
        open={successOpen}
        onClose={() => setSuccessOpen(false)}
        onPrimary={() => {
          setSuccessOpen(false);
          navigate("/policies");
        }}
        title=""
        primaryLabel="Zobacz polisy"
      >
        <p className="font-semibold text-navy">
          Gotowe! Konto zostało połączone z UniWersum.
        </p>
        <p className="text-sm text-muted leading-relaxed">Twoje polisy są już dostępne w aplikacji.</p>
      </SuccessModal>
    </AppShell>
  );
}
