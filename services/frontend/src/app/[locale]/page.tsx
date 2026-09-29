import { notFound } from "next/navigation";
import { ContactBlock } from "@/components/contact/ContactBlock";
import { EducationList } from "@/components/education/EducationList";
import { ExperienceList } from "@/components/experience/ExperienceList";
import { Hero } from "@/components/hero/Hero";
import { LanguageSwitcher } from "@/components/i18n/LanguageSwitcher";
import { SectionNav } from "@/components/layout/SectionNav";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { ProjectsSection } from "@/components/projects/ProjectsSection";
import { ThemeSelect } from "@/components/theme/ThemeSelect";
import { getContent } from "@/content";
import { isLocale } from "@/lib/i18n";
import { Section } from "@/ui/Section";
import { TagGroups } from "@/ui/TagGroups";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const content = getContent(locale);
  const { ui } = content;

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-20 focus:rounded-md focus:bg-surface focus:px-4 focus:py-2"
      >
        {ui.skipToContent}
      </a>
      <SiteHeader homeHref="#top">
        <SectionNav ui={ui} />
        <div className="flex items-center gap-2">
          <ThemeSelect labels={ui.theme} />
          <LanguageSwitcher current={locale} label={ui.languageSwitcher} />
        </div>
      </SiteHeader>
      <main id="main" className="mx-auto max-w-content px-4 sm:px-6">
        <Hero locale={locale} content={content} />
        <Section id="about" title={ui.sections.about}>
          <div className="space-y-4 text-lg leading-relaxed text-muted">
            {content.about.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </Section>
        <Section id="experience" title={ui.sections.experience}>
          <ExperienceList items={content.experience} stackLabel={ui.stackLabel} />
        </Section>
        <ProjectsSection content={content} />
        <Section id="skills" title={ui.sections.skills}>
          <TagGroups groups={content.skills} />
        </Section>
        <Section id="education" title={ui.sections.education}>
          <EducationList items={content.education} />
        </Section>
        <Section id="contact" title={ui.sections.contact}>
          <ContactBlock ui={ui} />
        </Section>
      </main>
      <SiteFooter />
    </>
  );
}
