import { useRef } from "react";
import { Gift, ShoppingBag, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { AppShell } from "../components/AppShell";
import { AnimatedPage } from "../components/AnimatedPage";
import { BenefitCard } from "../components/BenefitCard";
import { Card } from "../components/Card";
import { InfoBanner } from "../components/InfoBanner";
import { benefits } from "../data/mocks";

const listVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.28, ease: "easeOut" } },
};

export function BenefitsPage() {
  const listRef = useRef<HTMLDivElement | null>(null);

  return (
    <AppShell>
      <AnimatedPage className="space-y-5">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-navy">Benefity</h1>
          <p className="text-sm text-muted leading-relaxed">
            Skorzystaj z ofert partnerów i kupuj wygodnie w aplikacji
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28 }}
          className="relative overflow-hidden rounded-[2rem] border border-line bg-gradient-to-br from-lavender/50 via-card to-warning-bg/30 p-6 shadow-card"
        >
          <div className="absolute right-4 top-4 flex gap-2 text-brand-orange">
            <Gift className="h-10 w-10" />
            <ShoppingBag className="h-8 w-8 opacity-70" />
          </div>
          <div className="relative flex max-w-[85%] items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-card shadow-sm ring-1 ring-line/80">
              <Sparkles className="h-7 w-7 text-navy" />
            </div>
            <p className="text-sm font-semibold leading-snug text-navy">
              Kup benefity jak zwykły produkt — wybierz ofertę i opłać zakup w aplikacji.
            </p>
          </div>
        </motion.div>

        <InfoBanner tone="neutral">
          <p className="font-semibold text-navy">Kup benefity bezpośrednio w aplikacji</p>
          <p className="mt-1 text-muted">Wybierz ofertę partnera i przejdź do prostego zakupu online.</p>
        </InfoBanner>

        <section id="benefits-available" className="space-y-3 scroll-mt-24">
          <h2 className="text-sm font-bold uppercase tracking-wide text-muted px-1">Dostępne benefity</h2>
          <motion.div ref={listRef} variants={listVariants} initial="hidden" animate="show" className="space-y-3">
            {benefits.map((b) => (
              <motion.div key={b.id} variants={itemVariants}>
                <BenefitCard benefit={b} />
              </motion.div>
            ))}
          </motion.div>
        </section>

        <section className="space-y-3">
          <h2 className="text-sm font-bold uppercase tracking-wide text-muted px-1">Wkrótce więcej</h2>
          <motion.div
            variants={listVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
            className="grid grid-cols-1 gap-3"
          >
            <motion.div variants={itemVariants}>
              <Card className="!p-4">
                <p className="font-semibold text-navy">Nowe benefity wkrótce</p>
                <p className="mt-1 text-xs text-muted">Powiadomimy Cię, gdy pojawią się kolejne oferty.</p>
              </Card>
            </motion.div>
            <div className="grid grid-cols-2 gap-3">
              <motion.div variants={itemVariants}>
                <Card className="!p-4">
                  <p className="text-sm font-semibold text-navy">Oferty specjalne</p>
                </Card>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Card className="!p-4">
                  <p className="text-sm font-semibold text-navy">Partnerzy premium</p>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        </section>

        <motion.button
          type="button"
          whileTap={{ scale: 0.98 }}
          onClick={() => listRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
          className="w-full rounded-2xl border border-line/90 bg-card py-3 text-sm font-semibold text-brand-orangeDeep shadow-sm"
        >
          Zobacz wszystkie benefity
        </motion.button>
      </AnimatedPage>
    </AppShell>
  );
}
