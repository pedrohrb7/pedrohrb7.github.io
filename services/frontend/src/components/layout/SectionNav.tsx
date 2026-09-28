import type { Content, SectionId } from "@/types/content";

const navSections: SectionId[] = ["about", "experience", "projects", "skills", "contact"];

type SectionNavProps = {
  ui: Content["ui"];
};

export function SectionNav({ ui }: SectionNavProps) {
  return (
    <nav aria-label={ui.primaryNav} className="hidden md:block">
      <ul className="flex gap-5 text-sm text-muted">
        {navSections.map((id) => (
          <li key={id}>
            <a href={`#${id}`} className="transition-colors hover:text-fg">
              {ui.sections[id]}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
