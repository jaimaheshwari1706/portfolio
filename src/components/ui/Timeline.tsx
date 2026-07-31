import { motion } from "framer-motion";
import type { JourneyStage } from "@/data/journey";
import { TechnicalLabel } from "./TechnicalLabel";
import { fadeUp, viewportOnce } from "@/lib/motion";

export function Timeline({ stages }: { stages: JourneyStage[] }) {
  return (
    <div className="relative">
      {/* spine */}
      <div className="absolute left-[19px] md:left-[27px] top-2 bottom-2 w-px bg-ink/15" aria-hidden="true" />

      <div className="space-y-14 md:space-y-20">
        {stages.map((stage, i) => (
          <motion.div
            key={stage.code}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="relative pl-14 md:pl-20"
          >
            {/* node */}
            <div className="absolute left-0 top-0 flex h-10 w-10 md:h-14 md:w-14 items-center justify-center rounded-full border border-ink/20 bg-paper">
              <span className="font-mono text-xs md:text-sm text-signal-dim">{stage.code}</span>
            </div>

            <TechnicalLabel className="text-blueprint">{stage.stage}</TechnicalLabel>
            <h3 className="mt-2 font-display text-2xl md:text-3xl text-ink text-balance">
              {stage.title}
            </h3>
            <p className="mt-3 max-w-2xl text-ink-soft text-[15px] leading-relaxed">
              {stage.body}
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {stage.markers.map((m) => (
                <span
                  key={m}
                  className="font-mono text-[10px] uppercase tracking-[0.1em] text-ink-soft border border-ink/15 px-2.5 py-1"
                >
                  {m}
                </span>
              ))}
            </div>

            {i < stages.length - 1 && (
              <div className="mt-10 md:hidden h-px w-full bg-ink/10" />
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
