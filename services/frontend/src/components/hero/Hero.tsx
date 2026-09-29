import { profile } from "@/content";
import type { Locale } from "@/lib/i18n";
import { resumePdfPath } from "@/lib/resume-pdf";
import type { Content } from "@/types/content";
import { ButtonLink } from "@/ui/ButtonLink";
import { CopyField } from "@/ui/CopyField";

type HeroProps = {
  locale: Locale;
  content: Content;
};

export function Hero({ locale, content }: HeroProps) {
  return (
    <div id="top" className="scroll-mt-20 pt-16 pb-12 sm:pt-24 sm:pb-16">
      <p className="font-mono text-sm text-accent">{content.title}</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-6xl">{profile.name}</h1>
      <p className="mt-4 text-muted">{content.location}</p>
      {/* Contact links on the left, resume download on the right; stacked below md, where both don't fit on one line. */}
      <div className="mt-8 flex flex-col items-start gap-3 md:flex-row md:justify-between">
        <div className="flex flex-wrap gap-3">
          <CopyField value={profile.email} labels={content.ui.copyEmail} />
          <ButtonLink href={profile.github.url} external>
            GitHub
          </ButtonLink>
          <ButtonLink href={profile.linkedin.url} external>
            LinkedIn
          </ButtonLink>
        </div>
        <ButtonLink href={resumePdfPath(locale)} download>
          {content.ui.resumeCta}
        </ButtonLink>
      </div>
    </div>
  );
}
