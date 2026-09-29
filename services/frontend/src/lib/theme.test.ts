import { themeTransitionAttribute, transitionTheme } from "./theme";

// A document with a controllable View Transitions API: each started transition is returned so the test decides when
// it finishes.
function fakeDocument({ reduceMotion = false, viewTransitions = true } = {}) {
  const root = document.createElement("html");
  const started: { update: () => void; finish: () => Promise<void> }[] = [];
  const doc = {
    documentElement: root,
    defaultView: { matchMedia: () => ({ matches: reduceMotion }) },
    startViewTransition: viewTransitions
      ? (update: () => void) => {
          let finish!: () => void;
          const finished = new Promise<void>((resolve) => (finish = resolve));
          update();
          started.push({ update, finish: async () => (finish(), await finished, await Promise.resolve()) });
          return { finished } as unknown as ViewTransition;
        }
      : undefined,
  } as unknown as Document;
  return { doc, root, started };
}

describe("transitionTheme", () => {
  it("runs the change inside a view transition and marks <html> until it ends", async () => {
    const { doc, root, started } = fakeDocument();
    const update = vi.fn();
    transitionTheme(update, doc);

    expect(update).toHaveBeenCalledTimes(1);
    expect(started).toHaveLength(1);
    expect(root.hasAttribute(themeTransitionAttribute)).toBe(true);

    await started[0].finish();
    expect(root.hasAttribute(themeTransitionAttribute)).toBe(false);
  });

  it("keeps the mark while a newer change is still running", async () => {
    const { doc, root, started } = fakeDocument();
    transitionTheme(() => {}, doc);
    transitionTheme(() => {}, doc);

    await started[0].finish();
    expect(root.hasAttribute(themeTransitionAttribute)).toBe(true);
    await started[1].finish();
    expect(root.hasAttribute(themeTransitionAttribute)).toBe(false);
  });

  it("just runs the change with reduced motion", () => {
    const { doc, root, started } = fakeDocument({ reduceMotion: true });
    const update = vi.fn();
    transitionTheme(update, doc);
    expect(update).toHaveBeenCalledTimes(1);
    expect(started).toHaveLength(0);
    expect(root.hasAttribute(themeTransitionAttribute)).toBe(false);
  });

  it("just runs the change without the View Transitions API", () => {
    const { doc, root } = fakeDocument({ viewTransitions: false });
    const update = vi.fn();
    transitionTheme(update, doc);
    expect(update).toHaveBeenCalledTimes(1);
    expect(root.hasAttribute(themeTransitionAttribute)).toBe(false);
  });
});
