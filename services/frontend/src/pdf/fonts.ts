import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { Font } from "@react-pdf/renderer";
import { pdfFonts } from "./theme";

// react-pdf needs TTF files (next/font only ships woff2 to the site). The geist package doesn't export
// its font files, so they are located next to its resolvable entry point (dist/font.js).
const fontsDir = join(dirname(fileURLToPath(import.meta.resolve("geist/font"))), "fonts");

let registered = false;

export function registerPdfFonts() {
  if (registered) return;

  Font.register({
    family: pdfFonts.sans,
    fonts: [
      { src: join(fontsDir, "geist-sans/Geist-Regular.ttf"), fontWeight: 400 },
      { src: join(fontsDir, "geist-sans/Geist-Medium.ttf"), fontWeight: 500 },
      { src: join(fontsDir, "geist-sans/Geist-SemiBold.ttf"), fontWeight: 600 },
    ],
  });
  Font.register({
    family: pdfFonts.mono,
    fonts: [
      { src: join(fontsDir, "geist-mono/GeistMono-Regular.ttf"), fontWeight: 400 },
      { src: join(fontsDir, "geist-mono/GeistMono-Medium.ttf"), fontWeight: 500 },
    ],
  });
  // react-pdf hyphenates English words by default, which breaks words like "TypeScript" mid-line.
  Font.registerHyphenationCallback((word) => [word]);

  registered = true;
}
