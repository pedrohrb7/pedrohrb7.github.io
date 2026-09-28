import type { MetadataRoute } from "next";
import { profile } from "@/content";
import { htmlLang, localePath, locales } from "@/lib/i18n";

// Required by output: "export" for generated metadata routes.
export const dynamic = "force-static";

// Only the locale pages: "/" just redirects and the 404 is noindex.
export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => new URL(path, profile.siteUrl).href;
  const languages = Object.fromEntries(locales.map((locale) => [htmlLang[locale], url(localePath(locale))]));

  return locales.map((locale) => ({
    url: url(localePath(locale)),
    alternates: { languages },
  }));
}
