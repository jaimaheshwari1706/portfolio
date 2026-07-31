import { motion } from "framer-motion";
import { profile } from "@/data/profile";
import { TechnicalLabel } from "@/components/ui/TechnicalLabel";
import { RegistrationMarks } from "@/components/ui/RegistrationMarks";
import { fadeUp, viewportOnce } from "@/lib/motion";

export function CurrentFocus() {
  return (
    <section className="py-20 md:py-24 border-t border-ink/10">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="relative border border-ink/12 p-8 md:p-12 bp-grid-fine"
        >
          <RegistrationMarks sheet="SHEET 00 / NOW" />
          <div className="flex items-center gap-3 mb-5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-50" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-signal" />
            </span>
            <TechnicalLabel className="text-signal-dim">Currently building</TechnicalLabel>
          </div>
          <p className="font-display text-xl md:text-2xl text-ink max-w-3xl text-balance leading-snug">
            {profile.currentFocus}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
