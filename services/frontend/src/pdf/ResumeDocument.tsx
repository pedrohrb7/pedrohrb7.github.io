import { Document, Link, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import type { ReactNode } from "react";
import { profile } from "@/content";
import { htmlLang, localePath, type Locale } from "@/lib/i18n";
import type { Content } from "@/types/content";
import { pdfColors, pdfFontSize, pdfFonts, pdfSpace } from "./theme";

const styles = StyleSheet.create({
  page: {
    paddingTop: pdfSpace.page,
    paddingBottom: pdfSpace.page + pdfSpace.md,
    paddingHorizontal: pdfSpace.page,
    fontFamily: pdfFonts.sans,
    fontSize: pdfFontSize.body,
    color: pdfColors.fg,
  },
  // lineHeight lives here and not on the page: react-pdf drops a fixed element that uses `render`
  // (the page numbers in the footer) when it inherits any lineHeight. fontSize is repeated because a
  // unitless lineHeight on a View is resolved against the View's own font size (18pt by default).
  body: { fontSize: pdfFontSize.body, lineHeight: 1.45 },
  title: { fontFamily: pdfFonts.mono, fontSize: pdfFontSize.caption, color: pdfColors.accent },
  name: { marginTop: pdfSpace.xs, fontSize: pdfFontSize.display, fontWeight: 600, lineHeight: 1.1 },
  location: { marginTop: pdfSpace.sm, color: pdfColors.muted },
  contacts: {
    marginTop: pdfSpace.xs,
    flexDirection: "row",
    flexWrap: "wrap",
    fontFamily: pdfFonts.mono,
    fontSize: pdfFontSize.caption,
  },
  contact: { flexDirection: "row" },
  link: { color: pdfColors.accent, textDecoration: "none" },
  separator: { marginHorizontal: pdfSpace.sm, color: pdfColors.muted },
  sectionLabel: {
    marginTop: pdfSpace.lg,
    paddingBottom: pdfSpace.xs,
    marginBottom: pdfSpace.sm,
    borderBottomWidth: 0.5,
    borderBottomColor: pdfColors.border,
    fontFamily: pdfFonts.mono,
    fontSize: pdfFontSize.label,
    fontWeight: 500,
    letterSpacing: 0.8,
    textTransform: "uppercase",
    color: pdfColors.accent,
  },
  paragraph: { marginBottom: pdfSpace.xs, color: pdfColors.muted },
  entry: { marginBottom: pdfSpace.md },
  entryHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "baseline" },
  entryTitle: { flexShrink: 1, paddingRight: pdfSpace.md, fontSize: pdfFontSize.h3, fontWeight: 600 },
  entrySubtitle: { fontWeight: 400, color: pdfColors.muted },
  meta: { flexShrink: 0, fontFamily: pdfFonts.mono, fontSize: pdfFontSize.caption, color: pdfColors.muted },
  description: { marginTop: pdfSpace.xs },
  bullet: { flexDirection: "row", marginTop: 2, color: pdfColors.muted },
  bulletMark: { width: 10 },
  bulletText: { flex: 1 },
  stack: { marginTop: pdfSpace.xs, fontFamily: pdfFonts.mono, fontSize: pdfFontSize.caption, color: pdfColors.muted },
  skillRow: { flexDirection: "row", marginBottom: pdfSpace.xs },
  skillLabel: { width: 120, paddingRight: pdfSpace.sm, fontWeight: 500 },
  skillItems: { flex: 1, color: pdfColors.muted },
  footer: {
    position: "absolute",
    bottom: pdfSpace.page / 2,
    left: pdfSpace.page,
    right: pdfSpace.page,
    flexDirection: "row",
    justifyContent: "space-between",
    fontFamily: pdfFonts.mono,
    fontSize: pdfFontSize.caption,
    color: pdfColors.muted,
  },
});

const siteHost = new URL(profile.siteUrl).host;
const stripProtocol = (url: string) => url.replace(/^https:\/\/(www\.)?/, "");

// A fragment on purpose: react-pdf only honors minPresenceAhead for elements with previous siblings,
// so the label must sit in the same flow as the content before it to avoid ending a page alone.
// wrap={false} stops react-pdf from splitting the label itself (text on one page, border on the next).
function Section({ label, children }: { label: string; children: ReactNode }) {
  return (
    <>
      <Text style={styles.sectionLabel} wrap={false} minPresenceAhead={60}>
        {label}
      </Text>
      {children}
    </>
  );
}

