import fs from "fs";
import path from "path";

function patch(file, fn) {
  const c = fs.readFileSync(file, "utf8");
  fs.writeFileSync(file, fn(c), "utf8");
}

patch("src/premiumConcept/components/PremiumBottomNav.tsx", (c) =>
  c.replace("export function BottomNav", "export function PremiumBottomNav"),
);

const pages = {
  PremiumMenuPage: "MenuPage",
  PremiumBuyPage: "BuyPage",
  PremiumBenefitsPage: "BenefitsPage",
  PremiumLifeSurveyPage: "LifeSurveyPage",
  PremiumAiAssistantPage: "AiAssistantPage",
  PremiumPoliciesPage: "PoliciesPage",
  PremiumAgentPage: "AgentPage",
};

for (const [exportName, oldName] of Object.entries(pages)) {
  const p = `src/premiumConcept/pages/${exportName}.tsx`;
  patch(p, (c) => {
    let out = c.replaceAll('from "../components/AppShell"', 'from "../components/PremiumAppShell"');
    out = out.replaceAll('import { AppShell } from "../components/PremiumAppShell"', 'import { PremiumAppShell } from "../components/PremiumAppShell"');
    out = out.replaceAll("<AppShell", "<PremiumAppShell");
    out = out.replaceAll("</AppShell>", "</PremiumAppShell>");
    out = out.replace(`export function ${oldName}`, `export function ${exportName}`);
    out = out.replaceAll('from "../data/', 'from "../../data/');
    out = out.replaceAll('from "../context/', 'from "../../context/');
    out = out.replaceAll('from "../components/Button"', 'from "../../components/Button"');
    out = out.replaceAll('from "../components/Modal"', 'from "../../components/Modal"');
    out = out.replaceAll('from "../components/Input"', 'from "../../components/Input"');
    out = out.replaceAll('from "../components/Checkbox"', 'from "../../components/Checkbox"');
    out = out.replaceAll('from "../components/SuccessModal"', 'from "../../components/SuccessModal"');
    out = out.replaceAll('from "../components/Card"', 'from "../../components/Card"');
    return out;
  });
}

for (const name of [
  "InfoBanner",
  "Badge",
  "BenefitCard",
  "StepProgress",
  "ChatBubble",
  "ProductCategoryCard",
  "AnimatedPage",
  "AgentCard",
  "PolicyCard",
]) {
  const p = `src/premiumConcept/components/${name}.tsx`;
  patch(p, (c) => {
    let out = c.replaceAll('from "../data/', 'from "../../data/');
    out = out.replaceAll('from "../components/', 'from "../../components/');
    out = out.replaceAll('from "./Button"', 'from "../../components/Button"');
    if (["BenefitCard", "AgentCard", "PolicyCard"].includes(name)) {
      out = out.replaceAll('from "../../components/Badge"', 'from "./Badge"');
    }
    return out;
  });
}

const mojibake = /┼|├│|─ç|─Ö|ÔÇ|┼é|┼Ť|┼╝|dzia┼|mo┼╝|szczeg├|dost─Ö/;
const bad = [];

function scan(dir) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const fp = path.join(dir, ent.name);
    if (ent.isDirectory()) scan(fp);
    else if (ent.name.endsWith(".tsx")) {
      const c = fs.readFileSync(fp, "utf8");
      if (mojibake.test(c)) bad.push(fp);
    }
  }
}

scan("src/premiumConcept");
console.log(bad.length ? `Mojibake in: ${bad.join(", ")}` : "No mojibake found");
console.log("Imports patched.");
