import { renderToBuffer } from "@react-pdf/renderer";
import { getContent } from "@/content";
import type { Locale } from "@/lib/i18n";
import { registerPdfFonts } from "./fonts";
import { ResumeDocument } from "./ResumeDocument";

export function renderResumePdf(locale: Locale): Promise<Buffer> {
  registerPdfFonts();
  return renderToBuffer(<ResumeDocument locale={locale} content={getContent(locale)} />);
}
