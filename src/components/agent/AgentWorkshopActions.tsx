import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AgentCard } from "../AgentCard";
import { Button } from "../Button";
import { Modal } from "../Modal";
import type { WorkshopAgent } from "../../data/agentScenarios";

export function AgentWorkshopActions({
  agent,
  changeAgentTo,
  changeLabel = "Zmień Agenta",
  singleMode = false,
}: {
  agent: WorkshopAgent;
  changeAgentTo?: string;
  changeLabel?: string;
  /** Scenariusz jednego Agenta — bez tekstu o wyborze/zmianie */
  singleMode?: boolean;
}) {
  const navigate = useNavigate();
  const [referOpen, setReferOpen] = useState(false);

  return (
    <>
      <AgentCard agent={agent} />
      {singleMode ? (
        <p className="text-sm leading-relaxed text-muted">
          W razie potrzeby możesz skontaktować się ze swoim Agentem.
        </p>
      ) : (
        <p className="text-sm leading-relaxed text-navy">
          Wybierz Agenta, u którego chcesz kupić kolejną polisę.{" "}
          {changeAgentTo ? (
            <button
              type="button"
              className="font-semibold text-brand-orange underline-offset-2 hover:underline"
              onClick={() => navigate(changeAgentTo)}
            >
              {changeLabel}
            </button>
          ) : (
            <span className="font-semibold text-navy/70">{changeLabel}</span>
          )}
        </p>
      )}
      <Button variant="outline" fullWidth type="button" onClick={() => setReferOpen(true)}>
        Poleć swojego Agenta
      </Button>

      <Modal
        open={referOpen}
        title="Poleć Agenta"
        onClose={() => setReferOpen(false)}
        footer={
          <Button fullWidth type="button" onClick={() => setReferOpen(false)}>
            Zamknij
          </Button>
        }
      >
        <p className="text-sm text-muted leading-relaxed">
          To prototyp. W pełnej wersji wyślesz zaproszenie lub udostępnisz dane Agenta znajomym.
        </p>
      </Modal>
    </>
  );
}
