import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

// The repo-root .nvmrc is the single source of truth for the Node version.
// Docker and npm can't read it directly, so this keeps their copies in sync.
const read = (path: string) => readFileSync(fileURLToPath(new URL(path, import.meta.url)), "utf8");

const nvmrcVersion = read("../../../../.nvmrc").trim().replace(/^v/, "");

describe("Node version pin", () => {
  it(".nvmrc holds an exact version", () => {
    expect(nvmrcVersion).toMatch(/^\d+\.\d+\.\d+$/);
  });

  it("Dockerfile builds with the .nvmrc version", () => {
    expect(read("../../Dockerfile")).toContain(`ARG NODE_VERSION=${nvmrcVersion}\n`);
  });

  it("package.json engines requires the .nvmrc version", () => {
    const { engines } = JSON.parse(read("../../package.json")) as { engines: { node: string } };
    expect(engines.node).toBe(`^${nvmrcVersion}`);
  });

  it(".npmrc makes npm reject other Node versions", () => {
    expect(read("../../.npmrc")).toMatch(/^engine-strict=true$/m);
  });
});
