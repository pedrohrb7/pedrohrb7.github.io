import { expect, test } from "@playwright/test";

test.describe("locale routing", () => {
  test("redirects / to the browser's language", async ({ browser }) => {
    const context = await browser.newContext({ locale: "en-US" });
    const page = await context.newPage();
    await page.goto("/");
    await expect(page).toHaveURL(/\/en\/$/);
    await context.close();
  });

  test("falls back to Portuguese for unsupported languages", async ({ browser }) => {
    const context = await browser.newContext({ locale: "de-DE" });
    const page = await context.newPage();
    await page.goto("/");
    await expect(page).toHaveURL(/\/pt\/$/);
    await context.close();
  });

  test("switches language from the header", async ({ page }) => {
    await page.goto("/pt/");
    await expect(page.locator("html")).toHaveAttribute("lang", "pt-BR");
    await page.getByRole("navigation", { name: "Idioma" }).getByRole("link", { name: "EN" }).click();
    await expect(page).toHaveURL(/\/en\/$/);
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    await expect(page.getByRole("heading", { level: 2, name: "Experience" })).toBeVisible();
  });
});

test.describe("not found page", () => {
  test("serves the site-styled bilingual 404 with links home", async ({ page }) => {
    const response = await page.goto("/pagina-que-nao-existe/");
    expect(response?.status()).toBe(404);
    await expect(page).toHaveTitle("404 | Pedro Borges");
    await expect(page.getByRole("heading", { level: 1, name: "404" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Voltar ao início" })).toHaveAttribute("href", "/pt/");
    await expect(page.getByRole("link", { name: "Back to home" })).toHaveAttribute("href", "/en/");

    await page.getByRole("link", { name: "Back to home" }).click();
    await expect(page).toHaveURL(/\/en\/$/);
  });
});

test.describe("home page", () => {
  test("renders every section with content", async ({ page }) => {
    await page.goto("/pt/");
    await expect(page.getByRole("heading", { level: 1, name: "Pedro Borges" })).toBeVisible();
    for (const title of ["Sobre", "Experiência", "Projetos", "Habilidades", "Formação", "Contato"]) {
      await expect(page.getByRole("heading", { level: 2, name: title })).toBeVisible();
    }
    await expect(page.getByRole("heading", { level: 3, name: /DMK3 Tecnologia/ })).toBeVisible();
  });

  test("has no horizontal overflow", async ({ page }) => {
    await page.goto("/pt/");
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBe(0);
  });
});
