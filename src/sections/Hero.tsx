import { motion } from "framer-motion";
import { ArrowUpRight, MapPin, Target } from "lucide-react";
import { profile } from "@/data/profile";
import { RegistrationMarks } from "@/components/ui/RegistrationMarks";
import { staggerContainer, fadeUp, drawLine } from "@/lib/motion";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
      {/* blueprint grid backdrop */}
      <div className="absolute inset-0 bp-grid [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
      <div className="absolute inset-0 bp-grid-fine opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent_60%)]" />

      <div className="relative mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          {/* Main statement */}
          <motion.div
            variants={staggerContainer(0.1)}
            initial="hidden"
            animate="show"
            className="lg:col-span-7"
          >
            {profile.isAvailableForWork && (
              <motion.div variants={fadeUp} className="flex items-center gap-3 mb-8">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-signal" />
                </span>
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-soft">
                  Available for opportunities
                </span>
              </motion.div>
            )}

            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-5">
              <span className="font-mono text-sm text-signal-dim tracking-[0.1em]">
                {profile.name.toUpperCase()}
              </span>
              <span className="h-px w-8 bg-ink-faint/40" aria-hidden="true" />
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-faint">
                {profile.roleLabel}
              </span>
            </motion.div>

            <h1 className="font-display font-medium text-ink text-[2.5rem] leading-[1.08] sm:text-5xl md:text-6xl lg:text-[3.75rem] lg:leading-[1.08] max-w-xl">
              {profile.heroLines.map((line) => (
                <motion.span key={line} variants={fadeUp} className="block text-balance">
                  {line}
                </motion.span>
              ))}
            </h1>

            <motion.div variants={fadeUp} className="mt-8 flex items-center gap-3 flex-wrap">
              {profile.progression.map((stage, i) => (
                <span key={stage} className="flex items-center gap-3">
                  <span className="font-mono text-xs md:text-sm text-ink-soft">{stage}</span>
                  {i < profile.progression.length - 1 && (
                    <motion.span
                      variants={drawLine}
                      className="h-px w-8 md:w-12 bg-signal origin-left"
                    />
                  )}
                </span>
              ))}
            </motion.div>

            <motion.div variants={fadeUp} className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href="#work"
                className="group inline-flex items-center gap-2 bg-ink text-paper font-mono text-xs uppercase tracking-[0.14em] px-6 py-3.5 hover:bg-signal-dim transition-colors duration-300"
              >
                View Selected Work
                <ArrowUpRight
                  size={15}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
              <a
                href={profile.links.resume}
                className="inline-flex items-center gap-2 border border-ink/25 text-ink font-mono text-xs uppercase tracking-[0.14em] px-6 py-3.5 hover:border-ink transition-colors duration-300"
              >
                Resume
              </a>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="mt-14 flex flex-wrap gap-x-12 gap-y-6 border-t border-ink/10 pt-6"
            >
              <div className="flex items-start gap-2.5">
                <MapPin size={14} className="mt-0.5 text-signal-dim" aria-hidden="true" />
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-faint">
                    Location
                  </div>
                  <div className="mt-1 text-ink text-sm">{profile.location}</div>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Target size={14} className="mt-0.5 text-signal-dim" aria-hidden="true" />
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-faint">
                    Focus
                  </div>
                  <div className="mt-1 text-ink text-sm">{profile.focus}</div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Stack progression panel — distinct composition from the rest of the page */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.5 }}
            className="lg:col-span-5 lg:pt-2"
          >
            <div className="relative border border-ink/12 bg-paper-dark/40 p-6 md:p-8">
              <RegistrationMarks sheet="SHEET 00 / STACK" />
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-faint">
                Stack progression
              </span>

              <div className="mt-6 space-y-0">
                {profile.stackProgression.map((step, i) => (
                  <div key={step.label} className="relative pl-8 pb-7 last:pb-0">
                    {i < profile.stackProgression.length - 1 && (
                      <span
                        className="absolute left-[7px] top-4 bottom-0 w-px bg-ink/15"
                        aria-hidden="true"
                      />
                    )}
                    <span
                      className="absolute left-0 top-1 h-3.5 w-3.5 rounded-full border-2 border-signal bg-paper"
                      aria-hidden="true"
                    />
                    <div className="font-display text-lg text-ink leading-tight">
                      {step.label}
                    </div>
                    <div className="mt-0.5 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-faint">
                      {step.note}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
