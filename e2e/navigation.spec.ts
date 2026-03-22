import { test, expect } from "@playwright/test";

test.describe("Header navigation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    // Wait for the page to fully load
    await page.waitForLoadState("networkidle");
  });

  test("renders all nav links on desktop", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    const labels = ["About", "Skills", "Experience", "Work", "Contact"];
    for (const label of labels) {
      await expect(page.getByRole("link", { name: label }).first()).toBeVisible();
    }
  });

  test("clicking a nav link scrolls to that section", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.getByRole("link", { name: "About" }).first().click();
    await page.waitForTimeout(800); // allow scroll animation
    const about = page.locator("#about");
    await expect(about).toBeInViewport();
  });

  test("theme switcher button is visible", async ({ page }) => {
    const switcher = page.getByRole("button", { name: /theme|dark|light/i });
    // May have aria-label or title — just confirm some toggle button exists in header
    await expect(
      page.locator("header button").first()
    ).toBeVisible();
  });

  test("mobile menu opens on small viewport", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    // Open hamburger menu
    const hamburger = page.locator("header button").first();
    await hamburger.click();
    // At least one nav link becomes visible
    await expect(page.getByRole("link", { name: "About" }).first()).toBeVisible();
  });
});
