import { test, expect } from "@playwright/test";

const caseStudies = [
  { path: "/work/enterprise-hrms", heading: "Enterprise HRMS" },
  { path: "/work/job-copilot", heading: "Job Copilot" },
  { path: "/work/analytics-dashboard", heading: "Analytics Dashboard" },
];

for (const { path, heading } of caseStudies) {
  test.describe(`Case study: ${heading}`, () => {
    test(`direct navigation to ${path} renders correctly (not a 404)`, async ({ page }) => {
      // This is the SPA routing regression this test exists to catch: a
      // server that doesn't rewrite to index.html would 404 here even
      // though clicking a link to the same route works fine client-side.
      const response = await page.goto(path);
      expect(response?.status()).toBeLessThan(400);
      await expect(page.locator("h1")).toContainText(heading);
    });

    test("shows a project-type badge distinguishing it from production experience", async ({ page }) => {
      await page.goto(path);
      await expect(page.getByText("Independent engineering project")).toBeVisible();
    });

    test("includes a What I'd change today reflection section", async ({ page }) => {
      await page.goto(path);
      await expect(page.getByText(/What I'd change today/i)).toBeVisible();
    });

    test("has working back-to-work navigation", async ({ page }) => {
      await page.goto(path);
      await page.getByRole("link", { name: "Selected Work" }).first().click();
      await expect(page).toHaveURL(/\/#work$|\/$/);
    });
  });
}

test("HRMS case study renders both race-condition diagram states", async ({ page }) => {
  await page.goto("/work/enterprise-hrms");
  await expect(page.getByText("FIG. 01 — Race condition")).toBeVisible();
  await expect(page.getByText("FIG. 02 — Atomic rotation")).toBeVisible();
});
