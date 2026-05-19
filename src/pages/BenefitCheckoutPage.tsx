import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppShell } from "../components/AppShell";
import { AnimatedPage } from "../components/AnimatedPage";
import { Card } from "../components/Card";
import { Input } from "../components/Input";
import { Checkbox } from "../components/Checkbox";
import { Button } from "../components/Button";
import { SuccessModal } from "../components/SuccessModal";
import { getBenefitById, getBenefitCode, getBenefitPartnerUrl } from "../data/mocks";

const SUCCESS_INSTRUCTION = [
  "Skopiuj kod.",
  "Przejdź na stronę partnera.",
  "Wpisz kod podczas aktywacji usługi.",
] as const;

export function BenefitCheckoutPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const benefit = useMemo(() => getBenefitById(id), [id]);
  const [successOpen, setSuccessOpen] = useState(false);

  const code = getBenefitCode(benefit?.id);
  const partnerUrl = getBenefitPartnerUrl(benefit?.id);

  if (!benefit) {
    return (
      <AppShell showBack>
        <AnimatedPage className="space-y-4">
          <h1 className="text-lg font-bold text-brand-orange">Podsumowanie zakupu</h1>
          <p className="text-sm text-muted">Nie znaleziono oferty.</p>
          <Button fullWidth type="button" onClick={() => navigate("/benefits")}>
            Wróć do benefitów
          </Button>
        </AnimatedPage>
      </AppShell>
    );
  }

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      /* prototyp */
    }
  };

  const openPartner = () => {
    if (partnerUrl === "#") return;
    window.open(partnerUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <AppShell showBack>
      <AnimatedPage className="space-y-4">
        <h1 className="text-lg font-bold text-brand-orange">Podsumowanie zakupu</h1>

        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            setSuccessOpen(true);
          }}
        >
          <Card padding="md" className="space-y-2">
            <p className="font-bold text-navy">{benefit.name}</p>
            <p className="text-sm text-muted">{benefit.type}</p>
            <p className="text-base font-bold text-brand-orange">{benefit.price} zł</p>
          </Card>

          <Card padding="md" className="space-y-4">
            <p className="text-sm font-bold text-navy">Dane klienta</p>
            <Input label="E-mail" name="email" type="email" defaultValue="karol@example.com" required />
            <Input label="Telefon" name="phone" type="tel" defaultValue="503 115 983" required />
            <Checkbox
              label="Akceptuję regulamin zakupu oraz warunki korzystania z benefitu."
              name="accept"
              id="accept-benefit"
              required
            />
          </Card>

          <Card padding="md" className="space-y-2 text-sm">
            <p className="font-bold text-navy">Podsumowanie</p>
            <SummaryRow label="Cena" value={`${benefit.price} zł`} bold />
            <SummaryRow label="Metoda płatności" value="Płatność online" />
          </Card>

          <Button type="submit" fullWidth>
            Przejdź do płatności
          </Button>
        </form>
      </AnimatedPage>

      <SuccessModal
        open={successOpen}
        title="Zakup zakończony"
        onClose={() => setSuccessOpen(false)}
        withConfetti={false}
        footer={
          <CheckoutSuccessFooter
            copyCode={copyCode}
            openPartner={openPartner}
            partnerUrl={partnerUrl}
            onBack={() => {
              setSuccessOpen(false);
              navigate("/benefits");
            }}
          />
        }
      >
        <p className="text-sm font-semibold text-navy">{benefit.name}</p>
        <p className="mt-1 text-sm leading-relaxed text-navy">Twój kod jest już dostępny w aplikacji.</p>
        <div className="mt-3 rounded-xl border border-line bg-[#fafafa] px-4 py-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted">Twój kod</p>
          <p className="mt-1 break-all font-mono text-lg font-bold text-navy">{code}</p>
        </div>
        <p className="mt-4 text-sm font-bold text-navy">Instrukcja</p>
        <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-muted">
          {SUCCESS_INSTRUCTION.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </SuccessModal>
    </AppShell>
  );
}

function SummaryRow({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className="flex justify-between gap-3 pt-1">
      <span className="text-muted">{label}</span>
      <span className={bold ? "font-bold text-navy" : "font-semibold text-navy"}>{value}</span>
    </div>
  );
}

function CheckoutSuccessFooter({
  copyCode,
  openPartner,
  partnerUrl,
  onBack,
}: {
  copyCode: () => void;
  openPartner: () => void;
  partnerUrl: string;
  onBack: () => void;
}) {
  return (
    <div className="space-y-2">
      <Button fullWidth type="button" onClick={copyCode}>
        Skopiuj kod
      </Button>
      <Button
        fullWidth
        variant="secondary"
        type="button"
        onClick={openPartner}
        disabled={partnerUrl === "#"}
      >
        Przejdź do partnera
      </Button>
      <Button fullWidth variant="ghost" type="button" onClick={onBack}>
        Wróć do benefitów
      </Button>
    </div>
  );
}
