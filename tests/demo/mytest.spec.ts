import { test, expect } from "@playwright/test";
test("should load home page with correct title", async ({ page }) => {
  //step 1: go to home page
  await page.goto("https://katalon-demo-cura.herokuapp.com/");
  //step 2: Assert if the title is correct
  await expect(page).toHaveTitle("CURA Healthcare Service");
  //step 3: Assert header text
  await expect(page.locator("//h1")).toHaveText("CURA Healthcare Service");
});

test("Should do something", { tag: "@smoke" }, async ({ page }, testInfo) => {
  await page.locator("//h1").click();
});

test.only("Should demo locatos", async ({ page }) => {
  //1.Launch Url
  await page.goto("https://katalon-demo-cura.herokuapp.com/");

  //2.Click on make appointment
  let makeAppmtBtn = page.getByRole("link", { name: "Make Appointment" }); 
  console.log('>> the type of loator: ${typeof makeAppmtBtn}, The value of locator is: ${JSON.stringify(makeAppmtBtn)}'); 

  // await makeAppmtBtn.click();
  // await expect(page.getByText("Please login to make")).toBeVisible();
});
