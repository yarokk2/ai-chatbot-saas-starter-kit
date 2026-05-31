import { test, expect } from "@playwright/test";

test.describe("Authentication", () => {
  test.skip(
    "should redirect unauthenticated users to sign-in",
    async ({ page }) => {
      await page.goto("/dashboard/chat");
      await page.waitForLoadState("networkidle");
      expect(page.url()).not.toContain("/dashboard/chat");
    }
  );

  test("should display sign-in page", async ({ page }) => {
    await page.goto("/sign-in");
    await expect(page).toHaveURL(/sign-in/);
  });

  test("should display sign-up page", async ({ page }) => {
    await page.goto("/sign-up");
    await expect(page).toHaveURL(/sign-up/);
  });

  test("should load homepage successfully", async ({ page }) => {
    await page.goto("/");
    await expect(page).not.toHaveTitle("");
  });
});