import type { Theme } from "@/lib/theme";
import type { CopyFieldLabels } from "@/ui/CopyField";

// Templates use {n} and {total}; filled by fillTemplate (src/lib/carousel.ts).
export type ProjectCarouselLabels = {
  roleDescription: string;
  slideRoleDescription: string;
  slideLabel: string;
  track: string;
  previous: string;
  next: string;
  goTo: string;
  hint: string;
};

export type Experience = {
  company: string;
  role: string;
  period: string;
  workMode?: string;
  stack: string[];
  highlights: string[];
};

// openAriaLabel uses {name}; hashPrefix + slug is the URL hash that opens a project's drawer ("#projeto-autosim").
export type ProjectDetailsLabels = {
  open: string;
  openAriaLabel: string;
  close: string;
  hashPrefix: string;
  stackByLayer: string;
};

export type SkillGroup = {
  label: string;
  items: string[];
};

export type CaseStudySection = {
  heading: string;
  body: string[];
};

export type ProjectDetails = {
  caseStudy: CaseStudySection[];
  stackByLayer: SkillGroup[];
};

// A project only gets the "View details" drawer (docs/features/project-details/) with both a slug and details.
// The slug is the same in every language.
export type Project = {
  name: string;
  role: string;
  description: string;
  stack: string[];
  highlights: string[];
} & ({ slug?: undefined; details?: undefined } | { slug: string; details: ProjectDetails });

export type Education = {
  course: string;
  institution: string;
  period: string;
};

export type SectionId = "about" | "experience" | "projects" | "skills" | "education" | "contact";

export type Content = {
  meta: { title: string; description: string };
  ui: {
    skipToContent: string;
    primaryNav: string;
    languageSwitcher: string;
    theme: { label: string; options: Record<Theme, string> };
    sections: Record<SectionId, string>;
    contactHeadline: string;
    contactBody: string;
    copyEmail: CopyFieldLabels;
    projectsCarousel: ProjectCarouselLabels;
    projectDetails: ProjectDetailsLabels;
    resumeCta: string;
    stackLabel: string;
    notFound: { title: string; body: string; backHome: string };
  };
  title: string;
  location: string;
  about: string[];
  experience: Experience[];
  projects: Project[];
  skills: SkillGroup[];
  education: Education[];
};
