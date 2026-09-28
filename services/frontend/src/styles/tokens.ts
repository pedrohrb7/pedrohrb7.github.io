/*
 * Light-theme colors for build-time renderers that can't read CSS variables (resume PDF, generated images).
 * Mirror of the @theme block in tokens.css, checked by tokens.test.ts. The site itself uses tokens.css.
 */
export const lightColors = {
  background: "#fafaf9",
  surface: "#ffffff",
  fg: "#1c1917",
  muted: "#57534e",
  border: "#e7e5e4",
  accent: "#0f766e",
  "accent-fg": "#ffffff",
} as const;
