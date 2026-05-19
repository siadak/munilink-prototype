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

export type BenefitVisualTheme = "fitness" | "diet" | "health" | "bike" | "wellness";

export type Benefit = {
  id: string;
  name: string;
  partner: string;
  type: string;
  price: number;
  /** Krótki lead na ekranie szczegółów. */
  description: string;
  /** Opis na liście benefitów (1–2 zdania). */
  listDescription: string;
  imageUrl: string;
  offerScope: string;
  includes: string[];
  rules: string[];
  howToUse: string[];
  importantInfo: string[];
  validity: string;
  visual: BenefitVisualTheme;
};

const STANDARD_HOW_TO = [
  "Kup benefit w aplikacji.",
  "Odbierz kod w aplikacji.",
  "Przejdź do strony partnera.",
  "Wpisz kod lub użyj go podczas aktywacji usługi.",
] as const;

export const benefits: Benefit[] = [
  {
    id: "beactive",
    name: "BeActiveTV",
    partner: "BeActiveTV",
    type: "Treningi online",
    price: 99,
    description:
      "Platforma z treningami online — ćwicz w domu z planami dopasowanymi do Twojego poziomu.",
    listDescription: "Dostęp do platformy z treningami online i materiałami treningowymi.",
    imageUrl:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=900&auto=format&fit=crop&q=80",
    offerScope: "Dostęp do platformy z treningami online i biblioteką materiałów wideo.",
    includes: [
      "Dostęp do platformy partnera przez 12 miesięcy",
      "Biblioteka treningów wideo i planów treningowych",
      "Materiały do ćwiczeń w domu",
      "Instrukcja aktywacji kodu po zakupie w aplikacji",
    ],
    rules: [
      "Po zakupie otrzymujesz unikalny kod aktywacyjny",
      "Kod jest dostępny w aplikacji mUnilink oraz na e-mail",
      "Kod należy wykorzystać na stronie partnera",
      "Oferta nie łączy się z innymi promocjami partnera",
      "Kod przeznaczony jest do jednorazowej aktywacji konta",
    ],
    howToUse: [...STANDARD_HOW_TO],
    importantInfo: [
      "Realizacja usługi odbywa się na stronie partnera BeActiveTV.",
      "Kod ważny przez 90 dni od daty zakupu.",
      "W razie pytań skontaktuj się z partnerem przez formularz na beactivetv.pl.",
    ],
    validity: "Kod ważny 90 dni od zakupu.",
    visual: "fitness",
  },
  {
    id: "bediet",
    name: "BeDiet",
    partner: "BeDiet",
    type: "Diety online",
    price: 59,
    description:
      "Indywidualne plany dietetyczne, przepisy i wsparcie online — wszystko w jednym miejscu.",
    listDescription: "Indywidualne plany dietetyczne i wsparcie online.",
    imageUrl:
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=900&auto=format&fit=crop&q=80",
    offerScope: "Dostęp do planów dietetycznych i materiałów żywieniowych online.",
    includes: [
      "Spersonalizowany plan żywieniowy",
      "Listy zakupów i przepisy",
      "Materiały edukacyjne w aplikacji partnera",
      "Instrukcja aktywacji kodu po zakupie",
    ],
    rules: [
      "Po zakupie otrzymujesz kod aktywacyjny",
      "Kod dostępny w aplikacji i na wskazany e-mail",
      "Aktywacja na stronie bediet.pl",
      "Oferta nie łączy się z innymi rabatami partnera",
      "Jednorazowa aktywacja na jedno konto użytkownika",
    ],
    howToUse: [...STANDARD_HOW_TO],
    importantInfo: [
      "Realizacja odbywa się na stronie partnera BeDiet.",
      "Kod ważny 60 dni od zakupu.",
      "Po aktywacji uzupełnij ankietę — plan pojawi się w profilu.",
    ],
    validity: "Kod ważny 60 dni od zakupu.",
    visual: "diet",
  },
  {
    id: "pakiet-rowerzysty",
    name: "Pakiet Rowerzysty",
    partner: "Sklep rowerowy partnera",
    type: "Akcesoria rowerowe",
    price: 39,
    description: "Zniżka na akcesoria rowerowe u partnera — kaski, oświetlenie, odzież.",
    listDescription: "Rabat na wybrane akcesoria rowerowe u partnera.",
    imageUrl:
      "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=900&auto=format&fit=crop&q=80",
    offerScope: "Zniżka na wybrane kategorie akcesoriów rowerowych w sklepie partnera.",
    includes: [
      "Jednorazowy kod rabatowy",
      "Zniżka na wskazane kategorie produktów",
      "Możliwość zakupu online u partnera",
      "Instrukcja użycia kodu w koszyku",
    ],
    rules: [
      "Kod rabatowy ważny 60 dni od zakupu",
      "Jednorazowe użycie przy płatności",
      "Nie łączy się z innymi promocjami sklepu",
      "Dotyczy wybranych kategorii akcesoriów",
    ],
    howToUse: [...STANDARD_HOW_TO],
    importantInfo: [
      "Realizacja w sklepie internetowym partnera.",
      "Kod wpisz w polu „kod rabatowy” przy zamówieniu.",
    ],
    validity: "Kod ważny 60 dni od zakupu.",
    visual: "bike",
  },
  {
    id: "zdrowie-plus",
    name: "Zdrowie Plus",
    partner: "Zdrowie Plus",
    type: "Profilaktyka i konsultacje",
    price: 69,
    description: "Pakiet profilaktyczny z konsultacją online i materiałami edukacyjnymi.",
    listDescription: "Profilaktyka, konsultacja online i materiały o zdrowiu.",
    imageUrl:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=900&auto=format&fit=crop&q=80",
    offerScope: "Konsultacja profilaktyczna online i zestaw rekomendacji zdrowotnych.",
    includes: [
      "Konsultacja online ze specjalistą",
      "Zestaw rekomendacji profilaktycznych",
      "Materiały edukacyjne u partnera",
      "Instrukcja aktywacji po zakupie",
    ],
    rules: [
      "Kod aktywuje dostęp do panelu partnera",
      "Jednorazowa aktywacja konta",
      "Nie łączy się z innymi ofertami partnera",
      "Kod dostępny w aplikacji po opłaceniu",
    ],
    howToUse: [...STANDARD_HOW_TO],
    importantInfo: [
      "Realizacja na stronie partnera Zdrowie Plus.",
      "Kod ważny 45 dni od zakupu.",
      "Usługa nie zastępuje wizyty u lekarza w nagłych przypadkach.",
    ],
    validity: "Kod ważny 45 dni od zakupu.",
    visual: "wellness",
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

const benefitCodes: Record<string, string> = {
  beactive: "BEACTIVE-2026-X7K9",
  bediet: "BEDIET-2026-P5M2",
  "pakiet-rowerzysty": "ROWER-2026-Z3A8",
  "zdrowie-plus": "ZDRPLUS-2026-H5Q0",
};

const benefitPartnerUrls: Record<string, string> = {
  beactive: "https://beactivetv.pl/",
  bediet: "https://bediet.pl/",
};

export function getBenefitCode(id: string | undefined) {
  if (!id) return "MUNILINK-BENEFIT";
  return benefitCodes[id] ?? "MUNILINK-BENEFIT";
}

export function getBenefitPartnerUrl(id: string | undefined) {
  if (!id) return "#";
  return benefitPartnerUrls[id] ?? "#";
}
