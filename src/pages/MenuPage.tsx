import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Bot,
  Car,
  ClipboardList,
  FileText,
  Gift,
  Phone,
  ShoppingBag,
  Sparkles,
  Upload,
  UserRound,
  Wallet,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { AppShell } from "../components/AppShell";
import { AnimatedPage } from "../components/AnimatedPage";
import { Button } from "../components/Button";
import { agent, user } from "../data/mocks";
import { useDemoMode, type DemoMode } from "../context/DemoContext";
import clsx from "clsx";

const ease = [0.22, 1, 0.36, 1] as const;

function heroCopy(mode: DemoMode) {
  switch (mode) {
    case "NO_PESEL":
      return {
        title: `Cześć, ${user.firstName}`,
        body: "Twoje konto jest gotowe. Pobierz polisy po weryfikacji lub zacznij od zakupu online.",
      };
    case "BEFORE_FETCH":
      return {
        title: `Cześć, ${user.firstName}`,
        body: "Masz konto — uzupełnij weryfikację PESEL i SMS, aby zobaczyć polisy z Unilink w aplikacji.",
      };
    case "VERIFIED":
      return {
        title: `Cześć, ${user.firstName}`,
        body: "Masz 3 polisy i aktywnego Agenta. Co chcesz zrobić dzisiaj?",
      };
    case "NO_AGENT":
      return {
        title: `Cześć, ${user.firstName}`,
        body: "Masz polisy w aplikacji — wskaż Agenta, aby uprościć kontakt i dokumenty.",
      };
    case "HISTORICAL":
      return {
        title: `Cześć, ${user.firstName}`,
        body: "Nie widzimy aktywnych polis — możesz kupić nową ochronę lub dodać polisę z zewnątrz.",
      };
    default:
      return { title: `Cześć, ${user.firstName}`, body: "" };
  }
}

type Rec = { title: string; subtitle: string; to: string; icon: LucideIcon; accent: "sunset" | "ocean" };

function recommendationsForMode(mode: DemoMode): Rec[] {
  switch (mode) {
    case "VERIFIED":
      return [
        {
          title: "Sprawdź szczegóły OC Hondy",
          subtitle: "Aktywna polisa komunikacyjna — termin i zakres.",
          to: "/policy/1",
          icon: Car,
          accent: "sunset",
        },
        {
          title: "Masz dostępne benefity",
          subtitle: "Odbierz kody partnerów i korzystaj online.",
          to: "/benefits",
          icon: Gift,
          accent: "ocean",
        },
      ];
    case "BEFORE_FETCH":
      return [
        {
          title: "Dokończ pobieranie polis",
          subtitle: "Zweryfikuj dane i zaciągnij polisy z UniWersum.",
          to: "/fetch-policies",
          icon: FileText,
          accent: "ocean",
        },
        {
          title: "Skorzystaj z Asystenta AI",
          subtitle: "Zadaj pytanie o ochronę — szybka odpowiedź w czacie.",
          to: "/ai-assistant",
          icon: Bot,
          accent: "sunset",
        },
      ];
    case "NO_PESEL":
      return [
        {
          title: "Pobierz polisy po weryfikacji",
          subtitle: "PESEL i SMS — potem polisy pojawią się w aplikacji.",
          to: "/fetch-policies",
          icon: FileText,
          accent: "ocean",
        },
        {
          title: "Kup pierwszą ochronę online",
          subtitle: "NNW, travel i więcej — bez kolejek.",
          to: "/buy",
          icon: ShoppingBag,
          accent: "sunset",
        },
      ];
    case "NO_AGENT":
      return [
        {
          title: "Wskaż swojego Agenta",
          subtitle: "Ułatw kontakt i wysyłkę dokumentów z aplikacji.",
          to: "/agent",
          icon: UserRound,
          accent: "sunset",
        },
        {
          title: "Wyślij dokument do Agenta",
          subtitle: "Zdjęcie lub plik — obsłużymy to po Twojej stronie.",
          to: "/send-document",
          icon: Upload,
          accent: "ocean",
        },
      ];
    case "HISTORICAL":
      return [
        {
          title: "Kup nowe ubezpieczenie",
          subtitle: "Dopasuj ochronę do dzisiejszych planów i budżetu.",
          to: "/buy",
          icon: ShoppingBag,
          accent: "sunset",
        },
        {
          title: "Dodaj polisę spoza Unilink",
          subtitle: "Jedna aplikacja — wszystkie polisy w jednym miejscu.",
          to: "/add-external-policy",
          icon: FileText,
          accent: "ocean",
        },
      ];
    default:
      return [
        { title: "Przejdź do polis", subtitle: "Lista i statusy polis.", to: "/policies", icon: FileText, accent: "ocean" },
        { title: "Kup online", subtitle: "Ochrona w kilku krokach.", to: "/buy", icon: ShoppingBag, accent: "sunset" },
      ];
  }
}

