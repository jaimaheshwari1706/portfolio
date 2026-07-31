import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { TechnicalLabel } from "@/components/ui/TechnicalLabel";

export function NotFound() {
  useEffect(() => {
    document.title = "Page not found — Jai Maheshwari";
    let el = document.querySelector<HTMLMetaElement>('meta[name="robots"]');
    if (!el) {
      el = document.createElement("meta");
      el.setAttribute("name", "robots");
      document.head.appendChild(el);
    }
    el.setAttribute("content", "noindex");
    return () => el?.remove();
  }, []);

  return (
    <section className="relative min-h-[80vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 bp-grid [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
      <div className="relative mx-auto max-w-[1400px] px-6 md:px-10 py-32 text-center w-full">
        <TechnicalLabel className="text-signal-dim">404 / SHEET NOT FOUND</TechnicalLabel>
        <h1 className="mt-4 font-display text-5xl md:text-7xl text-ink">Off the grid.</h1>
        <p className="mt-4 text-ink-soft max-w-md mx-auto">
          This coordinate doesn't map to a page on this site.
        </p>
        <Link
          to="/"
          className="mt-10 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] border border-ink px-6 py-3.5 text-ink hover:bg-ink hover:text-paper transition-colors"
        >
          <ArrowLeft size={14} />
          Back home
        </Link>
      </div>
    </section>
  );
}
