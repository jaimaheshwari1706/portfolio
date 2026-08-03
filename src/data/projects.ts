export type Project = {
  slug: string;
  number: string;
  name: string;
  /** All three are self-directed builds, not client/employer work — stated explicitly so it's never confused with the Ubitech production experience. */
  projectType: string;
  tagline: string;
  /** One sentence. Full context lives in the case study. */
  problem: string;
  /** The single most defensible engineering call in this project — not a list. */
  keyDecision: string;
  /** Short, scannable layer labels — not prose. */
  architectureSnapshot: string[];
  proof: { label: string; value: string; context: string }[];
  stack: string[];
  hasCaseStudy: boolean;
  url?: string; // TODO(content): live deployment URL
  repo?: string; // TODO(content): public repo URL if made public
};

export const projects: Project[] = [
  {
    slug: "enterprise-hrms",
    number: "01",
    name: "Enterprise HRMS",
    projectType: "Independent engineering project",
    tagline: "A Zoho People–style HR platform, built to be interview-defensible end to end.",
    problem:
      "Most portfolio HR systems stop at CRUD — this one adds real server-enforced RBAC and a documented production-grade concurrency bug fix.",
    keyDecision:
      "Refresh-token rotation is atomic and hashed — not a plaintext token an in-memory read-then-write could race.",
    architectureSnapshot: [
      "React 19 + Redux Toolkit",
      "Express + role-scoped middleware",
      "MongoDB + Redis cache-aside",
      "Jest + Supertest — 74 tests",
    ],
    proof: [
      { label: "Automated tests", value: "74", context: "47 unit, 27 integration — Jest + Supertest against an in-memory MongoDB instance." },
      { label: "RBAC roles", value: "4", context: "Super Admin, HR Admin, Manager, Employee — enforced server-side down to query-level scoping." },
      { label: "QA reports", value: "4", context: "BUGS.md plus three test-report files documenting the manual QA pass, in-repo." },
    ],
    stack: [
      "React 19",
      "Redux Toolkit",
      "Node.js",
      "Express",
      "MongoDB",
      "Redis",
      "Jest",
      "Supertest",
    ],
    hasCaseStudy: true,
  },
  {
    slug: "job-copilot",
    number: "02",
    name: "Job Copilot",
    projectType: "Independent engineering project",
    tagline: "A job-search platform architected around a deterministic matching engine — with an AI layer designed in, not bolted on.",
    problem:
      "Most \"AI-powered\" matchers are one opaque model call — this one scores explainably before any AI is involved at all.",
    keyDecision:
      "Six deterministic scorers ship first; AI is a swappable provider interface, not a hidden dependency the system needs to function.",
    architectureSnapshot: [
      "apps/web + apps/api + apps/worker",
      "BullMQ background pipeline",
      "6-scorer deterministic engine",
      "183 tests across 11 workspaces",
    ],
    proof: [
      { label: "Automated tests", value: "183", context: "Growing per build phase across every workspace — apps and packages both." },
      { label: "Matching scenarios", value: "17", context: "Fixture-based tests: exact match, missing skill, experience gaps, location/remote conflicts, score bounds." },
      { label: "Workspaces", value: "11", context: "3 apps (web, api, worker) + 8 shared packages, with a hard no-cross-import boundary." },
    ],
    stack: [
      "TypeScript",
      "React",
      "Express",
      "MongoDB",
      "BullMQ",
      "Redis",
      "Vitest",
    ],
    hasCaseStudy: true,
  },
  {
    slug: "analytics-dashboard",
    number: "03",
    name: "Analytics Dashboard",
    projectType: "Independent engineering project",
    tagline: "A role-aware business analytics platform, with every metric computed server-side.",
    problem:
      "Dashboards are easy to fake with hardcoded numbers — every KPI here is a real MongoDB aggregation against seeded data.",
    keyDecision:
      "Date-range math handles its own edge cases — divide-by-zero, symmetric previous-period comparison — instead of relying on eyeballed testing.",
    architectureSnapshot: [
      "React 19 + TanStack Query",
      "Express + aggregation pipelines",
      "Socket.io realtime layer",
      "106 backend tests",
    ],
    proof: [
      { label: "Backend tests", value: "106", context: "Unit, integration, and a dedicated security suite for rate limiting and RBAC boundaries." },
      { label: "RBAC roles", value: "4", context: "Admin, Manager, Analyst, Viewer — gating every sensitive endpoint server-side." },
      { label: "Export formats", value: "3", context: "CSV, Excel, and PDF, across every major data view in the dashboard." },
    ],
    stack: [
      "React 19",
      "TanStack Query",
      "Node.js",
      "Express",
      "MongoDB",
      "Socket.io",
      "Recharts",
    ],
    hasCaseStudy: true,
  },
];
