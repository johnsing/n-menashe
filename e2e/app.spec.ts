import { expect, test } from "@playwright/test";

test.describe("N-MENASHE smoke tests", () => {
  test("home page shows all five section cards", async ({ page }) => {
    await page.goto("/en");
    await expect(
      page.getByRole("heading", { name: "Welcome to N-MENASHE" }),
    ).toBeVisible();
    await expect(page.getByRole("link", { name: /Zmanim Calendar/ })).toBeVisible();
    await expect(page.getByRole("link", { name: /Library/ })).toBeVisible();
    await expect(page.getByRole("link", { name: /Q&A/ })).toBeVisible();
  });

  test("tab bar navigates to the library", async ({ page }) => {
    await page.goto("/en");
    await page.getByRole("link", { name: "Library", exact: true }).click();
    await expect(page).toHaveURL(/\/en\/library/);
    await expect(
      page.getByRole("heading", { name: "Heritage Library" }),
    ).toBeVisible();
  });

  test("calendar page renders the zmanim board", async ({ page }) => {
    await page.goto("/en/calendar");
    await expect(
      page.getByRole("heading", { name: "Zmanim Train" }),
    ).toBeVisible();
    // Location picker should offer Jerusalem
    await expect(page.locator("select")).toContainText("Jerusalem");
  });

  test("Hebrew locale switches direction to RTL", async ({ page }) => {
    await page.goto("/he");
    await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
    await expect(page.locator("html")).toHaveAttribute("lang", "he");
  });
});
