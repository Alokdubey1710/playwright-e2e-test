## 📌 Codegen using Playwright

Codegen is a built-in Playwright tool that automatically generates test scripts by recording user actions in the browser. It helps speed up the test automation process and is very useful for beginners.

### ▶️ Run Codegen

```bash
npx playwright codegen
```

---

## 📍 Playwright Locators

* `page.getBy()` and `page.locator()` methods return a Locator object
* These methods should **NOT** be awaited
* Locator is used to perform actions on elements

---

## 🔘 Button / Link Automation

```javascript
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

// Timeout handling
await page.getByRole("link", { name: "Make Appointment" }).click({ timeout: 10000 });
```

---

## 📝 Text Field Automation

```javascript
// Clear and Fill
await page.getByLabel("Username").clear();
await page.getByLabel("Username").fill("John Doe");

// Slow typing
await page.getByLabel("Username").pressSequentially("John Doe", { delay: 300 });
```

---

## 📂 Dropdown Automation

### 1️⃣ Assert Default Option

```javascript
await expect(page.getByLabel('Facility')).toHaveValue('Tokyo CURA Healthcare Center');
await page.getByLabel('Facility').selectOption('Hongkong CURA Healthcare Center');
```

### 2️⃣ Select by Label or Index

```javascript
await page.getByLabel('Facility').selectOption({ label: "Seoul CURA Healthcare Center" });
await page.getByLabel('Facility').selectOption({ index: 0 });
```

### 3️⃣ Assert Dropdown Count

```javascript
let dropdwnOptionsEle = page.getByLabel("Facility").locator('option');
await expect(dropdwnOptionsEle).toHaveCount(3);
```

### 4️⃣ Extract Values using Loop

```javascript
let listOfOptions = [];

for (let ele of listOfDropdwnElems) {
  let eleTxt = await ele.textContent();

  if (eleTxt) {
    listOfOptions.push(eleTxt);
  }
}

console.log(`>>> List of Options: ${listOfOptions}`);
```

---

## ☑️ Radio Button & Checkbox Automation

* Radio Button → only one option select
* Checkbox → multiple options select

---

## ▶️ Codegen CLI

```bash
npx playwright codegen https://www.saucedemo.com/
```

---

## 🐞 Playwright Debugging Options

1. VS Code Test Explorer
2. UI Mode
3. Debug (`PWDEBUG=1`)
4. Trace Viewer

### 2️⃣ UI Mode

```json
"debug:ui": "npx playwright test tests/demo/debug.make.aptmnt.spec.ts --ui --headed"
```

### 3️⃣ Debug CLI

```json
"debug:cli": "PWDEBUG=1 npx playwright test tests/demo/debug.make.aptmnt.spec.ts"
```

### 4️⃣ Trace Viewer

```json
"debug:trace": "npx playwright test tests/demo/debug.make.aptmnt.spec.ts --trace on"
```

---

## 📊 Allure Reporter

* Rich UI
* Framework agnostic (Selenium, WDIO, Playwright)
* Detailed insights
* Trend tracking
* Works in CI/CD

### ⚙️ Allure Setup

```bash
# Check version
allure --version

# Install globally
npm install -g allure-commandline

# Install for project
npm install -D allure-playwright
```

### Reporter Config

```ts
reporter: [
  ['html'],
  ['allure-playwright'],
]
```

## 📊 Allure Report Setup

### ▶️ Run Allure Report
```bash
allure serve
```

---

## ☕ Install Java (Required for Allure)

1. Install from: https://adoptium.net/en-GB/  
2. Verify installation:
```bash
java --version
```

---

## 📸 Screenshot & Video Configuration

### 🔹 Using `use` in config
```javascript
use: {
  screenshot: "only-on-failure",
  video: "retain-on-failure"
}
```

### 🔹 At test level
```javascript
test.use({
  screenshot: "only-on-failure"
});
```

---

## 🛠 Advanced Debugging (Playwright API Level)

### Enable API logs
```bash
`set DEBUG=pw:api`
```

### Other debug namespaces
- `pw:browser*`
- `pw:channel*`
- `pw:protocol*`

---
### Global Setup
### Pseudo-Code
1. Create `global-setup.ts` file
2. export a single function that takes a config object
3. Delete allure report
   - Get the `allure-report` path
   - Use `path` module to get a path
   - Use `fs` native modules's sync method `existsSync, rmSync` to delete file

4. Link it to the `config` file
5. Run a simple test to confirm allure result is deleted
6. Add a `RUNNER` in `.env`
7. Install `dotenv` and load it to the config file
8. Add a logic to delete only for `locals`