import { formatPosition } from "@/lib/carousel";
import { projectHash } from "@/lib/project-details";
import type { Project, ProjectDetailsLabels } from "@/types/content";
import { TagGroups } from "@/ui/TagGroups";
import { TagList } from "@/ui/TagList";
import { ProjectDetails } from "./ProjectDetails";

type ProjectCardProps = {
  project: Project;
  index: number;
  total: number;
  stackLabel: string;
  detailsLabels: ProjectDetailsLabels;
};

export function ProjectCard({ project, index, total, stackLabel, detailsLabels }: ProjectCardProps) {
  const number = formatPosition(index, total);
  return (
    // Every card is as tall as the tallest one (the carousel stretches the slides); mt-auto keeps the tags and the
    // details button at the bottom, lined up across cards.
    <article className="flex w-full flex-col rounded-lg border border-border bg-surface p-6">
      <header className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
        <div className="flex items-baseline gap-2">
          <span className="font-mono text-xs text-accent">[{number}]</span>
          <h3 className="text-lg font-semibold">{project.name}</h3>
        </div>
        <p className="font-mono text-xs text-muted">{project.role}</p>
      </header>
      <p className="mt-2">{project.description}</p>
      <ul className="mt-4 list-disc space-y-2 pl-5 leading-relaxed text-muted marker:text-border">
        {project.highlights.map((highlight) => (
          <li key={highlight}>{highlight}</li>
        ))}
      </ul>
      <div className="mt-auto pt-4">
        <TagList items={project.stack} label={`${stackLabel}: ${project.name}`} />
      </div>
      {project.details && (
        // Its own row under a divider. data-requires-js on the row: without JS the divider would sit over nothing.
        // flex: the button is a flex item, so its negative bottom margin isn't absorbed by an inline line box.
        <div data-requires-js className="mt-5 flex border-t border-border pt-3">
          <ProjectDetails
            hash={projectHash(detailsLabels.hashPrefix, project.slug)}
            number={number}
            name={project.name}
            role={project.role}
            labels={detailsLabels}
          >
            <p>{project.description}</p>
            {project.details.caseStudy.map((section) => (
              <section key={section.heading} className="mt-8">
                <h3 className="font-semibold">{section.heading}</h3>
                <div className="mt-3 space-y-3 leading-relaxed text-muted">
                  {section.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </section>
            ))}
            <section className="mt-8">
              <h3 className="font-semibold">{detailsLabels.stackByLayer}</h3>
              <div className="mt-4">
                <TagGroups groups={project.details.stackByLayer} />
              </div>
            </section>
          </ProjectDetails>
        </div>
      )}
    </article>
  );
}
