import { Page, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly emailInput = '[data-test-id="login-email"]';
  readonly passwordInput = '[data-test-id="login-password"]';
  readonly submitButton = '[data-test-id="login-submit"]';
  readonly loginLink = '[data-test-id="nav-login"]';
  readonly dashboardContainer = '[data-test-id="dashboard"]';
  readonly userNameDisplay = '[data-test-id="user-name"]';

  constructor(page: Page) {
    this.page = page;
  }

  async navigateToHome() {
    await this.page.goto('/');
    await expect(this.page).toHaveURL('/');
    await expect(this.page).toHaveTitle(/.+/);
  }

  async openLogin() {
    await this.page.waitForSelector(this.loginLink, { state: 'visible' });
    await this.page.click(this.loginLink);
    await expect(this.page.locator(this.emailInput)).toBeVisible();
    await expect(this.page.locator(this.passwordInput)).toBeVisible();
    await expect(this.page.locator(this.submitButton)).toBeVisible();
  }

  async login(email: string, password: string) {
    await this.page.fill(this.emailInput, email);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.submitButton);
  }

  async assertDashboard(userName: string) {
    await this.page.waitForURL('**/dashboard', { waitUntil: 'networkidle' });
    await expect(this.page.locator(this.dashboardContainer)).toBeVisible();
    await expect(this.page.locator(this.userNameDisplay)).toContainText(userName);
  }

  async clearSession() {
    await this.page.context().clearCookies();
    await this.page.evaluate(() => localStorage.clear());
    await this.page.evaluate(() => sessionStorage.clear());
  }
}
===END===