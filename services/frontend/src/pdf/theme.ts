import { lightColors } from "@/styles/tokens";

// Design tokens for the resume PDF: light-theme colors from src/styles/tokens.ts. Sizes are in PDF points.
export const pdfColors = lightColors;

export const pdfFonts = {
  sans: "Geist",
  mono: "Geist Mono",
} as const;

export const pdfFontSize = {
  display: 22,
  h3: 10.5,
  body: 9.5,
  label: 8,
  caption: 8,
} as const;

export const pdfSpace = {
  xs: 3,
  sm: 6,
  md: 10,
  lg: 16,
  page: 40,
} as const;
