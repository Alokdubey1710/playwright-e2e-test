import { test, expect } from "@playwright/test";

test.describe("Login functionality", () => {
  test.beforeEach("Go to the login page", async ({ page }) => {
    //1.launch url and assert title and header

    await page.goto("https://katalon-demo-cura.herokuapp.com/", {
      timeout: 60_000,
    }); //will run over the config option
    await expect(page).toHaveTitle("CURA Healthcare Service");
    await expect(page.locator("//h1")).toHaveText("CURA Healthcare Service");

    //2.CLick on the make appointment
    await page.getByRole("link", { name: "Make Appointment" }).click();
    await expect(
      page.getByText("Please login to make appointment."),
    ).toBeVisible();
  });

  test.only("Should login successfully", async ({ page }) => {
    // //Auto waiting
    //  let userNameEle = page.getByLabel("Username");
    //  await userNameEle.check();

    //Timeout
    // test.slow()
    // test.setTimeout(120_000);

    //Successful login
    await page.getByLabel("Username").fill("John Doe");
    await page.getByLabel("Password").fill("ThisIsNotAPassword");
    await page
      .getByRole("button", { name: "Login" })
      .click({ timeout: 10_000 });

    // Assert a text
    await expect(page.locator("//h2")).toContainText("Make Appointment", {
      timeout: 10_000,
    });
  });

  test("Should prevent login with invalid creds", async ({ page }) => {
    //Unsuccessful login

    await page.getByLabel("Username").fill("John smith");
    await page.getByLabel("Password").fill("ThisIsNotAPassword");
    await page.getByRole("button", { name: "Login" }).click();

    // Assert a Error message
    await expect(page.locator("#login")).toContainText(
      "Login failed! Please ensure the username and password are valid.",
    );
  });
});
