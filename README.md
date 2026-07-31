# Jai Maheshwari — Portfolio

A software-engineering portfolio built as an "engineering notebook" — warm
blueprint-paper background, signal-orange accent, technical grid, and
architecture diagrams standing in for decorative imagery. Every claim on
this site (test counts, RBAC role counts, the BUG-001 race-condition story)
is sourced from the actual project repositories, not written for effect.

## Design philosophy

- **Evidence over adjectives.** Every project card leads with a specific,
  falsifiable claim (test counts, architecture decisions) rather than
  descriptive language. Metrics carry a short, honest context string, not
  just a bare number.
- **One identity, several compositions.** The palette, type system, and
  grid stay constant across the site, but the Hero, project cards, Journey
  timeline, and Capabilities matrix are each laid out differently, so nothing
  reads as the same `label → heading → paragraph` block repeated six times.
- **Two registers, clearly separated.** Enterprise HRMS, Job Copilot, and
  Analytics Dashboard are independent, self-directed engineering projects.
  Ubitech is production experience at a real employer. The UI labels both
  explicitly (`Independent engineering project` / `Production experience`)
  so the two are never conflated.
- **Honesty about gaps.** Case studies each end with a "What I'd change
  today" section — real, technically grounded tradeoffs already documented
  in the source repos (e.g. the in-memory rate limiter, the missing
  frontend test suite), not invented flaws for the sake of humility-signaling.

## Stack

