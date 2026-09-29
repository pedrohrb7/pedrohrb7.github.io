import { closeAction, projectHash } from "./project-details";

describe("projectHash", () => {
  it("joins the language prefix and the slug", () => {
    expect(projectHash("projeto-", "autosim")).toBe("#projeto-autosim");
    expect(projectHash("project-", "autosim")).toBe("#project-autosim");
  });
});

describe("closeAction", () => {
  const ownHash = "#projeto-autosim";

  it("goes back when the drawer's button pushed the entry", () => {
    expect(closeAction({ hash: ownHash, ownHash, pushed: true })).toBe("back");
  });

  it("replaces the URL when the page was opened with the hash", () => {
    expect(closeAction({ hash: ownHash, ownHash, pushed: false })).toBe("replace");
  });

  it("leaves the URL alone when the hash already changed", () => {
    expect(closeAction({ hash: "", ownHash, pushed: true })).toBe("none");
    expect(closeAction({ hash: "#projeto-outro", ownHash, pushed: false })).toBe("none");
  });
});
