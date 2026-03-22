import { test, expect } from "@playwright/test";

test.describe("Hero section", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("renders the hero badge", async ({ page }) => {
    await expect(
      page.getByText("Full Stack Developer", { exact: false })
    ).toBeVisible();
  });

  test("renders the availability status badge", async ({ page }) => {
    await expect(
      page.getByText("Disponible para nuevos proyectos", { exact: false })
    ).toBeVisible();
  });

  test("shows the scroll indicator", async ({ page }) => {
    await expect(page.getByText("Scroll")).toBeVisible();
  });

  test("page title is set", async ({ page }) => {
    await expect(page).toHaveTitle(/.+/);
  });
});
