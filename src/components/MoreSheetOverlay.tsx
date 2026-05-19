import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDemoMode } from "../context/DemoContext";
import { useMoreSheet } from "../context/MoreSheetContext";
import { MoreBottomSheet } from "./MoreBottomSheet";

/** Overlay + bottom sheet w obrębie ramki telefonu (AppShell). */
export function MoreSheetOverlay() {
  const { navigationVariant } = useDemoMode();
  const { isOpen, close } = useMoreSheet();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const sheetEnabled = navigationVariant === "more-sheet";

  useEffect(() => {
    close();
  }, [pathname, close]);

  useEffect(() => {
    if (!sheetEnabled) close();
  }, [sheetEnabled, close]);

  if (!sheetEnabled) return null;

  return (
    <MoreBottomSheet
      isOpen={isOpen}
      onClose={close}
      onNavigate={(path) => {
        close();
        navigate(path);
      }}
    />
  );
}
