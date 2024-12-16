// Login Flow Test
import { test, expect } from "@playwright/test";

// Increase the timeout globally for the entire test suite to handle slow load times
test.setTimeout(60000); // 60 seconds timeout for the entire test suite

test("Login Flow", async ({ page }) => {
  // Navigate to the login page
  await page.goto("http://localhost:3000/login");

  // Wait for the email input to become visible (ensure that the page has loaded properly)
  await page.waitForSelector('input[name="email"]', { timeout: 60000 }); //60 seconds timeout for the entire test

  // Fill in the login form with email and password
  await page.fill('input[name="email"]', "user@example.com", { timeout: 60000 }); //60 seconds timeout for the entire test
  await page.fill('input[name="password"]', "password123", { timeout: 60000 }); //60 seconds timeout for the entire test

  // Click the submit button to log in
  await page.click('button[type="submit"]');

  // Check if the page navigates to the dashboard after login
  await expect(page).toHaveURL("http://localhost:3000/feedbacks/dashboard");

  // Ensure that important dashboard elements are visible after login
  await expect(page.locator("text=Feedbacks")).toBeVisible(); // Check if Feedbacks text is visible
  await expect(page.locator("text=Add")).toBeVisible(); // Check if Add button is visible
});
