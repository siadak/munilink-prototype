import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { animate, motion } from "framer-motion";
import { Coins, Percent, ShoppingBag, Sparkles } from "lucide-react";
import { AppShell } from "../components/AppShell";
import { AnimatedPage } from "../components/AnimatedPage";
import { Card } from "../components/Card";
import { InfoBanner } from "../components/InfoBanner";

const chips = [
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

const listVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
};
const chipVariants = {
  hidden: { opacity: 0, scale: 0.92 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.22 } },
};

export function CashbackPage() {
  const navigate = useNavigate();
  const [points, setPoints] = useState(0);

  useEffect(() => {
    const controls = animate(0, 1250, {
      duration: 1.85,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => setPoints(Math.round(latest)),
    });
    return () => controls.stop();
  }, []);

  return (
    <AppShell>
      <AnimatedPage className="space-y-5">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-navy">Cashback w aplikacji</h1>
          <p className="text-sm text-muted leading-relaxed">
            Kupuj i odbieraj 5% zwrotu w punktach
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="relative overflow-hidden rounded-[2rem] border border-line bg-gradient-to-br from-lavender/80 via-card to-warning-bg p-6 shadow-card"
        >
          <div className="pointer-events-none absolute -right-6 top-2 opacity-25">
            <Percent className="h-32 w-32 text-brand-orange" strokeWidth={1} />
          </div>
          <div className="pointer-events-none absolute left-6 top-10">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="absolute inline-flex h-8 w-8 items-center justify-center rounded-full border border-brand-orange/30 bg-warning-bg/80 text-brand-orangeDeep shadow-sm"
                style={{ left: i * 22, top: i * 6 }}
                animate={{ y: [0, -6, 0], opacity: [0.55, 1, 0.55] }}
                transition={{ duration: 2.4 + i * 0.3, repeat: Infinity, ease: "easeInOut" }}
              >
                <Coins className="h-4 w-4" />
              </motion.span>
            ))}
          </div>

          <Card className="relative !p-5 border-lavender/80 bg-card/95 backdrop-blur-sm shadow-soft">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-muted">Twoje saldo</p>
                <p className="mt-1 text-3xl font-black tracking-tight text-navy tabular-nums">
                  {formatPts(points)} pkt
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-navy text-white shadow-soft">
                <Sparkles className="h-6 w-6 text-brand-orangeDeep" />
              </div>
            </div>
            <p className="mt-3 text-sm text-muted leading-relaxed">
              1 pkt = 1 zł przy kolejnym zakupie lub benefitach
            </p>
            <p className="mt-4 text-sm text-navy">
              Ostatni zwrot: <span className="font-semibold">Travel +25 pkt</span>
            </p>
          </Card>
        </motion.div>

        <InfoBanner>
          Za każdy zakup produktów w aplikacji wraca 5% wartości w punktach
        </InfoBanner>

        <div>
          <p className="text-sm font-bold text-navy mb-3 px-1">Produkty objęte cashbackiem</p>
          <motion.div
            variants={listVariants}
            initial="hidden"
            animate="show"
            className="flex flex-wrap gap-2"
          >
            {chips.map((c) => (
              <motion.span
                key={c}
                variants={chipVariants}
                className="rounded-full border border-line bg-card px-3 py-2 text-xs font-semibold text-navy shadow-sm"
              >
                {c}
              </motion.span>
            ))}
          </motion.div>
        </div>

        <p className="text-xs text-muted px-1 leading-relaxed">
          Punkty cashbacku są osobnym mechanizmem lojalnościowym — nie myl ich z bezpośrednim zakupem benefitów za
          gotówkę w aplikacji.
        </p>

        <div className="grid grid-cols-2 gap-3 pt-1">
          <motion.button
            type="button"
            whileTap={{ scale: 0.97 }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28 }}
            onClick={() => navigate("/buy")}
            className="rounded-[1.75rem] bg-navy text-white p-5 text-left shadow-card min-h-[120px] flex flex-col justify-between border border-navy/20"
          >
            <ShoppingBag className="h-6 w-6 text-brand-orangeDeep" />
            <span className="text-sm font-bold leading-snug">Kup Online</span>
          </motion.button>
          <motion.button
            type="button"
            whileTap={{ scale: 0.97 }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28, delay: 0.06 }}
            onClick={() => navigate("/benefits")}
            className="rounded-[1.75rem] bg-gradient-to-br from-brand-orange to-brand-orangeDeep text-white p-5 text-left shadow-card min-h-[120px] flex flex-col justify-between border border-white/15"
          >
            <Sparkles className="h-6 w-6 text-white/90" />
            <span className="text-sm font-bold leading-snug">Benefity</span>
          </motion.button>
        </div>
      </AnimatedPage>
    </AppShell>
  );
}
