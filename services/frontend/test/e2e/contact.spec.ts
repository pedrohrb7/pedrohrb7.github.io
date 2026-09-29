import { expect, test } from "@playwright/test";

const email = "pedrohrb77@gmail.com";

test.describe("copy email", () => {
  test.use({ permissions: ["clipboard-read", "clipboard-write"] });

  for (const { where, scope } of [
    { where: "hero", scope: "#top" },
    { where: "contact section", scope: "#contact" },
  ]) {
    test(`copies the email from the ${where}`, async ({ page }) => {
      await page.goto("/pt/");
      const area = page.locator(scope);
      await expect(area.getByText(email, { exact: true })).toBeVisible();

      const button = area.getByRole("button", { name: "Copiar e-mail" });
      await button.click();
      await expect(button).toHaveText("Copiado!");
      expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(email);
      await expect(button).toHaveText("Copiar", { timeout: 4000 });
    });
  }

  test("the page has no mailto link or send-email button", async ({ page }) => {
    await page.goto("/en/");
    await expect(page.locator('a[href^="mailto:"]')).toHaveCount(0);
    await expect(page.getByRole("button", { name: "Copy email" })).toHaveCount(2);
  });

  test("without JavaScript the address shows and the copy buttons are hidden", async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    await page.goto("/pt/");
    await expect(page.locator("#top").getByText(email, { exact: true })).toBeVisible();
    await expect(page.getByRole("button", { name: "Copiar e-mail" })).toHaveCount(0);
    await context.close();
  });
});
