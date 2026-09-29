import type { Theme } from "@/lib/theme";
import type { CopyFieldLabels } from "@/ui/CopyField";

export type Experience = {
  company: string;
  role: string;
  period: string;
  workMode?: string;
  stack: string[];
  highlights: string[];
};

export type Project = {
  name: string;
  role: string;
  description: string;
  stack: string[];
  highlights: string[];
};

export type SkillGroup = {
  label: string;
  items: string[];
};

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
