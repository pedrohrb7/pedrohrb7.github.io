import { act, fireEvent, render, screen } from "@testing-library/react";
import { CopyField } from "./CopyField";

const labels = { copy: "Copiar", copyAriaLabel: "Copiar e-mail", copied: "Copiado!", failed: "Não foi possível copiar" };

function mockClipboard(writeText: (text: string) => Promise<void>) {
  Object.defineProperty(navigator, "clipboard", { value: { writeText }, configurable: true });
}

describe("CopyField", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it("shows the value as selectable text next to the copy button", () => {
    render(<CopyField value="pedro@example.com" labels={labels} />);
    expect(screen.getByText("pedro@example.com")).toHaveClass("select-all");
    expect(screen.getByRole("button", { name: "Copiar e-mail" })).toHaveTextContent("Copiar");
  });

  it("copies the value, confirms and goes back to the initial label", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    mockClipboard(writeText);
    render(<CopyField value="pedro@example.com" labels={labels} />);
    const button = screen.getByRole("button", { name: "Copiar e-mail" });

    await act(async () => fireEvent.click(button));
    expect(writeText).toHaveBeenCalledWith("pedro@example.com");
    expect(button).toHaveTextContent("Copiado!");
    expect(screen.getByText("Copiado!", { selector: "[aria-live]" })).toBeInTheDocument();

    act(() => vi.advanceTimersByTime(2000));
    expect(button).toHaveTextContent("Copiar");
  });

  it("tells the user when copying fails", async () => {
    mockClipboard(vi.fn().mockRejectedValue(new Error("denied")));
    render(<CopyField value="pedro@example.com" labels={labels} />);
    const button = screen.getByRole("button", { name: "Copiar e-mail" });

    await act(async () => fireEvent.click(button));
    expect(button).toHaveTextContent("Não foi possível copiar");
    // The address stays on screen for a manual copy.
    expect(screen.getByText("pedro@example.com")).toBeInTheDocument();
  });

  it("is hidden without JavaScript", () => {
    render(<CopyField value="pedro@example.com" labels={labels} />);
    expect(screen.getByRole("button", { name: "Copiar e-mail" })).toHaveAttribute("data-requires-js");
  });
});
