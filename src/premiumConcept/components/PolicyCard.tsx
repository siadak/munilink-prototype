import { Car, ChevronRight, Home, Plane, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import type { Policy } from "../../data/mocks";
import { Badge } from "./Badge";

function subjectLine(p: Policy) {
  if (p.vehicle && p.registration) return `${p.vehicle} • nr rej. ${p.registration}`;
  if (p.vehicle) return p.vehicle;
  if (p.subject) return p.subject;
  return "—";
}

function categoryIcon(category: string) {
  switch (category) {
    case "Komunikacyjne":
      return Car;
    case "Majątkowe":
      return Home;
    case "Turystyczne":
      return Plane;
    default:
      return ShieldCheck;
  }
}

export function PolicyCard({ policy }: { policy: Policy }) {
  const statusTone = policy.status === "Aktywna" ? "success" : "muted";
  const Icon = categoryIcon(policy.category);

  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      whileHover={{ y: -2 }}
      className="flex items-stretch gap-3 rounded-[1.75rem] border border-line/90 bg-card p-4 shadow-card"
    >
      <div className="mt-0.5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-lavender/60 border border-lavender/80">
        <Icon className="h-6 w-6 text-brand-orangeDeep" />
      </div>

      <div className="min-w-0 flex-1 space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wide text-muted">
            {policy.category}
          </span>
          <Badge tone={statusTone}>{policy.status}</Badge>
        </div>

        <p className="text-[15px] font-semibold text-navy leading-snug">
          {policy.insurer} / {policy.number}
        </p>

        <p className="text-xs text-muted">
          Okres: {policy.startDate} — {policy.endDate}
        </p>

        <p className="text-sm text-navy/85 line-clamp-2">{subjectLine(policy)}</p>
      </div>

      <div className="flex items-center text-muted">
        <ChevronRight className="h-6 w-6" />
      </div>
    </motion.div>
  );
}
