import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

export function TechnicalLabel({ children, className = "" }: Props) {
  return (
    <span
      className={`font-mono text-[11px] uppercase tracking-[0.18em] text-ink-faint ${className}`}
    >
      {children}
    </span>
  );
}
