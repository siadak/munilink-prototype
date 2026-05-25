import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Checkbox } from "../Checkbox";
import { registerSurface } from "./registerStyles";

export function RegisterConsents({ idPrefix = "" }: { idPrefix?: string }) {
  const [expanded, setExpanded] = useState(false);
  const p = idPrefix ? `${idPrefix}-` : "";

  return (
    <div className={`${registerSurface} px-3 py-2.5 opacity-95`}>
      <p className="mb-1.5 text-[9px] font-medium uppercase tracking-[0.1em] text-muted/70">Zgody</p>
      <div className="space-y-1">
        <Checkbox
          compact
          id={`${p}terms`}
          name="terms"
          required
          label={
            <>
              Akceptuję{" "}
              <span className="font-semibold text-brand-orange">Regulamin</span> i{" "}
              <span className="font-semibold text-brand-orange">Politykę prywatności</span>
            </>
          }
        />
        <Checkbox
          compact
          id={`${p}formal`}
          name="formal"
          required
          label="Wyrażam wymagane zgody formalne dotyczące obsługi konta"
        />
      </div>
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="mt-1.5 text-[10px] font-medium text-brand-orange"
      >
        {expanded ? "Ukryj dodatkowe zgody" : "Pokaż dodatkowe zgody"}
      </button>
      <AnimatePresence initial={false}>
        {expanded ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.16 }}
            className="overflow-hidden"
          >
            <div className="mt-1.5 space-y-1 border-t border-navy/[0.06] pt-1.5">
              <Checkbox
                compact
                id={`${p}marketing`}
                name="marketing"
                label={<span className="text-[10px] leading-[1.25]">Informacje o produktach i benefitach</span>}
              />
              <Checkbox
                compact
                id={`${p}contact`}
                name="contact"
                label={<span className="text-[10px] leading-[1.25]">Kontakt marketingowy telefoniczny i e-mail</span>}
              />
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
