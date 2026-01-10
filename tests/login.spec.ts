import { test, expect } from '@playwright/test';

test('login flow redirects to dashboard', async ({ page }) => {
  // Open homepage
  await page.goto('https://example.com');

  // Click login button/link
  await page.click('text=Login');

  // Fill email and password
  await page.fill('input[name="email"]', 'user@example.com');
  await page.fill('input[name="password"]', 'Password123');

  // Submit login form
  await page.click('button[type="submit"]');

  // Assert dashboard is visible
  await expect(page.locator('h1', { hasText: 'Dashboard' })).toBeVisible();
});