import { useId, useState } from "react";
import { Info } from "lucide-react";

type Props = {
  value: string;
  label: string;
  context?: string;
  className?: string;
};

export function Metric({ value, label, context, className = "" }: Props) {
  const [open, setOpen] = useState(false);
  const contextId = useId();

  return (
    <div className={className}>
      <div className="font-display text-3xl md:text-4xl text-ink leading-none">{value}</div>
      <div className="mt-1.5 flex items-center gap-1.5">
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-faint">
          {label}
        </span>
        {context && (
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls={contextId}
            className="text-ink-faint hover:text-signal-dim focus-visible:text-signal-dim transition-colors"
          >
            <span className="sr-only">{open ? "Hide" : "Show"} context for {label}</span>
            <Info size={12} aria-hidden="true" />
          </button>
        )}
      </div>
      {context && (
        <p
          id={contextId}
          hidden={!open}
          className="mt-1.5 text-[12.5px] text-ink-soft leading-snug max-w-[220px]"
        >
          {context}
        </p>
      )}
    </div>
  );
}
