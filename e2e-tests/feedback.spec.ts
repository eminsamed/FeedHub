//This test simulates the user logging in first, then filling out the feedback form and finally submitting the feedback successfully.
import { test, expect } from "@playwright/test";

//Setting the Test Duration
test.setTimeout(60000); //The maximum duration of the test is set to 60 seconds, if the test is not completed within 60 seconds, the test will fail.

//Login Page
test("Add Feedback and verify success message", async ({ page }) => {
  //This command, at the beginning of the test, redirects the browser to localhost:3000/login. This is the login page.
  await page.goto("http://localhost:3000/login");

  //Create references to the Log In button with the email and password inputs (the getByRole method is used to select HTML elements of a specific type, for example, a textbox or a button
  const emailInput = page.getByRole("textbox", { name: "Email" });
  const passwordInput = page.getByLabel("Password"); //getByLabel to access the password field
  const loginButton = page.getByRole("button", { name: "Log In" });

  //Verify if the email and password fields on the page are visible
  await expect(emailInput).toBeVisible();
  await expect(passwordInput).toBeVisible();

  //Enter values in the email and password fields and click the “Log In” button
  await emailInput.fill("emin.samed.yilmaz@hicoders.ch");
  await passwordInput.fill("Konya42.");
  await loginButton.click();

  await page.waitForURL("http://localhost:3000/feedbacks/dashboard"); //If login is successful, redirect the user to the dashboard page
  await expect(page.getByRole("heading", { name: "Dashboard" })).toBeVisible();

  //Go to the Feedback Page and Add Feedback
  await page.goto("http://localhost:3000/feedbacks/add"); //Go to the Feedback addition page and wait for the page to fully load
  await page.waitForLoadState("networkidle"); //networkidle indicates the state where network requests have stopped, i.e. all network traffic has completed.
  const feedbackInput = page.getByPlaceholder("Enter your feedback"); //The input field used to write feedback is defined by the placeholder property.
  await expect(feedbackInput).toBeVisible(); //This test verifies whether the corresponding input field is visible.

  await feedbackInput.fill("This is a test feedback."); //This line places the text “This is a test feedback.” in the feedback input field.

  //Choosing the Star Rating: This code selects the fourth star of the star rating used to determine the score of the feedback. The locator function is used to select the label of the fourth star and click on it.
  const fourthStar = page.locator('label[for="feedback-rating-:r3:"]');
  await expect(fourthStar).toBeVisible();
  await fourthStar.click();

  await page.getByRole("button", { name: "Submit" }).click(); //Click the Submit button and send the feedback

  //Verify the Success Message:
  const successMessage = page.locator("text=Feedback submitted successfully!"); //This line checks if the Feedback submitted successfully! message is visible. If this message is visible, it confirms that the feedback was submitted successfully.
  await expect(successMessage).toBeVisible();
});
