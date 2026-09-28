// @vitest-environment node
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { pdfColors } from "./theme";

// The PDF can't use CSS variables, so its colors are a copy of the light theme in tokens.css.
const tokensCss = readFileSync(fileURLToPath(new URL("../styles/tokens.css", import.meta.url)), "utf8");
const lightTheme = tokensCss.slice(tokensCss.indexOf("@theme {"), tokensCss.indexOf("}"));

describe("PDF theme", () => {
  it.each(Object.entries(pdfColors))("%s matches --color-%s in tokens.css", (name, value) => {
    expect(lightTheme).toContain(`--color-${name}: ${value};`);
  });
});
