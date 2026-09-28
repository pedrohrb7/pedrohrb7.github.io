import { findActiveSection } from "./active-section";

const sections = [
  { id: "about", top: 500 },
  { id: "experience", top: 1200 },
  { id: "contact", top: 3000 },
];

describe("findActiveSection", () => {
  it("is none while the reader is still above the first section", () => {
    expect(findActiveSection(sections, 200, false)).toBeNull();
  });

  it("is the last section whose top passed the line", () => {
    expect(findActiveSection(sections, 500, false)).toBe("about");
    expect(findActiveSection(sections, 1500, false)).toBe("experience");
  });

  it("is the last section at the bottom of the page, even if it never reached the line", () => {
    expect(findActiveSection(sections, 1500, true)).toBe("contact");
  });

  it("is none without sections", () => {
    expect(findActiveSection([], 0, true)).toBeNull();
  });
});
