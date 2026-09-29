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
