import { useState } from "react";
import { AppShell } from "../components/AppShell";
import { AnimatedPage } from "../components/AnimatedPage";
import { AgentCard } from "../components/AgentCard";
import { Button } from "../components/Button";
import { Modal } from "../components/Modal";
import { changeAgentCandidates } from "../data/mocks";

export function ChangeAgentPage() {
  const [selected, setSelected] = useState("anna");
  const [open, setOpen] = useState(false);

  return (
    <AppShell showBack>
      <AnimatedPage className="space-y-4">
        <h1 className="text-lg font-bold text-brand-orange">Zmień Agenta</h1>

        <ul className="space-y-3">
          {changeAgentCandidates.map((a) => (
            <li key={a.id}>
              <AgentCard
                agent={{ name: a.name, phone: a.phone, email: a.email }}
                showRadio
                selected={selected === a.id}
                onSelect={() => setSelected(a.id)}
                roleBadge={a.isCurrent ? "Obecny" : undefined}
              />
            </li>
          ))}
        </ul>

        <Button fullWidth type="button" onClick={() => setOpen(true)}>
          Zapisz
        </Button>
      </AnimatedPage>

      <Modal
        open={open}
        title="Zapisano"
        onClose={() => setOpen(false)}
        footer={
          <Button fullWidth type="button" onClick={() => setOpen(false)}>
            OK
          </Button>
        }
      >
        <p className="text-sm text-muted">Wybrany Agent został zapisany w aplikacji.</p>
      </Modal>
    </AppShell>
  );
}
