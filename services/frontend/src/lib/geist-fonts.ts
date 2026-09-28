import { readFile } from "node:fs/promises";
import { join } from "node:path";

// Build-time only (PDF and generated images): TTF files from the geist package, since next/font only ships woff2.
// The package doesn't export its font files, and Turbopack doesn't support import.meta.resolve, so the path is
// built from the working directory: next build, the npm scripts and Vitest all run from services/frontend.
const fontsDir = join(process.cwd(), "node_modules/geist/dist/fonts");

export const geistFontFiles = {
  sansRegular: "geist-sans/Geist-Regular.ttf",
  sansMedium: "geist-sans/Geist-Medium.ttf",
  sansSemiBold: "geist-sans/Geist-SemiBold.ttf",
  monoRegular: "geist-mono/GeistMono-Regular.ttf",
  monoMedium: "geist-mono/GeistMono-Medium.ttf",
} as const;

export function geistFontPath(file: keyof typeof geistFontFiles): string {
  return join(fontsDir, geistFontFiles[file]);
}

export function readGeistFont(file: keyof typeof geistFontFiles): Promise<Buffer> {
  return readFile(geistFontPath(file));
}
