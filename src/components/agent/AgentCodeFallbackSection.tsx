import { useState } from "react";
import { KeyRound } from "lucide-react";
import { Button } from "../Button";
import { Input } from "../Input";
import { useWorkshopAgent } from "../../context/WorkshopAgentContext";

export function AgentCodeFallbackSection({
  onAssigned,
}: {
  onAssigned: () => void;
}) {
  const { assignFromCode } = useWorkshopAgent();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = () => {
    if (!code.trim()) {
      setError("Wpisz kod Agenta.");
      return;
    }
    setError("");
    setLoading(true);
    window.setTimeout(() => {
      setLoading(false);
      assignFromCode();
      onAssigned();
    }, 700);
  };

  return (
    <section className="rounded-2xl border border-line/50 bg-white p-3.5 shadow-[0_2px_10px_rgba(23,26,74,0.04)]">
      <div className="flex gap-2.5">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-navy/[0.06] text-navy/70">
          <KeyRound className="h-4 w-4" strokeWidth={2} />
        </span>
        <div className="min-w-0 flex-1">
          <h2 className="text-sm font-bold text-navy">Nie widzisz swojego Agenta?</h2>
          <p className="mt-0.5 text-xs leading-relaxed text-muted">
            Jeśli nie ma go na liście, wpisz kod Agenta. Kod otrzymasz bezpośrednio od swojego Agenta.
          </p>
        </div>
      </div>

      <div className="mt-3 space-y-2">
        <Input
          label="Kod Agenta"
          name="agentCodeFallback"
          placeholder="np. MG31927"
          value={code}
          onChange={(e) => {
            setCode(e.target.value);
            if (error) setError("");
          }}
        />
        {error ? <p className="text-xs font-medium text-brand-orange">{error}</p> : null}
        <Button fullWidth type="button" disabled={loading} onClick={submit}>
          {loading ? "Przypisywanie…" : "Przypisz po kodzie"}
        </Button>
        <button type="button" className="w-full text-center text-xs font-semibold text-brand-orange">
          Nie znasz kodu? Zapytaj swojego Agenta.
        </button>
      </div>
    </section>
  );
}
