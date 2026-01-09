import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';

test.describe('Test Login Flow', () => {
  let loginPage: LoginPage;
  const validEmail = process.env.TEST_USER_EMAIL || 'test.user@example.com';
  const validPassword = process.env.TEST_USER_PASSWORD || 'P@ssw0rd!';
  const expectedUserName = process.env.TEST_USER_NAME || 'Test User';

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.clearSession();
  });

  test('User can log in and see dashboard', async () => {
    await loginPage.navigateToHome();

    await loginPage.openLogin();

    await loginPage.login(validEmail, validPassword);

    // Verify authentication request succeeded
    const [response] = await Promise.all([
      loginPage.page.waitForResponse(resp =>
        resp.url().includes('/api/auth/login') && resp.status() === 200
      ),
      // The click already triggered the request, so we just wait for it
    ]);
    expect(response.ok()).toBeTruthy();

    await loginPage.assertDashboard(expectedUserName);
  });
});
===END===