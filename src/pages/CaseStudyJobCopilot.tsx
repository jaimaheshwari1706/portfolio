import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { CaseStudyHeader } from "@/components/layout/CaseStudyHeader";
import { CaseStudyNavigation } from "@/components/ui/CaseStudyNavigation";
import { TechnicalLabel } from "@/components/ui/TechnicalLabel";
import { EngineeringDecision } from "@/components/ui/EngineeringDecision";
import { PipelineDiagram } from "@/components/ui/PipelineDiagram";
import { Callout } from "@/components/ui/Callout";
import { Metric } from "@/components/ui/Metric";
import { fadeUp, viewportOnce } from "@/lib/motion";
import { usePageMeta } from "@/lib/usePageMeta";
import { projects } from "@/data/projects";

const project = projects.find((p) => p.slug === "job-copilot")!;

function Prose({ children }: { children: ReactNode }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      className="max-w-2xl text-ink-soft text-[15px] md:text-base leading-relaxed space-y-4"
    >
      {children}
    </motion.div>
  );
}

function Block({ code, title, children }: { code: string; title: string; children: ReactNode }) {
  return (
    <div className="py-16 md:py-20 border-t border-ink/10">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="flex items-center gap-3 mb-8">
          <span className="font-mono text-xs text-signal-dim" aria-hidden="true">
            {code}
          </span>
          <span className="h-px w-8 bg-ink-faint/40" aria-hidden="true" />
          <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-faint">
            {title}
          </h2>
        </div>
        {children}
      </div>
    </div>
  );
}

const scenarios = [
  "Exact skills match",
  "Missing required skill",
  "JavaScript ≠ TypeScript",
  "Under-qualified experience",
  "Over-qualified experience",
  "Remote vs. onsite conflict",
  "Location mismatch",
  "Low-information job post",
  "Sparse candidate profile",
  "Score bounds (0–100)",
];

