import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { getWorkshopAgent, WORKSHOP_AGENT_SINGLE, type WorkshopAgent } from "../data/agentScenarios";

type WorkshopAgentContextValue = {
  activeAgentId: string;
  activeAgent: WorkshopAgent;
  setActiveAgentId: (id: string) => void;
  assignFromCode: () => void;
};

const WorkshopAgentContext = createContext<WorkshopAgentContextValue | null>(null);

export function WorkshopAgentProvider({ children }: { children: ReactNode }) {
  const [activeAgentId, setActiveAgentIdState] = useState(WORKSHOP_AGENT_SINGLE.id);

  const setActiveAgentId = useCallback((id: string) => {
    setActiveAgentIdState(id);
  }, []);

  const assignFromCode = useCallback(() => {
    setActiveAgentIdState("siadaczka");
  }, []);

  const value = useMemo(
    () => ({
      activeAgentId,
      activeAgent: getWorkshopAgent(activeAgentId),
      setActiveAgentId,
      assignFromCode,
    }),
    [activeAgentId, setActiveAgentId, assignFromCode],
  );

  return <WorkshopAgentContext.Provider value={value}>{children}</WorkshopAgentContext.Provider>;
}

export function useWorkshopAgent() {
  const ctx = useContext(WorkshopAgentContext);
  if (!ctx) {
    throw new Error("useWorkshopAgent musi być użyte wewnątrz WorkshopAgentProvider");
  }
  return ctx;
}
