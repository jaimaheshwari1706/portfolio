import type { ReactNode } from "react";

type Props = {
  label: string;
  children: ReactNode;
  tone?: "signal" | "blueprint";
  className?: string;
};

export function Callout({ label, children, tone = "signal", className = "" }: Props) {
  const accent = tone === "signal" ? "border-signal/40 text-signal-dim" : "border-blueprint/40 text-blueprint";
  return (
    <div className={`relative border-l-2 pl-5 py-1 ${accent} ${className}`}>
      <div className="font-mono text-[10px] uppercase tracking-[0.16em] mb-1.5">
        {label}
      </div>
      <div className="text-ink-soft text-[15px] leading-relaxed">{children}</div>
    </div>
  );
}
