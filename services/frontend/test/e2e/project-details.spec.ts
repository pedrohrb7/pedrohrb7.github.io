import { expect, test } from "@playwright/test";

// Runs against the real content and the real Next.js router (its history patches decide whether Back reloads the
// page). Edge cases (click outside, focus, unknown hash, scroll lock, layout) are covered in Chromium by
// src/components/projects/ProjectDetails.browser.test.tsx.
test.describe("project details drawer", () => {
  test("opens from the card, closes with the x and with Back without reloading the page", async ({ page }) => {
    await page.goto("/pt/");
    await page.evaluate(() => ((window as Window & { marker?: boolean }).marker = true));
    const open = page.getByRole("button", { name: "Ver detalhes do projeto Plataforma Financeira" });
    const drawer = page.getByRole("dialog", { name: "Plataforma Financeira" });

    await open.click();
    await expect(drawer).toBeVisible();
    await expect(drawer.getByRole("heading", { level: 3, name: "Contexto e desafio" })).toBeVisible();
    await expect(page).toHaveURL(/\/pt\/#projeto-plataforma-financeira$/);

    await drawer.getByRole("button", { name: "Fechar detalhes" }).click();
    await expect(drawer).toBeHidden();
    await expect(page).toHaveURL(/\/pt\/$/);
    await expect(open).toBeFocused();

    await open.click();
    await expect(drawer).toBeVisible();
    await page.goBack();
    await expect(drawer).toBeHidden();
    await expect(page).toHaveURL(/\/pt\/$/);
    expect(await page.evaluate(() => (window as Window & { marker?: boolean }).marker)).toBe(true);
  });

  test("closes with Esc", async ({ page }) => {
    await page.goto("/pt/");
    await page.getByRole("button", { name: "Ver detalhes do projeto Plataforma Financeira" }).click();
    const drawer = page.getByRole("dialog", { name: "Plataforma Financeira" });
    await expect(drawer).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(drawer).toBeHidden();
  });

  test("a link with the hash opens the drawer, in each language", async ({ page }) => {
    await page.goto("/en/#project-plataforma-financeira");
    await expect(page.getByRole("dialog", { name: "Financial Platform" })).toBeVisible();
    await expect(page.getByRole("heading", { level: 3, name: "Context and challenge" })).toBeVisible();

    await page.goto("/pt/#projeto-plataforma-financeira");
    await expect(page.getByRole("dialog", { name: "Plataforma Financeira" })).toBeVisible();
  });

  test("only projects with details have the button", async ({ page }) => {
    await page.goto("/pt/");
    await expect(page.locator("#projects").getByRole("button", { name: /^Ver detalhes/ })).toHaveCount(1);
  });

  test("has no horizontal overflow with the drawer open", async ({ page }) => {
    await page.goto("/pt/#projeto-plataforma-financeira");
    await expect(page.getByRole("dialog")).toBeVisible();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBe(0);
  });
});
