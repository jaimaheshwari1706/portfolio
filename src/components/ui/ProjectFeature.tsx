import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { Project } from "@/data/projects";
import { Metric } from "./Metric";
import { TechnicalLabel } from "./TechnicalLabel";
import { fadeUp, viewportOnce } from "@/lib/motion";

export function ProjectFeature({ project }: { project: Project }) {
  return (
    <motion.article
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      className="group border-t border-ink/10 py-10 md:py-12"
    >
      {/* Header row: number, name, type badge, CTA */}
      <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
        <div className="flex items-baseline gap-4">
          <span className="font-mono text-sm text-signal-dim">{project.number}</span>
          <div>
            <h3 className="font-display text-2xl md:text-3xl text-ink leading-tight">
              {project.name}
            </h3>
            <span className="mt-1 inline-block font-mono text-[10px] uppercase tracking-[0.14em] text-blueprint border border-blueprint/30 px-2 py-0.5">
              {project.projectType}
            </span>
          </div>
        </div>

        {project.hasCaseStudy && (
          <Link
            to={`/work/${project.slug}`}
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-ink border-b border-signal pb-1 transition-colors hover:text-signal-dim shrink-0"
          >
            Case Study
            <ArrowUpRight
              size={14}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        )}
      </div>

      <p className="text-ink-soft text-[15px] max-w-2xl mb-8">{project.tagline}</p>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
        {/* Problem + key decision */}
        <div className="md:col-span-5 space-y-5">
          <div>
            <TechnicalLabel className="text-signal-dim">Problem</TechnicalLabel>
            <p className="mt-1.5 text-[14px] text-ink-soft leading-relaxed">{project.problem}</p>
          </div>
          <div className="border-l-2 border-signal/40 pl-4">
            <TechnicalLabel className="text-signal-dim">Key Engineering Decision</TechnicalLabel>
            <p className="mt-1.5 text-[14px] text-ink leading-relaxed">{project.keyDecision}</p>
          </div>
        </div>

        {/* Architecture snapshot */}
        <div className="md:col-span-3">
          <TechnicalLabel className="text-blueprint">Architecture Snapshot</TechnicalLabel>
          <ul className="mt-2 space-y-1.5">
            {project.architectureSnapshot.map((layer) => (
              <li
                key={layer}
                className="font-mono text-[12px] text-ink-soft leading-snug pl-3 relative before:absolute before:left-0 before:top-[0.5em] before:h-1 before:w-1 before:bg-blueprint"
              >
                {layer}
              </li>
            ))}
          </ul>
        </div>

        {/* Proof metrics */}
        <div className="md:col-span-4">
          <TechnicalLabel className="text-signal-dim">Proof</TechnicalLabel>
          <div className="mt-3 grid grid-cols-3 md:grid-cols-1 gap-5 md:gap-4">
            {project.proof.map((p) => (
              <Metric key={p.label} value={p.value} label={p.label} context={p.context} />
            ))}
          </div>
        </div>
      </div>
    </motion.article>
  );
}
