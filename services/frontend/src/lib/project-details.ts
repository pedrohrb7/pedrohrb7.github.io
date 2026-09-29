/*
 * Pure helpers for the project details drawer (src/components/projects/ProjectDetails.tsx). The drawer's link is a URL
 * hash, so a project can be shared already open: /pt/#projeto-autosim.
 */

export function projectHash(prefix: string, slug: string): string {
  return `#${prefix}${slug}`;
}

// What to do with the URL when the drawer closes (x, Esc, click outside):
// - "back": the drawer's button pushed a history entry, so going back removes it and Back doesn't reopen the drawer.
// - "replace": the page was opened with the hash (shared link, typed URL), so there is no entry of ours to pop.
// - "none": the hash already changed (Back, or another hash), the URL is right.
export type CloseAction = "back" | "replace" | "none";

export function closeAction({ hash, ownHash, pushed }: { hash: string; ownHash: string; pushed: boolean }): CloseAction {
  if (hash !== ownHash) return "none";
  return pushed ? "back" : "replace";
}
