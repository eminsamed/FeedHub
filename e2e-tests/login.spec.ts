//The purpose of this test is to correctly redirect the user and verify the visibility of the dashboard page when logged in with valid credentials.
import { test, expect } from "@playwright/test";

//login Page Test Start:
test.describe("Login Page", () => {
  //describe is used to group tests in a logical way
  test.setTimeout(120000); //total running time of tests set to 2 minutes

  //Invalid Credentials Login Test
  test("should show alert on invalid credentials", async ({ page }) => {
    await page.goto("http://localhost:3000/login"); // go to login page

    await page.getByRole("textbox", { name: "Email" }).fill("invalid@example.com"); //Put invalid information in the email and password fields

    await page.getByLabel("Password").fill("wrongpassword");

    const [dialog] = await Promise.all([page.waitForEvent("dialog"), page.getByRole("button", { name: "Log In" }).click()]); //Click the Log In button, show the error message

    expect(dialog.message()).toContain("Login failed"); //verify that the displayed message contains “Login failed”

    await dialog.dismiss(); // close the error message
  });

  //Entry Test with Valid Credentials
  test("should login successfully with valid credentials", async ({ page }) => {
    await page.goto("http://localhost:3000/login"); // go to login page

    const emailInput = page.getByRole("textbox", { name: "Email" }); //Enter the correct information in the email and password fields
    const passwordInput = page.getByLabel("Password");

    await expect(emailInput).toBeVisible();
    await expect(passwordInput).toBeVisible();

    await emailInput.fill("emin.samed.yilmaz@hicoders.ch");
    await passwordInput.fill("Konya42.");

    await page.getByRole("button", { name: "Log In" }).click(); //Click the Log In button

    await page.waitForURL("http://localhost:3000/feedbacks/dashboard"); //check if the user is redirected to the dashboard page after a successful login

    await expect(page.getByRole("heading", { name: "Dashboard" })).toBeVisible(); //verify that the dashboard heading is visible on the page
  });
});
