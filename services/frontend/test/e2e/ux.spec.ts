import { expect, test, type Page } from "@playwright/test";

const dark = "rgb(12, 10, 9)";
const light = "rgb(250, 250, 249)";

const background = (page: Page) => page.evaluate(() => getComputedStyle(document.body).backgroundColor);

test.describe("theme", () => {
  test("follows the system until a theme is chosen", async ({ browser }) => {
    const context = await browser.newContext({ colorScheme: "dark" });
    const page = await context.newPage();
    await page.goto("/pt/");
    await expect(page.getByRole("combobox", { name: "Tema" })).toHaveValue("system");
    expect(await background(page)).toBe(dark);
    await context.close();
  });

  test("keeps the chosen theme across reloads, languages and the 404", async ({ browser }) => {
    const context = await browser.newContext({ colorScheme: "dark" });
    const page = await context.newPage();
    await page.goto("/pt/");
    await page.getByRole("combobox", { name: "Tema" }).selectOption("light");
    await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
    expect(await background(page)).toBe(light);

    await page.reload();
    expect(await background(page)).toBe(light);

    await page.getByRole("navigation", { name: "Idioma" }).getByRole("link", { name: "EN" }).click();
    await expect(page).toHaveURL(/\/en\/$/);
    await expect(page.getByRole("combobox", { name: "Theme" })).toHaveValue("light");
    expect(await background(page)).toBe(light);

    await page.goto("/pagina-que-nao-existe/");
    expect(await background(page)).toBe(light);

    await page.goto("/en/");
    await page.getByRole("combobox", { name: "Theme" }).selectOption("system");
    await expect(page.locator("html")).not.toHaveAttribute("data-theme");
    expect(await background(page)).toBe(dark);
    await context.close();
  });

  test("applies the stored theme before any app script runs (no flash)", async ({ browser }) => {
    const context = await browser.newContext({ colorScheme: "light" });
    await context.addInitScript(() => localStorage.setItem("theme", "dark"));
    const page = await context.newPage();
    // Blocking the Next.js bundles leaves only the inline <head> script, so the theme can't come from React.
    await page.route("**/_next/static/chunks/*.js", (route) => route.abort());
    await page.goto("/pt/");
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
    expect(await background(page)).toBe(dark);
    await context.close();
  });

  test("the native option list is readable in dark mode", async ({ browser }) => {
    // Form controls inherit the text color (Tailwind preflight); without an explicit background the native
    // popup showed light text on the browser's white default.
    const context = await browser.newContext({ colorScheme: "dark" });
    const page = await context.newPage();
    await page.goto("/pt/");
    const option = page.getByRole("combobox", { name: "Tema" }).locator("option").first();
    const colors = await option.evaluate((element) => {
      const style = getComputedStyle(element);
      return { color: style.color, background: style.backgroundColor };
    });
    expect(colors).toEqual({ color: "rgb(245, 245, 244)", background: "rgb(28, 25, 23)" });
    await context.close();
  });

  test("follows the system without JavaScript", async ({ browser }) => {
    const context = await browser.newContext({ colorScheme: "dark", javaScriptEnabled: false });
    const page = await context.newPage();
    await page.goto("/pt/");
    expect(await background(page)).toBe(dark);
    await context.close();
  });
});

test.describe("section menu", () => {
  test("highlights the section being read", async ({ page, isMobile }) => {
    test.skip(isMobile, "the section menu is only shown from md up");
    await page.goto("/pt/");
    const menu = page.getByRole("navigation", { name: "Navegação principal" });
    await expect(menu.locator('[aria-current="location"]')).toHaveCount(0);

    for (const [id, name] of [
      ["experience", "Experiência"],
      ["projects", "Projetos"],
      ["skills", "Habilidades"],
    ]) {
      await menu.getByRole("link", { name }).click();
      await expect(menu.getByRole("link", { name })).toHaveAttribute("aria-current", "location");
      await expect(menu.locator('[aria-current="location"]'), id).toHaveCount(1);
    }

    await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
    await expect(menu.getByRole("link", { name: "Contato" })).toHaveAttribute("aria-current", "location");
  });
});