function Bullet({ children }: { children: string }) {
  return (
    <View style={styles.bullet} wrap={false}>
      <Text style={styles.bulletMark}>•</Text>
      <Text style={styles.bulletText}>{children}</Text>
    </View>
  );
}

type EntryProps = {
  title: string;
  subtitle?: string;
  meta: string;
  description?: string;
  highlights?: string[];
  stack?: { label: string; items: string[] };
};

function Entry({ title, subtitle, meta, description, highlights = [], stack }: EntryProps) {
  const [firstHighlight, ...otherHighlights] = highlights;
  return (
    <View style={styles.entry}>
      {/* Header, description and first bullet move to the next page together, so a header never ends a page alone. */}
      <View wrap={false}>
        <View style={styles.entryHeader}>
          <Text style={styles.entryTitle}>
            {title}
            {subtitle && <Text style={styles.entrySubtitle}> · {subtitle}</Text>}
          </Text>
          <Text style={styles.meta}>{meta}</Text>
        </View>
        {description && <Text style={styles.description}>{description}</Text>}
        {firstHighlight && <Bullet>{firstHighlight}</Bullet>}
      </View>
      {otherHighlights.map((highlight) => (
        <Bullet key={highlight}>{highlight}</Bullet>
      ))}
      {stack && stack.items.length > 0 && <Text style={styles.stack}>{`${stack.label}: ${stack.items.join(", ")}`}</Text>}
    </View>
  );
}

type ResumeDocumentProps = {
  locale: Locale;
  content: Content;
};

export function ResumeDocument({ locale, content }: ResumeDocumentProps) {
  const { ui } = content;
  const contacts = [
    { href: `mailto:${profile.email}`, label: profile.email },
    { href: new URL(localePath(locale), profile.siteUrl).href, label: siteHost },
    { href: profile.github.url, label: stripProtocol(profile.github.url) },
    { href: profile.linkedin.url, label: stripProtocol(profile.linkedin.url) },
  ];

  return (
    <Document
      title={`${profile.name} - ${content.title}`}
      author={profile.name}
      subject={content.meta.description}
      language={htmlLang[locale]}
      creator={profile.siteUrl}
    >
      <Page size="A4" style={styles.page}>
        <View style={styles.body}>
          <Text style={styles.title}>{content.title}</Text>
          <Text style={styles.name}>{profile.name}</Text>
          <Text style={styles.location}>{content.location}</Text>
          <View style={styles.contacts}>
            {contacts.map((contact, index) => (
              <View key={contact.href} style={styles.contact}>
                {index > 0 && <Text style={styles.separator}>/</Text>}
                <Link src={contact.href} style={styles.link}>
                  {contact.label}
                </Link>
              </View>
            ))}
          </View>

          <Section label={ui.sections.about}>
            {content.about.map((paragraph) => (
              <Text key={paragraph} style={styles.paragraph}>
                {paragraph}
              </Text>
            ))}
          </Section>

          <Section label={ui.sections.experience}>
            {content.experience.map((job) => (
              <Entry
                key={`${job.company}-${job.period}`}
                title={job.role}
                subtitle={job.company}
                meta={job.workMode ? `${job.period} · ${job.workMode}` : job.period}
                highlights={job.highlights}
                stack={{ label: ui.stackLabel, items: job.stack }}
              />
            ))}
          </Section>

          <Section label={ui.sections.projects}>
            {content.projects.map((project) => (
              <Entry
                key={project.name}
                title={project.name}
                meta={project.role}
                description={project.description}
                highlights={project.highlights}
                stack={{ label: ui.stackLabel, items: project.stack }}
              />
            ))}
          </Section>

          <Section label={ui.sections.skills}>
            {content.skills.map((group) => (
              <View key={group.label} style={styles.skillRow} wrap={false}>
                <Text style={styles.skillLabel}>{group.label}</Text>
                <Text style={styles.skillItems}>{group.items.join(", ")}</Text>
              </View>
            ))}
          </Section>

          <Section label={ui.sections.education}>
            {content.education.map((item) => (
              <Entry key={`${item.course}-${item.institution}`} title={item.course} subtitle={item.institution} meta={item.period} />
            ))}
          </Section>
        </View>

        <View style={styles.footer} fixed>
          <Text>{`${profile.name} · ${siteHost}`}</Text>
          <Text render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} />
        </View>
      </Page>
    </Document>
  );
}
