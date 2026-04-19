📌 Codegen using Playwright

Codegen is a built-in Playwright tool that automatically generates test scripts by recording user actions in the browser. It helps speed up the test automation process and is very useful for beginners.

```▶️ Run Codegen

npx playwright codegen

📍 Playwright Locators
page.getBy() and page.locator() methods return a Locator object
These methods should NOT be awaited because they do not return a Promise
Locator is used to perform actions on elements

🔘 Button / Link Automation
```Javascript code

// Click
await page.getByRole("link", { name: "Make Appointment" }).click();

// Press Enter
await page.getByRole("link", { name: "Make Appointment" }).press("Enter");

// Double Click
await page.getByRole("link", { name: "Make Appointment" }).dblclick();

// Right Click
await page.getByRole("link", { name: "Make Appointment" }).click({ button: "right" });

// Hover
await page.getByRole("link", { name: "Make Appointment" }).hover();

// Timeout handling (for slow elements)
await page.getByRole("link", { name: "Make Appointment" }).click({ timeout: 10000 });

📝 Text Field Automation

// Clear and Fill
await page.getByLabel("Username").clear();
await page.getByLabel("Username").fill("John Doe");

// Slow typing (simulate real user)
await page.getByLabel("Username").pressSequentially("John Doe", { delay: 300 });

📂 Dropdown Automation
Steps:
Assert default value
Select option (by label / index)
Assert count
Get all dropdown values

1️⃣ Assert Default Option

await expect(page.getByLabel('Facility')).toHaveValue('Tokyo CURA Healthcare Center');
await page.getByLabel('Facility').selectOption('Hongkong CURA Healthcare Center');

2️⃣ Select by Label or Index

await page.getByLabel('Facility').selectOption({ label: "Seoul CURA Healthcare Center" });
await page.getByLabel('Facility').selectOption({ index: 0 });

3️⃣ Assert Dropdown Count

let dropdwnOptionsEle = page.getByLabel("Facility").locator('option');
await expect(dropdwnOptionsEle).toHaveCount(3);

5️⃣ Extract Values using Loop

let listOfOptions = [];

for (let ele of listOfDropdwnElems) {
let eleTxt = await ele.textContent();

if (eleTxt) {
listOfOptions.push(eleTxt);
}
}

console.log(`>>> List of Options: ${listOfOptions}`);

☑️ Radio Button & Checkbox Automation
Radio Button
Allows selecting only one option at a time
Checkbox
Allows selecting multiple options
