import { test, expect } from "@playwright/test";

test.describe("Theme switcher", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
  });

  test("toggles dark mode class on <html>", async ({ page }) => {
    const html = page.locator("html");

    // Check initial state
    const initialIsDark = await html.evaluate((el) =>
      el.classList.contains("dark")
    );

    // Click the first button in the header (theme switcher)
    await page.locator("header button").first().click();

    // After toggle the class should be flipped
    const afterIsDark = await html.evaluate((el) =>
      el.classList.contains("dark")
    );

    expect(afterIsDark).toBe(!initialIsDark);
  });

  test("persists theme preference across reload", async ({ page }) => {
    const html = page.locator("html");

    // Force dark mode
    await page.evaluate(() => {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    });

    await page.reload();
    await page.waitForLoadState("networkidle");

    // Dark mode should still be active
    await expect(html).toHaveClass(/dark/);
  });
});
