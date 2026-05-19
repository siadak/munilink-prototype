import type { ReactNode } from "react";
import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import { AppShell } from "../components/AppShell";
import { AnimatedPage } from "../components/AnimatedPage";
import { BenefitCover } from "../components/BenefitCover";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { getBenefitById, getBenefitPartnerUrl } from "../data/mocks";

export function BenefitDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const benefit = useMemo(() => getBenefitById(id), [id]);
  const partnerUrl = getBenefitPartnerUrl(benefit?.id);

  if (!benefit) {
    return (
      <AppShell showBack>
        <AnimatedPage className="space-y-4">
          <h1 className="text-lg font-bold text-brand-orange">Benefit</h1>
          <p className="text-sm text-muted">Nie znaleziono oferty.</p>
          <Button fullWidth type="button" onClick={() => navigate("/benefits")}>
            Wróć do listy
          </Button>
        </AnimatedPage>
      </AppShell>
    );
  }

  return (
    <AppShell showBack>
      <AnimatedPage className="space-y-4">
        <BenefitCover
          src={benefit.imageUrl}
          alt={benefit.name}
          aspect="hero"
          fallbackKey={benefit.visual === "bike" ? "bike" : undefined}
        />

        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted">{benefit.type}</p>
          <h1 className="text-xl font-bold text-navy">{benefit.name}</h1>
          <p className="text-lg font-bold text-brand-orange">{benefit.price} zł</p>
          <p className="text-sm leading-relaxed text-navy/90">{benefit.description}</p>
        </div>

        <BenefitSection title="Partner">
          <p className="text-sm text-navy">
            Partner: <span className="font-semibold">{benefit.partner}</span>
          </p>
        </BenefitSection>

        <BenefitSection title="Czego dotyczy oferta">
          <p className="text-sm leading-relaxed text-navy/90">{benefit.offerScope}</p>
        </BenefitSection>

        <BenefitSection title="Co zawiera">
          <BulletList items={benefit.includes} />
        </BenefitSection>

        <BenefitSection title="Zasady korzystania">
          <BulletList items={benefit.rules} />
        </BenefitSection>

        <BenefitSection title="Jak skorzystać">
          <OrderedList items={benefit.howToUse} />
        </BenefitSection>

        <BenefitSection title="Ważne informacje">
          <BulletList items={benefit.importantInfo} />
          <p className="mt-2 text-sm text-muted">{benefit.validity}</p>
          {partnerUrl !== "#" ? (
            <a
              href={partnerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-orange"
            >
              Strona partnera
              <ExternalLink className="h-4 w-4" aria-hidden />
            </a>
          ) : null}
        </BenefitSection>

        <Card padding="md" className="space-y-3">
          <div className="flex items-center justify-between gap-3 text-sm">
            <span className="text-muted">Cena</span>
            <span className="text-lg font-bold text-brand-orange">{benefit.price} zł</span>
          </div>
          <Button fullWidth type="button" onClick={() => navigate(`/benefit-checkout/${benefit.id}`)}>
            Kup teraz
          </Button>
        </Card>
      </AnimatedPage>
    </AppShell>
  );
}

function BenefitSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Card padding="md" className="space-y-2">
      <h2 className="text-sm font-bold text-navy">{title}</h2>
      {children}
    </Card>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-navy/90">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

function OrderedList({ items }: { items: string[] }) {
  return (
    <ol className="list-decimal space-y-1.5 pl-5 text-sm leading-relaxed text-navy/90">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ol>
  );
}
