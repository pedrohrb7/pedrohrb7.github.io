import { act, fireEvent, render, screen } from "@testing-library/react";
import { themeStorageKey } from "@/lib/theme";
import { ThemeSelect } from "./ThemeSelect";

const labels = { label: "Tema", options: { system: "Sistema", light: "Claro", dark: "Escuro" } };

describe("ThemeSelect", () => {
  beforeEach(() => {
    localStorage.clear();
    delete document.documentElement.dataset.theme;
  });

  it("offers every theme and starts on the system one", () => {
    render(<ThemeSelect labels={labels} />);
    const select = screen.getByRole("combobox", { name: "Tema" });
    expect(select).toHaveValue("system");
    expect(screen.getAllByRole("option").map((option) => option.textContent)).toEqual(["Sistema", "Claro", "Escuro"]);
    expect(document.documentElement).not.toHaveAttribute("data-theme");
  });

  it("applies and stores the chosen theme", () => {
    render(<ThemeSelect labels={labels} />);
    const select = screen.getByRole("combobox", { name: "Tema" });

    fireEvent.change(select, { target: { value: "dark" } });
    expect(select).toHaveValue("dark");
    expect(document.documentElement).toHaveAttribute("data-theme", "dark");
    expect(localStorage.getItem(themeStorageKey)).toBe("dark");

    fireEvent.change(select, { target: { value: "system" } });
    expect(document.documentElement).not.toHaveAttribute("data-theme");
    expect(localStorage.getItem(themeStorageKey)).toBeNull();
  });

  it("starts on the stored theme", () => {
    localStorage.setItem(themeStorageKey, "light");
    render(<ThemeSelect labels={labels} />);
    expect(screen.getByRole("combobox", { name: "Tema" })).toHaveValue("light");
    expect(document.documentElement).toHaveAttribute("data-theme", "light");
  });

  it("follows a choice made in another tab", () => {
    render(<ThemeSelect labels={labels} />);
    act(() => {
      localStorage.setItem(themeStorageKey, "dark");
      window.dispatchEvent(new StorageEvent("storage", { key: themeStorageKey }));
    });
    expect(screen.getByRole("combobox", { name: "Tema" })).toHaveValue("dark");
    expect(document.documentElement).toHaveAttribute("data-theme", "dark");
  });

  it("ignores an unknown stored value", () => {
    localStorage.setItem(themeStorageKey, "sepia");
    render(<ThemeSelect labels={labels} />);
    expect(screen.getByRole("combobox", { name: "Tema" })).toHaveValue("system");
  });
});
