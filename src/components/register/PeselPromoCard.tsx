import { AnimatePresence, motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import { Checkbox } from "../Checkbox";
import { RegisterInput } from "./RegisterInput";
import { registerSurface } from "./registerStyles";

const BENEFIT_CHIPS = ["Polisy w aplikacji", "Agent automatycznie", "Mniej uzupełniania"] as const;

export function PeselPromoCard({
  checked,
  onCheckedChange,
  showPeselField,
  scenario,
}: {
  checked: boolean;
  onCheckedChange: (v: boolean) => void;
  showPeselField: boolean;
  scenario: "2" | "3";
}) {
  return (
    <motion.div layout className={`${registerSurface} overflow-hidden border-brand-orange/10 bg-[rgba(255,252,248,0.85)] p-3`}>
      <div className="flex gap-2">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-orange/[0.08] text-brand-orange">
          <ShieldCheck className="h-4 w-4" strokeWidth={2} />
        </span>
        <div className="min-w-0 flex-1">
          <h2 className="text-[13px] font-bold text-navy">Masz polisy w Unilink?</h2>
          <p className="mt-0.5 text-[11px] leading-snug text-muted">
            Podaj PESEL, a sprawdzimy, czy możemy pobrać Twoje polisy i przypisać Agenta.
          </p>
        </div>
      </div>

      <div className="mt-2 flex flex-wrap gap-1">
        {BENEFIT_CHIPS.map((text) => (
          <span
            key={text}
            className="rounded-full bg-white/80 px-2 py-px text-[9px] font-medium text-navy/70 ring-1 ring-navy/[0.06]"
          >
            {text}
          </span>
        ))}
      </div>

      <div className="mt-2 rounded-lg bg-white/50 px-2 py-1.5 ring-1 ring-navy/[0.04]">
        <Checkbox
          compact
          id="want-pesel"
          name="wantPesel"
          checked={checked}
          onChange={(e) => onCheckedChange(e.target.checked)}
          label="Tak, chcę od razu pobrać moje polisy"
        />
      </div>

      <AnimatePresence initial={false}>
        {showPeselField ? (
          <motion.div
            key="pesel-field"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.18 }}
            className="overflow-hidden"
          >
            <div className="mt-1.5 space-y-0.5 pt-1.5">
              <RegisterInput name="pesel" placeholder="PESEL" inputMode="numeric" />
              <p className="text-[10px] leading-[1.25] text-muted/80">PESEL służy tylko do weryfikacji i pobrania polis.</p>
            </div>
          </motion.div>
        ) : scenario === "3" ? (
          <motion.p
            key="skip-hint"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-1.5 text-[10px] leading-[1.25] text-muted/75"
          >
            Możesz pominąć ten krok i pobrać polisy później.
          </motion.p>
        ) : null}
      </AnimatePresence>
    </motion.div>
  );
}
