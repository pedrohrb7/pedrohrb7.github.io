import { expect, test, type Page } from "@playwright/test";

const dark = "rgb(12, 10, 9)";
const light = "rgb(250, 250, 249)";

const background = (page: Page) => page.evaluate(() => getComputedStyle(document.body).backgroundColor);

const themeButton = (page: Page, name = "Tema") => page.getByRole("combobox", { name });

async function chooseTheme(page: Page, option: string, name = "Tema") {
  await themeButton(page, name).click();
  await page.getByRole("listbox", { name }).getByRole("option", { name: option }).click();
}

const selected = (page: Page, name = "Tema") =>
  page.getByRole("listbox", { name, includeHidden: true }).getByRole("option", { selected: true, includeHidden: true });

// The trigger shows the effective scheme: exactly one of these is visible.
const visibleIcon = (page: Page) =>
  themeButton(page).evaluate((button) => {
    const [sun, moon] = [...button.querySelectorAll("span")].slice(0, 2);
    return getComputedStyle(sun).display !== "none" ? "sun" : getComputedStyle(moon).display !== "none" ? "moon" : "none";
  });

test.describe("theme", () => {
  test("follows the system until a theme is chosen", async ({ browser }) => {
    const context = await browser.newContext({ colorScheme: "dark" });
    const page = await context.newPage();
    await page.goto("/pt/");
    await expect(selected(page)).toHaveText("Sistema");
    expect(await background(page)).toBe(dark);
    expect(await visibleIcon(page)).toBe("moon");
    await context.close();
  });

  test("keeps the chosen theme across reloads, languages and the 404", async ({ browser }) => {
    const context = await browser.newContext({ colorScheme: "dark" });
    const page = await context.newPage();
    await page.goto("/pt/");
    await chooseTheme(page, "Claro");
    await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
    expect(await background(page)).toBe(light);
    // Forced light on a dark system: the icon follows the effective scheme, not the system.
    expect(await visibleIcon(page)).toBe("sun");

    await page.reload();
    expect(await background(page)).toBe(light);

    await page.getByRole("navigation", { name: "Idioma" }).getByRole("link", { name: "EN" }).click();
    await expect(page).toHaveURL(/\/en\/$/);
    await expect(selected(page, "Theme")).toHaveText("Light");
    expect(await background(page)).toBe(light);

    await page.goto("/pagina-que-nao-existe/");
    expect(await background(page)).toBe(light);

    await page.goto("/en/");
    await chooseTheme(page, "System", "Theme");
    await expect(page.locator("html")).not.toHaveAttribute("data-theme");
    expect(await background(page)).toBe(dark);
    await context.close();
  });

  test("the theme list works with the keyboard and closes outside", async ({ page }) => {
    await page.goto("/pt/");
    const list = page.getByRole("listbox", { name: "Tema" });
    await themeButton(page).focus();
    await page.keyboard.press("ArrowDown");
    await expect(list).toBeVisible();
    await page.keyboard.press("End");
    await page.keyboard.press("Enter");
    await expect(list).toBeHidden();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
    await expect(themeButton(page)).toBeFocused();

    await page.keyboard.press("Enter");
    await expect(list).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(list).toBeHidden();

    await themeButton(page).click();
    await page.mouse.click(10, 400);
    await expect(list).toBeHidden();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  });

  test("the theme list uses the site tokens and stays inside the viewport", async ({ browser }) => {
    const context = await browser.newContext({ colorScheme: "dark", viewport: { width: 360, height: 740 } });
    const page = await context.newPage();
    await page.goto("/pt/");
    await themeButton(page).click();
    const list = page.getByRole("listbox", { name: "Tema" });
    const style = await list.evaluate((element) => {
      const css = getComputedStyle(element);
      const box = element.getBoundingClientRect();
      return { background: css.backgroundColor, radius: css.borderRadius, left: box.left, right: box.right };
    });
    expect(style.background).toBe("rgb(28, 25, 23)");
    expect(style.radius).toBe("6px");
    expect(style.left).toBeGreaterThanOrEqual(0);
    expect(style.right).toBeLessThanOrEqual(360);
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
    // The icon is decided in CSS, so it is right without React too.
    expect(await visibleIcon(page)).toBe("moon");
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
