// @vitest-environment node
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { lightColors } from "./tokens";

// Build-time renderers can't use CSS variables, so tokens.ts copies the light side of each light-dark() in tokens.css.
const tokensCss = readFileSync(fileURLToPath(new URL("./tokens.css", import.meta.url)), "utf8");
const cssColors = Object.fromEntries(
  [...tokensCss.matchAll(/--color-([\w-]+): light-dark\((#[0-9a-f]{6}), (#[0-9a-f]{6})\);/g)].map(([, name, light]) => [
    name,
    light,
  ]),
);

describe("light color tokens", () => {
  it("every color in tokens.css is a light-dark() pair", () => {
    const declared = [...tokensCss.matchAll(/--color-([\w-]+):/g)].map(([, name]) => name);
    expect(Object.keys(cssColors).sort()).toEqual(declared.sort());
  });

  it("tokens.ts matches the light values in tokens.css", () => {
    expect(lightColors).toEqual(cssColors);
  });
});
