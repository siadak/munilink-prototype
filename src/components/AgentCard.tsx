import { Check, Mail, Phone } from "lucide-react";

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
}: {
  agent: Agent;
  selected?: boolean;
  onSelect?: () => void;
  showRadio?: boolean;
  roleBadge?: string;
}) {
  const body = (
    <div className="flex items-start gap-3">
      <div className="relative min-w-0 flex-1 space-y-1">
        <p className="text-base font-bold text-navy leading-snug">{agent.name}</p>
        <a href={`tel:${agent.phone}`} className="flex items-center gap-2 text-sm text-muted">
          <Phone className="h-4 w-4 shrink-0 text-brand-orange" />
          {agent.phone}
        </a>
        <a href={`mailto:${agent.email}`} className="flex items-center gap-2 text-sm text-muted break-all">
          <Mail className="h-4 w-4 shrink-0 text-brand-orange" />
          {agent.email}
        </a>
      </div>
      {!showRadio ? (
        <AgentAvatar name={agent.name} />
      ) : (
        <input
          type="radio"
          readOnly
          checked={selected}
          className="mt-2 h-5 w-5 accent-brand-orange pointer-events-none"
          aria-label={`Wybierz ${agent.name}`}
        />
      )}
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
        className={`w-full cursor-pointer rounded-2xl border bg-white p-4 text-left shadow-[0_2px_12px_rgba(23,26,74,0.08)] ${
          selected ? "border-brand-orange ring-1 ring-brand-orange/30" : "border-line"
        }`}
      >
        {body}
      </div>
    );
  }

  return (
    <div className="relative rounded-2xl border border-line/70 bg-white p-4 shadow-[0_2px_12px_rgba(23,26,74,0.08)]">
      {body}
      <span className="absolute bottom-3 right-3 flex h-7 w-7 items-center justify-center rounded-full bg-brand-orange text-white">
        <Check className="h-4 w-4" strokeWidth={3} />
      </span>
    </div>
  );
}

function AgentAvatar({ name }: { name: string }) {
  return (
    <div className="relative shrink-0">
      <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-[#e8e9ef] text-sm font-bold text-navy ring-2 ring-white">
        {initials(name)}
      </div>
    </div>
  );
}
