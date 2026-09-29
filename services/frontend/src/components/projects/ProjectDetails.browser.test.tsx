import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { page, userEvent } from "vitest/browser";
import { pt } from "@/content/pt";
import type { Project } from "@/types/content";
import "@/styles/globals.css";
import { ProjectsSection } from "./ProjectsSection";

// Real Chromium with the site's CSS: the modal dialog, the top layer, the backdrop and history are the real ones.
// Next.js' history patches are covered by the e2e suite once real content has details.

const withDetails: Project = {
  name: "Alfa",
  slug: "alfa",
  role: "Full-Stack",
  description: "Alfa: descrição do projeto de exemplo.",
  stack: ["TypeScript", "React"],
  highlights: ["Alfa destaque 1."],
  details: {
    caseStudy: [
      { heading: "O desafio", body: Array.from({ length: 12 }, (_, i) => `Parágrafo ${i + 1} do desafio do Alfa.`) },
      { heading: "Arquitetura e decisões", body: ["Decisão técnica do Alfa."] },
    ],
    stackByLayer: [
      { label: "Front-end", items: ["React", "Next.js"] },
      { label: "Back-end", items: ["NestJS", "MongoDB"] },
    ],
  },
};

const withoutDetails: Project = {
  name: "Beta",
  role: "Full-Stack",
  description: "Beta: descrição do projeto de exemplo.",
  stack: ["TypeScript"],
  highlights: ["Beta destaque 1."],
};

function renderSection(projects: Project[] = [withDetails, withoutDetails]) {
  return render(
    <main className="mx-auto max-w-content px-4 sm:px-6">
      <ProjectsSection content={{ ...pt, projects }} />
      {/* Makes the page scroll, to check that it stays put behind the drawer. */}
      <div className="h-[3000px]" />
    </main>,
  );
}

const openButton = () => screen.getByRole("button", { name: "Ver detalhes do projeto Alfa" });
const drawer = () => screen.getByRole("dialog", { name: "Alfa" });
const queryDrawer = () => screen.queryByRole("dialog");
const closeButton = () => within(drawer()).getByRole("button", { name: "Fechar detalhes" });
const box = () => drawer().getBoundingClientRect();

// Each test starts on a clean URL: pushState entries from a previous test would otherwise leak.
beforeEach(() => window.history.replaceState(null, "", window.location.pathname));
afterEach(() => {
  cleanup();
  window.history.replaceState(null, "", window.location.pathname);
});

