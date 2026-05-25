import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { DemoProvider } from "./context/DemoContext";
import { WorkshopAgentProvider } from "./context/WorkshopAgentContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <DemoProvider>
      <WorkshopAgentProvider>
        <App />
      </WorkshopAgentProvider>
    </DemoProvider>
  </StrictMode>,
);
