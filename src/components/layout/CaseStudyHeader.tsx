import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { TechnicalLabel } from "@/components/ui/TechnicalLabel";
import { Metric } from "@/components/ui/Metric";
import { staggerContainer, fadeUp } from "@/lib/motion";

type Props = {
  number: string;
  name: string;
  projectType: string;
  tagline: string;
  stack: string[];
  proof: { label: string; value: string; context?: string }[];
};

export function CaseStudyHeader({ number, name, projectType, tagline, stack, proof }: Props) {
  return (
    <section className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-20 border-b border-ink/10">
      <div className="absolute inset-0 bp-grid [mask-image:linear-gradient(to_bottom,black,transparent_75%)]" />
      <div className="relative mx-auto max-w-[1400px] px-6 md:px-10">
        <motion.div variants={staggerContainer(0.1)} initial="hidden" animate="show">
          <motion.div variants={fadeUp}>
            <Link
              to="/#work"
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-ink-soft hover:text-signal-dim transition-colors mb-10"
            >
              <ArrowLeft size={14} />
              Selected Work
            </Link>
          </motion.div>

          <motion.div variants={fadeUp} className="flex items-center gap-3 mb-3">
            <span className="font-mono text-sm text-signal-dim">{number} / CASE STUDY</span>
            <span className="h-px w-6 bg-ink-faint/40" aria-hidden="true" />
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-blueprint border border-blueprint/30 px-2 py-0.5">
              {projectType}
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="font-display font-medium text-ink text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.03] max-w-4xl text-balance"
          >
            {name}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-6 text-ink-soft text-base md:text-lg max-w-2xl leading-relaxed"
          >
            {tagline}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-2">
            {stack.map((tech) => (
              <span
                key={tech}
                className="font-mono text-[10px] uppercase tracking-[0.1em] text-ink-soft border border-ink/15 px-2.5 py-1"
              >
                {tech}
              </span>
            ))}
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="mt-12 grid grid-cols-2 sm:grid-cols-3 gap-8 border-t border-ink/10 pt-8 max-w-2xl"
          >
            {proof.map((p) => (
              <Metric key={p.label} value={p.value} label={p.label} context={p.context} />
            ))}
          </motion.div>
        </motion.div>
      </div>
      <TechnicalLabel className="sr-only">{name} case study</TechnicalLabel>
    </section>
  );
}
