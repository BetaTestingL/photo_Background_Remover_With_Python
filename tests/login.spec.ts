import { test, expect } from '@playwright/test';

test.describe('Login flow', () => {
  test('should login and display dashboard', async ({ page }) => {
    await page.goto('/');
    await page.click('text=Login');
    await page.fill('input[name="email"]', 'user@example.com');
    await page.fill('input[name="password"]', 'Password123');
    await page.click('button[type="submit"]');
    await expect(page.locator('#dashboard')).toBeVisible();
  });
});