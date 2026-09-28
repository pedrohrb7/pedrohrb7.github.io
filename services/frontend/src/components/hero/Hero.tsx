import { profile } from "@/content";
import type { Content } from "@/types/content";
import { ButtonLink } from "@/ui/ButtonLink";

type HeroProps = {
  content: Content;
};

export function Hero({ content }: HeroProps) {
  return (
    <div id="top" className="scroll-mt-20 pt-16 pb-12 sm:pt-24 sm:pb-16">
      <p className="font-mono text-sm text-accent">{content.title}</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-6xl">{profile.name}</h1>
      <p className="mt-4 text-muted">{content.location}</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <ButtonLink href={`mailto:${profile.email}`} variant="primary">
          {content.ui.emailCta}
        </ButtonLink>
        <ButtonLink href={profile.github.url} external>
          GitHub
        </ButtonLink>
        <ButtonLink href={profile.linkedin.url} external>
          LinkedIn
        </ButtonLink>
      </div>
    </div>
  );
}
