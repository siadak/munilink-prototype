import confetti from "canvas-confetti";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useEffect } from "react";
import { Button } from "../Button";
import { LifeSurveyIllustration } from "./LifeSurveyIllustration";

export function LifeSurveySuccess({ onMenu }: { onMenu: () => void }) {
  useEffect(() => {
    const t = window.setTimeout(() => {
      confetti({
        particleCount: 70,
        spread: 55,
        startVelocity: 28,
        origin: { y: 0.62, x: 0.5 },
        colors: ["#FF8A00", "#171A4A", "#EFEDFF", "#2EB85C"],
        disableForReducedMotion: true,
      });
    }, 200);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <motion.div
      className="space-y-5 py-2 text-center"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      <LifeSurveyIllustration variant="offer" />

      <motion.div
        className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success-soft shadow-[0_4px_20px_rgba(46,184,92,0.25)]"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 380, damping: 18, delay: 0.15 }}
      >
        <Check className="h-8 w-8 text-success" strokeWidth={2.5} />
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
        <h2 className="text-xl font-bold text-navy">Dziękujemy!</h2>
        <p className="mx-auto mt-3 max-w-[18rem] text-sm leading-relaxed text-muted">
          Agent otrzyma Twoje odpowiedzi i skontaktuje się z Tobą z propozycją ochrony.
        </p>
      </motion.div>

      <Button fullWidth type="button" onClick={onMenu}>
        Wróć do menu
      </Button>
    </motion.div>
  );
}
