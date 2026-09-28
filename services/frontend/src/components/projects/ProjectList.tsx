import type { Project } from "@/types/content";
import { TagList } from "@/ui/TagList";

type ProjectListProps = {
  items: Project[];
  stackLabel: string;
};

export function ProjectList({ items, stackLabel }: ProjectListProps) {
  return (
    <ul className="grid gap-6">
      {items.map((project) => (
        <li key={project.name}>
          <article className="rounded-lg border border-border bg-surface p-6">
            <header className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
              <h3 className="text-lg font-semibold">{project.name}</h3>
              <p className="font-mono text-xs text-muted">{project.role}</p>
            </header>
            <p className="mt-2">{project.description}</p>
            <ul className="mt-4 list-disc space-y-2 pl-5 leading-relaxed text-muted marker:text-border">
              {project.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
            <div className="mt-4">
              <TagList items={project.stack} label={`${stackLabel}: ${project.name}`} />
            </div>
          </article>
        </li>
      ))}
    </ul>
  );
}
