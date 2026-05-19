import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AppShell } from "../components/AppShell";
import { AnimatedPage } from "../components/AnimatedPage";
import { AnimatedSurveyStep, SurveyQuestionCard } from "../components/life-survey/AnimatedSurveyStep";
import {
  HEALTH_OPTIONS,
  PROTECTION_OPTIONS,
  TIMING_OPTIONS,
  TOTAL_STEPS,
  WHO_OPTIONS,
} from "../components/life-survey/constants";
import { LifeSurveyIllustration } from "../components/life-survey/LifeSurveyIllustration";
import { LifeSurveyOptionCard } from "../components/life-survey/LifeSurveyOptionCard";
import { LifeSurveyStepper } from "../components/life-survey/LifeSurveyStepper";
import { LifeSurveySuccess } from "../components/life-survey/LifeSurveySuccess";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Checkbox } from "../components/Checkbox";
import { Modal } from "../components/Modal";

const listVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

function SelectionHint({ visible }: { visible: boolean }) {
  return (
    <motion.p
      className="text-center text-xs font-semibold text-brand-orange"
      initial={false}
      animate={{ opacity: visible ? 1 : 0, height: visible ? "auto" : 0 }}
      transition={{ duration: 0.2 }}
    >
      {visible ? "Dobry wybór — przejdźmy dalej" : ""}
    </motion.p>
  );
}

