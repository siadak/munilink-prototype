import type { ComponentType } from "react";
import { useDemoMode } from "../context/DemoContext";

export function VariantPage({
  realistic: Realistic,
  premium: Premium,
}: {
  realistic: ComponentType;
  premium: ComponentType;
}) {
  const { appVisualVariant } = useDemoMode();
  const Page = appVisualVariant === "premiumConcept" ? Premium : Realistic;
  return <Page />;
}
