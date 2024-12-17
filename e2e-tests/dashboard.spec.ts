//This test file contains tests related to the dashboard page
import { test, expect } from "@playwright/test";

// This describe block specifies that all tests are related to the dashboard page
test.describe("Dashboard Page", () => {
  test.setTimeout(120000); //The total runtime of each test is set to 120 seconds

  //beforeEach function is a setup function that will run before each test. Here are the steps to log in and access the dashboard page.
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000/login"); // First, go to the login page

    await page.getByRole("textbox", { name: "Email" }).fill("emin.samed.yilmaz@hicoders.ch"); //Find the email field (textbox) and type a valid email address
    await page.getByLabel("Password").fill("Konya42."); //Find the password field (Password) and enter password
    await page.getByRole("button", { name: "Log In" }).click(); //Click the Log In button

    await page.waitForURL("http://localhost:3000/feedbacks/dashboard"); //Wait until you are redirected to the dashboard page after successful login
    await expect(page.getByRole("heading", { name: "Dashboard" })).toBeVisible(); //Dashboard header is expected to be visible on the page.
  });

  //Checking if the Feedback List is Visible
  test("should display feedback list", async ({ page }) => {
    //Search for the text “On this page, you can view and manage feedback.”
    await expect(page.locator("text=On this page, you can view and manage feedback.")).toBeVisible(); //If this text is visible, the test passes.
  });

  //Successful Logout of the User
  test("should logout successfully", async ({ page }) => {
    await page.getByRole("button", { name: "Logout" }).click(); //  Click the Logout button
    await page.waitForURL("http://localhost:3000/login"); //Wait until you are redirected to the login page after logging out
    await expect(page.getByRole("heading", { name: "Login Page" })).toBeVisible(); //Check if the header on the login page is visible
  });
});
