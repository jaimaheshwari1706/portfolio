import { siteConfig } from "@/config/site";

export const profile = {
  name: siteConfig.name,
  roleLabel: "Software Engineer",
  location: "Gwalior, India",
  focus: "Full-Stack + AI",

  heroLines: [
    "I build software where business rules,",
    "security and edge cases actually matter.",
  ],

  // Career-register progression, shown as the primary hero narrative.
  progression: ["Enterprise Systems", "Full-Stack Engineering", "AI-Enabled Systems"],

  // Stack-level progression — a more concrete, technical echo of the same
  // arc, shown as a secondary visual element in the hero.
  stackProgression: [
    { label: "Angular / PHP", note: "Production" },
    { label: "MERN", note: "Independent systems" },
    { label: "AI-enabled", note: "Architecture" },
  ],

  isAvailableForWork: siteConfig.isAvailableForWork,

  links: {
    resume: siteConfig.resumeUrl,
    github: siteConfig.github,
    linkedin: siteConfig.linkedin,
    email: siteConfig.emailHref,
  },

  currentFocus:
    "Deepening the AI layer of Job Copilot — moving from deterministic-only matching to a provider-agnostic AI scoring path, without giving up the fallback logic that makes the deterministic engine trustworthy on its own.",
} as const;
