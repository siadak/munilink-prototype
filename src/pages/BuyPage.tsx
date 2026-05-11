import { useCallback, useRef, useState } from "react";
import type { ReactNode } from "react";
import {
  Bike,
  Car,
  ChevronRight,
  FileText,
  GraduationCap,
  HeartPulse,
  MessageCircleHeart,
  Plane,
  Shield,
  Sparkles,
  Stethoscope,
} from "lucide-react";
import { motion } from "framer-motion";
import { AppShell } from "../components/AppShell";
import { AnimatedPage } from "../components/AnimatedPage";
import { Button } from "../components/Button";
import { Modal } from "../components/Modal";
import clsx from "clsx";

type CategoryId = "all" | "school" | "travel" | "moto" | "health" | "other";

const categories: { id: CategoryId; label: string }[] = [
  { id: "all", label: "Wszystkie" },
  { id: "school", label: "Szkolne" },
  { id: "travel", label: "Turystyczne" },
  { id: "moto", label: "Motoryzacyjne" },
  { id: "health", label: "Zdrowie" },
  { id: "other", label: "Inne" },
];

type ProductDef = {
  key: string;
  title: string;
  description: string;
  icon: typeof Shield;
  category: Exclude<CategoryId, "all">;
  cashback?: boolean;
};

const products: ProductDef[] = [
  {
    key: "nnw",
    title: "NNW szkolne",
    description: "Ochrona ucznia w szkole, na wycieczkach i w czasie wolnym.",
    icon: GraduationCap,
    category: "school",
    cashback: true,
  },
  {
    key: "travel",
    title: "Travel",
    description: "Podróże z assistanceem, bagażem i spokojną głową za granicą.",
    icon: Plane,
    category: "travel",
    cashback: true,
  },
  {
    key: "bike",
    title: "Ubezpieczenie roweru / hulajnogi",
    description: "Jednoślad w mieście i poza nim — ochrona dopasowana do Ciebie.",
    icon: Bike,
    category: "other",
    cashback: true,
  },
  {
    key: "homedoc",
    title: "HomeDoctor",
    description: "Teleporady i wizyty lekarza w domu, gdy liczy się czas.",
    icon: Stethoscope,
    category: "health",
  },
  {
    key: "second",
    title: "Druga opinia medyczna",
    description: "Konsultacja z innym specjalistą, by zweryfikować diagnozę.",
    icon: MessageCircleHeart,
    category: "health",
  },
  {
    key: "moto",
    title: "Moto Assistance",
    description: "Pomoc na drodze, holowanie i spokojna koordynacja serwisu.",
    icon: Car,
    category: "moto",
    cashback: true,
  },
];

const featured = [
  {
    key: "nnw",
    title: "NNW szkolne",
    description: "Spokój rodzica i bezpieczny start roku dla dziecka.",
    icon: GraduationCap,
    badge: "Popularne",
    badgeTone: "orange" as const,
  },
  {
    key: "travel",
    title: "Travel",
    description: "Ochrona na wyjazd — od bagażu po assistance za granicą.",
    icon: Plane,
    badge: "Online",
    badgeTone: "slate" as const,
  },
  {
    key: "moto",
    title: "Moto Assistance",
    description: "Awaria lub kolizja — jesteśmy z Tobą na trasie.",
    icon: Car,
    badge: "Najczęściej wybierane",
    badgeTone: "lavender" as const,
  },
];

const sectionEase = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.06 * i, duration: 0.4, ease: sectionEase },
  }),
};

const stagger = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.04 },
  },
};

const itemFade = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.36, ease: sectionEase } },
};

function BadgePill({
  children,
  tone,
}: {
  children: ReactNode;
  tone: "orange" | "slate" | "lavender";
}) {
  const tones = {
    orange: "bg-brand-orange/12 text-brand-orangeDeep ring-1 ring-brand-orange/25",
    slate: "bg-navy/6 text-navy ring-1 ring-navy/10",
    lavender: "bg-lavender text-navy ring-1 ring-line/80",
  };
  return (
    <span className={clsx("inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide", tones[tone])}>
      {children}
    </span>
  );
}

