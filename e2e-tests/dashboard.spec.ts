import { test, expect } from '@playwright/test';

test.describe('Dashboard Page', () => {
  test.setTimeout(120000);

  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/login');

    await page
      .getByRole('textbox', { name: 'Email' })
      .fill('emin.samed.yilmaz@hicoders.ch');
    await page.getByLabel('Password').fill('Konya42.');
    await page.getByRole('button', { name: 'Log In' }).click();

    await page.waitForURL('http://localhost:3000/feedbacks/dashboard');
    await expect(
      page.getByRole('heading', { name: 'Dashboard' })
    ).toBeVisible();
  });

  test('should display feedback list', async ({ page }) => {
    await expect(
      page.locator('text=On this page, you can view and manage feedback.')
    ).toBeVisible();
  });

  test('should logout successfully', async ({ page }) => {
    await page.getByRole('button', { name: 'Logout' }).click();
    await page.waitForURL('http://localhost:3000/login');
    await expect(
      page.getByRole('heading', { name: 'Login Page' })
    ).toBeVisible();
  });
});
