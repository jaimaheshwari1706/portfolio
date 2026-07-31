import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { TechnicalLabel } from "./TechnicalLabel";

type Props = {
  prev?: { slug: string; name: string };
  next?: { slug: string; name: string };
};

export function CaseStudyNavigation({ prev, next }: Props) {
  return (
    <div className="border-t border-ink/10 py-10">
      <div className="flex items-center justify-between gap-6">
        <div>
          {prev ? (
            <Link
              to={`/work/${prev.slug}`}
              className="group inline-flex items-center gap-2 text-ink hover:text-signal-dim transition-colors"
            >
              <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
              <span>
                <TechnicalLabel className="block">Previous</TechnicalLabel>
                <span className="font-display text-lg">{prev.name}</span>
              </span>
            </Link>
          ) : (
            <Link to="/#work" className="text-ink hover:text-signal-dim transition-colors">
              <TechnicalLabel className="block">Back to</TechnicalLabel>
              <span className="font-display text-lg">Selected Work</span>
            </Link>
          )}
        </div>

        {next && (
          <Link
            to={`/work/${next.slug}`}
            className="group inline-flex items-center gap-2 text-right text-ink hover:text-signal-dim transition-colors"
          >
            <span>
              <TechnicalLabel className="block">Next</TechnicalLabel>
              <span className="font-display text-lg">{next.name}</span>
            </span>
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        )}
      </div>
    </div>
  );
}
