export const locales = ["pt", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "pt";

export const htmlLang: Record<Locale, string> = {
  pt: "pt-BR",
  en: "en",
};

export const localeLabel: Record<Locale, string> = {
  pt: "PT",
  en: "EN",
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

// Picks the first supported locale from the browser's preference list (e.g. "en-US" -> "en").
export function detectLocale(preferred: readonly string[]): Locale {
  for (const tag of preferred) {
    const language = tag.toLowerCase().split("-")[0];
    if (isLocale(language)) return language;
  }
  return defaultLocale;
}

export function localePath(locale: Locale): string {
  return `/${locale}/`;
}
