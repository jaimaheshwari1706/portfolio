import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { CaseStudyHeader } from "@/components/layout/CaseStudyHeader";
import { CaseStudyNavigation } from "@/components/ui/CaseStudyNavigation";
import { EngineeringDecision } from "@/components/ui/EngineeringDecision";
import { Metric } from "@/components/ui/Metric";
import { Callout } from "@/components/ui/Callout";
import { fadeUp, viewportOnce } from "@/lib/motion";
import { usePageMeta } from "@/lib/usePageMeta";
import { projects } from "@/data/projects";

const project = projects.find((p) => p.slug === "analytics-dashboard")!;

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

export function CaseStudyAnalytics() {
  usePageMeta(
    "Analytics Dashboard",
    "A role-aware business analytics platform with 106 backend tests, MongoDB aggregation-based KPIs, real-time notifications, and server-enforced RBAC.",
    "/work/analytics-dashboard"
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
            Dashboards are easy to fake — a handful of hardcoded numbers and a chart library will
            get you 90% of the way to convincing. The other 10% is the part that matters: every
            KPI on this dashboard is computed server-side from real seeded data through MongoDB
            aggregation pipelines, behind the same 4-role RBAC pattern used across this body of
            work.
          </p>
        </Prose>
      </Block>

      <Block code="01" title="Architecture">
        <Prose>
          <p>
            React 19 with Redux Toolkit for client state and TanStack Query for server state, on
            top of an Express + MongoDB backend. Four roles — Admin, Manager, Analyst, Viewer —
            gate every sensitive endpoint server-side, not just the UI's visible routes.
          </p>
        </Prose>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <EngineeringDecision id={1} title="Analytics computed, not cached numbers">
            Revenue, order, and growth metrics run through MongoDB aggregation pipelines against
            real seeded order/product/user data — ~200 users, 48 products, ~1,200 orders across a
            12-month trend.
          </EngineeringDecision>
          <EngineeringDecision id={2} title="Symmetric date-range resolution">
            Every range (today, yesterday, 7d, 30d, 90d) automatically computes an equal-length
            previous period for %-change KPIs, with explicit divide-by-zero handling rather than
            a silent NaN or Infinity.
          </EngineeringDecision>
        </div>
      </Block>

      <Block code="02" title="Feature surface">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-signal-dim">Real-time</h3>
            <p className="mt-2 text-ink-soft text-[15px] leading-relaxed">
              A Socket.io notification bell pushes activity updates — new orders, user actions,
              status changes — to connected clients without a manual refresh.
            </p>
          </div>
          <div>
            <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-signal-dim">Reporting</h3>
            <p className="mt-2 text-ink-soft text-[15px] leading-relaxed">
              CSV, Excel, and PDF export across the dashboard's data views, alongside a
              centralized activity log covering authentication, user, product, and order events
              for auditability.
            </p>
          </div>
        </div>
      </Block>

      <Block code="03" title="Testing">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 max-w-2xl">
          <Metric
            value="106"
            label="Backend tests"
            context="Unit, integration, and a dedicated security suite for rate limiting and RBAC boundaries."
          />
          <Metric
            value="4"
            label="Roles enforced"
            context="Admin, Manager, Analyst, Viewer — every sensitive endpoint gated server-side."
          />
          <Metric value="3" label="Export formats" context="CSV, Excel, and PDF across the dashboard's data views." />
          <Metric
            value="0"
            label="Frontend tests"
            context="An honest gap — no automated frontend coverage exists yet."
          />
        </div>
        <Prose>
          <p className="mt-8">
            Backend coverage spans unit tests (date-range resolution, pagination, validation),
            integration tests (auth, analytics, orders, products, users, notifications), and a
            dedicated security suite for rate limiting and RBAC boundaries. The frontend doesn't
            have automated test coverage yet — an honest gap, not an oversight glossed over.
          </p>
        </Prose>
      </Block>

      <Block code="04" title="Tradeoffs">
        <Callout label="Scoped honestly" tone="blueprint">
          This project intentionally doesn't claim a debugging war story it can't back up — the
          date-range and percent-change math is real, tested, and handles its edge cases (a 0-to-0
          comparison returns 0, not NaN; a jump from 0 returns a clean 100 instead of Infinity),
          but there's no dramatic production incident behind it. Docker and CI/CD are on the
          project's own roadmap, not shipped yet, and the frontend has no test coverage — both
          listed here rather than implied otherwise.
        </Callout>
      </Block>

      <Block code="05" title="What I learned">
        <Prose>
          <p>
            Aggregation-pipeline analytics forces you to get the math right server-side, where a
            bug means every KPI downstream is quietly wrong — not just one chart. Writing the
            date-range utility's edge cases as tests first, rather than eyeballing the dashboard,
            is what surfaced the divide-by-zero case before it ever reached the UI.
          </p>
        </Prose>
      </Block>

      <Block code="06" title="What I'd change today">
        <Prose>
          <p>
            Docker and CI/CD are listed on this project's own roadmap, not shipped — I'd rather
            state that plainly than let the stack list imply a deployment pipeline that doesn't
            exist yet. The frontend also has zero automated test coverage, which is the gap I'd
            close first: the backend's aggregation logic is exactly the kind of thing a frontend
            regression could silently misrepresent on a chart.
          </p>
        </Prose>
      </Block>

      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <CaseStudyNavigation prev={{ slug: "job-copilot", name: "Job Copilot" }} />
      </div>
    </>
  );
}
