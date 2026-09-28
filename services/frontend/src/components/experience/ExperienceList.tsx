import type { Experience } from "@/types/content";
import { TagList } from "@/ui/TagList";

type ExperienceListProps = {
  items: Experience[];
  stackLabel: string;
};

export function ExperienceList({ items, stackLabel }: ExperienceListProps) {
  return (
    <ol className="space-y-12">
      {items.map((job) => (
        <li key={`${job.company}-${job.period}`}>
          <article>
            <header className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
              <h3 className="text-lg font-semibold">
                {job.role} <span className="text-muted">· {job.company}</span>
              </h3>
              <p className="shrink-0 font-mono text-xs text-muted">
                {job.period}
                {job.workMode && ` · ${job.workMode}`}
              </p>
            </header>
            <ul className="mt-4 list-disc space-y-2 pl-5 leading-relaxed text-muted marker:text-border">
              {job.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
            {job.stack.length > 0 && (
              <div className="mt-4">
                <TagList items={job.stack} label={`${stackLabel}: ${job.company}`} />
              </div>
            )}
          </article>
        </li>
      ))}
    </ol>
  );
}
