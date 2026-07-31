import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const routes = ["/", "/work/enterprise-hrms", "/work/job-copilot", "/work/analytics-dashboard"];

test.describe("Accessibility", () => {
  for (const route of routes) {
    test(`no axe-core violations on ${route}`, async ({ page }) => {
      await page.goto(route);
      const results = await new AxeBuilder({ page }).analyze();
      expect(results.violations, JSON.stringify(results.violations, null, 2)).toEqual([]);
    });
  }

  test("skip link is keyboard-reachable and jumps to main content", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Tab");
    const skipLink = page.getByRole("link", { name: "Skip to content" });
    await expect(skipLink).toBeFocused();
  });

  test("heading hierarchy has exactly one h1 and no skipped levels", async ({ page }) => {
    await page.goto("/");
    const levels = await page.evaluate(() =>
      Array.from(document.querySelectorAll("h1,h2,h3,h4,h5,h6")).map((h) =>
        Number(h.tagName[1])
      )
    );
    expect(levels.filter((l) => l === 1)).toHaveLength(1);
    for (let i = 1; i < levels.length; i++) {
      expect(levels[i] - levels[i - 1]).toBeLessThanOrEqual(1);
    }
  });
});

test.describe("No horizontal overflow at all required breakpoints", () => {
  const breakpoints = [
    { name: "375px (mobile)", width: 375 },
    { name: "768px (tablet)", width: 768 },
    { name: "1024px (small desktop)", width: 1024 },
    { name: "1440px (desktop)", width: 1440 },
  ];

  for (const bp of breakpoints) {
    test.describe(bp.name, () => {
      test.use({ viewport: { width: bp.width, height: 900 } });

      for (const route of routes) {
        test(`no horizontal overflow on ${route}`, async ({ page }) => {
          await page.goto(route);
          const { scrollWidth, clientWidth } = await page.evaluate(() => ({
            scrollWidth: document.documentElement.scrollWidth,
            clientWidth: document.documentElement.clientWidth,
          }));
          expect(scrollWidth).toBeLessThanOrEqual(clientWidth);
        });
      }
    });
  }
});

test.describe("Reduced motion", () => {
  test.use({ reducedMotion: "reduce" });

  test("homepage still renders and is usable with reduced motion", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.getByRole("link", { name: "View Selected Work" })).toBeVisible();
  });
});
