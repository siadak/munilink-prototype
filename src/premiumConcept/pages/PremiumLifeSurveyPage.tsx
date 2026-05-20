import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
import { Check, Heart, Shield, User, Users } from "lucide-react";
import { PremiumAppShell } from "../components/PremiumAppShell";
import { AnimatedPage } from "../components/AnimatedPage";
import { StepProgress } from "../components/StepProgress";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Checkbox } from "../../components/Checkbox";
import { SuccessModal } from "../../components/SuccessModal";

const step1 = [
  { label: "Tylko siebie", icon: User },
  { label: "Siebie i partnera", icon: Heart },
  { label: "Siebie i dzieci", icon: Users },
  { label: "Całą rodzinę", icon: Shield },
] as const;

const step2 = [
  "Zabezpieczenie rodziny",
  "Wsparcie po wypadku",
  "Ochrona przy chorobie",
  "Oszczędzanie na przyszłość",
] as const;

const step3 = ["do 50 zł", "50–100 zł", "100–200 zł", "powyżej 200 zł"] as const;

const step4 = ["Dzisiaj", "Jutro", "W tym tygodniu", "Tylko proszę o propozycję"] as const;

const pageVariants = {
  enter: { opacity: 0, x: 28 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
};

export function PremiumLifeSurveyPage() {
  const [step, setStep] = useState(1);
  const [sel1, setSel1] = useState<number | null>(null);
  const [sel2, setSel2] = useState<number | null>(null);
  const [sel3, setSel3] = useState<number | null>(null);
  const [sel4, setSel4] = useState<number | null>(null);
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);

  const canNext1 = sel1 !== null;
  const canNext2 = sel2 !== null;
  const canNext3 = sel3 !== null;
  const canNext4 = sel4 !== null;
  const canSubmit = consent && phone.trim().length > 5 && email.includes("@");

  const goNext = () => setStep((s) => Math.min(5, s + 1));

  return (
    <PremiumAppShell>
      <AnimatedPage className="space-y-5">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-brand-orangeDeep">Ankieta życiowa</h1>
          <StepProgress step={step} />
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="s1"
              variants={pageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="space-y-4"
            >
              <motion.div
                layout
                className="relative overflow-hidden rounded-[2rem] border border-lavender/80 bg-gradient-to-br from-lavender/50 via-card to-warning-bg/25 p-8 shadow-card"
              >
                <motion.div
                  className="flex items-center justify-center gap-4 text-brand-orange"
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Users className="h-12 w-12 text-navy/80" strokeWidth={1.25} />
                  <Heart className="h-14 w-14 fill-warning-bg text-brand-orangeDeep" strokeWidth={1.25} />
                  <Shield className="h-12 w-12 text-navy/80" strokeWidth={1.25} />
                </motion.div>
              </motion.div>

              <div>
                <h2 className="text-lg font-bold text-navy">Kogo chcesz zabezpieczyć?</h2>
                <p className="mt-2 text-sm text-muted leading-relaxed">
                  Wybierz odpowiedź, a przygotujemy dopasowaną ścieżkę ankiety i pomożemy dobrać ochronę na życie.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {step1.map((t, i) => {
                  const active = sel1 === i;
                  return (
                    <motion.button
                      key={t.label}
                      type="button"
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setSel1(i)}
                      className={clsx(
                        "relative rounded-[1.5rem] border bg-card p-4 text-left shadow-card transition",
                        active
                          ? "border-brand-orange ring-2 ring-brand-orange/30 shadow-soft"
                          : "border-line hover:border-brand-orange/25",
                      )}
                    >
                      {active ? (
                        <span className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-brand-orange text-white">
                          <Check className="h-3.5 w-3.5" strokeWidth={3} />
                        </span>
                      ) : null}
                      <t.icon className="mb-3 h-7 w-7 text-brand-orangeDeep" />
                      <p className="pr-8 text-sm font-semibold leading-snug text-navy">{t.label}</p>
                    </motion.button>
                  );
                })}
              </div>
              <Button fullWidth disabled={!canNext1} onClick={goNext}>
                Dalej
              </Button>
              <button type="button" className="w-full text-center text-sm font-semibold text-navy underline-offset-2 hover:text-brand-orangeDeep">
                Zobacz, jak to działa
              </button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="s2"
              variants={pageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="space-y-4"
            >
              <h2 className="text-lg font-bold text-navy">Co jest dla Ciebie najważniejsze?</h2>
              <div className="grid grid-cols-1 gap-3">
                {step2.map((t, i) => {
                  const active = sel2 === i;
                  return (
                    <motion.button
                      key={t}
                      type="button"
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSel2(i)}
                      className={clsx(
                        "relative rounded-[1.5rem] border bg-card px-4 py-4 text-left text-sm font-semibold text-navy shadow-card transition",
                        active
                          ? "border-brand-orange ring-2 ring-brand-orange/30"
                          : "border-line hover:border-brand-orange/20",
                      )}
                    >
                      {active ? (
                        <span className="absolute right-4 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full bg-brand-orange text-white">
                          <Check className="h-3.5 w-3.5" strokeWidth={3} />
                        </span>
                      ) : null}
                      {t}
                    </motion.button>
                  );
                })}
              </div>
              <div className="flex gap-2">
                <Button variant="secondary" className="flex-1" type="button" onClick={() => setStep(1)}>
                  Wstecz
                </Button>
                <Button className="flex-[2]" disabled={!canNext2} type="button" onClick={goNext}>
                  Dalej
                </Button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="s3"
              variants={pageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="space-y-4"
            >
              <h2 className="text-lg font-bold text-navy">Jaki budżet miesięczny jest dla Ciebie komfortowy?</h2>
              <div className="grid grid-cols-1 gap-3">
                {step3.map((t, i) => {
                  const active = sel3 === i;
                  return (
                    <motion.button
                      key={t}
                      type="button"
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSel3(i)}
                      className={clsx(
                        "rounded-[1.5rem] border bg-card px-4 py-4 text-left text-sm font-semibold text-navy shadow-card transition",
                        active
                          ? "border-brand-orange ring-2 ring-brand-orange/30"
                          : "border-line hover:border-brand-orange/20",
                      )}
                    >
                      {t}
                    </motion.button>
                  );
                })}
              </div>
              <div className="flex gap-2">
                <Button variant="secondary" className="flex-1" type="button" onClick={() => setStep(2)}>
                  Wstecz
                </Button>
                <Button className="flex-[2]" disabled={!canNext3} type="button" onClick={goNext}>
                  Dalej
                </Button>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="s4"
              variants={pageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="space-y-4"
            >
              <h2 className="text-lg font-bold text-navy">Kiedy chcesz porozmawiać z Agentem?</h2>
              <div className="grid grid-cols-1 gap-3">
                {step4.map((t, i) => {
                  const active = sel4 === i;
                  return (
                    <motion.button
                      key={t}
                      type="button"
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSel4(i)}
                      className={clsx(
                        "rounded-[1.5rem] border bg-card px-4 py-4 text-left text-sm font-semibold text-navy shadow-card transition",
                        active
                          ? "border-brand-orange ring-2 ring-brand-orange/30"
                          : "border-line hover:border-brand-orange/20",
                      )}
                    >
                      {t}
                    </motion.button>
                  );
                })}
              </div>
              <div className="flex gap-2">
                <Button variant="secondary" className="flex-1" type="button" onClick={() => setStep(3)}>
                  Wstecz
                </Button>
                <Button className="flex-[2]" disabled={!canNext4} type="button" onClick={goNext}>
                  Dalej
                </Button>
              </div>
            </motion.div>
          )}

          {step === 5 && (
            <motion.div
              key="s5"
              variants={pageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="space-y-4"
            >
              <h2 className="text-lg font-bold text-navy">Ostatni krok</h2>
              <p className="text-sm text-muted leading-relaxed">Zostaw dane — Agent skontaktuje się z propozycją.</p>
              <Input label="Telefon" name="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="503 000 000" />
              <Input label="E-mail" name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="jan@example.com" />
              <Checkbox
                id="life-consent"
                name="consent"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                label="Wyrażam zgodę na kontakt w sprawie przygotowania propozycji ubezpieczenia."
              />
              <div className="flex gap-2 pt-1">
                <Button variant="secondary" className="flex-1" type="button" onClick={() => setStep(4)}>
                  Wstecz
                </Button>
                <Button
                  className="flex-[2]"
                  type="button"
                  disabled={!canSubmit}
                  onClick={() => setSuccessOpen(true)}
                >
                  Wyślij ankietę
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </AnimatedPage>

      <SuccessModal
        open={successOpen}
        title=""
        onClose={() => setSuccessOpen(false)}
        onPrimary={() => {
          setSuccessOpen(false);
          setStep(1);
          setSel1(null);
          setSel2(null);
          setSel3(null);
          setSel4(null);
          setPhone("");
          setEmail("");
          setConsent(false);
        }}
        primaryLabel="Super"
      >
        <p className="font-semibold text-navy leading-relaxed">
          Dziękujemy! Agent otrzyma Twoje odpowiedzi i skontaktuje się z Tobą z propozycją ochrony.
        </p>
      </SuccessModal>
    </PremiumAppShell>
  );
}
