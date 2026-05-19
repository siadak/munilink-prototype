import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppShell } from "../components/AppShell";
import { AnimatedPage } from "../components/AnimatedPage";
import { Input } from "../components/Input";
import { Checkbox } from "../components/Checkbox";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
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
    <AppShell showBack>
      <AnimatedPage className="space-y-4">
        {toastOpen ? (
          <Card padding="md" className="!py-3">
            <p className="text-sm font-semibold text-navy">Kod SMS został wysłany</p>
          </Card>
        ) : null}

        <div>
          <h1 className="text-lg font-bold text-brand-orange">Pobierz swoje polisy</h1>
          <p className="mt-1 text-sm leading-relaxed text-muted">
            Wpisz PESEL i numer telefonu. Wyślemy kod SMS w celu weryfikacji.
          </p>
        </div>

        <Card padding="md" className="space-y-4">
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
            <Input
              label="Kod SMS"
              name="code"
              placeholder="Wpisz kod"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          ) : (
            <p className="text-xs text-muted">Na podany numer wyślemy kod weryfikacyjny SMS.</p>
          )}
        </Card>

        <Card padding="md" className="space-y-3">
          <p className="text-sm font-bold text-navy">Zgody</p>
          <Checkbox label="Potwierdzam, że podane dane dotyczą mnie." name="c1" id="c1" />
          <Checkbox
            label="Wyrażam zgodę na przetwarzanie danych w celu weryfikacji i pobrania polis."
            name="c2"
            id="c2"
          />
          <Checkbox label="Akceptuję Regulamin i Politykę prywatności." name="c3" id="c3" />
          <button
            type="button"
            onClick={() => setDemoErrorOpen((v) => !v)}
            className="text-sm font-semibold text-brand-orange"
          >
            {demoErrorOpen ? "Ukryj przykład błędu" : "Pokaż przykład błędu"}
          </button>
          {demoErrorOpen ? (
            <p className="rounded-xl border border-brand-orange/20 bg-warning-bg px-3 py-2 text-sm text-navy/90">
              Nie możemy potwierdzić danych. Sprawdź numer telefonu lub skontaktuj się z Unilink.
            </p>
          ) : null}
        </Card>

        <Button
          fullWidth
          type="button"
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
      </AnimatedPage>

      <SuccessModal
        open={successOpen}
        onClose={() => setSuccessOpen(false)}
        onPrimary={() => {
          setSuccessOpen(false);
          navigate("/policies");
        }}
        title="Gotowe"
        primaryLabel="Zobacz polisy"
        withConfetti={false}
      >
        <p className="font-semibold text-navy">Konto zostało połączone z UniWersum.</p>
        <p className="text-sm text-muted leading-relaxed">Twoje polisy są dostępne w aplikacji.</p>
      </SuccessModal>
    </AppShell>
  );
}
