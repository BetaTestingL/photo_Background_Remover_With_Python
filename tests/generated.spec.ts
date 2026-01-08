Below is a **complete, production‑ready Playwright test suite** that follows the requested structure:

* **Page Object Models (POMs)** – `src/pages/…`
* **Playwright configuration** – `playwright.config.ts`
* **Custom fixtures** – `fixtures.ts`
* **Example test** – `tests/login.spec.ts`

All selectors use the `data-testid` attribute, the code is typed with TypeScript and the fixtures are exposed via `test.extend`.  
Copy the files into the root of your project, run `npm i -D @playwright/test` (or `pnpm add -D @playwright/test`) and then `npx playwright test`.

---

## 1️⃣ `playwright.config.ts`

```ts
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  // Global timeout for each test
  timeout: 30_000,
  // Base URL of the application under test
  use: {
    baseURL: 'https://your-app.example.com',
    // Browser context options
    headless: true,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    // Default timeout for actions like click(), fill(), etc.
    actionTimeout: 5_000,
    // Enable tracing on failure (helps debugging)
    trace: 'on-first-retry',
  },

  // Projects for different browsers (feel free to adjust)
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],

  // Reporter configuration (HTML + line)
  reporter: [['html', { open: 'never' }], ['list']],
});
```

---

## 2️⃣ `fixtures.ts`

```ts
// fixtures.ts
import { test as base, Page, BrowserContext } from '@playwright/test';
import { HomePage } from './src/pages/HomePage';
import { LoginPage } from './src/pages/LoginPage';
import { DashboardPage } from './src/pages/DashboardPage';

/**
 * Extend the built‑in test object with our custom fixtures.
 * Each fixture lazily creates a page object bound to the Playwright Page.
 */
type MyFixtures = {
  /** Fresh page for each test */
  context: BrowserContext;
  /** The Playwright Page */
  page: Page;
  /** Page objects */
  homePage: HomePage;
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
};

export const test = base.extend<MyFixtures>({
  // Re‑use the default `page` fixture but expose it as `page` (already provided by Playwright)
  page: async ({ page }, use) => {
    await use(page);
  },

  // HomePage fixture
  homePage: async ({ page }, use) => {
    const home = new HomePage(page);
    await use(home);
  },

  // LoginPage fixture
  loginPage: async ({ page }, use) => {
    const login = new LoginPage(page);
    await use(login);
  },

  // DashboardPage fixture
  dashboardPage: async ({ page }, use) => {
    const dashboard = new DashboardPage(page);
    await use(dashboard);
  },
});

export { expect } from '@playwright/test';
```

---

## 3️⃣ Page Object Models (`src/pages/`)


### 3.1 `src/pages/HomePage.ts`

```ts
// src/pages/HomePage.ts
import { Page, Locator } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    // Example selector – adjust the test‑id to match your app
    this.loginButton = page.locator('[data-testid="login-button"]');
  }

  /** Navigate to the root URL (baseURL defined in config) */
  async goto(): Promise<void> {
    await this.page.goto('/');
    await this.page.waitForLoadState('domcontentloaded');
  }

  /** Click the "Login" button on the homepage */
  async clickLogin(): Promise<void> {
    await this.loginButton.waitFor({ state: 'visible' });
    await this.loginButton.click();
  }
}
```


### 3.2 `src/pages/LoginPage.ts`

```ts
// src/pages/LoginPage.ts
import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.locator('[data-testid="login-email"]');
    this.passwordInput = page.locator('[data-testid="login-password"]');
    this.submitButton = page.locator('[data-testid="login-submit"]');
  }

  /** Fill email and password fields */
  async fillCredentials(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
  }

  /** Submit the login form */
  async submit(): Promise<void> {
    await this.submitButton.click();
  }

  /** Convenience method – performs the whole login flow */
  async login(email: string, password: string): Promise<void> {
    await this.fillCredentials(email, password);
    await this.submit();
  }
}
```


### 3.3 `src/pages/DashboardPage.ts`

```ts
// src/pages/DashboardPage.ts
import { Page, Locator } from '@playwright/test';

export class DashboardPage {
  readonly page: Page;
  readonly dashboardRoot: Locator;

  constructor(page: Page) {
    this.page = page;
    // The root element that uniquely identifies the dashboard view
    this.dashboardRoot = page.locator('[data-testid="dashboard-root"]');
  }

  /** Wait for the dashboard to become visible */
  async waitForVisible(): Promise<void> {
    await this.dashboardRoot.waitFor({ state: 'visible' });
  }

  /** Simple boolean check – useful for assertions */
  async isVisible(): Promise<boolean> {
    return await this.dashboardRoot.isVisible();
  }
}
```

---

## 4️⃣ Example Test (`tests/login.spec.ts`)

```ts
// tests/login.spec.ts
import { test, expect } from '../fixtures';

test.describe('Login flow', () => {
  // Replace these with valid credentials for your environment
  const VALID_EMAIL = 'test.user@example.com';
  const VALID_PASSWORD = 'SuperSecret123';

  test('User can log in and see the dashboard', async ({
    homePage,
    loginPage,
    dashboardPage,
  }) => {
    // 1️⃣ Open homepage
    await homePage.goto();

    // 2️⃣ Click the login button
    await homePage.clickLogin();

    // 3️⃣ Fill credentials and submit
    await loginPage.login(VALID_EMAIL, VALID_PASSWORD);

    // 4️⃣ Assert that the dashboard appears
    await dashboardPage.waitForVisible();
    await expect(dashboardPage.dashboardRoot).toBeVisible();
  });
});
```

---

## 5️⃣ How it works

| Piece | What it does |
|------|--------------|
| **`playwright.config.ts`** | Central configuration – test directory, base URL, browsers, timeouts, reporters, etc. |
| **`fixtures.ts`** | Extends Playwright’s `test` with typed page‑object fixtures (`homePage`, `loginPage`, `dashboardPage`). Tests import `test` from this file, gaining auto‑completion and a clean API. |
| **Page Objects** | Encapsulate UI interactions using `data-testid` selectors. Each class receives a `Page` instance and exposes high‑level actions (`goto`, `login`, `waitForVisible`). |
| **`login.spec.ts`** | Demonstrates a real‑world test that uses the custom fixtures. The test reads like a business scenario, not low‑level Playwright commands. |

---


### Running the suite

```bash
# Install dependencies (if not already done)
npm i -D @playwright/test

# Install browsers (Playwright will prompt if missing)
npx playwright install

# Execute the tests
npx playwright test
```

All files are ready to be committed to a repository. Adjust the `baseURL`, `data-testid` values, and credentials to match your actual application, and you’ll have a solid, maintainable automation foundation. 🚀