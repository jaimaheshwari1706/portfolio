import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { profile } from "@/data/profile";
import { fadeUp, viewportOnce } from "@/lib/motion";

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-20 py-24 md:py-36 border-t border-ink/10 relative overflow-hidden">
      <div className="absolute inset-0 bp-grid opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
      <div className="relative mx-auto max-w-[1400px] px-6 md:px-10">
        <SectionHeader code="06" title="Contact" />

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          <p className="font-display text-4xl sm:text-5xl md:text-6xl text-ink max-w-3xl text-balance leading-[1.05]">
            Open to full-stack and AI-adjacent engineering roles.
          </p>
          <p className="mt-6 text-ink-soft max-w-xl text-[15px] leading-relaxed">
            The fastest way to reach me is email. I'm generally responsive within a
            couple of days.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href={profile.links.email}
              className="group inline-flex items-center gap-2 bg-ink text-paper font-mono text-xs uppercase tracking-[0.14em] px-6 py-3.5 hover:bg-signal transition-colors duration-300"
            >
              Say hello
              <ArrowUpRight
                size={15}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
            <a
              href={profile.links.github}
              className="font-mono text-xs uppercase tracking-[0.14em] border-b border-ink/30 pb-1 text-ink hover:border-signal hover:text-signal-dim transition-colors"
            >
              GitHub ↗
            </a>
            <a
              href={profile.links.linkedin}
              className="font-mono text-xs uppercase tracking-[0.14em] border-b border-ink/30 pb-1 text-ink hover:border-signal hover:text-signal-dim transition-colors"
            >
              LinkedIn ↗
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
