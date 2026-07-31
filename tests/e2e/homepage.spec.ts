import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test("loads with correct title and hero content", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Jai Maheshwari/);
    await expect(page.locator("h1")).toContainText("business rules");
  });

  test("has no console errors on load", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    expect(errors).toEqual([]);
  });

  test("all three project cards render with case study links", async ({ page }) => {
    await page.goto("/");
    const workSection = page.locator("#work");
    await expect(workSection.getByText("Enterprise HRMS")).toBeVisible();
    await expect(workSection.getByText("Job Copilot")).toBeVisible();
    await expect(workSection.getByText("Analytics Dashboard")).toBeVisible();

    const caseStudyLinks = workSection.getByRole("link", { name: /Case Study/i });
    await expect(caseStudyLinks).toHaveCount(3);
  });

  test("engineering proof section shows sourced evidence, not bare claims", async ({ page }) => {
    await page.goto("/");
    const proof = page.getByText("Engineering Proof");
    await expect(proof).toBeVisible();
    // Every evidence card should cite which project it's drawn from.
    await expect(page.getByText("HRMS, Job Copilot, Analytics")).toBeVisible();
  });
});
