import { test, expect } from "@playwright/test";

test.describe("Inventory feature", () => {
  test.beforeEach("Login with valid credentials", async ({ page }) => {
    //Launch the url
    await page.goto("https://www.saucedemo.com/");

    //Login
    await page.locator('[data-test="username"]').fill("standard_user");
    await page.locator('[data-test="password"]').fill("secret_sauce");
    await page.locator('[data-test="login-button"]').click();

    //Assertion
    await expect(page). toHaveURL("https://www.saucedemo.com/inventory.html");
    await expect(page). toHaveURL(/.*\/inventory/);
  });

  test("Should confirm all prices are non-zero values", async ({ page }) => {});
});
