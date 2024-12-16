// Dashboard and Navigation Test
import { test, expect } from "@playwright/test";

// Increase the timeout globally for the entire test
test.setTimeout(60000); // 60 seconds timeout for the entire test suite

test("Dashboard and Navigation", async ({ page }) => {
  // Go to the login page
  await page.goto("http://localhost:3000/login");

  // Fill in the login form
  await page.fill('input[name="email"]', "user@example.com");
  await page.fill('input[name="password"]', "password123");
  await page.click('button[type="submit"]');

  // Navigate to the dashboard page
  await page.goto("http://localhost:3000/feedbacks/dashboard");

  // Check if the Feedbacks link is visible
  await expect(page.locator("text=Feedbacks")).toBeVisible();

  // Click on the 'Add' button
  await page.click("text=Add");

  // Check if the 'Send Feedback' form is visible
  await expect(page.locator("text=Send Feedback")).toBeVisible();
});

