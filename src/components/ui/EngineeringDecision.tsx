import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { fadeUp, viewportOnce } from "@/lib/motion";
import { TechnicalLabel } from "./TechnicalLabel";

type Props = {
  id: number;
  title: string;
  children: ReactNode;
};

export function EngineeringDecision({ id, title, children }: Props) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      className="border border-ink/12 p-6 bg-paper-dark/60 hover:border-signal/40 transition-colors duration-300"
    >
      <TechnicalLabel className="text-signal-dim">
        DECISION / {String(id).padStart(3, "0")}
      </TechnicalLabel>
      <h3 className="mt-2 font-display text-lg text-ink">{title}</h3>
      <p className="mt-2.5 text-[14px] text-ink-soft leading-relaxed">{children}</p>
    </motion.div>
  );
}
