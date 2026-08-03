import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TechnicalLabel } from "@/components/ui/TechnicalLabel";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

type Evidence = {
  category: string;
  claim: string;
  source: string;
};

const evidence: Evidence[] = [
  {
    category: "Automated testing",
    claim: "363 tests across three independent projects — 74 + 183 + 106, each suite runs and passes on its own.",
    source: "HRMS, Job Copilot, Analytics",
  },
  {
    category: "Access control",
    claim: "Server-enforced RBAC in every project — authorization checked in middleware, never just hidden in the UI.",
    source: "HRMS, Analytics",
  },
  {
    category: "Async processing",
    claim: "BullMQ background pipelines handle resume parsing, job ingestion, and matching independently of the HTTP layer.",
    source: "Job Copilot",
  },
  {
    category: "Reporting",
    claim: "CSV, Excel, and PDF export, generated server-side against real data rather than client-formatted tables.",
    source: "HRMS, Analytics",
  },
  {
    category: "Realtime systems",
    claim: "Socket.io notification delivery for order and activity events, without a manual refresh.",
    source: "Analytics",
  },
  {
    category: "Production integrations",
    claim: "Payment gateway integration for overtime payroll, shipped and running at a live employer, not a sandbox.",
    source: "Ubitech (production)",
  },
];

export function EngineeringProof() {
  return (
    <section className="py-20 md:py-24 border-t border-ink/10 bg-paper-dark/30">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <SectionHeader
          code="02"
          title="Engineering Proof"
          description="What evidence is there that this person actually builds systems? A compact answer, sourced to specific projects."
        />

        <motion.div
          variants={staggerContainer(0.06)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-ink/10 border border-ink/10"
        >
          {evidence.map((e) => (
            <motion.div key={e.category} variants={fadeUp} className="bg-paper p-5 md:p-6">
              <TechnicalLabel className="text-signal-dim">{e.category}</TechnicalLabel>
              <p className="mt-2 text-[13.5px] text-ink-soft leading-relaxed">{e.claim}</p>
              <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-faint">
                {e.source}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
