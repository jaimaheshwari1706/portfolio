import { test, expect } from "@playwright/test";

test.describe("404 handling", () => {
  test("unknown route shows the 404 page, not a blank screen or crash", async ({ page }) => {
    const response = await page.goto("/this-route-does-not-exist");
    expect(response?.status()).toBeLessThan(500);
    await expect(page.getByText("404")).toBeVisible();
  });

  test("404 page sets a noindex robots tag", async ({ page }) => {
    await page.goto("/this-route-does-not-exist");
    const robots = page.locator('meta[name="robots"]');
    await expect(robots).toHaveAttribute("content", "noindex");
  });

  test("404 page links back home", async ({ page }) => {
    await page.goto("/this-route-does-not-exist");
    await page.getByRole("link", { name: /back home/i }).click();
    await expect(page).toHaveURL("/");
  });
});

test.describe("CTA link integrity", () => {
  test("contact email is a real mailto link, not a placeholder", async ({ page }) => {
    await page.goto("/");
    const emailLink = page.getByRole("link", { name: "Say hello" });
    const href = await emailLink.getAttribute("href");
    expect(href).toMatch(/^mailto:/);
    expect(href).not.toBe("#");
  });

  test("GitHub link points at a real github.com URL", async ({ page }) => {
    await page.goto("/");
    const link = page.getByRole("link", { name: "GitHub ↗" });
    await expect(link).toHaveAttribute("href", /^https:\/\/github\.com\//);
  });

  test("no hero or contact CTA uses a bare # placeholder href", async ({ page }) => {
    await page.goto("/");
    const ctaNames = ["View Selected Work", "Resume", "Say hello", "GitHub ↗", "LinkedIn ↗"];
    for (const name of ctaNames) {
      const link = page.getByRole("link", { name }).first();
      const href = await link.getAttribute("href");
      expect(href, `${name} should not be a bare '#' placeholder`).not.toBe("#");
    }
  });
});