const quickTiles: {
  title: string;
  to: string;
  icon: LucideIcon;
  hint?: string;
}[] = [
  { title: "Moje polisy", to: "/policies", icon: FileText, hint: "Statusy i dokumenty" },
  { title: "Kup online", to: "/buy", icon: ShoppingBag, hint: "NNW, travel, zdrowie…" },
  { title: "Benefity", to: "/benefits", icon: Gift, hint: "Kody partnerów" },
  { title: "Ankieta życiowa", to: "/life-survey", icon: ClipboardList, hint: "5 krótkich kroków" },
  { title: "Asystent AI", to: "/ai-assistant", icon: Bot, hint: "Pytania o polisy" },
  { title: "Wyślij dokument do Agenta", to: "/send-document", icon: Upload, hint: "Zdjęcie lub plik" },
];

function agentInitials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function MenuPage() {
  const navigate = useNavigate();
  const { mode } = useDemoMode();
  const hero = heroCopy(mode);
  const recs = recommendationsForMode(mode);

  return (
    <AppShell showBack={false}>
      <AnimatedPage className="space-y-9 pb-4">
        {/* A. Hero / welcome */}
        <motion.section
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease }}
          className="relative overflow-hidden rounded-[2rem] border border-white/70 bg-gradient-to-br from-white via-lavender/50 to-[#fff6ed] p-6 shadow-[0_24px_56px_-28px_rgba(23,26,74,0.2)] ring-1 ring-line/35"
        >
          <div className="pointer-events-none absolute -left-16 top-1/2 h-56 w-56 -translate-y-1/2 rounded-full bg-brand-orange/10 blur-3xl" />
          <div className="pointer-events-none absolute -right-10 -top-20 h-48 w-48 rounded-full bg-lavender blur-2xl" />

          <div className="relative flex flex-col gap-5">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 space-y-2">
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted">Twój dzień w mUnilink</p>
                <h1 className="text-[1.6rem] font-bold leading-tight tracking-tight text-navy">{hero.title}</h1>
                <p className="max-w-sm text-[15px] leading-relaxed text-navy/72">{hero.body}</p>
              </div>
              <motion.div
                aria-hidden
                className="relative mt-1 shrink-0"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.12, type: "spring", stiffness: 280, damping: 22 }}
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/85 shadow-lg shadow-navy/10 ring-1 ring-line/60">
                  <Sparkles className="h-8 w-8 text-brand-orange" strokeWidth={1.4} />
                </div>
              </motion.div>
            </div>

            <div className="flex flex-col gap-2.5 sm:flex-row">
              <Button fullWidth className="sm:flex-1" type="button" onClick={() => navigate("/buy")}>
                Kup online
              </Button>
              <Button
                variant="secondary"
                fullWidth
                className="sm:flex-1 border-white/90 bg-white/75 backdrop-blur-sm"
                type="button"
                onClick={() => navigate("/policies")}
              >
                Zobacz moje polisy
              </Button>
            </div>
          </div>
        </motion.section>

        {/* B. Dla Ciebie */}
        <section className="space-y-3">
          <div className="flex items-center justify-between px-0.5">
            <h2 className="text-lg font-bold text-navy">Dla Ciebie</h2>
            <span className="text-[11px] font-semibold uppercase tracking-wide text-muted">Rekomendacje</span>
          </div>
          <div className="flex flex-col gap-3">
            {recs.map((r, i) => {
              const Icon = r.icon;
              const grad =
                r.accent === "sunset"
                  ? "from-[#fff7f0] via-white to-lavender/40"
                  : "from-lavender/50 via-white to-[#f4f7ff]";
              return (
                <motion.button
                  key={r.title}
                  type="button"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.06, duration: 0.38, ease }}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => navigate(r.to)}
                  className={clsx(
                    "group flex w-full items-center gap-4 rounded-[1.75rem] border border-line/45 bg-gradient-to-r p-4 text-left shadow-[0_12px_36px_-22px_rgba(23,26,74,0.12)] ring-1 ring-white/80 transition",
                    "hover:border-brand-orange/20 hover:shadow-[0_16px_40px_-20px_rgba(255,138,0,0.14)]",
                    grad,
                  )}
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/90 text-brand-orangeDeep shadow-sm ring-1 ring-line/60">
                    <Icon className="h-6 w-6" strokeWidth={1.5} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-navy">{r.title}</p>
                    <p className="mt-0.5 text-sm leading-snug text-muted">{r.subtitle}</p>
                  </div>
                  <ArrowRight className="h-5 w-5 shrink-0 text-muted transition group-hover:translate-x-0.5 group-hover:text-brand-orange" />
                </motion.button>
              );
            })}
          </div>
        </section>

        {/* C. Szybkie akcje */}
        <section className="space-y-3">
          <h2 className="px-0.5 text-lg font-bold text-navy">Szybkie akcje</h2>
          <div className="grid grid-cols-2 gap-3">
            {quickTiles.map((t, i) => {
              const Icon = t.icon;
              return (
                <motion.button
                  key={t.title}
                  type="button"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.32, ease }}
                  whileTap={{ scale: 0.98 }}
                  whileHover={{ y: -2 }}
                  onClick={() => navigate(t.to)}
                  className="flex flex-col rounded-[1.65rem] border border-line/40 bg-gradient-to-b from-card via-white to-lavender/15 p-4 text-left shadow-[0_10px_32px_-20px_rgba(23,26,74,0.12)] ring-1 ring-white/70 transition hover:border-brand-orange/20 hover:shadow-[0_14px_36px_-18px_rgba(255,138,0,0.12)]"
                >
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-lavender to-white shadow-inner ring-1 ring-line/55">
                    <Icon className="h-6 w-6 text-navy" strokeWidth={1.45} />
                  </div>
                  <p className="text-sm font-bold leading-snug text-navy">{t.title}</p>
                  {t.hint ? <p className="mt-1 text-[11px] font-medium leading-snug text-muted">{t.hint}</p> : null}
                </motion.button>
              );
            })}
          </div>
          <motion.button
            type="button"
            whileTap={{ scale: 0.99 }}
            onClick={() => navigate("/add-external-policy")}
            className="w-full rounded-2xl border border-dashed border-brand-orange/25 bg-brand-orange/[0.04] px-4 py-3 text-center text-sm font-semibold text-brand-orangeDeep transition hover:bg-brand-orange/[0.07]"
          >
            Dodaj polisę spoza Unilink
          </motion.button>
        </section>

        {/* D. Nowości */}
        <section className="space-y-3">
          <h2 className="px-0.5 text-lg font-bold text-navy">Nowości w aplikacji</h2>
          <div className="-mx-1 flex snap-x snap-mandatory gap-3 overflow-x-auto px-1 pb-1 scrollbar-hide">
            {[
              {
                title: "Cashback 5%",
                desc: "Punkty za wybrane zakupy online.",
                to: "/cashback",
                icon: Wallet,
                chip: "Nowe",
              },
              {
                title: "Benefity partnerów",
                desc: "Kody i oferty w jednym miejscu.",
                to: "/benefits",
                icon: Gift,
                chip: "Popularne",
              },
              {
                title: "Asystent AI",
                desc: "Pytaj o polisy i OWU w czacie.",
                to: "/ai-assistant",
                icon: Bot,
                chip: "Beta",
              },
            ].map((n, i) => {
              const Icon = n.icon;
              return (
                <motion.button
                  key={n.title}
                  type="button"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.35, ease }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => navigate(n.to)}
                  className="min-w-[min(260px,78%)] shrink-0 snap-start rounded-[1.35rem] border border-line/40 bg-white/90 p-4 text-left shadow-sm ring-1 ring-white/80 backdrop-blur-sm"
                >
                  <span className="mb-2 inline-block rounded-full bg-lavender/80 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-navy/80">
                    {n.chip}
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-lavender/90 text-brand-orangeDeep">
                      <Icon className="h-4 w-4" strokeWidth={1.6} />
                    </div>
                    <p className="font-bold text-navy">{n.title}</p>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-muted">{n.desc}</p>
                </motion.button>
              );
            })}
          </div>
        </section>

        {/* E. Twój Agent — mini (ukryte w trybie bez agenta — spójność z /agent) */}
        {mode !== "NO_AGENT" ? (
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease }}
            className="relative overflow-hidden rounded-[1.85rem] border border-navy/10 bg-gradient-to-br from-navy via-navy-deep to-[#1a1f5c] p-5 text-white shadow-[0_20px_48px_-24px_rgba(23,26,74,0.45)]"
          >
            <div className="pointer-events-none absolute -right-6 -top-10 h-32 w-32 rounded-full bg-brand-orange/25 blur-2xl" />
            <div className="relative flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/15 text-lg font-bold tracking-tight ring-1 ring-white/25">
                {agentInitials(agent.name)}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/55">Twój Agent</p>
                <p className="truncate text-base font-bold leading-tight">{agent.name}</p>
              </div>
            </div>
            <Button
              variant="secondary"
              fullWidth
              className="relative mt-4 border-white/25 bg-white text-navy hover:bg-white/95"
              type="button"
              onClick={() => navigate("/agent")}
            >
              <Phone className="h-4 w-4 text-brand-orangeDeep" />
              Skontaktuj się
            </Button>
          </motion.section>
        ) : (
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease }}
            className="rounded-[1.85rem] border border-line/60 bg-gradient-to-br from-lavender/40 to-card p-5 shadow-card"
          >
            <p className="text-sm font-bold text-navy">Agent</p>
            <p className="mt-1 text-sm leading-relaxed text-muted">
              Nie masz jeszcze przypisanego Agenta — wskaż go, aby odblokować pełny kontakt z aplikacji.
            </p>
            <Button fullWidth className="mt-4" type="button" onClick={() => navigate("/agent")}>
              Wskaż Agenta
            </Button>
          </motion.section>
        )}
      </AnimatedPage>
    </AppShell>
  );
}
