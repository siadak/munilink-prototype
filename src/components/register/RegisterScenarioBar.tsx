import clsx from "clsx";
import { motion } from "framer-motion";
import { ScenarioTooltip } from "../ScenarioTooltip";
import { REGISTER_SCENARIO_TOOLTIPS, REGISTER_SCENARIOS, type RegisterScenarioId } from "../../data/registerScenarios";

export function RegisterScenarioBar({
  scenario,
  onSelect,
}: {
  scenario: RegisterScenarioId;
  onSelect: (id: RegisterScenarioId) => void;
}) {
  return (
    <div className="space-y-1">
      <div className="relative flex h-[34px] rounded-full bg-navy/[0.04] p-0.5 ring-1 ring-navy/[0.05]">
        {REGISTER_SCENARIOS.map((id) => {
          const active = scenario === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => onSelect(id)}
              className="relative z-[1] flex flex-1 items-center justify-center rounded-full text-[11px] font-semibold transition-colors duration-200"
              aria-pressed={active}
              aria-label={`Scenariusz ${id}`}
            >
              {active ? (
                <motion.span
                  layoutId="register-scenario-pill"
                  className="absolute inset-0 rounded-full bg-brand-orange shadow-[0_1px_6px_rgba(255,140,0,0.28)]"
                  transition={{ type: "spring", stiffness: 400, damping: 34 }}
                />
              ) : null}
              <span className={clsx("relative z-[2]", active ? "text-white" : "text-navy/55")}>#{id}</span>
            </button>
          );
        })}
      </div>

      <p className="flex items-center gap-1 text-[10px] text-navy/45">
        <span>Scenariusz rejestracji {scenario}</span>
        <ScenarioTooltip
          key={scenario}
          content={REGISTER_SCENARIO_TOOLTIPS[scenario]}
          ariaLabel="Opis scenariusza (warsztat)"
          placement="top"
        />
      </p>
    </div>
  );
}
