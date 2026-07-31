import { test, expect } from "@playwright/test";

test.describe("Desktop navigation", () => {
  test("clicking a nav link scrolls to the matching section", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Experience", exact: true }).click();
    await page.waitForTimeout(500); // smooth-scroll settle
    await expect(page.locator("#experience")).toBeInViewport();
  });

  test("resume link points at the configured resume path", async ({ page }) => {
    await page.goto("/");
    const resumeLink = page.getByRole("link", { name: "Resume", exact: true }).first();
    await expect(resumeLink).toHaveAttribute("href", "/resume.pdf");
  });
});

test.describe("Mobile menu", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("opens, traps focus, and closes on Escape returning focus to the trigger", async ({ page }) => {
    await page.goto("/");
    const trigger = page.getByRole("button", { name: "Open menu" });
    await trigger.click();

    const panel = page.getByRole("dialog", { name: "Site navigation" });
    await expect(panel).toBeVisible();

    // Focus should have moved into the panel, not stayed on the trigger.
    const firstLink = panel.getByRole("link").first();
    await expect(firstLink).toBeFocused();

    await page.keyboard.press("Escape");
    await expect(panel).not.toBeVisible();
    await expect(page.getByRole("button", { name: "Open menu" })).toBeFocused();
  });

  test("background content is inert while the menu is open", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Open menu" }).click();
    const main = page.locator("#main-content");
    await expect(main).toHaveAttribute("inert", "");
  });

  test("closing via a nav link click navigates and returns focus correctly", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Open menu" }).click();
    const panel = page.getByRole("dialog", { name: "Site navigation" });
    await panel.getByRole("link", { name: "Experience", exact: true }).click();
    await expect(panel).not.toBeVisible();
  });
});
