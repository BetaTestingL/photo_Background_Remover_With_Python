import { test, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';

test.describe('Photo Background Remover UI', () => {
  const sampleImage = path.resolve(__dirname, '../assets/sample.jpg');

  test.beforeAll(() => {
    if (!fs.existsSync(sampleImage)) {
      throw new Error(`Sample image not found at ${sampleImage}`);
    }
  });

  test('should upload an image and display a processed result', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Background Remover/i);

    // Locate file input (adjust selector to actual implementation)
    const fileInput = page.locator('input[type="file"]');
    await expect(fileInput).toBeVisible();

    // Upload the sample image
    await fileInput.setInputFiles(sampleImage);

    // Click the process button (adjust selector)
    const processBtn = page.getByRole('button', { name: /remove background/i });
    await processBtn.click();

    // Wait for the result canvas or img to appear
    const resultImg = page.locator('#result img, canvas');
    await expect(resultImg).toBeVisible({ timeout: 15000 });

    // Basic sanity check: ensure the result has non‑zero dimensions
    const width = await resultImg.evaluate((el) => {
      if (el instanceof HTMLImageElement) return el.naturalWidth;
      if (el instanceof HTMLCanvasElement) return el.width;
      return 0;
    });
    const height = await resultImg.evaluate((el) => {
      if (el instanceof HTMLImageElement) return el.naturalHeight;
      if (el instanceof HTMLCanvasElement) return el.height;
      return 0;
    });

    expect(width).toBeGreaterThan(0);
    expect(height).toBeGreaterThan(0);
  });
});