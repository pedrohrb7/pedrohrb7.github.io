import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { ThemeScript } from "@/components/theme/ThemeScript";
import { getContent, profile } from "@/content";
import { fontVariables } from "@/lib/fonts";
import { htmlLang, isLocale, localePath, locales } from "@/lib/i18n";
import { ogImagePath, ogImageSize, siteIcons } from "@/lib/site-metadata";
import "@/styles/globals.css";

type LocaleParams = { params: Promise<{ locale: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const { meta, title } = getContent(locale);
  const image = { url: ogImagePath(locale), ...ogImageSize, type: "image/png", alt: `${profile.name} - ${title}` };
  return {
    metadataBase: new URL(profile.siteUrl),
    title: meta.title,
    description: meta.description,
    icons: siteIcons,
    alternates: {
      canonical: localePath(locale),
      languages: Object.fromEntries(locales.map((l) => [htmlLang[l], localePath(l)])),
    },
    openGraph: {
      type: "profile",
      title: meta.title,
      description: meta.description,
      url: localePath(locale),
      locale: htmlLang[locale].replace("-", "_"),
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: [image],
    },
  };
}

export default async function LocaleLayout({ children, params }: LocaleParams & { children: ReactNode }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    // suppressHydrationWarning: ThemeScript sets data-theme on <html> before React hydrates.
    <html lang={htmlLang[locale]} className={fontVariables} suppressHydrationWarning>
      <head>
        <ThemeScript />
        {/* Controls that only work with JavaScript (copy buttons, carousel controls) render in the HTML to avoid a
            layout shift on hydration, and are hidden here when JavaScript is off. */}
        <noscript>
          <style>{"[data-requires-js]{display:none!important}"}</style>
        </noscript>
      </head>
      <body>{children}</body>
    </html>
  );
}
