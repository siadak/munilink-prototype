import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppShell } from "../../components/AppShell";
import { AnimatedPage } from "../../components/AnimatedPage";
import { AgentScenarioHeading } from "../../components/ScenarioTooltip";
import { AGENT_SCENARIO_TOOLTIPS } from "../../data/agentScenarios";
import { Button } from "../../components/Button";
import { Card } from "../../components/Card";
import { Input } from "../../components/Input";
import { Modal } from "../../components/Modal";
import { useWorkshopAgent } from "../../context/WorkshopAgentContext";

export function AgentCodePage() {
  const navigate = useNavigate();
  const { assignFromCode } = useWorkshopAgent();
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);

  const submit = () => {
    if (!code.trim()) return;
    setLoading(true);
    window.setTimeout(() => {
      setLoading(false);
      assignFromCode();
      setSuccessOpen(true);
    }, 700);
  };

  const finish = () => {
    setSuccessOpen(false);
    navigate("/agent/single", { state: { fromCode: true } });
  };

  return (
    <AppShell>
      <AnimatedPage className="space-y-4">
        <AgentScenarioHeading title="Twój Agent" tooltip={AGENT_SCENARIO_TOOLTIPS.code} />

        <div className="space-y-2">
          <h2 className="text-base font-bold text-navy">Nie mamy jeszcze Twojego Agenta</h2>
          <p className="text-sm leading-relaxed text-muted">
            Jeśli jesteś klientem Unilink, wpisz kod swojego Agenta, aby przypisać go do konta i łatwiej
            kontaktować się z nim w aplikacji.
          </p>
        </div>

        <Card padding="md" className="space-y-3 !border-lavender/50">
          <div>
            <h3 className="text-sm font-bold text-navy">Masz swojego Agenta?</h3>
            <p className="mt-1 text-sm leading-relaxed text-muted">
              Wpisz kod Agenta, a przypiszemy go do Twojego konta. Jeśli nie znasz kodu, poproś o niego
              swojego Agenta.
            </p>
          </div>
          <Input
            label="Kod Agenta"
            name="agentCode"
            placeholder="np. MG31927"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <p className="text-[11px] leading-snug text-muted">
            Kod Agenta otrzymasz bezpośrednio od swojego Agenta.
          </p>
        </Card>

        <Button fullWidth type="button" disabled={loading || !code.trim()} onClick={submit}>
          {loading ? "Przypisywanie…" : "Przypisz Agenta"}
        </Button>

        <button
          type="button"
          className="w-full text-center text-sm font-semibold text-brand-orange"
          onClick={() => {}}
        >
          Nie znasz kodu? Zapytaj swojego Agenta
        </button>
      </AnimatedPage>

      <Modal
        open={successOpen}
        title="Agent przypisany"
        onClose={finish}
        footer={
          <Button fullWidth type="button" onClick={finish}>
            Przejdź dalej
          </Button>
        }
      >
        <p className="text-sm text-muted">Agent został przypisany do Twojego konta.</p>
      </Modal>
    </AppShell>
  );
}
