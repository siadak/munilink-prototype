import { AppShell } from "../../components/AppShell";
import { AnimatedPage } from "../../components/AnimatedPage";
import { AgentWorkshopActions } from "../../components/agent/AgentWorkshopActions";
import { AgentScenarioHeading } from "../../components/ScenarioTooltip";
import { useWorkshopAgent } from "../../context/WorkshopAgentContext";
import { AGENT_SCENARIO_TOOLTIPS } from "../../data/agentScenarios";

export function AgentMultiplePage() {
  const { activeAgent } = useWorkshopAgent();

  return (
    <AppShell>
      <AnimatedPage className="space-y-4">
        <AgentScenarioHeading title="Twój Agent" tooltip={AGENT_SCENARIO_TOOLTIPS.multiple} />
        <AgentWorkshopActions
          agent={activeAgent}
          changeAgentTo="/agent/multiple/select"
          changeLabel="Zmień Agenta"
        />
      </AnimatedPage>
    </AppShell>
  );
}
