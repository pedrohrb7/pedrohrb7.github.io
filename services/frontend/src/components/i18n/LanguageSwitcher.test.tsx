import { render, screen } from "@testing-library/react";
import { LanguageSwitcher } from "./LanguageSwitcher";

describe("LanguageSwitcher", () => {
  it("links to every locale and marks the current one", () => {
    render(<LanguageSwitcher current="en" label="Language" />);

    const nav = screen.getByRole("navigation", { name: "Language" });
    expect(nav).toBeInTheDocument();

    const pt = screen.getByRole("link", { name: "PT" });
    const en = screen.getByRole("link", { name: "EN" });
    expect(pt).toHaveAttribute("href", "/pt/");
    expect(en).toHaveAttribute("href", "/en/");
    expect(en).toHaveAttribute("aria-current", "page");
    expect(pt).not.toHaveAttribute("aria-current");
  });
});
