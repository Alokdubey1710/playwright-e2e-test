import { test, expect } from '@playwright/test';

 test.describe('Make Appointment',{annotation: {type:"Story", description: "JIRA-1234: Make an appointment feature"}}, () => {

    test.beforeEach('Login with valid credentials', async ({page}, testInfo) => {
        
         //1.launch url and assert title and header

          await page.goto("https://katalon-demo-cura.herokuapp.com/");
          await expect(page).toHaveTitle("CURA Healthcare Service");
          await expect(page.locator("//h1")).toHaveText("CURA Healthcare Service");

         //2.CLick on the make appointment
          await page.getByRole("link", { name: "Make Appointment" }).click();
          await expect(page.getByText("Please login to make appointment.")).toBeVisible();

         //Successful login

          await page.getByLabel("Username").fill("John Doe");
          await page.getByLabel("Password").fill("ThisIsNotAPassword");
          await page.getByRole("button", { name: "Login" }).click();

          /*
          *Add CUstom screenshot
          */ 
         let fullPageLoginScreenshot = await page.screenshot({fullPage: true});
         await testInfo.attach("login page", {body: fullPageLoginScreenshot, contentType: "image/png"});

         // Assert a text
          await expect(page.locator("//h2")).toContainText("Make Appointment");

});

    
    test(
      "Should make an appointment with non-default value",
      { 
        annotation: {
          type: "bug",
          description: "defect:1234 - does not work in firefox ",
          
        },
        tag:"@smoke"
      },
      async ({ page, browserName }) => {
        //skip the test for firefox
        test.skip(browserName === "firefox", "Open bug id =1234");

        //Dropdown
        await page
          .getByLabel("Facility")
          .selectOption("Hongkong CURA Healthcare Center");
        //checkbox
        await page
          .getByRole("checkbox", { name: "Apply for hospital readmission" })
          .check();

        //radio button
        await page.getByRole("radio", { name: "Medicaid" }).check();

        //date and input button
        await page
          .getByRole("textbox", { name: "Visit Date (Required)" })
          .click();
        await page
          .getByRole("textbox", { name: "Visit Date (Required)" })
          .fill("02/10/2026");
        await page
          .getByRole("textbox", { name: "Visit Date (Required)" })
          .press("Enter");

        //multi line comment
        await page.getByRole("textbox", { name: "Comment" }).click();
        await page
          .getByRole("textbox", { name: "Comment" })
          .fill("This is a multi line comments by playwright codegen");

        //button
        await page.getByRole("button", { name: "Book Appointment" }).click();

        //Assertion
        await expect(page.locator("h2")).toContainText(
          "Appointment Confirmation",
        );
        await expect(
          page.getByRole("link", { name: "Go to Homepage" }),
        ).toBeVisible();
      },
    );
})
 