describe("project details drawer (desktop)", () => {
  beforeEach(() => page.viewport(1280, 900));

  it("opens from the card as a labelled modal with the case study and the stack by layer", async () => {
    renderSection();
    expect(queryDrawer()).toBeNull();
    await userEvent.click(openButton());

    expect(drawer()).toBeVisible();
    expect(drawer().matches(":modal")).toBe(true);
    expect(drawer()).toHaveFocus();
    expect(within(drawer()).getByRole("heading", { level: 2, name: "Alfa" })).toBeVisible();
    expect(within(drawer()).getByRole("heading", { level: 3, name: "O desafio" })).toBeVisible();
    expect(within(drawer()).getByRole("heading", { level: 3, name: "Stack por camada" })).toBeInTheDocument();
    expect(within(drawer()).getByRole("list", { name: "Back-end" })).toBeInTheDocument();
    expect(window.location.hash).toBe("#projeto-alfa");
  });

  it("only shows the button on projects with details", () => {
    renderSection();
    expect(screen.getAllByRole("button", { name: /^Ver detalhes/ })).toHaveLength(1);
  });

  it("sits on the right edge, full height, as wide as the drawer token", async () => {
    renderSection();
    await userEvent.click(openButton());
    await expect.poll(() => Math.round(box().right)).toBe(1280);
    expect(Math.round(box().top)).toBe(0);
    expect(Math.round(box().height)).toBe(900);
    expect(Math.round(box().width)).toBe(560);
  });

  it("closes with the x and gives the focus back to the button", async () => {
    renderSection();
    await userEvent.click(openButton());
    await userEvent.click(closeButton());
    expect(queryDrawer()).toBeNull();
    expect(openButton()).toHaveFocus();
    await expect.poll(() => window.location.hash).toBe("");
  });

  it("closes with Esc", async () => {
    renderSection();
    await userEvent.click(openButton());
    await userEvent.keyboard("{Escape}");
    expect(queryDrawer()).toBeNull();
    await expect.poll(() => window.location.hash).toBe("");
  });

  it("closes with a click outside, but not with a click inside", async () => {
    renderSection();
    await userEvent.click(openButton());
    await userEvent.click(within(drawer()).getByText("Decisão técnica do Alfa."));
    expect(drawer()).toBeVisible();

    // The backdrop: left of the drawer.
    await userEvent.click(drawer(), { position: { x: -200, y: 200 } });
    expect(queryDrawer()).toBeNull();
  });

  it("closes with the browser's Back and keeps the page", async () => {
    renderSection();
    await userEvent.click(openButton());
    expect(window.location.hash).toBe("#projeto-alfa");

    window.history.back();
    await expect.poll(() => queryDrawer()).toBeNull();
    expect(window.location.hash).toBe("");
  });

  it("closing pops the entry it pushed, so Back doesn't reopen the drawer", async () => {
    renderSection();
    await userEvent.click(openButton());
    await userEvent.click(closeButton());
    await expect.poll(() => window.location.hash).toBe("");

    window.history.back();
    // Give a wrongly reopened drawer the chance to show up.
    await new Promise((resolve) => setTimeout(resolve, 200));
    expect(queryDrawer()).toBeNull();
  });

  it("opens from a link with the hash and closes by cleaning the URL, not by going back", async () => {
    window.history.replaceState(null, "", "#anterior");
    window.history.pushState(null, "", "#projeto-alfa");
    renderSection();
    await expect.poll(() => queryDrawer()).not.toBeNull();

    await userEvent.click(closeButton());
    // A Back would have landed on the previous entry (#anterior), leaving the page the visitor arrived at.
    await new Promise((resolve) => setTimeout(resolve, 200));
    expect(window.location.hash).toBe("");
  });

  it("follows a hash typed in the address bar", async () => {
    renderSection();
    window.location.hash = "projeto-alfa";
    await expect.poll(() => queryDrawer()).not.toBeNull();
  });

  it("ignores an unknown hash", async () => {
    window.history.replaceState(null, "", "#projeto-inexistente");
    renderSection();
    await new Promise((resolve) => setTimeout(resolve, 200));
    expect(queryDrawer()).toBeNull();
  });

  it("keeps the page from scrolling while open", async () => {
    renderSection();
    await userEvent.click(openButton());
    expect(getComputedStyle(document.documentElement).overflow).toBe("hidden");
    await userEvent.click(closeButton());
    expect(getComputedStyle(document.documentElement).overflow).not.toBe("hidden");
  });

  it("scrolls long content inside the drawer, under a fixed header", async () => {
    renderSection();
    await userEvent.click(openButton());
    const body = drawer().lastElementChild as HTMLElement;
    expect(body.scrollHeight).toBeGreaterThan(body.clientHeight);
    body.scrollTop = body.scrollHeight;
    expect(within(drawer()).getByRole("heading", { level: 2, name: "Alfa" })).toBeVisible();
    expect(closeButton()).toBeVisible();
  });
});

describe("project details drawer (mobile)", () => {
  beforeEach(() => page.viewport(360, 740));

  it("is a bottom sheet across the screen, below the top, without horizontal overflow", async () => {
    renderSection();
    await userEvent.click(openButton());
    await expect.poll(() => Math.round(box().bottom)).toBe(740);
    expect(Math.round(box().left)).toBe(0);
    expect(Math.round(box().width)).toBe(360);
    expect(box().top).toBeGreaterThan(0);
    expect(document.documentElement.scrollWidth).toBe(360);
  });

  it("reaches the close button with Tab", async () => {
    renderSection();
    await userEvent.click(openButton());
    await userEvent.keyboard("{Tab}");
    expect(closeButton()).toHaveFocus();
  });

  it("keeps the close button a 44px target", async () => {
    renderSection();
    await userEvent.click(openButton());
    const { width, height } = closeButton().getBoundingClientRect();
    expect([width, height]).toEqual([44, 44]);
  });
});
