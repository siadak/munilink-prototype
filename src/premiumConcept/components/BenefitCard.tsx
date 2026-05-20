import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import type { Benefit } from "../../data/mocks";
import { Badge } from "./Badge";
import { Button } from "../../components/Button";

export function BenefitCard({ benefit }: { benefit: Benefit }) {
  const navigate = useNavigate();
  return (
    <motion.div
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.99 }}
      className="rounded-[1.75rem] border border-line/90 bg-card p-5 shadow-card space-y-3"
    >
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <p className="text-lg font-bold text-navy">{benefit.name}</p>
          <p className="text-sm text-muted">{benefit.type}</p>
        </div>
        <Badge tone="orange">Cena {benefit.price} zł</Badge>
      </div>
      <p className="text-sm text-navy/80 leading-relaxed">{benefit.description}</p>
      <Button fullWidth onClick={() => navigate(`/benefit-checkout/${benefit.id}`)}>
        Kup teraz
      </Button>
    </motion.div>
  );
}
