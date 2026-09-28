import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { themeStorageKey } from "@/lib/theme";
import { ThemeSelect } from "./ThemeSelect";

const labels = { label: "Tema", options: { system: "Sistema", light: "Claro", dark: "Escuro" } };

const trigger = () => screen.getByRole("combobox", { name: "Tema" });
// No name filter: hidden elements (the closed list) have an empty accessible name for Testing Library.
const list = () => screen.getByRole("listbox", { hidden: true });
const selectedOption = () => within(list()).getByRole("option", { selected: true, hidden: true });

describe("ThemeSelect", () => {
  beforeEach(() => {
    localStorage.clear();
    delete document.documentElement.dataset.theme;
  });

  it("starts closed on the system theme, listing every theme", () => {
    render(<ThemeSelect labels={labels} />);
    expect(trigger()).toHaveAttribute("aria-expanded", "false");
    expect(list()).not.toBeVisible();
    expect(within(list()).getAllByRole("option", { hidden: true }).map((option) => option.textContent)).toEqual([
      "Sistema",
      "Claro",
      "Escuro",
    ]);
    expect(selectedOption()).toHaveTextContent("Sistema");
    expect(document.documentElement).not.toHaveAttribute("data-theme");
  });

  it("opens on click and applies and stores the chosen theme", () => {
    render(<ThemeSelect labels={labels} />);
    fireEvent.click(trigger());
    expect(trigger()).toHaveAttribute("aria-expanded", "true");
    expect(list()).toBeVisible();

    fireEvent.click(screen.getByRole("option", { name: "Escuro" }));
    expect(trigger()).toHaveAttribute("aria-expanded", "false");
    expect(trigger()).toHaveFocus();
    expect(selectedOption()).toHaveTextContent("Escuro");
    expect(document.documentElement).toHaveAttribute("data-theme", "dark");
    expect(localStorage.getItem(themeStorageKey)).toBe("dark");
  });

  it("works with the keyboard", () => {
    render(<ThemeSelect labels={labels} />);
    trigger().focus();

    fireEvent.keyDown(trigger(), { key: "ArrowDown" });
    expect(trigger()).toHaveAttribute("aria-expanded", "true");
    // Opens on the current theme.
    expect(trigger()).toHaveAttribute("aria-activedescendant", screen.getByRole("option", { name: "Sistema" }).id);

    fireEvent.keyDown(trigger(), { key: "End" });
    expect(trigger()).toHaveAttribute("aria-activedescendant", screen.getByRole("option", { name: "Escuro" }).id);
    fireEvent.keyDown(trigger(), { key: "ArrowUp" });
    expect(trigger()).toHaveAttribute("aria-activedescendant", screen.getByRole("option", { name: "Claro" }).id);
    fireEvent.keyDown(trigger(), { key: "Enter" });
    expect(trigger()).toHaveAttribute("aria-expanded", "false");
    expect(document.documentElement).toHaveAttribute("data-theme", "light");

    fireEvent.keyDown(trigger(), { key: "Enter" });
    fireEvent.keyDown(trigger(), { key: "e" });
    expect(trigger()).toHaveAttribute("aria-activedescendant", screen.getByRole("option", { name: "Escuro" }).id);
    fireEvent.keyDown(trigger(), { key: "Escape" });
    expect(trigger()).toHaveAttribute("aria-expanded", "false");
    expect(document.documentElement).toHaveAttribute("data-theme", "light");
  });

  it("closes on a click outside without changing the theme", () => {
    render(
      <>
        <ThemeSelect labels={labels} />
        <p>fora</p>
      </>,
    );
    fireEvent.click(trigger());
    fireEvent.pointerDown(screen.getByText("fora"));
    expect(trigger()).toHaveAttribute("aria-expanded", "false");
    expect(document.documentElement).not.toHaveAttribute("data-theme");
  });

  it("starts on the stored theme", () => {
    localStorage.setItem(themeStorageKey, "light");
    render(<ThemeSelect labels={labels} />);
    expect(selectedOption()).toHaveTextContent("Claro");
    expect(document.documentElement).toHaveAttribute("data-theme", "light");
  });

  it("follows a choice made in another tab", () => {
    render(<ThemeSelect labels={labels} />);
    act(() => {
      localStorage.setItem(themeStorageKey, "dark");
      window.dispatchEvent(new StorageEvent("storage", { key: themeStorageKey }));
    });
    expect(selectedOption()).toHaveTextContent("Escuro");
    expect(document.documentElement).toHaveAttribute("data-theme", "dark");
  });

  it("ignores an unknown stored value", () => {
    localStorage.setItem(themeStorageKey, "sepia");
    render(<ThemeSelect labels={labels} />);
    expect(selectedOption()).toHaveTextContent("Sistema");
  });
});