export function LifeSurveyPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [howOpen, setHowOpen] = useState(false);

  const [whoIdx, setWhoIdx] = useState<number | null>(null);
  const [healthIdx, setHealthIdx] = useState<number | null>(null);
  const [protectionIdx, setProtectionIdx] = useState<number | null>(null);
  const [timingIdx, setTimingIdx] = useState<number | null>(null);

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);

  const [hintVisible, setHintVisible] = useState(false);

  const canSubmit =
    fullName.trim().length > 2 && phone.trim().length > 5 && email.includes("@") && consent;

  const showHint = () => {
    setHintVisible(true);
    window.setTimeout(() => setHintVisible(false), 2200);
  };

  const pick =
    (setter: (i: number) => void) =>
    (i: number) => {
      setter(i);
      showHint();
    };

  const resetSurvey = () => {
    setStep(1);
    setSubmitted(false);
    setWhoIdx(null);
    setHealthIdx(null);
    setProtectionIdx(null);
    setTimingIdx(null);
    setFullName("");
    setPhone("");
    setEmail("");
    setConsent(false);
    setHintVisible(false);
  };

  return (
    <AppShell showBack>
      <AnimatedPage className="space-y-4 pb-2">
        <header className="space-y-3">
          <h1 className="text-lg font-bold text-brand-orange">Ankieta życiowa</h1>
          {!submitted ? <LifeSurveyStepper step={step} /> : null}
        </header>

        <div className="rounded-[1.35rem] border border-lavender/40 bg-gradient-to-b from-lavender/20 via-white to-white p-3 shadow-[0_4px_20px_rgba(23,26,74,0.05)] sm:p-4">
          {submitted ? (
            <LifeSurveySuccess
              onMenu={() => {
                resetSurvey();
                navigate("/menu");
              }}
            />
          ) : (
            <>
              {step === 1 ? (
                <AnimatedSurveyStep stepKey={1}>
                  <SurveyQuestionCard>
                    <LifeSurveyIllustration variant="start" />
                    <div>
                      <h2 className="text-lg font-bold text-navy">Kogo chcesz zabezpieczyć?</h2>
                      <p className="mt-2 text-sm leading-relaxed text-muted">
                        Wybierz odpowiedź, a przygotujemy dopasowaną ścieżkę ankiety i pomożemy dobrać ochronę na
                        życie.
                      </p>
                    </div>
                    <SelectionHint visible={hintVisible && whoIdx !== null} />
                    <motion.ul
                      variants={listVariants}
                      initial="hidden"
                      animate="show"
                      className="grid grid-cols-2 gap-3"
                    >
                      {WHO_OPTIONS.map((opt, i) => (
                        <LifeSurveyOptionCard
                          key={opt.label}
                          label={opt.label}
                          icon={opt.icon}
                          active={whoIdx === i}
                          onClick={() => pick(setWhoIdx)(i)}
                          layout="grid"
                          index={i}
                        />
                      ))}
                    </motion.ul>
                    <Button fullWidth type="button" disabled={whoIdx === null} onClick={() => setStep(2)}>
                      Dalej
                    </Button>
                    <button
                      type="button"
                      onClick={() => setHowOpen(true)}
                      className="w-full text-center text-sm font-semibold text-brand-orange"
                    >
                      Zobacz, jak to działa
                    </button>
                  </SurveyQuestionCard>
                </AnimatedSurveyStep>
              ) : null}

              {step === 2 ? (
                <AnimatedSurveyStep stepKey={2}>
                  <SurveyQuestionCard>
                    <LifeSurveyIllustration variant="health" />
                    <motion.div>
                      <h2 className="text-lg font-bold text-navy">Jak oceniasz swój stan zdrowia?</h2>
                      <p className="mt-1 text-sm text-muted">Wybierz odpowiedź najbliższą Twojej sytuacji.</p>
                    </motion.div>
                    <SelectionHint visible={hintVisible && healthIdx !== null} />
                    <motion.ul variants={listVariants} initial="hidden" animate="show" className="space-y-2.5">
                      {HEALTH_OPTIONS.map((opt, i) => (
                        <LifeSurveyOptionCard
                          key={opt.label}
                          label={opt.label}
                          icon={opt.icon}
                          active={healthIdx === i}
                          onClick={() => pick(setHealthIdx)(i)}
                          layout="list"
                          index={i}
                        />
                      ))}
                    </motion.ul>
                    <NavRow back={() => setStep(1)} next={() => setStep(3)} nextDisabled={healthIdx === null} />
                  </SurveyQuestionCard>
                </AnimatedSurveyStep>
              ) : null}

              {step === 3 ? (
                <AnimatedSurveyStep stepKey={3}>
                  <SurveyQuestionCard>
                    <LifeSurveyIllustration variant="protection" />
                    <motion.div>
                      <h2 className="text-lg font-bold text-navy">Na czym zależy Ci najbardziej?</h2>
                      <p className="mt-1 text-sm text-muted">Wskaż priorytet ochrony — dopasujemy propozycję.</p>
                    </motion.div>
                    <SelectionHint visible={hintVisible && protectionIdx !== null} />
                    <motion.ul variants={listVariants} initial="hidden" animate="show" className="space-y-2.5">
                      {PROTECTION_OPTIONS.map((opt, i) => (
                        <LifeSurveyOptionCard
                          key={opt.label}
                          label={opt.label}
                          icon={opt.icon}
                          active={protectionIdx === i}
                          onClick={() => pick(setProtectionIdx)(i)}
                          layout="list"
                          index={i}
                        />
                      ))}
                    </motion.ul>
                    <NavRow
                      back={() => setStep(2)}
                      next={() => setStep(4)}
                      nextDisabled={protectionIdx === null}
                    />
                  </SurveyQuestionCard>
                </AnimatedSurveyStep>
              ) : null}

              {step === 4 ? (
                <AnimatedSurveyStep stepKey={4}>
                  <SurveyQuestionCard>
                    <LifeSurveyIllustration variant="contact" />
                    <motion.div>
                      <h2 className="text-lg font-bold text-navy">Kiedy chcesz porozmawiać z Agentem?</h2>
                      <p className="mt-1 text-sm text-muted">Wybierz dogodny termin kontaktu.</p>
                    </motion.div>
                    <SelectionHint visible={hintVisible && timingIdx !== null} />
                    <motion.ul variants={listVariants} initial="hidden" animate="show" className="space-y-2.5">
                      {TIMING_OPTIONS.map((opt, i) => (
                        <LifeSurveyOptionCard
                          key={opt.label}
                          label={opt.label}
                          icon={opt.icon}
                          active={timingIdx === i}
                          onClick={() => pick(setTimingIdx)(i)}
                          layout="list"
                          index={i}
                        />
                      ))}
                    </motion.ul>
                    <NavRow back={() => setStep(3)} next={() => setStep(5)} nextDisabled={timingIdx === null} />
                  </SurveyQuestionCard>
                </AnimatedSurveyStep>
              ) : null}

              {step === 5 ? (
                <AnimatedSurveyStep stepKey={5}>
                  <SurveyQuestionCard>
                    <LifeSurveyIllustration variant="offer" />
                    <motion.div>
                      <h2 className="text-lg font-bold text-navy">Dane kontaktowe</h2>
                      <p className="mt-2 text-sm leading-relaxed text-muted">
                        Na podstawie odpowiedzi Agent przygotuje kontakt i pomoże dobrać odpowiednią ofertę.
                      </p>
                    </motion.div>
                    <motion.div
                      className="space-y-4 rounded-2xl border border-lavender/50 bg-lavender-soft/30 p-3"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <Input
                        label="Imię i nazwisko"
                        name="name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Jan Kowalski"
                      />
                      <Input
                        label="Telefon"
                        name="phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="503 000 000"
                      />
                      <Input
                        label="E-mail"
                        name="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="jan@example.com"
                      />
                      <Checkbox
                        id="life-consent"
                        name="consent"
                        checked={consent}
                        onChange={(e) => setConsent(e.target.checked)}
                        label="Wyrażam zgodę na kontakt w sprawie przygotowania propozycji ubezpieczenia."
                      />
                    </motion.div>
                    <NavRow
                      back={() => setStep(4)}
                      next={() => setSubmitted(true)}
                      nextDisabled={!canSubmit}
                      nextLabel="Wyślij ankietę"
                    />
                  </SurveyQuestionCard>
                </AnimatedSurveyStep>
              ) : null}
            </>
          )}
        </div>
      </AnimatedPage>

      <Modal
        open={howOpen}
        title="Jak to działa?"
        onClose={() => setHowOpen(false)}
        footer={
          <Button fullWidth type="button" onClick={() => setHowOpen(false)}>
            Rozumiem
          </Button>
        }
      >
        <p className="text-sm leading-relaxed text-muted">
          Odpowiedz na {TOTAL_STEPS} krótkich pytań. Na podstawie odpowiedzi Twój Agent przygotuje kontakt i dopasowaną
          propozycję ubezpieczenia na życie.
        </p>
      </Modal>
    </AppShell>
  );
}

function NavRow({
  back,
  next,
  nextDisabled,
  nextLabel = "Dalej",
}: {
  back: () => void;
  next: () => void;
  nextDisabled: boolean;
  nextLabel?: string;
}) {
  return (
    <div className="flex gap-2 pt-1">
      <Button variant="secondary" className="flex-1" type="button" onClick={back}>
        Wstecz
      </Button>
      <Button className="flex-[2]" type="button" disabled={nextDisabled} onClick={next}>
        {nextLabel}
      </Button>
    </div>
  );
}
