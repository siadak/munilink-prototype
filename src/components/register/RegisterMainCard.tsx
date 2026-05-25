import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { SCENARIO_SUBTITLES, type RegisterScenarioId } from "../../data/registerScenarios";
import { registerSurface } from "./registerStyles";

export function RegisterMainCard({
  scenario,
  children,
}: {
  scenario: RegisterScenarioId;
  children: ReactNode;
}) {
  return (
    <motion.section
      key={scenario}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      className={`${registerSurface} px-4 py-3.5`}
    >
      <h1 className="text-[19px] font-bold tracking-tight text-navy">Załóż konto</h1>
      <p className="mt-1 text-[12px] leading-snug text-muted">{SCENARIO_SUBTITLES[scenario]}</p>
      <div className="mt-2.5">{children}</div>
    </motion.section>
  );
}

export function RegisterFieldsSection({
  children,
  showLabel = true,
}: {
  children: ReactNode;
  showLabel?: boolean;
}) {
  return (
    <div>
      {showLabel ? (
        <p className="mb-2 text-[11px] font-medium text-muted/90">Dane konta</p>
      ) : null}
      <div className="space-y-1.5">{children}</div>
    </div>
  );
}
