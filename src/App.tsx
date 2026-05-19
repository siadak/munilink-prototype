import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { MoreSheetProvider } from "./context/MoreSheetContext";
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
import { SendDocumentPage } from "./pages/SendDocumentPage";
import { ChangeAgentPage } from "./pages/ChangeAgentPage";
import { LifeSurveyPage } from "./pages/LifeSurveyPage";
import { AiAssistantPage } from "./pages/AiAssistantPage";
import { HelpPage } from "./pages/HelpPage";
import { MorePage } from "./pages/MorePage";

export default function App() {
  return (
    <BrowserRouter>
      <MoreSheetProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/policies" element={<PoliciesPage />} />
        <Route path="/policies-empty" element={<PoliciesEmptyPage />} />
        <Route path="/fetch-policies" element={<FetchPoliciesPage />} />
        <Route path="/policy/:id" element={<PolicyDetailsPage />} />
        <Route path="/buy" element={<BuyPage />} />
        <Route path="/cashback" element={<CashbackPage />} />
        <Route path="/benefits" element={<BenefitsPage />} />
        <Route path="/benefit/:id" element={<BenefitDetailPage />} />
        <Route path="/benefit-checkout/:id" element={<BenefitCheckoutPage />} />
        <Route path="/add-external-policy" element={<AddExternalPolicyPage />} />
        <Route path="/agent" element={<AgentPage />} />
        <Route path="/send-document" element={<SendDocumentPage />} />
        <Route path="/change-agent" element={<ChangeAgentPage />} />
        <Route path="/life-survey" element={<LifeSurveyPage />} />
        <Route path="/ai-assistant" element={<AiAssistantPage />} />
        <Route path="/help" element={<HelpPage />} />
        <Route path="/more" element={<MorePage />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
      </MoreSheetProvider>
    </BrowserRouter>
  );
}
