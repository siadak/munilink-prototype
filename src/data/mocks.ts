export const user = {
  firstName: "Karol",
  email: "karol@example.com",
  phone: "503115983",
  peselVerified: false,
  hasLinkedUniwersum: false,
  points: 1250,
} as const;

export const agent = {
  name: "Anna Magdalena Roguska",
  phone: "503-115-983",
  email: "a.roguska@unilink.pl",
  avatarUrl: null as string | null,
} as const;

export type Policy = {
  id: string;
  category: string;
  insurer: string;
  number: string;
  status: string;
  startDate: string;
  endDate: string;
  vehicle?: string;
  registration?: string;
  year?: string;
  subject?: string;
};

export const policies: Policy[] = [
  {
    id: "1",
    category: "Komunikacyjne",
    insurer: "EUROINS",
    number: "000220664184",
    status: "Aktywna",
    startDate: "11.09.2025",
    endDate: "10.09.2026",
    vehicle: "Honda Civic IX",
    registration: "WOT86568",
    year: "2013",
  },
  {
    id: "2",
    category: "Majątkowe",
    insurer: "WARTA",
    number: "920063720113",
    status: "Aktywna",
    startDate: "27.03.2026",
    endDate: "26.03.2027",
    subject: "mieszkanie",
  },
  {
    id: "3",
    category: "Komunikacyjne",
    insurer: "AXA",
    number: "4565002002",
    status: "Wygasła",
    startDate: "04.11.2024",
    endDate: "17.11.2024",
    vehicle: "NISSAN 370 Z",
    registration: "RRR444",
    year: "2014",
  },
];

export type Benefit = {
  id: string;
  name: string;
  type: string;
  price: number;
  description: string;
};

export const benefits: Benefit[] = [
  {
    id: "beactive",
    name: "BeActiveTV",
    type: "Treningi online",
    price: 99,
    description: "Dostęp do platformy z treningami online",
  },
  {
    id: "vitalia",
    name: "Vitalia",
    type: "Diety online",
    price: 59,
    description: "Programy dietetyczne i wsparcie online",
  },
];

/** Lista do ekranu „Zmień Agenta” — pierwszy wpis to obecny Agent. */
export const changeAgentCandidates = [
  {
    id: "anna",
    name: "Anna Magdalena Roguska",
    phone: "503-115-983",
    email: "a.roguska@unilink.pl",
    isCurrent: true,
  },
  {
    id: "a1",
    name: "Jakub Choromański",
    phone: "501-000-111",
    email: "j.choromanski@unilink.pl",
    isCurrent: false,
  },
  {
    id: "a2",
    name: "Paweł Edward Kłos",
    phone: "502-000-222",
    email: "p.klos@unilink.pl",
    isCurrent: false,
  },
  {
    id: "a3",
    name: "Jakub Piotr Szlendak",
    phone: "503-000-333",
    email: "j.szlendak@unilink.pl",
    isCurrent: false,
  },
] as const;

export const insurersHelp = [
  "AEGON ŻYCIE",
  "AGRO TUW",
  "ALLIANZ",
  "AXA",
  "BALCIA",
  "BENEFIA",
  "COMPENSA",
] as const;

export function getBenefitById(id: string | undefined) {
  return benefits.find((b) => b.id === id);
}

export function getBenefitCode(id: string | undefined) {
  if (id === "vitalia") return "VITALIA-2026-M3P2";
  return "BEACTIVE-2026-X7K9";
}
