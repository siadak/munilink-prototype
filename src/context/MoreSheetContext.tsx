import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type MoreSheetContextValue = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
};

const MoreSheetContext = createContext<MoreSheetContextValue | null>(null);

const noopMoreSheet: MoreSheetContextValue = {
  isOpen: false,
  open: () => {},
  close: () => {},
  toggle: () => {},
};

export function MoreSheetProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((v) => !v), []);

  const value = useMemo(
    () => ({ isOpen, open, close, toggle }),
    [isOpen, open, close, toggle],
  );

  return <MoreSheetContext.Provider value={value}>{children}</MoreSheetContext.Provider>;
}

export function useMoreSheet(): MoreSheetContextValue {
  const ctx = useContext(MoreSheetContext);
  if (!ctx) {
    if (import.meta.env.DEV) {
      console.warn("useMoreSheet: brak MoreSheetProvider — używany bezpieczny fallback");
    }
    return noopMoreSheet;
  }
  return ctx;
}
