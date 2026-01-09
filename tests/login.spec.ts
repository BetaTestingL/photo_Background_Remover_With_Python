import { test, expect } from '@playwright/test';

test('login flow redirects to dashboard', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: /login/i }).click();
  await page.getByLabel(/email/i).fill('user@example.com');
  await page.getByLabel(/password/i).fill('SecurePass123');
  await page.getByRole('button', { name: /submit|login/i }).click();
  await expect(page.getByRole('heading', { name: /dashboard/i })).toBeVisible();
});
===END===