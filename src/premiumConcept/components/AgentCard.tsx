import { Check, Mail, Phone } from "lucide-react";
import { Badge } from "./Badge";

type Agent = {
  name: string;
  phone: string;
  email: string;
};

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0])
    .join("")
    .toUpperCase();
}

export function AgentCard({
  agent,
  selected,
  onSelect,
  showRadio,
  roleBadge,
}: {
  agent: Agent;
  selected?: boolean;
  onSelect?: () => void;
  showRadio?: boolean;
  /** np. „Twój Agent” — obok avatara / na karcie */
  roleBadge?: string;
}) {
  const body = (
    <div className="flex items-start gap-4">
      <div className="relative shrink-0">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-lavender/80 to-card text-navy font-bold ring-2 ring-line">
          {initials(agent.name)}
        </div>
        {!showRadio ? (
          <span className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-success text-white ring-2 ring-white">
            <Check className="h-3.5 w-3.5" strokeWidth={3} />
          </span>
        ) : null}
      </div>
      <div className="min-w-0 flex-1 space-y-1">
        <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1">
          <p className="font-semibold text-navy leading-snug">{agent.name}</p>
          {roleBadge ? (
            <Badge tone="default" className="!text-[10px] !py-0.5 shrink-0">
              {roleBadge}
            </Badge>
          ) : null}
        </div>
        <a href={`tel:${agent.phone}`} className="flex items-center gap-2 text-sm text-muted hover:text-navy">
          <Phone className="h-4 w-4 shrink-0 text-brand-orange" />
          {agent.phone}
        </a>
        <a
          href={`mailto:${agent.email}`}
          className="flex items-center gap-2 text-sm text-muted hover:text-navy break-all"
        >
          <Mail className="h-4 w-4 shrink-0 text-brand-orange" />
          {agent.email}
        </a>
      </div>
      {showRadio ? (
        <input
          type="radio"
          readOnly
          checked={selected}
          className="mt-2 h-5 w-5 accent-brand-orange pointer-events-none"
          aria-label={`Wybierz ${agent.name}`}
        />
      ) : null}
    </div>
  );

  if (showRadio) {
    return (
      <div
        role="button"
        tabIndex={0}
        onClick={onSelect}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onSelect?.();
          }
        }}
        className={`w-full text-left rounded-[1.75rem] border bg-card p-4 shadow-card transition cursor-pointer ${
          selected ? "border-brand-orange ring-2 ring-brand-orange/25" : "border-line hover:border-navy/20"
        }`}
      >
        {body}
      </div>
    );
  }

  return (
    <div className="rounded-[1.75rem] border border-line/90 bg-card p-5 shadow-card">{body}</div>
  );
}
