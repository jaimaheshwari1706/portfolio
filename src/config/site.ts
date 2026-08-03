/**
 * Centralized site configuration.
 *
 * Every external URL, contact detail, and toggle used across the portfolio
 * (SEO tags, JSON-LD, nav, footer, contact section, resume links) reads
 * from here. Nothing should hard-code a domain, email, or social URL
 * anywhere else in the codebase — update it once, here.
 *
 * TODO(content): the values below marked TODO are placeholders. Replace
 * them with real values before deploying.
 */

const SITE_URL = import.meta.env.VITE_SITE_URL || "https://jaimaheshwari.dev"; // TODO(content): real deployed domain

export const siteConfig = {
  name: "Jai Maheshwari",
  role: "Software Engineer",
  siteUrl: SITE_URL,

  // TODO(content): replace with a real, hosted resume PDF (e.g. /resume.pdf in /public)
  resumeUrl: "/resume.pdf",

  email: "jaimaheshwari943@gmail.com",
  get emailHref() {
    return `mailto:${this.email}`;
  },

  github: "https://github.com/jaimaheshwari1706",
  // Sourced from the profile README's own Connect section, which already
  // had this filled in with a real (non-placeholder) handle.
  linkedin: "https://www.linkedin.com/in/jai-maheshwari-1706n",

  /**
   * Whether to show the "Available for opportunities" indicator in the hero.
   * Flip this off the moment that stops being true — don't leave a stale
   * availability claim live.
   */
  isAvailableForWork: true,

  ogImage: "/og-image.png",
} as const;