- **Vite + React 19 + TypeScript**
- **Tailwind CSS v4** (CSS-first `@theme` tokens, no `tailwind.config.js`)
- **React Router** for client-side routing
- **Framer Motion** for restrained, `prefers-reduced-motion`-aware animation
- **oxlint** for linting (this template's default; not ESLint)
- **Playwright** (+ `@axe-core/playwright`) for end-to-end and accessibility tests

## Architecture

```
src/
  config/
    site.ts             Single source of truth: domain, email, socials,
                         resume path, availability flag. Nothing else in
                         the codebase should hard-code these.
  data/                 All copy and structured content. No prose lives
                         directly in JSX — components render data.
    profile.ts           Hero copy, stack progression, links
    projects.ts           Selected Work — problem/decision/proof per project
    experience.ts          Ubitech production experience, outcome-first
    journey.ts               Engineering Journey timeline stages
    skills.ts                  Capabilities matrix groups
  components/
    ui/                  Reusable, mostly presentational
    layout/               Navigation, Footer, page-level chrome
  sections/              Homepage sections (Hero, SelectedWork, ...)
  pages/                 Route-level components (Home, case studies, 404)
  lib/
    motion.ts             Shared Framer Motion variants
    usePageMeta.ts          Per-route title/description/OG/Twitter tags
    useSiteJsonLd.ts          Person JSON-LD, sourced from site config
scripts/
  generate-seo-files.mjs  Generates public/robots.txt + sitemap.xml from
                          the same VITE_SITE_URL used by src/config/site.ts
                          — runs automatically before dev/build.
tests/
  e2e/                  Playwright test suite (see Testing below)
```

### Why a two-tier color system

`--color-signal` (`#E8541C`) is the vivid decorative accent — dots,
underlines, icon fills, large surfaces. `--color-signal-dim` (`#B33F13`) is
a darker variant used for anything that's actually *text*. The same split
exists for `--color-ink-faint`. This isn't a style preference: the bright
values fail WCAG AA at normal text sizes (verified — see Accessibility),
so text and decoration intentionally use different shades of the same hue.

## Local development

```bash
npm install
npm run dev       # http://localhost:5173
```

`predev`/`prebuild` automatically regenerate `public/robots.txt` and
`public/sitemap.xml` from `VITE_SITE_URL` (see Content configuration).

## Testing

```bash
npm run build && npm run preview   # tests run against the built site
npm test                           # Playwright suite (starts preview automatically)
npm run test:ui                    # Playwright's interactive UI mode
```

The suite covers homepage load, navigation (desktop + mobile menu focus
behavior), all three case-study routes via **direct navigation** (i.e. not
just client-side link clicks — this is what actually catches SPA routing
regressions), 404 behavior, CTA link integrity, keyboard navigation (skip
link, Escape-to-close, focus return), an axe-core accessibility scan per
route, and horizontal-overflow checks at all four required breakpoints
(375 / 768 / 1024 / 1440px). It does
not include tests that only assert trivial rendering with no real
assertion — a smaller, meaningful suite over a padded one.

## Accessibility

- Every color pairing used for text was checked against WCAG AA (4.5:1)
  with a contrast calculator, not eyeballed — see the two-tier color
  system note above.
- Single `<h1>` per page; `<h2>`–`<h4>` nest without skipped levels,
  verified by dumping the live heading tree, not just by inspecting JSX.
- Skip-to-content link, visible on keyboard focus.
- Mobile nav menu: focus moves into the panel on open, Tab is trapped
  within it, Escape closes and returns focus to the trigger button, and
  the rest of the page is marked `inert` while it's open.
- Homepage nav reflects the section currently in view via
  `IntersectionObserver`, with `aria-current` on the active link.
- `prefers-reduced-motion` is respected globally (see `index.css`).
- Zero axe-core violations across all routes, both nav states, and the
  404 page — re-verified after every content or layout change, not just
  once at the end.

## SEO

- Per-route `<title>`, meta description, canonical URL, Open Graph, and
  Twitter Card tags (`summary_large_image`) via `usePageMeta`.
- A real blueprint-styled OG/Twitter image (`public/og-image.png`,
  1200×630) matching the site's actual visual identity — not a generic
  stock card.
- `Person` JSON-LD, generated at runtime from `src/config/site.ts`.
- `robots.txt` and `sitemap.xml` generated from one domain constant so
  they can't drift from each other or from the app's own canonical tags.

## Content configuration

Everything personal or environment-specific lives in **`src/config/site.ts`**:

| Field | What it controls |
|---|---|
| `siteUrl` | Canonical URLs, OG/Twitter tags, JSON-LD, sitemap, robots.txt |
| `resumeUrl` | The "Resume" button/link sitewide — point this at a real PDF in `public/` |
| `email` | Contact section, footer, JSON-LD — rendered as a real `mailto:` link |
| `github` / `linkedin` | Footer, Contact section, JSON-LD `sameAs` |
| `isAvailableForWork` | Shows/hides the "Available for opportunities" hero indicator — flip this off the moment it stops being true |
| `ogImage` | Path to the social preview image |

`siteUrl` reads from the `VITE_SITE_URL` environment variable if set,
falling back to a placeholder domain. Set it in your deploy provider's
environment settings (or a local `.env`) rather than editing the fallback.

**Still needed before this is launch-ready:**
- A real resume PDF at the path set in `resumeUrl`
- A real contact email
- Confirmation of the LinkedIn URL
- The actual deployed domain, via `VITE_SITE_URL`
- Real project screenshots, if desired — drop them in `public/screenshots/`
  and pass the path to the `ProjectScreenshot` component in a case study;
  it renders nothing if no `src` is given, so it's safe to leave unused.

## Deployment

The app is a client-rendered SPA using `BrowserRouter`, so the host must
rewrite all paths to `index.html` — otherwise a direct load or refresh on
`/work/enterprise-hrms` 404s at the server level before React Router ever
runs.

**Vercel** — `vercel.json` (included) already configures the rewrite.
Import the repo, set `VITE_SITE_URL` in the project's environment
variables, deploy.

**Netlify** — `public/_redirects` (included) already configures the
rewrite. Set the build command to `npm run build`, publish directory to
`dist`, and set `VITE_SITE_URL` in site environment variables.

**Other static hosts** — configure an equivalent catch-all rewrite to
`/index.html` (not a redirect — a rewrite, so the URL bar keeps the
original path).

After deploying, re-run `npm run build` locally with the real
`VITE_SITE_URL` set (or trigger a rebuild on the host with that env var
configured) so `robots.txt`/`sitemap.xml` and the canonical/OG tags point
at the real domain instead of the placeholder.
