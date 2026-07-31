import { motion } from "framer-motion";
import { fadeUp, viewportOnce } from "@/lib/motion";
import { RegistrationMarks } from "./RegistrationMarks";
import { TechnicalLabel } from "./TechnicalLabel";

type Props = {
  /** Path to the image, e.g. /screenshots/hrms-dashboard.png. Omit entirely if unavailable — this component renders nothing rather than a fake placeholder. */
  src?: string;
  alt: string;
  caption?: string;
  /** Short callout pointing at something specific in the shot, e.g. "RBAC-gated action highlighted below". */
  annotation?: string;
  sheet?: string;
};

export function ProjectScreenshot({ src, alt, caption, annotation, sheet }: Props) {
  if (!src) return null;

  return (
    <motion.figure
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      className="relative border border-ink/12 bg-paper-dark/30 p-3 md:p-4"
    >
      <RegistrationMarks sheet={sheet} />
      <img src={src} alt={alt} className="w-full h-auto border border-ink/10" loading="lazy" />
      {(caption || annotation) && (
        <figcaption className="mt-3 space-y-1.5">
          {annotation && (
            <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-signal-dim">
              {annotation}
            </p>
          )}
          {caption && (
            <TechnicalLabel className="block normal-case tracking-normal text-[12.5px] text-ink-soft">
              {caption}
            </TechnicalLabel>
          )}
        </figcaption>
      )}
    </motion.figure>
  );
}