export function BuyPage() {
  const [modal, setModal] = useState<null | "buy" | "how">(null);
  const [category, setCategory] = useState<CategoryId>("all");
  const productsRef = useRef<HTMLDivElement>(null);

  const scrollToProducts = useCallback(() => {
    productsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const filtered =
    category === "all" ? products : products.filter((p) => p.category === category);

  return (
    <AppShell>
      <AnimatedPage className="space-y-10 pb-2">
        {/* A. Hero */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: sectionEase }}
          className="relative overflow-hidden rounded-[2rem] border border-white/60 bg-gradient-to-br from-white via-lavender/45 to-[#fff8f0] p-6 shadow-[0_20px_50px_-24px_rgba(23,26,74,0.18)] ring-1 ring-line/40"
        >
          <div className="pointer-events-none absolute -right-8 -top-12 h-48 w-48 rounded-full bg-brand-orange/12 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-16 -left-10 h-44 w-44 rounded-full bg-lavender/80 blur-2xl" />

          <div className="relative flex flex-col gap-6">
            <div className="max-w-[min(100%,20rem)] space-y-3">
              <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-muted">Sklep w aplikacji</p>
              <h1 className="text-[1.65rem] font-bold leading-tight tracking-tight text-navy">Kup online</h1>
              <p className="text-[15px] leading-relaxed text-navy/75">
                Wybierz ochronę dopasowaną do swoich potrzeb i kup ją wygodnie w aplikacji.
              </p>
            </div>

            <div className="relative flex min-h-[7.5rem] items-center justify-end">
              <div className="absolute right-0 top-1/2 flex -translate-y-1/2 items-center justify-center gap-2 sm:gap-3">
                {[
                  { Icon: Shield, delay: 0, className: "text-brand-orange" },
                  { Icon: Plane, delay: 0.08, className: "text-navy/70" },
                  { Icon: Car, delay: 0.16, className: "text-navy/55" },
                  { Icon: FileText, delay: 0.24, className: "text-brand-orangeDeep/90" },
                ].map(({ Icon, delay, className }, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.6, y: 12 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: 0.15 + delay, type: "spring", stiffness: 260, damping: 22 }}
                    className={clsx(
                      "flex h-[3.35rem] w-[3.35rem] items-center justify-center rounded-2xl border border-white/80 bg-white/75 shadow-[0_8px_24px_-8px_rgba(23,26,74,0.15)] backdrop-blur-sm sm:h-14 sm:w-14",
                      className,
                    )}
                  >
                    <Icon className="h-6 w-6 sm:h-7 sm:w-7" strokeWidth={1.5} />
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="relative flex flex-col gap-2.5 sm:flex-row sm:items-center">
              <Button fullWidth className="sm:flex-1 sm:min-h-[52px]" type="button" onClick={scrollToProducts}>
                Zobacz produkty
              </Button>
              <Button
                variant="secondary"
                fullWidth
                className="sm:flex-1 sm:min-h-[52px] border-white/80 bg-white/70 backdrop-blur-sm"
                type="button"
                onClick={() => setModal("how")}
              >
                Jak to działa?
              </Button>
            </div>
          </div>
        </motion.section>

        {/* B. Polecane — carousel z pełnym paddingiem, bez „ucięcia” */}
        <section className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.35, ease: sectionEase }}
            className="flex items-end justify-between gap-3 px-0.5"
          >
            <div>
              <h2 className="text-lg font-bold text-navy">Polecane dla Ciebie</h2>
              <p className="mt-1 text-sm text-muted">Wybrane produkty — szybki start z najlepszymi ofertami.</p>
            </div>
            <Sparkles className="h-5 w-5 shrink-0 text-brand-orange/80" aria-hidden />
          </motion.div>

          <div className="-mx-4 min-w-0">
            <div
              className="flex snap-x snap-mandatory gap-4 overflow-x-auto overflow-y-visible px-4 pb-1 pt-0.5 scrollbar-hide"
              style={{ scrollPaddingInline: "1rem" }}
            >
              {featured.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <motion.article
                    key={item.key}
                    initial={{ opacity: 0, x: 28 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.35 }}
                    transition={{ delay: idx * 0.06, duration: 0.38, ease: sectionEase }}
                    whileTap={{ scale: 0.985 }}
                    className="w-[min(300px,85%)] shrink-0 snap-start"
                  >
                    <div className="flex h-full flex-col rounded-[1.85rem] border border-line/50 bg-gradient-to-b from-card to-lavender/25 p-5 shadow-[0_12px_40px_-20px_rgba(23,26,74,0.14)] ring-1 ring-white/60">
                      <div className="mb-4 flex items-start justify-between gap-2">
                        <BadgePill tone={item.badgeTone}>{item.badge}</BadgePill>
                      </div>
                      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-[1.35rem] bg-gradient-to-br from-lavender to-white shadow-inner ring-1 ring-line/60">
                        <Icon className="h-8 w-8 text-brand-orangeDeep" strokeWidth={1.35} />
                      </div>
                      <h3 className="text-lg font-bold text-navy">{item.title}</h3>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{item.description}</p>
                      <div className="mt-5 flex flex-col gap-2 border-t border-line/40 pt-4">
                        <Button fullWidth type="button" className="min-h-[48px]" onClick={() => setModal("buy")}>
                          Kup teraz
                        </Button>
                        <button
                          type="button"
                          className="flex items-center justify-center gap-1 text-sm font-semibold text-brand-orangeDeep transition hover:text-brand-orange"
                          onClick={scrollToProducts}
                        >
                          Szczegóły
                          <ChevronRight className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>

        {/* C. Kategorie */}
        <section className="space-y-3">
          <h2 className="px-0.5 text-lg font-bold text-navy">Kategorie produktów</h2>
          <div className="-mx-1 flex gap-2 overflow-x-auto pb-1 scrollbar-hide px-1">
            {categories.map((c) => {
              const active = category === c.id;
              return (
                <motion.button
                  key={c.id}
                  type="button"
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setCategory(c.id)}
                  className={clsx(
                    "shrink-0 rounded-full px-4 py-2.5 text-sm font-semibold transition",
                    active
                      ? "bg-navy text-white shadow-md shadow-navy/20 ring-2 ring-brand-orange/35"
                      : "border border-line/90 bg-white/90 text-navy/80 hover:border-brand-orange/25 hover:bg-lavender/40",
                  )}
                >
                  {c.label}
                </motion.button>
              );
            })}
          </div>
        </section>

        {/* D. Wszystkie produkty */}
        <section ref={productsRef} id="buy-products" className="scroll-mt-4 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35 }}
            className="px-0.5"
          >
            <h2 className="text-lg font-bold text-navy">Wszystkie produkty</h2>
            <p className="mt-1 text-sm text-muted">
              {category === "all" ? "Pełna lista ochron dostępnych online." : `Filtrowanie: ${categories.find((x) => x.id === category)?.label}.`}
            </p>
          </motion.div>

          <motion.div
            key={category}
            variants={stagger}
            initial="hidden"
            animate="show"
            className="flex flex-col gap-4"
          >
            {filtered.map((p) => {
              const Icon = p.icon;
              return (
                <motion.div key={p.key} variants={itemFade} className="group">
                    <div className="relative overflow-hidden rounded-[1.85rem] border border-line/45 bg-gradient-to-br from-card via-white to-lavender/20 p-5 shadow-[0_10px_36px_-22px_rgba(23,26,74,0.12)] ring-1 ring-white/70 transition group-hover:border-brand-orange/15 group-hover:shadow-[0_16px_44px_-24px_rgba(255,138,0,0.12)]">
                      <div className="pointer-events-none absolute -right-6 top-0 h-28 w-28 rounded-full bg-brand-orange/[0.06] blur-2xl transition group-hover:bg-brand-orange/10" />
                      <div className="relative flex gap-4">
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-lavender to-white shadow-inner ring-1 ring-line/50">
                          <Icon className="h-7 w-7 text-brand-orangeDeep" strokeWidth={1.35} />
                        </div>
                        <div className="min-w-0 flex-1 space-y-2">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="text-base font-bold text-navy">{p.title}</h3>
                            <span className="rounded-full bg-navy/[0.06] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-navy/70 ring-1 ring-navy/10">
                              Online
                            </span>
                            {p.cashback ? (
                              <span className="rounded-full bg-warning-bg/90 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-brand-orangeDeep ring-1 ring-brand-orange/20">
                                Cashback 5%
                              </span>
                            ) : null}
                          </div>
                          <p className="text-sm leading-relaxed text-muted">{p.description}</p>
                          <div className="flex flex-col gap-2 pt-2 sm:flex-row sm:items-center">
                            <Button type="button" className="min-h-[48px] sm:min-w-[140px]" onClick={() => setModal("buy")}>
                              Kup teraz
                            </Button>
                            <button
                              type="button"
                              className="text-left text-sm font-semibold text-brand-orangeDeep underline-offset-2 transition hover:text-brand-orange hover:underline sm:pl-2"
                              onClick={() => setModal("how")}
                            >
                              Poznaj szczegóły
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                </motion.div>
              );
            })}
          </motion.div>
        </section>

        {/* E. Dlaczego warto */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="space-y-4 rounded-[2rem] border border-line/40 bg-gradient-to-b from-lavender/30 to-white/80 p-6 shadow-inner ring-1 ring-white/60"
        >
          <h2 className="text-lg font-bold text-navy">Dlaczego warto kupować w aplikacji?</h2>
          <div className="grid gap-3">
            {[
              { t: "Szybki zakup online", d: "Kilka kroków, bez papierologii — tam, gdzie i tak jesteś.", icon: Sparkles },
              { t: "Wszystkie polisy pod ręką", d: "Dokumenty i statusy w jednym, przejrzystym miejscu.", icon: Shield },
              { t: "5% wraca w punktach", d: "Cashback za wybrane produkty — korzystasz i zbierasz.", icon: HeartPulse },
            ].map(({ t, d, icon: Icon }, i) => (
              <motion.div
                key={t}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="flex gap-4 rounded-2xl border border-white/80 bg-white/70 p-4 shadow-sm backdrop-blur-sm"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-lavender/80 text-brand-orangeDeep ring-1 ring-line/60">
                  <Icon className="h-5 w-5" strokeWidth={1.6} />
                </div>
                <div>
                  <p className="font-bold text-navy">{t}</p>
                  <p className="mt-0.5 text-sm leading-relaxed text-muted">{d}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </AnimatedPage>

      <Modal
        open={modal === "buy"}
        title="Kup online"
        onClose={() => setModal(null)}
        footer={
          <Button fullWidth onClick={() => setModal(null)}>
            Rozumiem
          </Button>
        }
      >
        To prototyp. W wersji produkcyjnej przejdziesz do pełnego procesu zakupu i płatności w aplikacji.
      </Modal>

      <Modal
        open={modal === "how"}
        title="Jak to działa?"
        onClose={() => setModal(null)}
        footer={
          <Button fullWidth onClick={() => setModal(null)}>
            Zamknij
          </Button>
        }
      >
        <ol className="list-decimal space-y-2 pl-4 text-sm leading-relaxed text-navy/85">
          <li>Wybierz produkt i kategorię ochrony.</li>
          <li>Uzupełnij krótki formularz — dopasujemy zakres do Twojej sytuacji.</li>
          <li>Opłać online — polisa trafi do aplikacji, a przy cashbacku zobaczysz punkty na koncie.</li>
        </ol>
      </Modal>
    </AppShell>
  );
}
