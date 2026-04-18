import { test, expect } from '@playwright/test';

 test.describe('Make Appointment', () => {

    test.beforeEach('Login with valid credentials', async ({page}) => {
        
         //1.launch url and assert title and header

          await page.goto("https://katalon-demo-cura.herokuapp.com/");
          await expect(page).toHaveTitle("CURA Healthcare Service");
          await expect(page.locator("//h1")).toHaveText("CURA Healthcare Service");

         //2.CLick on the make appointment
          // await page.getByRole("link", { name: "Make Appointment" }).click();
          // await page.getByRole("link", { name: "Make Appointment" }).press("Enter");
          // await page.getByRole("link", { name: "Make Appointment" }).dblclick();
          // await page.getByRole("link", { name: "Make Appointment" }).click({ button: "right" });
          // await page.getByRole("link", { name: "Make Appointment" }).hover();
          await page.getByRole("link", { name: "Make Appointment" }).click({timeout:10_000});

          await expect(page.getByText("Please login to make")).toBeVisible();

         //Successful login
         // await page.getByLabel("Username").fill("John Doe");

        
         //Clears and enter
         // await page.getByLabel("Username").clear();
         // await page.getByLabel("Username").fill("John Doe");

         // ressSeqentially
         await page.getByLabel("Username").pressSequentially("John Doe", {delay: 300});



          await page.getByLabel("Password").fill("ThisIsNotAPassword");
          await page.getByRole("button", { name: "Login" }).click();

         // Assert a text
          await expect(page.locator("//h2")).toContainText("Make Appointment");

});

    
    test('Should make and appointment with non-default value', async ({ page }) => {

  
//Dropdown
 //Assert default option
  await expect(page.getByLabel('Facility')).toHaveValue('Tokyo CURA Healthcare Center');
  await page.getByLabel('Facility').selectOption('Hongkong CURA Healthcare Center');

 //Select by labele or index
  await page.getByLabel('Facility').selectOption({label:"Seoul CURA Healthcare Center"});
  await page.getByLabel('Facility').selectOption({index:0});

 //Assert the count
  let dropdwnOptionsEle = page.getByLabel("Facility").locator('option');
  await expect(dropdwnOptionsEle).toHaveCount(3);


  //Get all dropdown values
  let listOfDropdwnElems= await page.getByLabel("Facility").all()

  //for of loop
  let listOfOptions = []

  for(let ele of listOfDropdwnElems){
    let eleTxt = await ele.textContent();
    listOfOptions.push(eleTxt)

    if(eleTxt) {
      listOfOptions.push(eleTxt)
    }
  }

    console.log('>>> List of Options: ${listOfOptions}');


 //checkbox
  // await page.getByText("Apply for hospital admission").click();
  await page.getByText("Apply for hospital readmission").check()
  await page.getByText("Apply for hospital readmission").uncheck()

 //radio button
 //Assert the default option - to be checked/unchecked
  await expect(page.getByText("Medicare")).toBeChecked()

  await page.getByText("Medicaid").check()
  await expect(page.getByText("Medicare")).not.toBeChecked()


 //date and input button
  await page.getByRole('textbox', { name: 'Visit Date (Required)' }).click();
  await page.getByRole('textbox', { name: 'Visit Date (Required)' }).fill('10/02/2026');
  await page.getByRole('textbox', { name: 'Visit Date (Required)' }).press('Enter');

 //multi line comment
  await page.getByRole('textbox', { name: 'Comment' }).click();
  await page.getByRole('textbox', { name: 'Comment' }).fill('This is a multi line comments by playwright codegen');

 //button
  await page.getByRole('button', { name: 'Book Appointment' }).click();

 //Assertion
  await expect(page.locator('h2')).toContainText('Appointment Confirmation');
  await expect(page.getByRole('link', { name: 'Go to Homepage' })).toBeVisible();
});
})

