import { test, expect } from '@playwright/test';

test.describe('Login Page', () => {
  test.setTimeout(120000);

  test('should show alert on invalid credentials', async ({ page }) => {
    await page.goto('http://localhost:3000/login');

    await page
      .getByRole('textbox', { name: 'Email' })
      .fill('invalid@example.com');

    await page.getByLabel('Password').fill('wrongpassword');

    const [dialog] = await Promise.all([
      page.waitForEvent('dialog'),
      page.getByRole('button', { name: 'Log In' }).click(),
    ]);

    expect(dialog.message()).toContain('Login failed');

    await dialog.dismiss();
  });

  test('should login successfully with valid credentials', async ({ page }) => {
    await page.goto('http://localhost:3000/login');

    const emailInput = page.getByRole('textbox', { name: 'Email' });
    const passwordInput = page.getByLabel('Password');

    await expect(emailInput).toBeVisible();
    await expect(passwordInput).toBeVisible();

    await emailInput.fill('emin.samed.yilmaz@hicoders.ch');
    await passwordInput.fill('Konya42.');

    await page.getByRole('button', { name: 'Log In' }).click();

    await page.waitForURL('http://localhost:3000/feedbacks/dashboard');
    await expect(
      page.getByRole('heading', { name: 'Dashboard' })
    ).toBeVisible();
  });
});
