// Feedback Insertion Test
import { test, expect } from "@playwright/test";

// Increase the timeout globally for the entire test
test.setTimeout(60000); // 60 seconds timeout for the entire test suite

test("Add Feedback", async ({ page }) => {
  // Go to the login page
  await page.goto("http://localhost:3000/login");

  // Fill in the login form
  await page.fill('input[name="email"]', "user@example.com");
  await page.fill('input[name="password"]', "password123");
  await page.click('button[type="submit"]');

  // Navigate to the 'Add Feedback' page
  await page.goto("http://localhost:3000/feedbacks/add");

  // Fill in the feedback form
  await page.fill('textarea[placeholder="Enter your feedback"]', "This is a test feedback.");

  // Submit the feedback form
  await page.click('button[type="submit"]');

  // Check if the success message is visible
  await expect(page.locator("text=Feedback submitted successfully!")).toBeVisible();
});
