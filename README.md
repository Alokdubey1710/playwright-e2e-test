CODEGEN->

Codegen using playwright command

  CodeGen is a tool that automatically generates test scripts by recording user actions in the browser, helping speed up test automation.

  npx playwright codegen

  
  *Playwright locatos

  'page.getBy()' and 'page.locator()' method returns the 'locator' object
 -> the above method not to be "awaited " bcoz it does not return a promise
 ->the type of locator is an object

Button Link Automation


//click            await page.getByRole("link", { name: "Make Appointment" }).click();
//Press            await page.getByRole("link", { name: "Make Appointment" }).press("Enter");
//double click     await page.getByRole("link", { name: "Make Appointment" }).dblclick();
//right click      await page.getByRole("link", { name: "Make Appointment" }).click({ button: "right" });
// hover           await page.getByRole("link", { name: "Make Appointment" }).hover();
//timeout if slow  await page.getByRole("link", { name: "Make Appointment" }).click({timeout:10_000});


Text field Automation

await page.getByLabel("Username").clear();
await page.getByLabel("Username").fill("John Doe");

// ressSeqentially (slow typing)
await page.getByLabel("Username").pressSequentially("John Doe", {delay: 300});

DropDown Automation

Steps:
1.Assert Value option
2.select by:
-label
-Index
3.Assert the count
4.Get all Drop down values

1. //Assert default option

  await expect(page.getByLabel('Facility')).toHaveValue('Tokyo CURA Healthcare Center');
  await page.getByLabel('Facility').selectOption('Hongkong CURA Healthcare Center');

2. //Select by labele or index

  await page.getByLabel('Facility').selectOption({label:"Seoul CURA Healthcare Center"});
  await page.getByLabel('Facility').selectOption({index:0});

3. //Assert the count

  let dropdwnOptionsEle = page.getByLabel("Facility").locator('option');
  await expect(dropdwnOptionsEle).toHaveCount(3);

4. //Get all dropdown values

  let listOfDropdwnElems= await page.getByLabel("Facility").all()

5. //for of loop

  let listOfOptions = []

  for(let ele of listOfDropdwnElems){
    let eleTxt = await ele.textContent();
    listOfOptions.push(eleTxt)

    if(eleTxt) {
      listOfOptions.push(eleTxt)
    }
  }
   console.log('>>> List of Options: ${listOfOptions}');

** Radio and Check box Automation
->allow to select only one option
->Checkbox - Allows for multi-entry
