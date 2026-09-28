import type { Locale } from "@/lib/i18n";

// Fixed names (no hash) so the link can be shared directly. Generated into out/ by scripts/generate-resume-pdf.ts.
export const resumePdfFileName: Record<Locale, string> = {
  pt: "pedro-borges-curriculo.pdf",
  en: "pedro-borges-resume.pdf",
};

export function resumePdfPath(locale: Locale): string {
  return `/${resumePdfFileName[locale]}`;
}
