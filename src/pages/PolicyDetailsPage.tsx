import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FileText } from "lucide-react";
import { AppShell } from "../components/AppShell";
import { AnimatedPage } from "../components/AnimatedPage";
import { Badge } from "../components/Badge";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { policies, agent } from "../data/mocks";

function parsePLDate(value: string) {
  const [dd, mm, yyyy] = value.split(".");
  return new Date(Number(yyyy), Number(mm) - 1, Number(dd));
}

function diffDays(from: Date, to: Date) {
  const ms = to.getTime() - from.getTime();
  return Math.ceil(ms / (1000 * 60 * 60 * 24));
}

export function PolicyDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const policy = useMemo(() => policies.find((p) => p.id === id), [id]);

  const daysLeft = useMemo(() => {
    if (!policy) return 0;
    const now = new Date();
    const end = parsePLDate(policy.endDate);
    return Math.max(0, diffDays(now, end));
  }, [policy]);

  const progress = useMemo(() => {
    if (!policy) return 0;
    const start = parsePLDate(policy.startDate);
    const end = parsePLDate(policy.endDate);
    const total = Math.max(1, diffDays(start, end));
    const elapsed = total - Math.max(0, diffDays(new Date(), end));
    return Math.min(1, Math.max(0, elapsed / total));
  }, [policy]);

  const headline = useMemo(() => {
    if (!policy) return "";
    if (policy.category === "Komunikacyjne") return "OC samochodu";
    return policy.category;
  }, [policy]);

  if (!policy) {
    return (
      <AppShell showBack>
        <AnimatedPage className="space-y-4">
          <h1 className="text-lg font-bold text-brand-orange">Nie znaleźliśmy polisy</h1>
          <p className="text-sm text-muted leading-relaxed">Przejdź do listy polis i wybierz inną pozycję.</p>
          <Button fullWidth type="button" onClick={() => navigate("/policies")}>
            Wróć do polis
          </Button>
        </AnimatedPage>
      </AppShell>
    );
  }

  const statusTone = policy.status === "Aktywna" ? "success" : "muted";

  return (
    <AppShell showBack>
      <AnimatedPage className="space-y-4">
        <h1 className="text-lg font-bold text-brand-orange">Szczegóły polisy</h1>

        <Card padding="md" className="space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted">{headline}</p>
              <h2 className="mt-1 text-lg font-bold text-navy">{policy.insurer}</h2>
              <p className="text-sm font-semibold text-navy/90">nr {policy.number}</p>
              <p className="mt-2 text-sm text-navy/80">{policy.vehicle ? policy.vehicle : policy.subject}</p>
              {policy.registration ? <p className="text-sm text-navy/80">nr rej. {policy.registration}</p> : null}
              <p className="mt-2 text-xs text-muted">
                Okres: {policy.startDate} - {policy.endDate}
              </p>
            </div>
            <Badge tone={statusTone}>{policy.status}</Badge>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between gap-3 text-sm">
              <span className="font-semibold text-navy">Czas ochrony</span>
              <span className="font-semibold text-brand-orange">{daysLeft} dni do końca</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-[#e8e9ef]">
              <div className="h-full rounded-full bg-brand-orange" style={{ width: `${Math.round(progress * 100)}%` }} />
            </div>
          </div>

          <div className="flex gap-2">
            <Button className="flex-1" type="button" onClick={() => navigate("/buy")}>
              Przedłuż polisę
            </Button>
            <Button variant="secondary" className="flex-1" type="button" onClick={() => navigate("/help")}>
              Zgłoś szkodę
            </Button>
          </div>
        </Card>

        <Card padding="md" className="space-y-3">
          <h3 className="text-sm font-bold text-navy">Dokumenty</h3>
          <ul className="space-y-2">
            {["Polisa PDF", "OWU", "Potwierdzenie płatności"].map((t) => (
              <li
                key={t}
                className="flex items-center justify-between gap-3 rounded-xl border border-line/60 bg-[#fafafa] px-3 py-2.5"
              >
                <span className="flex min-w-0 items-center gap-2">
                  <FileText className="h-4 w-4 shrink-0 text-brand-orange" />
                  <span className="truncate text-sm font-semibold text-navy">{t}</span>
                </span>
                <span className="text-xs font-semibold text-muted">Podgląd</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card padding="md" className="space-y-3">
          <h3 className="text-sm font-bold text-navy">Szybkie akcje</h3>
          <div className="grid grid-cols-2 gap-2">
            <Button variant="secondary" type="button" onClick={() => navigate("/ai-assistant")}>
              Zapytaj AI
            </Button>
            <Button variant="secondary" type="button" onClick={() => navigate("/send-document")}>
              Wyślij dokument
            </Button>
            <a href={`tel:${agent.phone.replaceAll("-", "")}`} className="col-span-1">
              <Button variant="ghost" className="w-full" type="button">
                Zadzwoń
              </Button>
            </a>
            <Button variant="ghost" type="button" onClick={() => navigate("/help")}>
              Zgłoś szkodę
            </Button>
          </div>
        </Card>

        <Card padding="md" className="space-y-3">
          <p className="text-sm font-bold text-navy">Twój Agent</p>
          <p className="text-sm font-semibold text-navy">{agent.name}</p>
          <p className="text-sm text-muted">Tel. {agent.phone}</p>
          <p className="text-sm text-muted">Email {agent.email}</p>
          <div className="flex gap-2 pt-1">
            <Button variant="secondary" className="flex-1" type="button" onClick={() => navigate("/send-document")}>
              Wyślij dokument
            </Button>
            <Button variant="ghost" className="flex-1" type="button" onClick={() => navigate("/change-agent")}>
              Zmień Agenta
            </Button>
          </div>
        </Card>

        <p className="text-xs leading-relaxed text-muted">
          Dane polisy pochodzą z systemów Unilink. W razie rozbieżności sprawdź dokument polisy lub skontaktuj się z
          Agentem.
        </p>
      </AnimatedPage>
    </AppShell>
  );
}
