import type { Content } from "@/types/content";
import { Section } from "@/ui/Section";
import { ProjectCard } from "./ProjectCard";
import {
  ProjectCarousel,
  ProjectCarouselControls,
  ProjectCarouselIndicators,
  ProjectCarouselTrack,
} from "./ProjectCarousel";

type ProjectsSectionProps = {
  content: Pick<Content, "projects" | "ui">;
};

// With one project this is a plain card: the carousel semantics and controls only appear from two projects on.
export function ProjectsSection({ content }: ProjectsSectionProps) {
  const { projects, ui } = content;
  const labels = ui.projectsCarousel;
  const total = projects.length;

  return (
    <ProjectCarousel count={total}>
      <Section
        id="projects"
        title={ui.sections.projects}
        roleDescription={total > 1 ? labels.roleDescription : undefined}
        aside={<ProjectCarouselControls labels={labels} />}
      >
        <ProjectCarouselTrack
          labels={labels}
          slides={projects.map((project, index) => (
            <ProjectCard key={project.name} project={project} index={index} total={total} stackLabel={ui.stackLabel} />
          ))}
        />
        <ProjectCarouselIndicators labels={labels} />
      </Section>
    </ProjectCarousel>
  );
}
