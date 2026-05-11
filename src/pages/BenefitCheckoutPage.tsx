import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { AppShell } from "../components/AppShell";
import { AnimatedPage } from "../components/AnimatedPage";
import { Card } from "../components/Card";
import { Input } from "../components/Input";
import { Checkbox } from "../components/Checkbox";
import { Button } from "../components/Button";
import { Badge } from "../components/Badge";
import { Sparkles } from "lucide-react";
import { SuccessModal } from "../components/SuccessModal";
import { getBenefitById, getBenefitCode } from "../data/mocks";

export function BenefitCheckoutPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const benefit = useMemo(() => getBenefitById(id), [id]);
  const [successOpen, setSuccessOpen] = useState(false);

  const code = getBenefitCode(benefit?.id);

  if (!benefit) {
    return (
      <AppShell showBack>
        <AnimatedPage className="space-y-5">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28 }}
          >
            <Card padding="lg" className="border-lavender/70 bg-lavender/25 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-card shadow-card ring-1 ring-line">
                <Sparkles className="h-7 w-7 text-brand-orangeDeep" />
              </div>
              <h1 className="mt-4 text-lg font-bold text-navy">Nie znaleziono benefitu</h1>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Sprawdź link lub wróć do listy benefitów — np. <span className="font-mono text-navy/80">beactive</span>.
              </p>
              <Button className="mt-5" fullWidth onClick={() => navigate("/benefits")}>
                Lista benefitów
              </Button>
            </Card>
          </motion.div>
        </AnimatedPage>
      </AppShell>
    );
  }

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      // prototyp bez HTTPS — ignoruj
    }
  };

  return (
    <AppShell showBack>
      <AnimatedPage className="space-y-5">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
          <h1 className="text-xl font-bold text-navy leading-snug pr-4">Zakup benefitu</h1>
          <p className="mt-1 text-sm text-muted">Opłać ofertę partnera w kilku krokach.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28 }}
        >
          <Card padding="lg">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-lg font-bold text-navy">{benefit.name}</p>
                <p className="text-sm text-muted mt-1">{benefit.type}</p>
              </div>
              <Badge tone="orange">{benefit.price} zł</Badge>
            </div>
            <p className="text-sm text-navy/80 mt-3 leading-relaxed">{benefit.description}</p>
          </Card>
        </motion.div>

        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            setSuccessOpen(true);
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28, delay: 0.05 }}
            className="space-y-4"
          >
            <Input label="E-mail" name="email" type="email" defaultValue="karol@example.com" required />
            <Input label="Telefon" name="phone" type="tel" defaultValue="503 115 983" required />
            <Checkbox label="Akceptuję regulamin zakupu oraz warunki partnera" name="accept" id="accept" required />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28, delay: 0.1 }}
          >
            <Card padding="lg" className="border-lavender/60 bg-lavender/20">
              <p className="text-sm font-bold text-navy">Podsumowanie</p>
              <div className="mt-3 space-y-2 text-sm">
                <div className="flex justify-between gap-3 text-muted">
                  <span>Produkt</span>
                  <span className="font-semibold text-navy text-right">{benefit.name}</span>
                </div>
                <div className="flex justify-between gap-3 text-muted">
                  <span>Cena</span>
                  <span className="font-semibold text-navy">{benefit.price} zł</span>
                </div>
                <div className="border-t border-line/80 pt-3 flex justify-between gap-3 font-bold text-navy">
                  <span>Do zapłaty</span>
                  <span>{benefit.price} zł</span>
                </div>
              </div>
            </Card>
          </motion.div>

          <Button type="submit" fullWidth>
            Przejdź do płatności
          </Button>
        </form>
      </AnimatedPage>

      <SuccessModal
        open={successOpen}
        title=""
        onClose={() => setSuccessOpen(false)}
        footer={
          <div className="space-y-2">
            <Button fullWidth type="button" onClick={copyCode}>
              Skopiuj kod
            </Button>
            <Button
              fullWidth
              variant="secondary"
              type="button"
              onClick={() => window.open("https://example.com", "_blank", "noopener,noreferrer")}
            >
              Przejdź do partnera
            </Button>
            <Button
              fullWidth
              variant="ghost"
              type="button"
              onClick={() => {
                setSuccessOpen(false);
                navigate("/benefits");
              }}
            >
              Wróć do benefitów
            </Button>
          </div>
        }
      >
        <p className="font-medium text-navy leading-relaxed">
          Zakup zakończony. Kod benefitu znajdziesz w aplikacji oraz otrzymasz go e-mailem.
        </p>
        <div className="rounded-2xl border border-line/80 bg-lavender/30 px-4 py-3 mt-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted">Kod</p>
          <p className="mt-1 text-lg font-black tracking-wide text-navy break-all font-mono">{code}</p>
        </div>
      </SuccessModal>
    </AppShell>
  );
}
