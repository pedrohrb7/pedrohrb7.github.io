export type SectionPosition = { id: string; top: number };

/*
 * The section the reader is in: the last one whose top has scrolled above `line` (a fixed point near the top of
 * the viewport). At the bottom of the page it is always the last section, since a short final section may never
 * reach the line. Above the first section (the hero) there is none.
 */
export function findActiveSection(sections: SectionPosition[], line: number, atBottom: boolean): string | null {
  if (sections.length === 0) return null;
  if (atBottom) return sections[sections.length - 1].id;

  let active: string | null = null;
  for (const section of sections) {
    if (section.top <= line) active = section.id;
  }
  return active;
}