export function CaseStudyJobCopilot() {
  usePageMeta(
    "Job Copilot",
    "A job-search platform architected around a deterministic, unit-tested matching engine — 183 tests, 17 fixture-based scenarios, and an AI layer designed in as a swappable provider.",
    "/work/job-copilot"
  );

  return (
    <>
      <CaseStudyHeader
        number={project.number}
        name={project.name}
        projectType={project.projectType}
        tagline={project.tagline}
        stack={project.stack}
        proof={project.proof}
      />

      <Block code="00" title="Context">
        <Prose>
          <p>
            Most "AI-powered" job matchers are a single opaque model call wearing a progress bar.
            Job Copilot inverts that: the matching engine is fully deterministic and explainable
            today, and the AI layer is architected as a swappable provider — designed in from the
            start, not bolted on once the deterministic path was already fragile.
          </p>
        </Prose>
      </Block>

      <Block code="01" title="Architecture">
        <Prose>
          <p>
            A true monorepo — <code className="font-mono text-[13px]">apps/web</code>,{" "}
            <code className="font-mono text-[13px]">apps/api</code>, and{" "}
            <code className="font-mono text-[13px]">apps/worker</code> — with a hard dependency
            rule: the worker never imports from the API, and vice versa. Both depend on shared{" "}
            <code className="font-mono text-[13px]">packages/*</code> for schemas, the database
            layer, and typed queue contracts. Background work — resume parsing, job ingestion,
            matching — runs on BullMQ, independent of the HTTP request/response cycle.
          </p>
        </Prose>
        <div className="mt-10">
          <PipelineDiagram />
        </div>
      </Block>

      <Block code="02" title="The matching engine">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          <div>
            <Prose>
              <p>
                Six independently unit-tested scorers — skills, experience, role, preferences,
                projects, education — feed a weighted pipeline. Constraint penalties apply{" "}
                <em>before</em> the weighted average, so a severe mismatch can't be masked by an
                otherwise-strong score: an 8-years-required vs. 1-year-actual gap gets penalized
                directly, not diluted into a passable blended number.
              </p>
              <p>
                Required skills are weighted above preferred ones. A related-but-different skill —
                JavaScript, say — is never treated as satisfying a TypeScript requirement; the
                scorer distinguishes them explicitly rather than fuzzy-matching them together.
              </p>
            </Prose>

            <Callout label="Confidence, not false precision" className="mt-8">
              Projects and education scorers honestly report "no evidence" rather than a fake
              score, since structured resume extraction doesn't exist until the AI phase. Every
              scorer returns inspectable evidence —{" "}
              <code className="font-mono text-[13px]">{"{ type, requirement, status, strength }"}</code>{" "}
              — never an opaque number.
            </Callout>
          </div>

          <div>
            <TechnicalLabel className="text-blueprint">17 fixture-based scenarios</TechnicalLabel>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {scenarios.map((s) => (
                <div
                  key={s}
                  className="font-mono text-[12px] text-ink-soft border border-ink/12 px-3 py-2.5 bg-paper-dark/40"
                >
                  {s}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Block>

      <Block code="03" title="Deterministic-first, AI-ready">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <EngineeringDecision id={1} title="No dependency on an API key to function">
            The matching engine returns real, explainable scores today without calling any AI
            provider. The system works if the AI phase never ships — it isn't a placeholder
            waiting on infrastructure.
          </EngineeringDecision>
          <EngineeringDecision id={2} title="A provider interface, not a vendor lock-in">
            LLMProvider and EmbeddingProvider abstractions are scoped for the AI phase, so scoring
            can extend to semantic similarity without rewriting the deterministic core that
            already works.
          </EngineeringDecision>
        </div>
      </Block>

      <Block code="04" title="Testing">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 max-w-2xl">
          <Metric value="183" label="Total tests" />
          <Metric
            value="17"
            label="Matching scenarios"
            context="Fixture-based: exact match, missing skill, JS≠TS, experience gaps, remote/location conflicts, score bounds."
          />
          <Metric
            value="11"
            label="Workspaces"
            context="3 apps (web, api, worker) + 8 shared packages in the monorepo."
          />
          <Metric
            value="0"
            label="Import violations"
            context="apps/worker never imports from apps/api, and vice versa — enforced as an architectural rule."
          />
        </div>
        <Prose>
          <p className="mt-8">
            Every workspace — apps and packages — carries its own test suite, growing alongside
            each build phase rather than being bolted on at the end. The dedup scorer for
            cross-source job reposts has its own fixture suite covering exact matches, different
            companies, legitimate reposts, and different roles at the same company.
          </p>
        </Prose>
      </Block>

      <Block code="05" title="Tradeoffs">
        <Prose>
          <p>
            Recommendations currently compute-or-fetch a cached match for every active job
            (capped at 200) on each request — the right call at this scale, since it reuses the
            matching cache with zero new infrastructure, but real job-board volume would need this
            moved to a precomputed batch job. That tradeoff is documented in the codebase rather
            than silently degrading under load. Job sourcing also currently runs on a demo
            provider with seeded listings, not a live external feed — this is a matching-engine
            and pipeline showcase, not a production job board yet.
          </p>
        </Prose>
      </Block>

      <Block code="06" title="What I learned">
        <Prose>
          <p>
            It's tempting to lead with "AI-powered" before the AI actually exists. Building the
            deterministic engine first — and making sure it was honest about its own confidence —
            meant the eventual AI layer has something solid to extend, instead of something
            fragile it has to cover for.
          </p>
        </Prose>
      </Block>

      <Block code="07" title="What I'd change today">
        <Prose>
          <p>
            Job sourcing runs on a demo provider with 20 seeded listings behind a{" "}
            <code className="font-mono text-[13px]">JobProvider</code> interface — the interface
            is real, but there's no live external feed plugged into it yet. That's an honest gap,
            not a hidden one: the matching engine and pipeline are the point of this build, and I'd
            rather ship that solid than half-wire a real job board on top of it.
          </p>
          <p>
            Recommendations also recompute-or-fetch a match for every active job (capped at 200)
            on each request. Fine at this scale, but the first thing I'd change moving toward real
            volume is a precomputed batch job — the codebase already documents this as the known
            next step rather than pretending it scales indefinitely as-is.
          </p>
        </Prose>
      </Block>

      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <CaseStudyNavigation
          prev={{ slug: "enterprise-hrms", name: "Enterprise HRMS" }}
          next={{ slug: "analytics-dashboard", name: "Analytics Dashboard" }}
        />
      </div>
    </>
  );
}
