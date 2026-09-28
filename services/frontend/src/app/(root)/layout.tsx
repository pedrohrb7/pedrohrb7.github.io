import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ThemeScript } from "@/components/theme/ThemeScript";
import { profile } from "@/content";
import { fontVariables } from "@/lib/fonts";
import { htmlLang, defaultLocale } from "@/lib/i18n";
import { siteIcons } from "@/lib/site-metadata";
import "@/styles/globals.css";

// Separate root layout for "/" only: it redirects to a locale, so it has no page chrome.
export const metadata: Metadata = {
  title: profile.name,
  icons: siteIcons,
  robots: { index: false },
};

export default function RootRedirectLayout({ children }: { children: ReactNode }) {
  return (
    // suppressHydrationWarning: ThemeScript sets data-theme on <html> before React hydrates.
    <html lang={htmlLang[defaultLocale]} className={fontVariables} suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body>{children}</body>
    </html>
  );
}
