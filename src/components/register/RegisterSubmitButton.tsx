import { motion } from "framer-motion";
import { Button } from "../Button";
import type { RegisterScenarioId } from "../../data/registerScenarios";

function ctaLabel(scenario: RegisterScenarioId): string {
  if (scenario === "2") return "Zarejestruj się i pobierz polisy";
  if (scenario === "4") return "Rozpocznij";
  return "Zarejestruj się";
}

export function RegisterSubmitButton({ scenario }: { scenario: RegisterScenarioId }) {
  return (
    <motion.div whileTap={{ scale: 0.985 }} transition={{ duration: 0.12 }}>
      <Button
        type="submit"
        fullWidth
        className="min-h-[48px] shadow-[0_4px_14px_rgba(255,140,0,0.22)] bg-gradient-to-b from-[#ff9a2e] to-brand-orange hover:from-[#ff9320] hover:to-[#e97d00]"
      >
        {ctaLabel(scenario)}
      </Button>
    </motion.div>
  );
}
