/*
 * Design tokens for the resume PDF. react-pdf can't read CSS variables, so the light-theme colors
 * are mirrored from src/styles/tokens.css (checked by theme.test.ts). Sizes are in PDF points.
 */
export const pdfColors = {
  fg: "#1c1917",
  muted: "#57534e",
  border: "#e7e5e4",
  accent: "#0f766e",
} as const;

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
