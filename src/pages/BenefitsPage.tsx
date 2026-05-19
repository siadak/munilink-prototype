import { AppShell } from "../components/AppShell";
import { AnimatedPage } from "../components/AnimatedPage";
import { BenefitCard } from "../components/BenefitCard";
import { benefits } from "../data/mocks";

export function BenefitsPage() {
  return (
    <AppShell showBack>
      <AnimatedPage className="space-y-4">
        <div>
          <h1 className="text-lg font-bold text-brand-orange">Benefity</h1>
          <p className="mt-1 text-sm leading-relaxed text-muted">
            Skorzystaj z ofert partnerów dostępnych w aplikacji.
          </p>
        </div>

        <ul className="space-y-4">
          {benefits.map((b) => (
            <li key={b.id}>
              <BenefitCard benefit={b} />
            </li>
          ))}
        </ul>
      </AnimatedPage>
    </AppShell>
  );
}
