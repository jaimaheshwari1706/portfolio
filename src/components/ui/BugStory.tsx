import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { fadeUp, viewportOnce } from "@/lib/motion";
import { TechnicalLabel } from "./TechnicalLabel";

type Block = {
  label: string;
  content: ReactNode;
};

export function BugStory({ id, title, blocks }: { id: string; title: string; blocks: Block[] }) {
  return (
    <div className="space-y-10">
      <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewportOnce}>
        <TechnicalLabel className="text-signal-dim">{id}</TechnicalLabel>
        <h3 className="mt-2 font-display text-2xl md:text-3xl text-ink">{title}</h3>
      </motion.div>

      {blocks.map((block) => (
        <motion.div
          key={block.label}
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="grid grid-cols-1 md:grid-cols-[160px_1fr] gap-3 md:gap-8 border-t border-ink/10 pt-6"
        >
          <TechnicalLabel className="pt-1">{block.label}</TechnicalLabel>
          <div className="text-ink-soft text-[15px] leading-relaxed max-w-2xl">
            {block.content}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
