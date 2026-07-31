type Props = {
  sheet?: string;
  className?: string;
};

/**
 * The site's signature motif: corner registration crosses + a sheet index,
 * borrowed from architectural drawing sets. Applied sparingly to section
 * frames, not on every box, so it reads as a system rather than decoration.
 */
export function RegistrationMarks({ sheet, className = "" }: Props) {
  const cross = (position: string) => (
    <svg
      className={`absolute ${position} w-3 h-3 text-ink-faint/50`}
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
    >
      <line x1="6" y1="0" x2="6" y2="12" stroke="currentColor" strokeWidth="1" />
      <line x1="0" y1="6" x2="12" y2="6" stroke="currentColor" strokeWidth="1" />
    </svg>
  );

  return (
    <div className={`pointer-events-none absolute inset-0 ${className}`} aria-hidden="true">
      {cross("-top-1.5 -left-1.5")}
      {cross("-top-1.5 -right-1.5")}
      {cross("-bottom-1.5 -left-1.5")}
      {cross("-bottom-1.5 -right-1.5")}
      {sheet && (
        <span className="absolute bottom-0 right-3 translate-y-full pt-1 font-mono text-[10px] tracking-[0.14em] text-ink-faint/70">
          {sheet}
        </span>
      )}
    </div>
  );
}
