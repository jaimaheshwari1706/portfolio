export type SkillGroup = {
  label: string;
  code: string;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    code: "01",
    label: "Production Engineering",
    items: ["Angular", "TypeScript", "PHP (MVC)", "MySQL", "REST API design", "Payment gateway integration"],
  },
  {
    code: "02",
    label: "Modern Full-Stack",
    items: ["React", "Node.js", "Express", "MongoDB", "Redux Toolkit", "TanStack Query", "Tailwind CSS", "Zod"],
  },
  {
    code: "03",
    label: "AI / Async Systems",
    items: ["BullMQ", "Redis", "Background job processing", "Provider-agnostic AI architecture", "Socket.io"],
  },
  {
    code: "04",
    label: "Testing & Delivery",
    items: ["Jest", "Vitest", "Supertest", "ESLint", "Docker", "Git"],
  },
];
