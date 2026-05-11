import { useState } from "react";
import { motion } from "framer-motion";
import { AppShell } from "../components/AppShell";
import { AnimatedPage } from "../components/AnimatedPage";
import { AgentCard } from "../components/AgentCard";
import { Button } from "../components/Button";
import { Modal } from "../components/Modal";
import { changeAgentCandidates } from "../data/mocks";

const listVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.07 } },
};
const rowVariants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.26, ease: "easeOut" } },
};

export function ChangeAgentPage() {
  const [selected, setSelected] = useState("anna");
  const [open, setOpen] = useState(false);

  return (
    <AppShell showBack>
      <AnimatedPage className="space-y-4">
        <h1 className="text-2xl font-bold text-navy">Zmień Agenta</h1>

        <motion.div variants={listVariants} initial="hidden" animate="show" className="space-y-3">
          {changeAgentCandidates.map((a) => (
            <motion.div key={a.id} variants={rowVariants}>
              <AgentCard
                agent={{ name: a.name, phone: a.phone, email: a.email }}
                showRadio
                selected={selected === a.id}
                onSelect={() => setSelected(a.id)}
                roleBadge={a.isCurrent ? "Obecny" : undefined}
              />
            </motion.div>
          ))}
        </motion.div>
      </AnimatedPage>

      <div className="fixed bottom-[calc(120px+env(safe-area-inset-bottom))] left-1/2 z-[45] w-full max-w-[430px] -translate-x-1/2 px-4">
        <Button fullWidth onClick={() => setOpen(true)}>
          Zapisz wybór
        </Button>
      </div>

      <Modal
        open={open}
        title=""
        onClose={() => setOpen(false)}
        footer={
          <Button fullWidth onClick={() => setOpen(false)}>
            OK
          </Button>
        }
      >
        <p className="text-center font-semibold text-navy">Agent został zmieniony.</p>
      </Modal>
    </AppShell>
  );
}
