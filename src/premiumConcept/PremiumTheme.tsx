import { useEffect } from "react";
import { useDemoMode } from "../context/DemoContext";

/** Ciemne tło viewportu dla wariantu koncepcyjnego (jak w backupie 5f67e9b). */
export function PremiumTheme() {
  const { appVisualVariant } = useDemoMode();

  useEffect(() => {
    const on = appVisualVariant === "premiumConcept";
    document.body.classList.toggle("premium-concept-root", on);
    return () => document.body.classList.remove("premium-concept-root");
  }, [appVisualVariant]);

  return null;
}
