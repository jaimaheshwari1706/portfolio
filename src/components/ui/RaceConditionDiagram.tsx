import { motion } from "framer-motion";
import { viewportOnce } from "@/lib/motion";
import { TechnicalLabel } from "./TechnicalLabel";
import { RegistrationMarks } from "./RegistrationMarks";

const lineDraw = {
  hidden: { pathLength: 0, opacity: 0 },
  show: (i: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: { duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  show: (i: number) => ({
    opacity: 1,
    transition: { duration: 0.4, delay: i * 0.12 },
  }),
};

export function RaceConditionDiagram({ variant }: { variant: "broken" | "fixed" }) {
  const isFixed = variant === "fixed";
  const accent = isFixed ? "var(--color-blueprint)" : "var(--color-signal)";
  const accentClass = isFixed ? "text-blueprint" : "text-signal-dim";
  const fillAccentClass = isFixed ? "fill-blueprint" : "fill-signal-dim";

  return (
    <div className="relative border border-ink/12 bg-paper-dark/40 p-6 md:p-10">
      <RegistrationMarks />
      <TechnicalLabel className={accentClass}>
        {isFixed ? "FIG. 02 — Atomic rotation (fixed)" : "FIG. 01 — Race condition (as shipped)"}
      </TechnicalLabel>

      <motion.svg
        viewBox="0 0 640 340"
        className="w-full h-auto mt-6"
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
      >
        {/* Origin: React StrictMode double-invoke */}
        <rect
          x="230" y="10" width="180" height="34"
          fill={isFixed ? "none" : "var(--color-signal)"}
          fillOpacity={isFixed ? 0 : 0.08}
          stroke={isFixed ? "var(--color-ink-faint)" : "var(--color-signal)"}
          strokeWidth="1.5"
          strokeDasharray={isFixed ? "3 3" : "0"}
        />
        <text x="320" y="31" textAnchor="middle" className={`font-mono ${isFixed ? "fill-ink-faint" : "fill-signal-dim"}`} fontSize="11">
          React StrictMode double-invoke
        </text>

        {/* Branch lines from StrictMode to Request A / B */}
        <motion.path
          custom={0}
          variants={lineDraw}
          d="M280,44 L60,72" stroke="var(--color-ink-soft)" strokeWidth="1.5" fill="none"
        />
        <motion.path
          custom={0.15}
          variants={lineDraw}
          d="M360,44 L60,100" stroke="var(--color-ink-soft)" strokeWidth="1.5" fill="none"
        />

        {/* Request A */}
        <motion.line
          custom={0.3} variants={lineDraw}
          x1="60" y1="72" x2="300" y2="72"
          stroke="var(--color-ink-soft)" strokeWidth="1.5"
        />
        <text x="60" y="64" className="fill-ink-soft font-mono" fontSize="10">
          REQUEST A — POST /auth/refresh-token
        </text>
        <circle cx="300" cy="72" r="4" fill="var(--color-ink-soft)" />

        {/* Request B */}
        <motion.line
          custom={0.45} variants={lineDraw}
          x1="60" y1="100" x2="300" y2="100"
          stroke="var(--color-ink-soft)" strokeWidth="1.5"
        />
        <text x="60" y="118" className="fill-ink-soft font-mono" fontSize="10">
          REQUEST B — POST /auth/refresh-token
        </text>
        <circle cx="300" cy="100" r="4" fill="var(--color-ink-soft)" />

        <text x="60" y="132" className="fill-ink-faint font-mono" fontSize="9">
          same refresh-token cookie, same instant
        </text>

        {/* convergence to rotation box */}
        <motion.path
          custom={0.6} variants={lineDraw}
          d="M300,72 L360,86 M300,100 L360,86"
          stroke="var(--color-ink-soft)" strokeWidth="1.5" fill="none"
        />

        {/* rotation box — the core mechanism, explicitly labeled */}
        <rect
          x="360" y="56" width="180" height="60"
          fill={accent} fillOpacity="0.08" stroke={accent} strokeWidth="1.5"
        />
        <text x="450" y="78" textAnchor="middle" className="fill-ink font-mono" fontSize="11">
          {isFixed ? "findOneAndUpdate (atomic)" : "findOne() → mutate → save()"}
        </text>
        <text x="450" y="94" textAnchor="middle" className={`font-mono ${fillAccentClass}`} fontSize="10">
          {isFixed ? "jti nonce: unique per token" : "no jti — tokens collide"}
        </text>
        <text x="450" y="108" textAnchor="middle" className="fill-ink-faint font-mono" fontSize="9">
          {isFixed ? "check-and-set in one DB op" : "check-then-act — not atomic"}
        </text>

        {/* outcome arrow */}
        <motion.line
          custom={0.9} variants={lineDraw}
          x1="540" y1="86" x2="600" y2="86"
          stroke={accent} strokeWidth="1.5"
        />

        {isFixed ? (
          <>
            <text x="605" y="80" className="fill-blueprint font-mono" fontSize="10">200</text>
            <text x="605" y="94" className="fill-ink-faint font-mono" fontSize="10">401</text>
          </>
        ) : (
          <>
            <text x="605" y="80" className="fill-signal-dim font-mono" fontSize="10">409</text>
            <text x="605" y="94" className="fill-signal-dim font-mono" fontSize="10">401</text>
          </>
        )}

        {/* divider */}
        <line x1="20" y1="160" x2="620" y2="160" stroke="var(--color-ink)" strokeOpacity="0.08" strokeWidth="1" />

        <text x="20" y="185" className="fill-ink-faint font-mono" fontSize="10">
          CLIENT — Redux bootstrapAuth
        </text>

        <motion.rect
          custom={1.05} variants={lineDraw}
          x="20" y="200" width="220" height="34"
          fill="none"
          stroke={isFixed ? "var(--color-blueprint)" : "var(--color-ink-soft)"}
          strokeWidth="1.5"
          strokeDasharray={isFixed ? "0" : "3 3"}
        />
        <text x="130" y="221" textAnchor="middle" className="fill-ink font-mono" fontSize="10">
          {isFixed ? "RTK condition guard: idle only" : "no guard — second dispatch races"}
        </text>

        <motion.path
          custom={1.2} variants={lineDraw}
          d="M240,217 L300,217"
          stroke={accent} strokeWidth="1.5" markerEnd="url(#arrow)"
        />

        <rect
          x="310" y="200" width="200" height="34"
          fill={accent} fillOpacity="0.08" stroke={accent} strokeWidth="1.5"
        />
        <text x="410" y="221" textAnchor="middle" className="fill-ink font-mono" fontSize="10">
          {isFixed ? "authenticated (stable)" : "settle order wins — logout"}
        </text>

        {/* Fix summary strip — only on the fixed variant */}
        {isFixed && (
          <motion.g custom={1.4} variants={fadeIn}>
            <rect x="20" y="256" width="600" height="1" fill="var(--color-ink)" fillOpacity="0.08" />
            <text x="20" y="280" className="fill-blueprint font-mono" fontSize="10">
              1. Atomic findOneAndUpdate
            </text>
            <text x="230" y="280" className="fill-blueprint font-mono" fontSize="10">
              2. Unique jti nonce
            </text>
            <text x="410" y="280" className="fill-blueprint font-mono" fontSize="10">
              3. RTK condition guard
            </text>
          </motion.g>
        )}

        <defs>
          <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill={accent} />
          </marker>
        </defs>
      </motion.svg>

      <p className="mt-4 text-[13px] text-ink-faint font-mono leading-relaxed max-w-xl">
        {isFixed
          ? "A jti nonce + atomic findOneAndUpdate mean only one request can ever win the rotation — the loser gets a clean 401, not a crash. The RTK guard closes the trigger itself."
          : "React StrictMode's double-invoke fires two refresh requests on the same cookie. Both read the token as unrevoked before either write lands — one throws a duplicate-key error, the other reads it as invalid. Redux applies whichever settles last."}
      </p>
    </div>
  );
}
