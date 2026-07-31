import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { skillGroups } from "@/data/skills";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

export function Capabilities() {
  return (
    <section id="capabilities" className="scroll-mt-20 py-24 md:py-32 border-t border-ink/10 bg-paper-dark/40">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <SectionHeader
          code="05"
          title="Capabilities"
          description="Organized as a capability matrix, not a skill cloud — what each group is actually for."
        />

        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-ink/10 border border-ink/10"
        >
          {skillGroups.map((group) => (
            <motion.div key={group.code} variants={fadeUp} className="bg-paper p-6 md:p-7">
              <span className="font-mono text-xs text-signal-dim">{group.code}</span>
              <h3 className="mt-2 font-display text-lg text-ink leading-tight">
                {group.label}
              </h3>
              <ul className="mt-5 space-y-2.5">
                {group.items.map((item) => (
                  <li key={item} className="text-[13.5px] text-ink-soft flex items-center gap-2">
                    <span className="h-1 w-1 bg-signal shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
