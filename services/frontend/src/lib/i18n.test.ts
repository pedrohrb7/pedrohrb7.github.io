import { detectLocale, isLocale, localePath } from "./i18n";

describe("detectLocale", () => {
  it("matches a regional tag to its base language", () => {
    expect(detectLocale(["en-US", "pt-BR"])).toBe("en");
  });

  it("respects the browser's preference order", () => {
    expect(detectLocale(["pt-BR", "en"])).toBe("pt");
  });

  it("skips unsupported languages", () => {
    expect(detectLocale(["fr-FR", "EN-gb"])).toBe("en");
  });

  it("falls back to the default locale", () => {
    expect(detectLocale(["de", "ja"])).toBe("pt");
    expect(detectLocale([])).toBe("pt");
  });
});

describe("isLocale", () => {
  it("accepts only supported locales", () => {
    expect(isLocale("pt")).toBe(true);
    expect(isLocale("en")).toBe(true);
    expect(isLocale("es")).toBe(false);
  });
});

describe("localePath", () => {
  it("builds a trailing-slash path matching the static export layout", () => {
    expect(localePath("en")).toBe("/en/");
  });
});
