import { test, expect } from '@playwright/test';

test.setTimeout(60000);

test('Add Feedback and verify success message', async ({ page }) => {
  await page.goto('http://localhost:3000/login');

  const emailInput = page.getByRole('textbox', { name: 'Email' });
  const passwordInput = page.getByLabel('Password');
  const loginButton = page.getByRole('button', { name: 'Log In' });

  await expect(emailInput).toBeVisible();
  await expect(passwordInput).toBeVisible();

  await emailInput.fill('emin.samed.yilmaz@hicoders.ch');
  await passwordInput.fill('Konya42.');
  await loginButton.click();

  await page.waitForURL('http://localhost:3000/feedbacks/dashboard');
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();

  await page.goto('http://localhost:3000/feedbacks/add');
  await page.waitForLoadState('networkidle');

  const feedbackInput = page.getByPlaceholder('Enter your feedback');
  await expect(feedbackInput).toBeVisible();

  await feedbackInput.fill('This is a test feedback.');

  const fourthStar = page.locator('label[for="feedback-rating-:r3:"]');
  await expect(fourthStar).toBeVisible();
  await fourthStar.click();

  await page.getByRole('button', { name: 'Submit' }).click();

  const successMessage = page.locator('text=Feedback submitted successfully!');
  await expect(successMessage).toBeVisible();
});
