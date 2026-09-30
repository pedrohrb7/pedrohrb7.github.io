import type { Locale } from "@/lib/i18n";

// Fixed name (no hash) so the link can be shared directly, the same in every locale: each PDF sits in its locale's
// folder, next to that locale's pages. Generated into out/<locale>/ by scripts/generate-resume-pdf.ts.
export const resumePdfFileName = "pedro-borges-fullstack-developer.pdf";

export function resumePdfPath(locale: Locale): string {
  return `/${locale}/${resumePdfFileName}`;
}
