import { useNavigate } from "react-router-dom";
import { UserRound } from "lucide-react";
import { AppShell } from "../components/AppShell";
import { AnimatedPage } from "../components/AnimatedPage";
import { AgentCard } from "../components/AgentCard";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { Modal } from "../components/Modal";
import { agent } from "../data/mocks";
import { useDemoMode } from "../context/DemoContext";
import { useState } from "react";

export function AgentPage() {
  const navigate = useNavigate();
  const { mode } = useDemoMode();
  const noAgent = mode === "NO_AGENT";
  const [referOpen, setReferOpen] = useState(false);

  return (
    <AppShell>
      <AnimatedPage className="space-y-4">
        <h1 className="text-lg font-bold text-brand-orange">Twój Agent</h1>

        {noAgent ? (
          <Card className="text-center">
            <UserRound className="mx-auto h-10 w-10 text-muted" />
            <p className="mt-3 text-base font-bold text-navy">Nie masz jeszcze przypisanego Agenta</p>
            <p className="mt-2 text-sm text-muted leading-relaxed">
              Możesz korzystać z aplikacji, a w razie potrzeby skontaktować się z Unilink albo wskazać swojego
              Agenta.
            </p>
            <div className="mt-4 flex flex-col gap-2">
              <Button type="button" fullWidth onClick={() => window.open("https://www.unilink.pl", "_blank")}>
                Skontaktuj się z Unilink
              </Button>
              <Button variant="secondary" type="button" fullWidth onClick={() => navigate("/change-agent")}>
                Wskaż swojego Agenta
              </Button>
            </div>
          </Card>
        ) : (
          <>
            <AgentCard agent={agent} />
            <p className="text-sm text-navy leading-relaxed">
              Wybierz Agenta, u którego chcesz kupić kolejną polisę.{" "}
              <button
                type="button"
                className="font-semibold text-brand-orange"
                onClick={() => navigate("/change-agent")}
              >
                Zmień Agenta
              </button>
            </p>
            <Button variant="outline" fullWidth type="button" onClick={() => setReferOpen(true)}>
              Poleć swojego Agenta
            </Button>
            <div className="flex flex-col gap-2 border-t border-line/70 pt-4">
              <Button variant="secondary" fullWidth type="button" onClick={() => navigate("/send-document")}>
                Wyślij dokument
              </Button>
              <Button variant="ghost" fullWidth type="button" onClick={() => navigate("/ai-assistant")}>
                Asystent AI
              </Button>
            </div>
          </>
        )}
      </AnimatedPage>

      <Modal
        open={referOpen}
        title="Poleć Agenta"
        onClose={() => setReferOpen(false)}
        footer={
          <Button fullWidth onClick={() => setReferOpen(false)}>
            Zamknij
          </Button>
        }
      >
        <p className="text-sm text-muted leading-relaxed">
          To prototyp. W pełnej wersji wyślesz zaproszenie lub udostępnisz dane Agenta znajomym.
        </p>
      </Modal>
    </AppShell>
  );
}
