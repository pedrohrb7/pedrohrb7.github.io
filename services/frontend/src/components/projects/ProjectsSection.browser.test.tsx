import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { page, userEvent } from "vitest/browser";
import { pt } from "@/content/pt";
import type { Project } from "@/types/content";
import "@/styles/globals.css";
import { ProjectsSection } from "./ProjectsSection";

// Real Chromium with the site's CSS: scroll-snap, smooth scrolling and layout are the real ones.

const project = (name: string, highlights: number): Project => ({
  name,
  role: "Full-Stack",
  description: `${name}: descrição do projeto de exemplo.`,
  stack: ["TypeScript", "React"],
  highlights: Array.from({ length: highlights }, (_, i) => `${name} destaque ${i + 1}.`),
});

const three = [project("Alfa", 1), project("Beta", 3), project("Gama", 2)];

function renderSection(projects: Project[]) {
  return render(
    <main className="mx-auto max-w-content px-4 sm:px-6">
      <ProjectsSection content={{ ...pt, projects }} />
    </main>,
  );
}

const track = () => screen.getByRole("region", { name: "Lista de projetos" });
const slides = () => within(track()).getAllByRole("group");
const counter = () => screen.getByText(/^\d{2} \/ \d{2}$/);
const next = () => screen.getByRole("button", { name: "Próximo projeto" });
const previous = () => screen.getByRole("button", { name: "Projeto anterior" });

// Waits for the smooth scroll to settle and the counter to follow.
const expectCounter = (text: string) => expect.poll(() => counter().textContent, { timeout: 3000 }).toBe(text);

afterEach(cleanup);

describe("projects carousel (desktop)", () => {
  beforeEach(() => page.viewport(1280, 900));

  it("exposes the carousel semantics and starts on the first project", () => {
    renderSection(three);
    expect(screen.getByRole("region", { name: "Projetos" })).toHaveAttribute("aria-roledescription", "carrossel");
    expect(slides().map((slide) => slide.getAttribute("aria-label"))).toEqual(["1 de 3", "2 de 3", "3 de 3"]);
    expect(slides()[0]).toHaveAttribute("aria-roledescription", "projeto");
    expect(counter()).toHaveTextContent("01 / 03");
    expect(counter()).toHaveAttribute("aria-live", "polite");
    expect(previous()).toBeDisabled();
    expect(next()).toBeEnabled();
    expect(screen.getByRole("button", { name: "Ir para o projeto 1" })).toHaveAttribute("aria-current", "true");
  });

  it("moves with the buttons and the indicators, disabling the buttons at the ends", async () => {
    renderSection(three);
    await userEvent.click(next());
    await expectCounter("02 / 03");
    expect(screen.getByRole("button", { name: "Ir para o projeto 2" })).toHaveAttribute("aria-current", "true");
    expect(previous()).toBeEnabled();

    await userEvent.click(screen.getByRole("button", { name: "Ir para o projeto 3" }));
    await expectCounter("03 / 03");
    expect(next()).toBeDisabled();
    // Once the smooth scroll settles, the last slide is snapped to the start of the track. (The counter already
    // shows the nearest slide mid-scroll, so it can't be used to know when the scroll ended.)
    await expect.poll(() => Math.round(track().scrollLeft), { timeout: 3000 }).toBe(slides()[2].offsetLeft);

    await userEvent.click(previous());
    await expectCounter("02 / 03");
  });

  it("gives every card the height of the tallest one, with the tags at the bottom", () => {
    renderSection(three);
    // "Alfa" has 1 highlight and "Beta" 3: without stretching, their cards would have different heights.
    const cards = within(track()).getAllByRole("article");
    const heights = cards.map((card) => card.getBoundingClientRect().height);
    expect(new Set(heights).size).toBe(1);
    expect(track().clientHeight).toBe(Math.round(heights[0]));

    const tagsBottom = (card: HTMLElement) => within(card).getByRole("list", { name: /^Stack:/ }).getBoundingClientRect().bottom;
    expect(tagsBottom(cards[0])).toBe(tagsBottom(cards[1]));
  });

  it("follows a manual scroll (swipe or trackpad)", async () => {
    renderSection(three);
    track().scrollTo({ left: slides()[2].offsetLeft, behavior: "instant" });
    await expectCounter("03 / 03");
  });

  it("scrolls one project per arrow key when the track has focus", async () => {
    renderSection(three);
    track().focus();
    await userEvent.keyboard("{ArrowRight}");
    await expectCounter("02 / 03");
  });

  it("shows one project at a time", () => {
    renderSection(three);
    expect(slides()[0].getBoundingClientRect().width).toBe(track().clientWidth);
  });
});

describe("projects carousel (mobile)", () => {
  beforeEach(() => page.viewport(360, 740));

  it("lets the next project peek in and reaches the last one at the end", async () => {
    renderSection(three);
    const [first, second] = slides();
    const trackBox = track().getBoundingClientRect();
    expect(first.getBoundingClientRect().width).toBeLessThan(trackBox.width);
    expect(second.getBoundingClientRect().left).toBeLessThan(trackBox.right);
    expect(document.documentElement.scrollWidth).toBe(360);

    await userEvent.click(screen.getByRole("button", { name: "Ir para o projeto 3" }));
    await expectCounter("03 / 03");
    expect(next()).toBeDisabled();
  });
});

describe("a single project", () => {
  beforeEach(() => page.viewport(1280, 900));

  it("is a plain card without carousel controls or semantics", () => {
    renderSection([project("Alfa", 2)]);
    expect(screen.getByRole("heading", { level: 3, name: "Alfa" })).toBeVisible();
    expect(screen.queryByRole("button")).toBeNull();
    expect(screen.queryByRole("group")).toBeNull();
    expect(screen.getByRole("region", { name: "Projetos" })).not.toHaveAttribute("aria-roledescription");
  });
});
