// @vitest-environment node
import { extractText, getDocumentProxy } from "unpdf";
import { getContent, profile } from "@/content";
import { locales } from "@/lib/i18n";
import { renderResumePdf } from "./render";

// Brazilian phone formats: (11) 91234-5678, 11 912345678, +55 11 91234-5678.
const phonePattern = /(\+?55[\s-]?)?\(?\d{2}\)?[\s-]?9?\d{4}[\s-]?\d{4}/;

async function readPdf(buffer: Buffer) {
  const pdf = await getDocumentProxy(new Uint8Array(buffer));
  const { text, totalPages } = await extractText(pdf, { mergePages: true });
  // Line breaks from wrapping become spaces so multi-word values can be matched.
  return { text: text.replace(/\s+/g, " "), totalPages };
}

it.each(["(11) 91234-5678", "11 912345678", "+55 11 91234-5678", "(11) 3123-4567"])("phone pattern catches %s", (phone) => {
  expect(`Contato: ${phone}.`).toMatch(phonePattern);
});

describe.each(locales)("resume PDF (%s)", (locale) => {
  const content = getContent(locale);
  let pdf: Awaited<ReturnType<typeof readPdf>>;

  beforeAll(async () => {
    pdf = await readPdf(await renderResumePdf(locale));
  });

  it("has the name, title and contact links", () => {
    expect(pdf.text).toContain(profile.name);
    expect(pdf.text).toContain(content.title);
    expect(pdf.text).toContain(profile.email);
    expect(pdf.text).toContain("github.com/pedrohrb7");
    expect(pdf.text).toContain("linkedin.com/in/pedrohrb");
  });

  it("has every section of the site except contact (already in the header)", () => {
    for (const [id, label] of Object.entries(content.ui.sections)) {
      if (id !== "contact") expect(pdf.text).toContain(label.toUpperCase());
    }
  });

  it("has every experience, project and education entry", () => {
    for (const job of content.experience) expect(pdf.text).toContain(job.company);
    for (const project of content.projects) expect(pdf.text).toContain(project.name);
    for (const item of content.education) expect(pdf.text).toContain(item.institution);
  });

  it("never contains a phone number", () => {
    expect(pdf.text).not.toMatch(phonePattern);
  });

  it("fits in two pages", () => {
    expect(pdf.totalPages).toBeLessThanOrEqual(2);
  });
});
