import { Font } from "@react-pdf/renderer";
import { geistFontPath } from "@/lib/geist-fonts";
import { pdfFonts } from "./theme";

let registered = false;

export function registerPdfFonts() {
  if (registered) return;

  Font.register({
    family: pdfFonts.sans,
    fonts: [
      { src: geistFontPath("sansRegular"), fontWeight: 400 },
      { src: geistFontPath("sansMedium"), fontWeight: 500 },
      { src: geistFontPath("sansSemiBold"), fontWeight: 600 },
    ],
  });
  Font.register({
    family: pdfFonts.mono,
    fonts: [
      { src: geistFontPath("monoRegular"), fontWeight: 400 },
      { src: geistFontPath("monoMedium"), fontWeight: 500 },
    ],
  });
  // react-pdf hyphenates English words by default, which breaks words like "TypeScript" mid-line.
  Font.registerHyphenationCallback((word) => [word]);

  registered = true;
}
