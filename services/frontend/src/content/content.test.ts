import { en } from "./en";
import { pt } from "./pt";

// The drawer's link (#projeto-<slug> / #project-<slug>) must point at the same project in both languages.
describe("project details content", () => {
  const slugs = (projects: typeof pt.projects) => projects.map((project) => project.slug ?? null);

  it("gives the same projects details, with the same slugs, in PT and EN", () => {
    expect(slugs(en.projects)).toEqual(slugs(pt.projects));
  });

  it("uses unique, URL-safe slugs", () => {
    const used = slugs(pt.projects).filter((slug) => slug !== null);
    expect(new Set(used).size).toBe(used.length);
    for (const slug of used) expect(slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
  });

  it("has a case study and a stack by layer in every project with details", () => {
    for (const project of [...pt.projects, ...en.projects]) {
      if (!project.details) continue;
      expect(project.details.caseStudy.length, project.name).toBeGreaterThan(0);
      expect(project.details.stackByLayer.length, project.name).toBeGreaterThan(0);
    }
  });
});
