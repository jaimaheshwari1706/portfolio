import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TechnicalLabel } from "@/components/ui/TechnicalLabel";
import { experience } from "@/data/experience";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

export function Experience() {
  return (
    <section id="experience" className="scroll-mt-20 py-24 md:py-32 border-t border-ink/10">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <SectionHeader
          code="04"
          title="Experience"
          description="Professional engineering work at Ubitech — production constraints, not portfolio constraints."
        />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-6">
          <div className="md:col-span-4">
            <span className="inline-block font-mono text-[10px] uppercase tracking-[0.14em] text-signal-dim border border-signal-dim/30 px-2 py-0.5 mb-4">
              {experience.contextLabel}
            </span>
            <h3 className="font-display text-2xl text-ink">{experience.role}</h3>
            <p className="mt-1 text-ink-soft">{experience.company}</p>
            <div className="mt-4 flex flex-col gap-1.5">
              <TechnicalLabel>{experience.location}</TechnicalLabel>
              <TechnicalLabel>{experience.duration}</TechnicalLabel>
            </div>
            <p className="mt-6 text-[14px] text-ink-soft leading-relaxed max-w-sm">
              {experience.summary}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {experience.stack.map((tech) => (
                <span
                  key={tech}
                  className="font-mono text-[10px] uppercase tracking-[0.1em] text-ink-soft border border-ink/15 px-2.5 py-1"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <motion.div
            variants={staggerContainer(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="md:col-span-8 space-y-8"
          >
            {experience.items.map((item, i) => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                className="border-t border-ink/10 pt-6 grid grid-cols-1 md:grid-cols-[auto_1fr] gap-x-6 gap-y-3"
              >
                <span className="font-mono text-xs text-signal-dim">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h4 className="font-display text-lg text-ink uppercase tracking-tight">
                    {item.title}
                  </h4>
                  <p className="mt-2 text-[14.5px] text-ink leading-relaxed max-w-xl">
                    {item.outcome}
                  </p>
                  <TechnicalLabel className="mt-4 block">Engineering</TechnicalLabel>
                  <ul className="mt-2 space-y-1.5">
                    {item.engineering.map((point) => (
                      <li
                        key={point}
                        className="text-[13.5px] text-ink-soft leading-relaxed pl-4 relative before:absolute before:left-0 before:top-[0.6em] before:h-1 before:w-1 before:bg-blueprint max-w-xl"
                      >
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
