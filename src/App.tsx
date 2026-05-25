import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { MoreSheetProvider } from "./context/MoreSheetContext";
import { VariantPage } from "./routing/VariantPage";
import { PremiumTheme } from "./premiumConcept/PremiumTheme";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { MenuPage } from "./pages/MenuPage";
import { PoliciesPage } from "./pages/PoliciesPage";
import { PoliciesEmptyPage } from "./pages/PoliciesEmptyPage";
import { FetchPoliciesPage } from "./pages/FetchPoliciesPage";
import { PolicyDetailsPage } from "./pages/PolicyDetailsPage";
import { BuyPage } from "./pages/BuyPage";
import { CashbackPage } from "./pages/CashbackPage";
import { BenefitsPage } from "./pages/BenefitsPage";
import { BenefitDetailPage } from "./pages/BenefitDetailPage";
import { BenefitCheckoutPage } from "./pages/BenefitCheckoutPage";
import { AddExternalPolicyPage } from "./pages/AddExternalPolicyPage";
import { AgentPage } from "./pages/AgentPage";
import { AgentSinglePage } from "./pages/agent/AgentSinglePage";
import { AgentMultiplePage } from "./pages/agent/AgentMultiplePage";
import { AgentMultipleSelectPage } from "./pages/agent/AgentMultipleSelectPage";
import { AgentCodePage } from "./pages/agent/AgentCodePage";
import { SendDocumentPage } from "./pages/SendDocumentPage";
import { ChangeAgentPage } from "./pages/ChangeAgentPage";
import { LifeSurveyPage } from "./pages/LifeSurveyPage";
import { AiAssistantPage } from "./pages/AiAssistantPage";
import { HelpPage } from "./pages/HelpPage";
import { MorePage } from "./pages/MorePage";
import { PremiumMenuPage } from "./premiumConcept/pages/PremiumMenuPage";
import { PremiumBuyPage } from "./premiumConcept/pages/PremiumBuyPage";
import { PremiumBenefitsPage } from "./premiumConcept/pages/PremiumBenefitsPage";
import { PremiumLifeSurveyPage } from "./premiumConcept/pages/PremiumLifeSurveyPage";
import { PremiumAiAssistantPage } from "./premiumConcept/pages/PremiumAiAssistantPage";
import { PremiumPoliciesPage } from "./premiumConcept/pages/PremiumPoliciesPage";
import { PremiumAgentPage } from "./premiumConcept/pages/PremiumAgentPage";

export default function App() {
  return (
    <BrowserRouter>
      <PremiumTheme />
      <MoreSheetProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/menu" element={<VariantPage realistic={MenuPage} premium={PremiumMenuPage} />} />
          <Route path="/policies" element={<VariantPage realistic={PoliciesPage} premium={PremiumPoliciesPage} />} />
          <Route path="/policies-empty" element={<PoliciesEmptyPage />} />
          <Route path="/fetch-policies" element={<FetchPoliciesPage />} />
          <Route path="/policy/:id" element={<PolicyDetailsPage />} />
          <Route path="/buy" element={<VariantPage realistic={BuyPage} premium={PremiumBuyPage} />} />
          <Route path="/cashback" element={<CashbackPage />} />
          <Route path="/benefits" element={<VariantPage realistic={BenefitsPage} premium={PremiumBenefitsPage} />} />
          <Route path="/benefit/:id" element={<BenefitDetailPage />} />
          <Route path="/benefit-checkout/:id" element={<BenefitCheckoutPage />} />
          <Route path="/add-external-policy" element={<AddExternalPolicyPage />} />
          <Route path="/agent" element={<VariantPage realistic={AgentPage} premium={PremiumAgentPage} />} />
          <Route path="/agent/single" element={<AgentSinglePage />} />
          <Route path="/agent/multiple" element={<AgentMultiplePage />} />
          <Route path="/agent/multiple/select" element={<AgentMultipleSelectPage />} />
          <Route path="/agent/code" element={<AgentCodePage />} />
          <Route path="/send-document" element={<SendDocumentPage />} />
          <Route path="/change-agent" element={<ChangeAgentPage />} />
          <Route
            path="/life-survey"
            element={<VariantPage realistic={LifeSurveyPage} premium={PremiumLifeSurveyPage} />}
          />
          <Route
            path="/ai-assistant"
            element={<VariantPage realistic={AiAssistantPage} premium={PremiumAiAssistantPage} />}
          />
          <Route path="/help" element={<HelpPage />} />
          <Route path="/more" element={<MorePage />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </MoreSheetProvider>
    </BrowserRouter>
  );
}
