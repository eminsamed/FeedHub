import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('link', { name: 'Feedbacks' }).click();
  await page.goto('http://localhost:3000/');
  await page.getByRole('link', { name: 'Add' }).nth(1).click();
  await page.locator('label').filter({ hasText: '5 Stars' }).click();
  await page.locator('div').filter({ hasText: /^Your Feedback$/ }).click();
  await page.getByPlaceholder('Enter your feedback').fill('sggdgdgd');
  await page.getByRole('button', { name: 'Submit' }).click();
});