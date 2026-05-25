import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { PhoneFrame } from "../components/PhoneFrame";
import { Logo } from "../components/Logo";
import { Modal } from "../components/Modal";
import { Button } from "../components/Button";
import { RegisterScenarioBar } from "../components/register/RegisterScenarioBar";
import { PeselPromoCard } from "../components/register/PeselPromoCard";
import { RegisterInput } from "../components/register/RegisterInput";
import { RegisterConsents } from "../components/register/RegisterConsents";
import { RegisterMainCard, RegisterFieldsSection } from "../components/register/RegisterMainCard";
import { RegisterShell } from "../components/register/RegisterShell";
import { RegisterSubmitButton } from "../components/register/RegisterSubmitButton";
import { useDemoMode } from "../context/DemoContext";
import {
  parseRegisterScenario,
  REGISTRATION_OUTCOMES,
  type RegisterScenarioId,
} from "../data/registerScenarios";

const PHONE_HINT = "Na ten numer wyślemy kod weryfikacyjny.";

function AccountFieldsGrid() {
  return (
    <div className="grid grid-cols-2 gap-2">
      <RegisterInput name="firstName" placeholder="Imię" required autoComplete="given-name" />
      <RegisterInput name="lastName" placeholder="Nazwisko" required autoComplete="family-name" />
    </div>
  );
}

function PasswordFields() {
  return (
    <>
      <RegisterInput name="password" type="password" placeholder="Hasło" autoComplete="new-password" required />
      <RegisterInput
        name="passwordConfirm"
        type="password"
        placeholder="Powtórz hasło"
        autoComplete="new-password"
        required
      />
    </>
  );
}

function ScenarioOneFields() {
  return (
    <RegisterFieldsSection>
      <AccountFieldsGrid />
      <RegisterInput name="pesel" placeholder="PESEL" inputMode="numeric" required />
      <RegisterInput name="email" type="email" placeholder="E-mail" autoComplete="email" required />
      <RegisterInput
        name="phone"
        type="tel"
        placeholder="Numer telefonu"
        autoComplete="tel"
        required
        hint={PHONE_HINT}
      />
      <PasswordFields />
    </RegisterFieldsSection>
  );
}

function ScenarioOptionalPeselFields() {
  return (
    <RegisterFieldsSection>
      <AccountFieldsGrid />
      <RegisterInput name="email" type="email" placeholder="E-mail" autoComplete="email" required />
      <RegisterInput
        name="phone"
        type="tel"
        placeholder="Numer telefonu"
        autoComplete="tel"
        required
        hint={PHONE_HINT}
      />
      <PasswordFields />
    </RegisterFieldsSection>
  );
}

function ScenarioFastFields() {
  return (
    <RegisterFieldsSection showLabel={false}>
      <RegisterInput name="phone" type="tel" placeholder="Numer telefonu" autoComplete="tel" required />
      <PasswordFields />
    </RegisterFieldsSection>
  );
}

export function RegisterPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { setMode } = useDemoMode();

  const scenario = parseRegisterScenario(searchParams.get("scenario"));
  const [wantPesel, setWantPesel] = useState(scenario === "2");
  const [successOpen, setSuccessOpen] = useState(false);
  const [pendingRedirect, setPendingRedirect] = useState<string | null>(null);

  useEffect(() => {
    setWantPesel(scenario === "2");
  }, [scenario]);

  const selectScenario = (id: RegisterScenarioId) => {
    setSearchParams({ scenario: id }, { replace: true });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const outcome = REGISTRATION_OUTCOMES[scenario];
    if (scenario === "3" && wantPesel) {
      const alt = REGISTRATION_OUTCOMES["2"];
      setMode(alt.demoMode);
      setPendingRedirect(alt.redirectTo);
      setSuccessOpen(true);
      return;
    }
    setMode(outcome.demoMode);
    setPendingRedirect(outcome.redirectTo);
    setSuccessOpen(true);
  };

  const finishRegistration = () => {
    setSuccessOpen(false);
    if (pendingRedirect) navigate(pendingRedirect);
  };

  const successMessage =
    scenario === "3" && wantPesel
      ? REGISTRATION_OUTCOMES["2"].message
      : REGISTRATION_OUTCOMES[scenario].message;

  return (
    <PhoneFrame>
      <RegisterShell>
        <AuthScroll>
          <div className="relative mx-auto max-w-md space-y-2.5 pb-4">
            <div className="text-center">
              <Logo className="justify-center text-xl" />
            </div>

            <RegisterScenarioBar scenario={scenario} onSelect={selectScenario} />

            <form className="space-y-2" onSubmit={handleSubmit}>
              <RegisterMainCard scenario={scenario}>
                {scenario === "1" ? <ScenarioOneFields /> : null}
                {scenario === "2" || scenario === "3" ? <ScenarioOptionalPeselFields /> : null}
                {scenario === "4" ? <ScenarioFastFields /> : null}
              </RegisterMainCard>

              {scenario === "2" || scenario === "3" ? (
                <PeselPromoCard
                  scenario={scenario}
                  checked={wantPesel}
                  onCheckedChange={setWantPesel}
                  showPeselField={wantPesel}
                />
              ) : null}

              <RegisterConsents key={scenario} idPrefix={`s${scenario}`} />

              <RegisterSubmitButton scenario={scenario} />
            </form>

            <p className="-mt-0.5 text-center text-[11px] text-muted">
              Masz konto?{" "}
              <button
                type="button"
                className="font-semibold text-brand-orange"
                onClick={() => navigate("/login")}
              >
                Zaloguj się
              </button>
            </p>
          </div>
        </AuthScroll>
      </RegisterShell>

      <Modal
        open={successOpen}
        title="Rejestracja zakończona"
        onClose={finishRegistration}
        footer={
          <Button fullWidth type="button" onClick={finishRegistration}>
            Przejdź dalej
          </Button>
        }
      >
        <p>{successMessage}</p>
      </Modal>
    </PhoneFrame>
  );
}

function AuthScroll({ children }: { children: ReactNode }) {
  return (
    <div className="relative z-[1] min-h-0 flex-1 overflow-y-auto overscroll-y-contain px-4 pb-5 pt-[max(0.5rem,env(safe-area-inset-top))]">
      {children}
    </div>
  );
}
