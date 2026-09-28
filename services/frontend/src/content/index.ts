import type { Locale } from "@/lib/i18n";
import type { Content } from "@/types/content";
import { en } from "./en";
import { pt } from "./pt";

const contentByLocale: Record<Locale, Content> = { pt, en };

export function getContent(locale: Locale): Content {
  return contentByLocale[locale];
}

export { profile } from "./profile";
