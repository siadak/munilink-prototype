export type WorkshopAgent = {
  id: string;
  name: string;
  phone: string;
  email: string;
};

export const WORKSHOP_AGENT_SINGLE: WorkshopAgent = {
  id: "gbiorczyk",
  name: "Magdalena Karolina Gbiorczyk",
  phone: "571-607-440",
  email: "m.gbiorczyk@unilink.pl",
};

export const WORKSHOP_AGENT_AFTER_CODE: WorkshopAgent = {
  id: "siadaczka",
  name: "Karol Siadaczka",
  phone: "791-060-204",
  email: "k.siadaczka@unilink.pl",
};

export const WORKSHOP_AGENTS_LIST: WorkshopAgent[] = [
  WORKSHOP_AGENT_SINGLE,
  WORKSHOP_AGENT_AFTER_CODE,
  {
    id: "falkowska",
    name: "Dominika Irena Falkowska",
    phone: "578-030-204",
    email: "d.falkowska@unilink.pl",
  },
  {
    id: "milewski",
    name: "Bartosz Milewski",
    phone: "791-494-111",
    email: "b.milewski@unilink.pl",
  },
];

export function getWorkshopAgent(id: string): WorkshopAgent {
  return WORKSHOP_AGENTS_LIST.find((a) => a.id === id) ?? WORKSHOP_AGENT_SINGLE;
}

export type AgentScenarioInfoKey = "single" | "multiple" | "multipleSelect" | "code";

/** Krótkie opisy w tooltipie „i” na ekranach warsztatowych Agent. */
export const AGENT_SCENARIO_TOOLTIPS: Record<AgentScenarioInfoKey, string> = {
  single:
    "Klient ma przypisanego jednego Agenta. Ekran pokazuje podstawowy widok relacji klient–Agent bez dodatkowych działań.",
  multiple:
    "Klient ma więcej niż jednego Agenta. Może wskazać, z którym Agentem chce kontynuować obsługę kolejnych spraw lub zakupów.",
  multipleSelect:
    "Drugi krok scenariusza z wieloma Agentami. Klient wybiera Agenta z listy i zapisuje zmianę.",
  code:
    "Nie udało się automatycznie ustalić Agenta. Klient może wpisać kod otrzymany od swojego Agenta i przypisać go do konta.",
};

export const AGENT_WORKSHOP_LINKS = [
  { label: "Jeden Agent", path: "/agent/single" },
  { label: "Wielu Agentów", path: "/agent/multiple" },
  { label: "Zmień Agenta", path: "/agent/multiple/select" },
  { label: "Brak Agenta / wpisz kod", path: "/agent/code" },
] as const;
