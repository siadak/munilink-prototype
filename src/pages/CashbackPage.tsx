import { useNavigate } from "react-router-dom";
import { AppShell } from "../components/AppShell";
import { AnimatedPage } from "../components/AnimatedPage";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { InfoBanner } from "../components/InfoBanner";
import { user } from "../data/mocks";

const products = [
  "NNW szkolne",
  "Travel",
  "Rower / hulajnoga",
  "HomeDoctor",
  "Druga opinia medyczna",
  "Moto Assistance",
] as const;

function formatPts(n: number) {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

export function CashbackPage() {
  const navigate = useNavigate();

  return (
    <AppShell showBack>
      <AnimatedPage className="space-y-4">
        <div>
          <h1 className="text-lg font-bold text-brand-orange">Cashback</h1>
          <p className="mt-1 text-sm leading-relaxed text-muted">Punkty za zakupy produktów w aplikacji.</p>
        </div>

        <Card padding="md" className="space-y-2">
          <p className="text-sm font-semibold text-muted">Twoje saldo</p>
          <p className="text-3xl font-bold text-navy tabular-nums">{formatPts(user.points)} pkt</p>
          <p className="text-sm text-muted">1 pkt = 1 zł przy kolejnym zakupie ubezpieczenia online</p>
          <p className="border-t border-line/70 pt-3 text-sm text-navy">
            Ostatni zwrot: <span className="font-semibold">Travel +25 pkt</span>
          </p>
        </Card>

        <InfoBanner tone="neutral">Za każdy zakup produktów w aplikacji wraca 5% wartości w punktach.</InfoBanner>

        <Card padding="md" className="space-y-3">
          <p className="text-sm font-bold text-navy">Produkty objęte cashbackiem</p>
          <ul className="flex flex-wrap gap-2">
            {products.map((name) => (
              <li
                key={name}
                className="rounded-full border border-line/60 bg-[#fafafa] px-3 py-1.5 text-xs font-semibold text-navy"
              >
                {name}
              </li>
            ))}
          </ul>
        </Card>

        <p className="text-xs leading-relaxed text-muted">
          Punkty cashbacku to osobny program lojalnościowy — nie są tym samym co płatne benefity partnerów.
        </p>

        <Button fullWidth type="button" onClick={() => navigate("/buy")}>
          Kup ubezpieczenie online
        </Button>
      </AnimatedPage>
    </AppShell>
  );
}
