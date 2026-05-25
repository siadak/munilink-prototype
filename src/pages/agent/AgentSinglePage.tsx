import { useLocation } from "react-router-dom";
import { AppShell } from "../../components/AppShell";
import { AnimatedPage } from "../../components/AnimatedPage";
import { AgentWorkshopActions } from "../../components/agent/AgentWorkshopActions";
import { AgentScenarioHeading } from "../../components/ScenarioTooltip";
import { useWorkshopAgent } from "../../context/WorkshopAgentContext";
import { AGENT_SCENARIO_TOOLTIPS, WORKSHOP_AGENT_SINGLE } from "../../data/agentScenarios";

export function AgentSinglePage() {
  const location = useLocation();
  const { activeAgent } = useWorkshopAgent();
  const fromCode = Boolean((location.state as { fromCode?: boolean } | null)?.fromCode);
  const agent = fromCode ? activeAgent : WORKSHOP_AGENT_SINGLE;

  return (
    <AppShell>
      <AnimatedPage className="space-y-4">
        <AgentScenarioHeading title="Twój Agent" tooltip={AGENT_SCENARIO_TOOLTIPS.single} />
        <AgentWorkshopActions agent={agent} singleMode />
      </AnimatedPage>
    </AppShell>
  );
}
