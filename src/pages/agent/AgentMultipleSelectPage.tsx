import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppShell } from "../../components/AppShell";
import { AnimatedPage } from "../../components/AnimatedPage";
import { AgentCard } from "../../components/AgentCard";
import { AgentCodeFallbackSection } from "../../components/agent/AgentCodeFallbackSection";
import { AgentScenarioHeading } from "../../components/ScenarioTooltip";
import { AGENT_SCENARIO_TOOLTIPS } from "../../data/agentScenarios";
import { Button } from "../../components/Button";
import { Modal } from "../../components/Modal";
import { useWorkshopAgent } from "../../context/WorkshopAgentContext";
import { WORKSHOP_AGENTS_LIST } from "../../data/agentScenarios";

export function AgentMultipleSelectPage() {
  const navigate = useNavigate();
  const { activeAgentId, setActiveAgentId } = useWorkshopAgent();
  const [selectedId, setSelectedId] = useState(activeAgentId);
  const [listSuccessOpen, setListSuccessOpen] = useState(false);
  const [codeSuccessOpen, setCodeSuccessOpen] = useState(false);

  const save = () => {
    setActiveAgentId(selectedId);
    setListSuccessOpen(true);
  };

  const finishListSave = () => {
    setListSuccessOpen(false);
    navigate("/agent/multiple");
  };

  const finishCodeAssign = () => {
    setCodeSuccessOpen(false);
    navigate("/agent/multiple");
  };

  return (
    <AppShell showBack>
      <AnimatedPage className="space-y-4 pb-2">
        <AgentScenarioHeading title="Zmień Agenta" tooltip={AGENT_SCENARIO_TOOLTIPS.multipleSelect} />

        <ul className="space-y-3">
          {WORKSHOP_AGENTS_LIST.map((a) => (
            <li key={a.id}>
              <AgentCard
                agent={a}
                showRadio
                selected={selectedId === a.id}
                onSelect={() => setSelectedId(a.id)}
              />
            </li>
          ))}
        </ul>

        <AgentCodeFallbackSection onAssigned={() => setCodeSuccessOpen(true)} />

        <Button fullWidth type="button" onClick={save}>
          Zapisz zmiany
        </Button>
      </AnimatedPage>

      <Modal
        open={listSuccessOpen}
        title="Zapisano"
        onClose={finishListSave}
        footer={
          <Button fullWidth type="button" onClick={finishListSave}>
            OK
          </Button>
        }
      >
        <p className="text-sm text-muted">Agent został zmieniony.</p>
      </Modal>

      <Modal
        open={codeSuccessOpen}
        title="Agent przypisany"
        onClose={finishCodeAssign}
        footer={
          <Button fullWidth type="button" onClick={finishCodeAssign}>
            OK
          </Button>
        }
      >
        <p className="text-sm text-muted">Agent został przypisany do Twojego konta.</p>
      </Modal>
    </AppShell>
  );
}
