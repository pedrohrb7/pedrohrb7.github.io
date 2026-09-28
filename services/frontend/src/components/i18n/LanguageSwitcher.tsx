import { htmlLang, localeLabel, localePath, locales, type Locale } from "@/lib/i18n";

type LanguageSwitcherProps = {
  current: Locale;
  label: string;
};

export function LanguageSwitcher({ current, label }: LanguageSwitcherProps) {
  return (
    <nav aria-label={label}>
      <ul className="flex items-center rounded-md border border-border p-0.5">
        {locales.map((locale) => {
          const active = locale === current;
          return (
            <li key={locale}>
              <a
                href={localePath(locale)}
                hrefLang={htmlLang[locale]}
                lang={htmlLang[locale]}
                aria-current={active ? "page" : undefined}
                className={`flex min-h-9 min-w-11 items-center justify-center rounded px-2 font-mono text-xs font-medium transition-colors ${
                  active ? "bg-fg text-background" : "text-muted hover:text-fg"
                }`}
              >
                {localeLabel[locale]}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
