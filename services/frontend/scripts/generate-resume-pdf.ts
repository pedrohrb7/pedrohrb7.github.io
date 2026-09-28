// Runs after `next build` (npm "postbuild"): writes one resume PDF per locale into the static export.
import { existsSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { locales } from "@/lib/i18n";
import { resumePdfFileName } from "@/lib/resume-pdf";
import { renderResumePdf } from "@/pdf/render";

const outDir = join(import.meta.dirname, "..", "out");

if (!existsSync(outDir)) {
  throw new Error(`${outDir} not found: run \`next build\` before generating the resume PDFs.`);
}

for (const locale of locales) {
  const file = join(outDir, resumePdfFileName[locale]);
  writeFileSync(file, await renderResumePdf(locale));
  console.log(`Resume PDF (${locale}): ${file}`);
}
