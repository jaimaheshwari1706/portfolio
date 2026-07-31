export type JourneyStage = {
  code: string;
  stage: string;
  title: string;
  body: string;
  markers: string[];
};

export const journey: JourneyStage[] = [
  {
    code: "01",
    stage: "Enterprise Engineering",
    title: "Learning what production actually demands",
    body: "Working inside a live HRMS/CRM platform meant inheriting real constraints — payroll figures that have to be exactly right, integrations that fail silently if a unit conversion is off by one factor, and UI bugs that only show up after other people's code has already touched the page. This is where I learned to read someone else's system before touching it.",
    markers: ["Angular", "PHP MVC", "MySQL", "Payment gateway integration"],
  },
  {
    code: "02",
    stage: "Full-Stack Systems",
    title: "Owning architecture end to end",
    body: "Enterprise HRMS and the Analytics Dashboard are where I set every decision myself — the RBAC model, the token security, the test strategy. It's also where a race condition in refresh-token rotation taught me more about concurrent systems than any tutorial could: BUG-001 wasn't fixed by patching the symptom, it was fixed by tracing it through three separate layers.",
    markers: ["MERN", "RBAC", "74+ automated tests", "Race-condition debugging"],
  },
  {
    code: "03",
    stage: "AI-Enabled Engineering",
    title: "Architecting for AI without depending on it",
    body: "Job Copilot's matching engine is fully deterministic and unit-tested today — six explainable scorers, no opaque numbers. The AI layer is designed in as a swappable provider interface for the next phase, on purpose: a system that only works when the AI call succeeds isn't one I'd want to ship.",
    markers: ["Deterministic matching", "BullMQ background jobs", "Provider-agnostic AI design"],
  },
];
