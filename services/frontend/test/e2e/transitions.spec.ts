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
  test("sweeps the new colors across the old ones and ends on the chosen theme", async ({ browser }) => {
    const context = await browser.newContext({ colorScheme: "light" });
    const page = await context.newPage();
    await page.goto("/pt/");
    // The view transition starts asynchronously after the click; slowed down, a busy machine can't miss it by reading
    // too early or too late.
    const restoreAnimations = await slowAnimations(page);
    await chooseTheme(page, "Escuro");

    // Only the new snapshot animates (the 700 ms sweep of its mask); the old one stays still underneath, instead of
    // fading out as in the language switch.
    await expect
      .poll(() => rootTransitionAnimations(page))
      .toContainEqual({ pseudo: "::view-transition-new(root)", duration: 700 });
    const animations = await rootTransitionAnimations(page);
    expect(animations.map(({ pseudo }) => pseudo)).not.toContain("::view-transition-old(root)");
    await expect(page.locator("html")).toHaveAttribute("data-theme-transition", "");
    // The list closed before the old state was captured.
    await expect(page.getByRole("listbox", { name: "Tema" })).toBeHidden();

    await restoreAnimations();
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

// Microinteractions last 150 ms, less than a round trip to the page; slowing Chromium's animations down 10x lets the
// test see them running instead of racing them. Returns a function that puts them back to normal speed.
async function slowAnimations(page: Page) {
  const cdp = await page.context().newCDPSession(page);
  await cdp.send("Animation.enable");
  await cdp.send("Animation.setPlaybackRate", { playbackRate: 0.1 });
  return () => cdp.send("Animation.setPlaybackRate", { playbackRate: 1 });
}

// Running CSS animations and transitions on one element, by name (animation) or property (transition).
const running = (page: Page, selector: string) =>
  page.locator(selector).first().evaluate((element) =>
    element
      .getAnimations()
      .map((animation) =>
        animation instanceof CSSAnimation ? animation.animationName : (animation as CSSTransition).transitionProperty,
      ),
  );

test.describe("microinteractions", () => {
  test.use({ permissions: ["clipboard-read", "clipboard-write"] });

  test("the theme list fades and slides in when it opens", async ({ page }) => {
    await page.goto("/pt/");
    await slowAnimations(page);
    await page.getByRole("combobox", { name: "Tema" }).click();
    expect(await running(page, '[role="listbox"]')).toEqual(expect.arrayContaining(["opacity", "translate"]));
  });

  test("the copy button's new label fades in, but not on page load", async ({ page }) => {
    await page.goto("/pt/");
    const button = page.locator("#top").getByRole("button", { name: "Copiar e-mail" });
    expect(await button.locator("> span").evaluate((label) => label.getAnimations().length)).toBe(0);
    await slowAnimations(page);
    await button.click();
    await expect(button).toHaveText("Copiado!");
    expect(await button.locator("> span").evaluate((label) => label.getAnimations().map((a) => (a as CSSAnimation).animationName))).toEqual(["fade-in"]);
  });

  test("the details arrow nudges right on hover", async ({ page, isMobile }) => {
    test.skip(isMobile, "hover is a pointer interaction");
    await page.goto("/pt/");
    const open = page.getByRole("button", { name: "Ver detalhes do projeto Plataforma Financeira" });
    await open.hover();
    // Tailwind 4's translate-* utilities set the `translate` property, not `transform`.
    await expect.poll(() => open.locator("> span").evaluate((arrow) => getComputedStyle(arrow).translate)).toBe("4px");
  });

  test("the carousel arrows shrink slightly while pressed", async ({ page }) => {
    await page.goto("/pt/");
    const next = page.getByRole("button", { name: "Próximo projeto" });
    await next.hover();
    await page.mouse.down();
    await expect.poll(() => next.evaluate((button) => getComputedStyle(button).scale)).toBe("0.95");
    await page.mouse.up();
    await expect.poll(() => next.evaluate((button) => getComputedStyle(button).scale)).toBe("none");
  });

  test.describe("with reduced motion", () => {
    test.use({ reducedMotion: "reduce" });

    test("none of them move", async ({ page, isMobile }) => {
      await page.goto("/pt/");
      await slowAnimations(page);
      await page.getByRole("combobox", { name: "Tema" }).click();
      expect(await running(page, '[role="listbox"]')).toEqual([]);
      await page.keyboard.press("Escape");

      const copy = page.locator("#top").getByRole("button", { name: "Copiar e-mail" });
      await copy.click();
      await expect(copy).toHaveText("Copiado!");
      expect(await copy.locator("> span").evaluate((label) => label.getAnimations().length)).toBe(0);

      const next = page.getByRole("button", { name: "Próximo projeto" });
      await next.hover();
      await page.mouse.down();
      await page.waitForTimeout(100);
      expect(await next.evaluate((button) => getComputedStyle(button).scale)).not.toBe("0.95");
      await page.mouse.up();

      if (!isMobile) {
        const open = page.getByRole("button", { name: "Ver detalhes do projeto Plataforma Financeira" });
        await open.hover();
        await page.waitForTimeout(100);
        expect(await open.locator("> span").evaluate((arrow) => getComputedStyle(arrow).translate)).toBe("none");
      }
    });
  });
});
