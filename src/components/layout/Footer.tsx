import { profile } from "@/data/profile";

export function Footer() {
  return (
    <footer className="border-t border-ink/10 bg-paper-dark/50">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-faint">
            {profile.name} — {profile.roleLabel}
          </span>
        </div>

        <div className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-soft">
          <a href={profile.links.github} className="hover:text-signal-dim transition-colors">
            GitHub
          </a>
          <a href={profile.links.linkedin} className="hover:text-signal-dim transition-colors">
            LinkedIn
          </a>
          <a href={profile.links.email} className="hover:text-signal-dim transition-colors">
            Email
          </a>
        </div>

        <span className="font-mono text-[10px] text-ink-faint">
          Built with React &amp; a technical grid.
        </span>
      </div>
    </footer>
  );
}
