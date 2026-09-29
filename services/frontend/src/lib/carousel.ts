/*
 * Pure helpers for the projects carousel (src/components/projects/ProjectCarousel.tsx).
 * Positions come from the DOM (slide offsetLeft and the track's scroll values), but the math lives here to be tested.
 */

export type TrackMetrics = {
  scrollLeft: number;
  maxScrollLeft: number;
  slideOffsets: number[];
};

// Index of the slide snapped to the start of the track. At the end of the track it is always the last slide:
// on narrow screens slides are narrower than the track, so the last one can never reach the start.
export function currentSlide({ scrollLeft, maxScrollLeft, slideOffsets }: TrackMetrics): number {
  if (slideOffsets.length === 0) return 0;
  if (scrollLeft >= maxScrollLeft - 1) return slideOffsets.length - 1;

  let nearest = 0;
  for (let index = 1; index < slideOffsets.length; index++) {
    if (Math.abs(slideOffsets[index] - scrollLeft) < Math.abs(slideOffsets[nearest] - scrollLeft)) nearest = index;
  }
  return nearest;
}

// 1-based position padded to the width of the total, at least two digits: "01", "07" (of 12), "010" (of 120).
export function formatPosition(index: number, total: number): string {
  return String(index + 1).padStart(Math.max(2, String(total).length), "0");
}

// "01 / 03", "07 / 12", "010 / 120".
export function formatCounter(index: number, total: number): string {
  return `${formatPosition(index, total)} / ${formatPosition(total - 1, total)}`;
}

// Fills "{n} de {total}"-style labels from Content.ui (templates, since functions can't cross to client components).
export function fillTemplate(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) => (key in values ? String(values[key]) : match));
}
