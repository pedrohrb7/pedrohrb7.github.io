import type { Metadata } from "next";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { getContent, profile } from "@/content";
import { fontVariables } from "@/lib/fonts";
import { defaultLocale, htmlLang, localePath, locales } from "@/lib/i18n";
import { ButtonLink } from "@/ui/ButtonLink";
import "@/styles/globals.css";

// Unmatched URLs have no locale (GitHub Pages serves one 404.html), so the page is bilingual.
export const metadata: Metadata = {
  title: `404 | ${profile.name}`,
  robots: { index: false },
};

export default function GlobalNotFound() {
  return (
    <html lang={htmlLang[defaultLocale]} className={fontVariables}>
      <body className="flex min-h-dvh flex-col">
        <SiteHeader homeHref="/" />
        <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-16 sm:px-6 sm:py-24">
          <h1 className="font-mono text-6xl font-semibold tracking-tight text-accent sm:text-7xl">404</h1>
          <div className="mt-12 grid gap-12 sm:grid-cols-2 sm:gap-8">
            {locales.map((locale) => {
              const { notFound } = getContent(locale).ui;
              return (
                <section key={locale} lang={htmlLang[locale]} aria-labelledby={`not-found-${locale}`}>
                  <h2 id={`not-found-${locale}`} className="text-2xl font-semibold tracking-tight">
                    {notFound.title}
                  </h2>
                  <p className="mt-3 leading-relaxed text-muted">{notFound.body}</p>
                  <div className="mt-6">
                    <ButtonLink href={localePath(locale)} variant="primary">
                      {notFound.backHome}
                    </ButtonLink>
                  </div>
                </section>
              );
            })}
          </div>
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
