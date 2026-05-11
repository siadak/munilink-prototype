import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { FileText, Sparkles } from "lucide-react";
import { AppShell } from "../components/AppShell";
import { AnimatedPage } from "../components/AnimatedPage";
import { Badge } from "../components/Badge";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { policies, agent } from "../data/mocks";

function parsePLDate(value: string) {
  // Format: dd.mm.yyyy
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
        <AnimatedPage>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
            <h1 className="text-2xl font-bold text-navy">Nie znaleźliśmy polisy</h1>
            <p className="text-sm text-muted leading-relaxed">
              Przejdź do listy polis i wybierz inną pozycję.
            </p>
            <Button fullWidth onClick={() => navigate("/policies")}>
              Wróć do polis
            </Button>
          </motion.div>
        </AnimatedPage>
      </AppShell>
    );
  }

  const statusTone = policy.status === "Aktywna" ? "success" : "muted";

  return (
    <AppShell showBack>
      <AnimatedPage className="space-y-5">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28 }}
          className="space-y-4"
        >
          <Card padding="lg">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted">{headline}</p>
                <h2 className="text-xl font-bold text-navy leading-snug mt-1">{policy.insurer}</h2>
                <p className="text-sm font-semibold text-navy/90">
                  nr {policy.number}
                </p>
                <p className="mt-2 text-sm text-navy/80">
                  {policy.vehicle ? `${policy.vehicle}` : policy.subject}
                </p>
                {policy.registration ? (
                  <p className="text-sm text-navy/80">nr rej. {policy.registration}</p>
                ) : null}
                <p className="text-xs text-muted mt-2">
                  Okres: {policy.startDate} - {policy.endDate}
                </p>
              </div>

              <div className="shrink-0">
                <Badge tone={statusTone}>{policy.status}</Badge>
              </div>
            </div>

            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-semibold text-navy">Pasek czasu ochrony</p>
                <p className="text-sm font-semibold text-brand-orangeDeep">{daysLeft} dni do końca</p>
              </div>
              <div className="h-2.5 rounded-full bg-lavender/40 border border-lavender/60 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.round(progress * 100)}%` }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="h-full rounded-full bg-gradient-to-r from-brand-orange to-brand-orangeDeep"
                />
              </div>

              <div className="flex gap-3">
                <Button
                  className="flex-1"
                  onClick={() => navigate("/buy")}
                >
                  Przedłuż polisę
                </Button>
                <Button
                  variant="secondary"
                  className="flex-1"
                  onClick={() => navigate("/help")}
                >
                  Zgłoś szkodę
                </Button>
              </div>
            </div>
          </Card>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
            <Card padding="lg">
              <h3 className="text-lg font-bold text-navy">Dokumenty</h3>
              <div className="mt-3 space-y-2">
                {["Polisa PDF", "OWU", "Potwierdzenie płatności"].map((t) => (
                  <div
                    key={t}
                    className="flex items-center justify-between gap-3 rounded-2xl border border-line/70 bg-white/60 px-4 py-3"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-lavender/60 border border-line/80">
                        <FileText className="h-5 w-5 text-brand-orangeDeep" />
                      </span>
                      <p className="text-sm font-semibold text-navy truncate">{t}</p>
                    </div>
                    <span className="text-muted text-xs font-semibold">Podgląd</span>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25, delay: 0.04 }}>
            <Card padding="lg">
              <h3 className="text-lg font-bold text-navy">Szybkie akcje</h3>
              <div className="mt-3 grid grid-cols-2 gap-3">
                <Button
                  variant="secondary"
                  onClick={() => navigate("/ai-assistant")}
                  className="justify-center"
                >
                  Zapytaj AI o tę polisę
                </Button>

                <Button
                  variant="secondary"
                  onClick={() => navigate("/send-document")}
                  className="justify-center"
                >
                  Wyślij dokument do Agenta
                </Button>

                <a
                  href={`tel:${agent.phone.replaceAll("-", "")}`}
                  className="inline-flex col-span-1"
                >
                  <Button variant="ghost" className="w-full justify-center" type="button">
                    Zadzwoń do Agenta
                  </Button>
                </a>

                <Button
                  variant="ghost"
                  onClick={() => navigate("/help")}
                  className="justify-center"
                >
                  Zgłoś szkodę
                </Button>
              </div>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25, delay: 0.08 }}>
            <Card padding="lg">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="h-12 w-12 rounded-2xl bg-lavender/60 border border-line/80 flex items-center justify-center">
                    <span className="text-sm font-bold text-brand-orangeDeep">
                      {agent.name
                        .split(" ")
                        .filter(Boolean)
                        .slice(0, 3)
                        .map((p) => p[0])
                        .join("")}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-navy leading-snug">Twój Agent</p>
                    <p className="text-sm font-semibold text-navy/90 truncate">{agent.name}</p>
                  </div>
                </div>
                <Badge tone="default">Twój Agent</Badge>
              </div>

              <div className="mt-3 space-y-2">
                <p className="text-sm text-muted">
                  <span className="font-semibold text-navy/90">Tel.</span> {agent.phone}
                </p>
                <p className="text-sm text-muted">
                  <span className="font-semibold text-navy/90">Email.</span> {agent.email}
                </p>
              </div>

              <div className="mt-4 rounded-[1.5rem] border border-line/70 bg-lavender/20 px-4 py-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-brand-orangeDeep" />
                  <p className="text-sm font-semibold text-navy">Co możesz załatwić z Agentem?</p>
                </div>
                <div className="mt-2 flex gap-2 text-sm">
                  <Button variant="secondary" className="flex-1" onClick={() => navigate("/send-document")}>
                    Wyślij dokument
                  </Button>
                  <Button variant="ghost" className="flex-1" onClick={() => navigate("/change-agent")}>
                    Zmień Agenta
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25, delay: 0.12 }}>
            <div className="rounded-[1.75rem] border border-line/80 bg-lavender/20 px-5 py-4">
              <p className="text-sm font-semibold text-navy">Info</p>
              <p className="mt-1 text-sm text-muted leading-relaxed">
                Dane polisy pochodzą z systemów Unilink. W razie rozbieżności sprawdź dokument polisy lub skontaktuj się z Agentem.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </AnimatedPage>
    </AppShell>
  );
}

