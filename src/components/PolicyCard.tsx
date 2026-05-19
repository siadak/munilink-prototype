import { ChevronRight } from "lucide-react";
import type { Policy } from "../data/mocks";

function subjectLine(p: Policy) {
  if (p.vehicle && p.registration) return `przedmiot ubezpieczenia: ${p.vehicle}`;
  if (p.subject) return `przedmiot ubezpieczenia: ${p.subject}`;
  if (p.vehicle) return p.vehicle;
  return null;
}

export function PolicyCard({ policy }: { policy: Policy }) {
  const subject = subjectLine(policy);
  const isActive = policy.status === "Aktywna";

  return (
    <div className="flex items-stretch gap-2 rounded-2xl border border-line/60 bg-white p-4 shadow-[0_2px_10px_rgba(23,26,74,0.06)]">
      <div className="min-w-0 flex-1 space-y-1">
        <p className="text-sm font-bold text-navy">{policy.category}</p>
        <p className="text-sm text-navy/90">
          {policy.insurer} / {policy.number}
        </p>
        <p className="text-sm">
          Status{" "}
          <span className={isActive ? "font-semibold text-success" : "font-semibold text-muted"}>
            {policy.status}
          </span>
        </p>
        <p className="text-xs text-muted">
          obowiązuje od {policy.startDate} do {policy.endDate}
        </p>
        {subject ? <p className="text-xs text-muted">{subject}</p> : null}
      </div>
      <div className="flex items-center text-navy/50">
        <ChevronRight className="h-6 w-6" />
      </div>
    </div>
  );
}
