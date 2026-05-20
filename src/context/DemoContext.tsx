import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type DemoMode =
  | "NO_PESEL"
  | "BEFORE_FETCH"
  | "VERIFIED"
  | "NO_AGENT"
  | "HISTORICAL";

export type NavigationVariant = "more-screen" | "more-sheet";

export type AppVisualVariant = "realistic" | "premiumConcept";

const MODE_STORAGE_KEY = "munilink-demo-mode";
const NAV_STORAGE_KEY = "munilink-navigation-variant";
const VISUAL_STORAGE_KEY = "munilink-app-visual-variant";

const VALID_MODES: readonly DemoMode[] = [
  "NO_PESEL",
  "BEFORE_FETCH",
  "VERIFIED",
  "NO_AGENT",
  "HISTORICAL",
] as const;

const VALID_NAV: readonly NavigationVariant[] = ["more-screen", "more-sheet"] as const;

const VALID_VISUAL: readonly AppVisualVariant[] = ["realistic", "premiumConcept"] as const;

function readInitialMode(): DemoMode {
  try {
    const raw = localStorage.getItem(MODE_STORAGE_KEY);
    if (raw && (VALID_MODES as readonly string[]).includes(raw)) return raw as DemoMode;
  } catch {
    /* ignore */
  }
  return "VERIFIED";
}

function readInitialNav(): NavigationVariant {
  try {
    const raw = localStorage.getItem(NAV_STORAGE_KEY);
    if (raw && (VALID_NAV as readonly string[]).includes(raw)) return raw as NavigationVariant;
  } catch {
    /* ignore */
  }
  return "more-screen";
}

function readInitialVisual(): AppVisualVariant {
  try {
    const raw = localStorage.getItem(VISUAL_STORAGE_KEY);
    if (raw && (VALID_VISUAL as readonly string[]).includes(raw)) return raw as AppVisualVariant;
  } catch {
    /* ignore */
  }
  return "realistic";
}

export const DEMO_MODE_META: Record<DemoMode, { label: string; hint: string }> = {
  NO_PESEL: {
    label: "Nowy użytkownik bez PESEL",
    hint: "Konto techniczne, brak polis z UniWersum, pełny dostęp do zakupów i benefitów.",
  },
  BEFORE_FETCH: {
    label: "Klient przed pobraniem polis",
    hint: "Konto z e-mailem i telefonem — czeka na proces „Pobierz swoje polisy”.",
  },
  VERIFIED: {
    label: "Klient po weryfikacji",
    hint: "PESEL + SMS, UniWersum, polisy, Agent, AI i dokumenty.",
  },
  NO_AGENT: {
    label: "Klient bez agenta",
    hint: "Aplikacja działa, brak przypisanego Agenta — dedykowany pusty stan w zakładce Agent.",
  },
  HISTORICAL: {
    label: "Klient historyczny",
    hint: "Ostatnia polisa > 3 lata — pusty stan listy polis z innymi CTA.",
  },
};

export const DEMO_MODE_ORDER: DemoMode[] = [
  "NO_PESEL",
  "BEFORE_FETCH",
  "VERIFIED",
  "NO_AGENT",
  "HISTORICAL",
];

export const NAV_VARIANT_META: Record<NavigationVariant, { label: string; hint: string }> = {
  "more-screen": {
    label: "Więcej jako ekran",
    hint: "Kliknięcie Więcej otwiera osobny ekran z dodatkowymi opcjami.",
  },
  "more-sheet": {
    label: "Więcej jako rozwijane menu",
    hint: "Kliknięcie Więcej otwiera szybkie menu od dołu.",
  },
};

export const NAV_VARIANT_ORDER: NavigationVariant[] = ["more-screen", "more-sheet"];

export const VISUAL_VARIANT_META: Record<AppVisualVariant, { label: string; hint: string }> = {
  realistic: {
    label: "Wersja realistyczna",
    hint: "Obecny wygląd aplikacji mUnilink, zgodny z realnym produktem.",
  },
  premiumConcept: {
    label: "Wersja koncepcyjna / premium",
    hint: "Poprzednia wersja prototypu z bardziej nowoczesnym UI, animacjami i rozbudowaną prezentacją.",
  },
};

export const VISUAL_VARIANT_ORDER: AppVisualVariant[] = ["realistic", "premiumConcept"];

type DemoContextValue = {
  mode: DemoMode;
  setMode: (mode: DemoMode) => void;
  navigationVariant: NavigationVariant;
  setNavigationVariant: (variant: NavigationVariant) => void;
  appVisualVariant: AppVisualVariant;
  setAppVisualVariant: (variant: AppVisualVariant) => void;
};

const DemoContext = createContext<DemoContextValue | null>(null);

export function DemoProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<DemoMode>(readInitialMode);
  const [navigationVariant, setNavigationVariantState] = useState<NavigationVariant>(readInitialNav);
  const [appVisualVariant, setAppVisualVariantState] = useState<AppVisualVariant>(readInitialVisual);

  const setMode = useCallback((next: DemoMode) => {
    setModeState(next);
    setNavigationVariantState("more-screen");
    try {
      localStorage.setItem(MODE_STORAGE_KEY, next);
      localStorage.setItem(NAV_STORAGE_KEY, "more-screen");
    } catch {
      /* ignore */
    }
  }, []);

  const setNavigationVariant = useCallback((next: NavigationVariant) => {
    setNavigationVariantState(next);
    try {
      localStorage.setItem(NAV_STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  }, []);

  const setAppVisualVariant = useCallback((next: AppVisualVariant) => {
    setAppVisualVariantState(next);
    try {
      localStorage.setItem(VISUAL_STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo(
    () => ({
      mode,
      setMode,
      navigationVariant,
      setNavigationVariant,
      appVisualVariant,
      setAppVisualVariant,
    }),
    [mode, setMode, navigationVariant, setNavigationVariant, appVisualVariant, setAppVisualVariant],
  );

  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>;
}

export function useDemoMode() {
  const ctx = useContext(DemoContext);
  if (!ctx) {
    throw new Error("useDemoMode musi być użyte wewnątrz DemoProvider");
  }
  return ctx;
}
