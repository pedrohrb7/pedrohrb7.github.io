// Runs after `next build` (npm "postbuild"): writes one resume PDF per locale into the static export.
import { existsSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { locales } from "@/lib/i18n";
import { resumePdfPath } from "@/lib/resume-pdf";
import { renderResumePdf } from "@/pdf/render";

const outDir = join(import.meta.dirname, "..", "out");

if (!existsSync(outDir)) {
  throw new Error(`${outDir} not found: run \`next build\` before generating the resume PDFs.`);
}

for (const locale of locales) {
  // out/<locale>/ already exists: next build writes that locale's index.html there.
  const file = join(outDir, resumePdfPath(locale));
  writeFileSync(file, await renderResumePdf(locale));
  console.log(`Resume PDF (${locale}): ${file}`);
}
