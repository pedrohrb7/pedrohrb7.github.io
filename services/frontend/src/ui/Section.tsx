import type { ReactNode } from "react";

type SectionProps = {
  id: string;
  title: string;
  // Rendered on the right of the section label (e.g. carousel controls).
  aside?: ReactNode;
  // aria-roledescription for sections that are a widget as a whole (e.g. "carrossel").
  roleDescription?: string;
  children: ReactNode;
};

export function Section({ id, title, aside, roleDescription, children }: SectionProps) {
  const headingId = `${id}-heading`;
  return (
    <section
      id={id}
      aria-labelledby={headingId}
      aria-roledescription={roleDescription}
      //: the label row and the content fade in as they scroll into view (globals.css).
      className="scroll-mt-20 border-t border-border py-12 *:reveal-on-scroll sm:py-16"
    >
      <div className="mb-8 flex items-center justify-between gap-4">
        <h2 id={headingId} className="font-mono text-sm font-medium tracking-wide text-accent uppercase">
          {title}
        </h2>
        {aside}
      </div>
      {children}
    </section>
  );
}
