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

const STORAGE_KEY = "munilink-demo-mode";

const VALID: readonly DemoMode[] = [
  "NO_PESEL",
  "BEFORE_FETCH",
  "VERIFIED",
  "NO_AGENT",
  "HISTORICAL",
] as const;

function readInitialMode(): DemoMode {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw && (VALID as readonly string[]).includes(raw)) return raw as DemoMode;
  } catch {
    /* ignore */
  }
  return "VERIFIED";
}

export const DEMO_MODE_META: Record<
  DemoMode,
  { label: string; hint: string }
> = {
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

type DemoContextValue = {
  mode: DemoMode;
  setMode: (mode: DemoMode) => void;
};

const DemoContext = createContext<DemoContextValue | null>(null);

export function DemoProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<DemoMode>(readInitialMode);

  const setMode = useCallback((next: DemoMode) => {
    setModeState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo(() => ({ mode, setMode }), [mode, setMode]);

  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>;
}

export function useDemoMode() {
  const ctx = useContext(DemoContext);
  if (!ctx) {
    throw new Error("useDemoMode musi być użyte wewnątrz DemoProvider");
  }
  return ctx;
}
