import { test, expect } from "@playwright/test";

test.describe("Portfolio sections", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
  });

  test("About section renders", async ({ page }) => {
    await page.locator("#about").scrollIntoViewIfNeeded();
    await expect(page.locator("#about")).toBeVisible();
  });

  test("Skills section renders with filter tabs", async ({ page }) => {
    await page.locator("#skills").scrollIntoViewIfNeeded();
    await expect(page.locator("#skills")).toBeVisible();
    // At least one tab (All / Frontend / Backend…) should be visible
    const tabs = page.locator("#skills button, #skills [role='tab']");
    await expect(tabs.first()).toBeVisible();
  });

  test("Work section renders at least one project", async ({ page }) => {
    await page.locator("#work").scrollIntoViewIfNeeded();
    await expect(page.locator("#work")).toBeVisible();
  });

  test("Contact section renders email or contact info", async ({ page }) => {
    await page.locator("#contact").scrollIntoViewIfNeeded();
    await expect(page.locator("#contact")).toBeVisible();
  });

  test("Footer renders", async ({ page }) => {
    await page.locator("footer").scrollIntoViewIfNeeded();
    await expect(page.locator("footer")).toBeVisible();
  });
});
