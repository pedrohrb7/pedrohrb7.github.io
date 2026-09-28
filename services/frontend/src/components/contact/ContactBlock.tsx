import { profile } from "@/content";
import type { Content } from "@/types/content";
import { ButtonLink } from "@/ui/ButtonLink";

type ContactBlockProps = {
  ui: Content["ui"];
};

export function ContactBlock({ ui }: ContactBlockProps) {
  return (
    <div>
      <p className="text-2xl font-semibold tracking-tight sm:text-3xl">{ui.contactHeadline}</p>
      <p className="mt-3 max-w-prose leading-relaxed text-muted">{ui.contactBody}</p>
      <div className="mt-6 flex flex-wrap gap-3">
        <ButtonLink href={`mailto:${profile.email}`} variant="primary">
          {profile.email}
        </ButtonLink>
        <ButtonLink href={profile.github.url} external>
          github.com/{profile.github.handle}
        </ButtonLink>
        <ButtonLink href={profile.linkedin.url} external>
          linkedin.com/in/{profile.linkedin.handle}
        </ButtonLink>
      </div>
    </div>
  );
}
