// Generates public/robots.txt and public/sitemap.xml from a single domain
// source, so they can never drift from each other or from src/config/site.ts
// (which reads the same VITE_SITE_URL env var at runtime).
//
// Runs automatically before `npm run build` and `npm run dev` (see
// package.json's `predev`/`prebuild` scripts).

import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = join(__dirname, "..", "public");

const SITE_URL = process.env.VITE_SITE_URL || "https://jaimaheshwari.dev";

const routes = [
  { path: "/", priority: "1.0" },
  { path: "/work/enterprise-hrms", priority: "0.8" },
  { path: "/work/job-copilot", priority: "0.8" },
  { path: "/work/analytics-dashboard", priority: "0.8" },
];

const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemap.org/schemas/sitemap/0.9">
${routes.map((r) => `  <url>\n    <loc>${SITE_URL}${r.path}</loc>\n    <priority>${r.priority}</priority>\n  </url>`).join("\n")}
</urlset>
`;

writeFileSync(join(PUBLIC_DIR, "robots.txt"), robotsTxt);
writeFileSync(join(PUBLIC_DIR, "sitemap.xml"), sitemapXml);

console.log(`Generated robots.txt and sitemap.xml for ${SITE_URL}`);
