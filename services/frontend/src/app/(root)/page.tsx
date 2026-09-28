import { LocaleRedirect } from "@/components/i18n/LocaleRedirect";
import { profile } from "@/content";
import { htmlLang, localePath } from "@/lib/i18n";

export default function RootPage() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-4 px-4 text-center">
      <LocaleRedirect />
      <p className="font-mono text-sm font-semibold">{profile.name}</p>
      <ul className="flex gap-3 text-sm">
        <li>
          <a href={localePath("pt")} hrefLang={htmlLang.pt} className="text-accent underline-offset-4 hover:underline">
            Português
          </a>
        </li>
        <li>
          <a href={localePath("en")} hrefLang={htmlLang.en} className="text-accent underline-offset-4 hover:underline">
            English
          </a>
        </li>
      </ul>
    </main>
  );
}
