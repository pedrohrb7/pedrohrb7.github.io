// @vitest-environment node
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { lightColors } from "./tokens";

// Build-time renderers can't use CSS variables, so tokens.ts copies the light theme from tokens.css.
const tokensCss = readFileSync(fileURLToPath(new URL("./tokens.css", import.meta.url)), "utf8");
const lightTheme = tokensCss.slice(tokensCss.indexOf("@theme {"), tokensCss.indexOf("}"));

describe("light color tokens", () => {
  it.each(Object.entries(lightColors))("%s matches --color-%s in tokens.css", (name, value) => {
    expect(lightTheme).toContain(`--color-${name}: ${value};`);
  });

  it("covers every color in the light theme", () => {
    const cssNames = [...lightTheme.matchAll(/--color-([\w-]+):/g)].map(([, name]) => name);
    expect(Object.keys(lightColors).sort()).toEqual(cssNames.sort());
  });
});
