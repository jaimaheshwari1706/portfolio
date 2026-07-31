import { motion } from "framer-motion";
import { fadeUp, viewportOnce } from "@/lib/motion";

type Props = {
  code: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeader({ code, title, description, align = "left" }: Props) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      className={`mb-12 md:mb-16 ${align === "center" ? "text-center" : ""}`}
    >
      <div
        className={`flex items-center gap-3 mb-4 ${
          align === "center" ? "justify-center" : ""
        }`}
      >
        <span className="font-mono text-xs text-signal-dim" aria-hidden="true">
          {code}
        </span>
        <span className="h-px w-8 bg-ink-faint/40" aria-hidden="true" />
        <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-faint">
          {title}
        </h2>
      </div>
      {description && (
        <p
          className={`font-display text-2xl md:text-3xl text-ink max-w-2xl text-balance ${
            align === "center" ? "mx-auto" : ""
          }`}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}
