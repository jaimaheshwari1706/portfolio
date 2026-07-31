import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { CaseStudyHeader } from "@/components/layout/CaseStudyHeader";
import { CaseStudyNavigation } from "@/components/ui/CaseStudyNavigation";
import { EngineeringDecision } from "@/components/ui/EngineeringDecision";
import { RaceConditionDiagram } from "@/components/ui/RaceConditionDiagram";
import { Callout } from "@/components/ui/Callout";
import { Metric } from "@/components/ui/Metric";
import { fadeUp, viewportOnce } from "@/lib/motion";
import { usePageMeta } from "@/lib/usePageMeta";
import { projects } from "@/data/projects";

const project = projects.find((p) => p.slug === "enterprise-hrms")!;

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

export function CaseStudyHRMS() {
  usePageMeta(
    "Enterprise HRMS",
    "A Zoho People–style HR platform with 74 automated tests, server-enforced RBAC, and a fully code-verified refresh-token race-condition bug story (BUG-001).",
    "/work/enterprise-hrms"
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
            Most portfolio HR systems stop at CRUD screens. Enterprise HRMS was built to answer a
            harder question: could this survive the questions a real engineering interview would
            ask about it — how is authorization actually enforced, what happens when two requests
            race each other, and where's the evidence it was tested rather than just built?
          </p>
        </Prose>
      </Block>

      <Block code="01" title="System">
        <Prose>
          <p>
            A Zoho People–style HR platform on the MERN stack: organization and department
            structure, full employee lifecycle management, attendance with automatic
            working-hours derivation, a leave-and-approval workflow, and payroll generation with
            a Draft → Processed → Paid status flow. Four roles — Super Admin, HR Admin, Manager,
            Employee — with authorization enforced server-side, not just hidden in the UI.
          </p>
        </Prose>
      </Block>

      <Block code="02" title="Engineering challenge">
        <Prose>
          <p>
            Authentication used the standard short-lived access token + rotating refresh token
            pattern: a 15-minute JWT held only in memory, and a 7-day refresh token, rotated on
            every use and stored as a SHA-256 hash rather than in plaintext, delivered as an
            httpOnly cookie the frontend JS never touches directly.
          </p>
          <p>
            That design is sound. What it doesn't automatically handle is what happens when two
            refresh requests arrive at (almost) the same moment — which turned out to be exactly
            what was happening on every single page load.
          </p>
        </Prose>
      </Block>

      {/* BUG-001 */}
      <Block code="03" title="BUG-001 — The session that logged itself out">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          <div className="space-y-10">
            <div>
              <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-signal-dim">Symptom</h3>
              <p className="mt-2 text-ink-soft text-[15px] leading-relaxed">
                Login worked. The dashboard loaded. Then, intermittently, a browser refresh would
                kick the user straight back to <code className="font-mono text-[13px]">/login</code> —
                even though the refresh-token cookie was still valid and hadn't expired.
              </p>
            </div>

            <div>
              <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-signal-dim">Root cause — three layers deep</h3>
              <ol className="mt-2 space-y-3">
                <li className="text-[15px] text-ink-soft leading-relaxed pl-6 relative">
                  <span className="absolute left-0 font-mono text-xs text-signal-dim">1</span>
                  React's <code className="font-mono text-[13px]">&lt;StrictMode&gt;</code> intentionally
                  double-invokes effects in development — firing two concurrent
                  <code className="font-mono text-[13px]"> POST /auth/refresh-token</code> calls with
                  the same cookie on every mount.
                </li>
                <li className="text-[15px] text-ink-soft leading-relaxed pl-6 relative">
                  <span className="absolute left-0 font-mono text-xs text-signal-dim">2</span>
                  The backend's rotation was a non-atomic{" "}
                  <code className="font-mono text-[13px]">findOne()</code> → mutate →{" "}
                  <code className="font-mono text-[13px]">save()</code>. Both concurrent requests
                  could read the token as "not yet revoked" before either write landed.
                </li>
                <li className="text-[15px] text-ink-soft leading-relaxed pl-6 relative">
                  <span className="absolute left-0 font-mono text-xs text-signal-dim">3</span>
                  Refresh tokens had no per-token nonce. JWT <code className="font-mono text-[13px]">iat</code> only
                  has second-granularity, so two tokens minted in the same second were
                  byte-identical — the second insert threw a duplicate-key error on the unique{" "}
                  <code className="font-mono text-[13px]">tokenHash</code> index.
                </li>
              </ol>
            </div>

            <Callout label="Reproduced outside the browser">
              A fresh login followed by two concurrent refresh calls via curl reliably produced one{" "}
              <code className="font-mono text-[13px]">409 tokenHash already exists</code> and one{" "}
              <code className="font-mono text-[13px]">401 refresh token no longer valid</code> — every
              time. Whichever request's rejection landed last in Redux silently overwrote a valid
              session with <code className="font-mono text-[13px]">unauthenticated</code>.
            </Callout>
          </div>

          <RaceConditionDiagram variant="broken" />
        </div>
      </Block>

      <Block code="04" title="Fix">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <EngineeringDecision id={1} title="Atomic rotation">
            Replaced the read-then-write with a single{" "}
            {"findOneAndUpdate({ tokenHash, user, revokedAt: null, expiresAt: { $gt: now } }, { revokedAt: now })"}
            . A concurrent race now resolves as one clean 401 instead of a crash.
          </EngineeringDecision>
          <EngineeringDecision id={2} title="jti nonce">
            Added a random nonce to the refresh-token payload, so two tokens minted for the same
            user in the same second are never byte-identical again.
          </EngineeringDecision>
          <EngineeringDecision id={3} title="RTK condition guard">
            Added a condition guard to bootstrapAuth so a second concurrent dispatch bails out
            before ever making a network call — closing the trigger, not just the symptom.
          </EngineeringDecision>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <RaceConditionDiagram variant="fixed" />
          <div>
            <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-blueprint">Why it worked</h3>
            <p className="mt-2 text-ink-soft text-[15px] leading-relaxed">
              The easy fix would have been the frontend guard alone — it would have made the race
              much rarer without actually closing it. The backend was still one retried request or
              one extra browser tab away from the same crash. Fixing all three layers means the
              race is closed at its source, not just hidden behind its most common trigger.
            </p>
            <h3 className="mt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-blueprint">Verification</h3>
            <p className="mt-2 text-ink-soft text-[15px] leading-relaxed">
              Same curl-based reproduction, re-run after the fix: one clean 200 with a rotated
              cookie and new access token, one clean 401. No duplicate-key error, no crash, no
              lost session.
            </p>
          </div>
        </div>
      </Block>

      <Block code="05" title="Testing">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 max-w-2xl">
          <Metric value="74" label="Total tests" />
          <Metric
            value="47"
            label="Unit"
            context="JWT tokens, password hashing, pagination math, leave/attendance/payroll calculators — no DB required."
          />
          <Metric
            value="27"
            label="Integration"
            context="Supertest + in-memory MongoDB: auth, RBAC boundaries, employee CRUD, leave apply→approve, payroll generation."
          />
          <Metric
            value="4"
            label="QA reports"
            context="BUGS.md, TEST_REPORT.md, API_TEST_REPORT.md, RBAC_TEST_REPORT.md — all in-repo."
          />
        </div>
        <Prose>
          <p className="mt-8">
            Backend logic runs on Jest + Supertest against an in-memory MongoDB instance:
            unit coverage for leave-day calculation, attendance-status derivation, and payroll
            gross/net math; integration coverage for auth, RBAC boundaries, employee CRUD, the
            leave apply→approve flow, and payroll generation. A full manual QA pass — auth
            lifecycle, every RBAC boundary, every CRUD module, uploads, exports — is documented
            directly in the repo's <code className="font-mono text-[13px]">BUGS.md</code> and three
            test-report files, including the direct backend authorization tests behind the RBAC
            matrix.
          </p>
        </Prose>
      </Block>

      <Block code="06" title="Tradeoffs">
        <Prose>
          <p>
            Single-tenant by design — one organization per deployment, not a multi-tenant SaaS.
            Notifications are polled every 30 seconds rather than pushed over WebSockets, which is
            the right tradeoff at this scale but wouldn't hold up under real-time collaboration
            requirements. The frontend also ships as a single ~934KB bundle with no route-level
            code-splitting yet — correct, just not optimized for slow connections.
          </p>
        </Prose>
      </Block>

      <Block code="07" title="What I learned">
        <Prose>
          <p>
            The instinct with an intermittent bug is to patch wherever it's easiest to reproduce —
            in this case, the frontend effect. That fix would have shipped, looked resolved in
            testing, and left a real race condition sitting one retried request away from
            recurring in production. Tracing a bug through every layer it touches, not just the
            layer where it's visible, is the difference between a bug that's fixed and a bug
            that's just quieter.
          </p>
        </Prose>
      </Block>

      <Block code="08" title="What I'd change today">
        <Prose>
          <p>
            The rate limiter on the login route uses{" "}
            <code className="font-mono text-[13px]">express-rate-limit</code>'s default in-memory
            store, keyed per process. That's fine for one instance, but behind a load balancer
            with more than one server, an attacker's requests spread across instances and the
            limit becomes trivially bypassable. Swapping in{" "}
            <code className="font-mono text-[13px]">rate-limit-redis</code> is a small change —
            Redis is already in the stack — but it's not done, and I'd rather flag it here than
            let the current single-instance assumption go unstated.
          </p>
          <p>
            I'd also add route-level code-splitting before calling the frontend done. A single
            ~934KB bundle works, but it's the kind of thing that's easy to defer indefinitely
            unless something forces the question — better to fix it on a normal engineering
            timeline than a performance-incident timeline.
          </p>
        </Prose>
      </Block>

      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <CaseStudyNavigation next={{ slug: "job-copilot", name: "Job Copilot" }} />
      </div>
    </>
  );
}
