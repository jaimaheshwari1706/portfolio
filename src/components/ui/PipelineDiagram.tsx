import { motion } from "framer-motion";
import { viewportOnce, staggerContainer, fadeUp } from "@/lib/motion";
import { TechnicalLabel } from "./TechnicalLabel";
import { RegistrationMarks } from "./RegistrationMarks";

const stages = [
  { label: "Resume", note: "PDF / DOCX upload" },
  { label: "Parsing", note: "BullMQ background job" },
  { label: "Normalization", note: "skill dictionary + aliases" },
  { label: "Matching", note: "6 deterministic scorers" },
  { label: "AI scoring", note: "Phase 8 — swappable provider" },
  { label: "Recommendations", note: "ranked, cached, threshold-filtered" },
];

export function PipelineDiagram() {
  return (
    <div className="relative border border-ink/12 bg-paper-dark/40 p-6 md:p-10">
      <RegistrationMarks />
      <TechnicalLabel className="text-blueprint">FIG. 01 — Candidate pipeline</TechnicalLabel>

      <motion.div
        variants={staggerContainer(0.08)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="mt-8 flex flex-col md:flex-row md:items-stretch gap-0"
      >
        {stages.map((stage, i) => (
          <motion.div key={stage.label} variants={fadeUp} className="flex md:flex-1 items-stretch min-w-0">
            <div
              className={`flex-1 min-w-0 border p-4 md:p-5 ${
                stage.label === "AI scoring"
                  ? "border-signal/50 border-dashed bg-signal/5"
                  : "border-ink/15 bg-paper"
              }`}
            >
              <span className="font-mono text-[10px] text-ink-faint">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="mt-1 font-display text-sm md:text-base text-ink">{stage.label}</div>
              <div className="mt-1 font-mono text-[10px] text-ink-faint leading-tight break-words">
                {stage.note}
              </div>
            </div>
            {i < stages.length - 1 && (
              <div className="hidden md:flex items-center px-1.5 text-ink-faint shrink-0">→</div>
            )}
          </motion.div>
        ))}
      </motion.div>

      <p className="mt-6 text-[13px] text-ink-faint font-mono leading-relaxed max-w-xl">
        Dashed = designed, not yet built. Everything else in this pipeline runs today, unit-tested,
        with the AI stage architected as a provider interface rather than a hard dependency.
      </p>
    </div>
  );
}
