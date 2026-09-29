import { expect, test, type Locator } from "@playwright/test";

// Whether a slide starts inside the track horizontally. (Vertical visibility doesn't matter: on phones the cards are
// taller than the screen, so clicking the indicators below them scrolls the card's top out of view.)
const inTrack = (slide: Locator) =>
  slide.evaluate((element) => {
    const track = element.parentElement!.getBoundingClientRect();
    const box = element.getBoundingClientRect();
    return box.left >= track.left - 1 && box.left < track.right;
  });

// Runs against the real content. Edge cases (1 project, many projects, keyboard, peeking on mobile)
// are covered in Chromium by src/components/projects/ProjectsSection.browser.test.tsx.
test.describe("projects carousel", () => {
  test("shows every project and moves between them", async ({ page }) => {
    await page.goto("/pt/");
    const section = page.getByRole("region", { name: "Projetos", exact: true });
    await expect(section).toHaveAttribute("aria-roledescription", "carrossel");
    await expect(section.getByRole("group")).toHaveCount(2);

    const counter = section.getByText(/^\d{2} \/ \d{2}$/);
    const next = section.getByRole("button", { name: "Próximo projeto" });
    const previous = section.getByRole("button", { name: "Projeto anterior" });
    await expect(counter).toHaveText("01 / 02");
    await expect(previous).toBeDisabled();

    await next.click();
    await expect(counter).toHaveText("02 / 02");
    await expect(next).toBeDisabled();
    await expect.poll(() => inTrack(section.getByRole("group", { name: "2 de 2" }))).toBe(true);

    await section.getByRole("button", { name: "Ir para o projeto 1" }).click();
    await expect(counter).toHaveText("01 / 02");
    await expect.poll(() => inTrack(section.getByRole("group", { name: "1 de 2" }))).toBe(true);
  });

  test("the English page is translated", async ({ page }) => {
    await page.goto("/en/");
    const section = page.getByRole("region", { name: "Projects", exact: true });
    await expect(section).toHaveAttribute("aria-roledescription", "carousel");
    await expect(section.getByRole("group", { name: "1 of 2" })).toBeVisible();
    await expect(section.getByRole("button", { name: "Next project" })).toBeVisible();
  });

  test("without JavaScript the projects scroll and the controls are hidden", async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    await page.goto("/pt/");
    const section = page.locator("#projects");
    await expect(section.getByRole("heading", { level: 3, name: "Accountability" })).toBeAttached();
    await expect(section.getByRole("button")).toHaveCount(0);
    await context.close();
  });

  test("has no horizontal overflow", async ({ page }) => {
    await page.goto("/pt/");
    await page.locator("#projects").scrollIntoViewIfNeeded();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBe(0);
  });
});
