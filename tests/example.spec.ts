import { test, expect } from '@playwright/test';

test('basic example - page title contains Playwright', async ({ page }) => {
  await page.goto('https://playwright.dev');
  await expect(page).toHaveTitle(/Playwright/);
});
===END===