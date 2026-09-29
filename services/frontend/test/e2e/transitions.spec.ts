import { expect, test, type Page } from "@playwright/test";

// docs/features/ui-transitions/. The pagereveal event of the new page carries the view transition the browser started
// for the navigation (null when there is none), which tells whether the language switch cross-faded.
async function recordPageReveal(page: Page) {
  await page.addInitScript(() => {
    window.addEventListener("pagereveal", (event) => {
      (window as Window & { revealedWithTransition?: boolean }).revealedWithTransition = Boolean(
        (event as Event & { viewTransition?: unknown }).viewTransition,
      );
    });
  });
}

const revealedWithTransition = (page: Page) =>
  page.evaluate(() => (window as Window & { revealedWithTransition?: boolean }).revealedWithTransition);

async function switchToEnglish(page: Page) {
  await page.getByRole("navigation", { name: "Idioma" }).getByRole("link", { name: "EN" }).click();
  await expect(page).toHaveURL(/\/en\/$/);
}

// The view transition's pseudo-elements animate on <html>; their animations show whether a transition ran and which.
const rootTransitionAnimations = (page: Page) =>
  page.evaluate(() =>
    document.documentElement
      .getAnimations({ subtree: true })
      .map((animation) => ({
        pseudo: (animation.effect as KeyframeEffect).pseudoElement,
        duration: (animation.effect as KeyframeEffect).getTiming().duration,
      }))
      .filter(({ pseudo }) => pseudo?.startsWith("::view-transition-")),
  );

async function chooseTheme(page: Page, option: string) {
  await page.getByRole("combobox", { name: "Tema" }).click();
  await page.getByRole("listbox", { name: "Tema" }).getByRole("option", { name: option }).click();
}

const background = (page: Page) => page.evaluate(() => getComputedStyle(document.body).backgroundColor);

test.describe("theme change transition", () => {
  test("cross-fades the colors and ends on the chosen theme", async ({ browser }) => {
    const context = await browser.newContext({ colorScheme: "light" });
    const page = await context.newPage();
    await page.goto("/pt/");
    await chooseTheme(page, "Escuro");

    // Both sides of the cross-fade run for 500 ms (the theme's own timing, not the language switch's sequence).
    const animations = await rootTransitionAnimations(page);
    expect(animations).toEqual(
      expect.arrayContaining([
        { pseudo: "::view-transition-old(root)", duration: 500 },
        { pseudo: "::view-transition-new(root)", duration: 500 },
      ]),
    );
    await expect(page.locator("html")).toHaveAttribute("data-theme-transition", "");
    // The list closed before the old state was captured.
    await expect(page.getByRole("listbox", { name: "Tema" })).toBeHidden();

    await expect(page.locator("html")).not.toHaveAttribute("data-theme-transition");
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
    expect(await background(page)).toBe("rgb(12, 10, 9)");
    expect(await rootTransitionAnimations(page)).toEqual([]);
    await context.close();
  });

  test("changes at once with reduced motion", async ({ browser }) => {
    const context = await browser.newContext({ colorScheme: "light", reducedMotion: "reduce" });
    const page = await context.newPage();
    await page.goto("/pt/");
    await chooseTheme(page, "Escuro");
    expect(await rootTransitionAnimations(page)).toEqual([]);
    await expect(page.locator("html")).not.toHaveAttribute("data-theme-transition");
    expect(await background(page)).toBe("rgb(12, 10, 9)");
    await context.close();
  });
});

test.describe("language switch transition", () => {
  test("fades from one language to the other", async ({ page }) => {
    await recordPageReveal(page);
    await page.goto("/pt/");
    // The first load isn't a navigation between our pages, so it doesn't animate.
    expect(await revealedWithTransition(page)).toBe(false);

    await switchToEnglish(page);
    expect(await revealedWithTransition(page)).toBe(true);
    // The transition ends with the new page fully shown.
    await expect.poll(() => page.evaluate(() => document.getAnimations().length)).toBe(0);
    await expect(page.getByRole("heading", { level: 2, name: "Experience" })).toBeVisible();
  });

  test.describe("with reduced motion", () => {
    test.use({ reducedMotion: "reduce" });

    test("switches without a transition", async ({ page }) => {
      await recordPageReveal(page);
      await page.goto("/pt/");
      await switchToEnglish(page);
      expect(await revealedWithTransition(page)).toBe(false);
    });
  });
});
