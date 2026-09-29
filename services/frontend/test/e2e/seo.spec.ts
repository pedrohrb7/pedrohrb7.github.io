import { expect, test, type APIRequestContext } from "@playwright/test";

const siteUrl = "https://pedrohrb7.github.io";

async function expectServed(request: APIRequestContext, path: string, contentType: string) {
  const response = await request.get(path);
  expect(response.status(), path).toBe(200);
  expect(response.headers()["content-type"], path).toContain(contentType);
  return response;
}

test.describe("icons", () => {
  for (const path of ["/", "/pt/", "/en/", "/pagina-que-nao-existe/"]) {
    test(`${path} links the favicon and apple touch icon`, async ({ page }) => {
      await page.goto(path);
      await expect(page.locator('link[rel="icon"]')).toHaveAttribute("href", "/icon.svg");
      await expect(page.locator('link[rel="apple-touch-icon"]')).toHaveAttribute("href", "/apple-touch-icon.png");
    });
  }

  test("serves the icons as images", async ({ request }) => {
    await expectServed(request, "/icon.svg", "image/svg+xml");
    await expectServed(request, "/apple-touch-icon.png", "image/png");
  });
});

test.describe("social image", () => {
  for (const { locale, alt } of [
    { locale: "pt", alt: "Pedro Borges - Desenvolvedor Full-Stack · Mobile" },
    { locale: "en", alt: "Pedro Borges - Mobile · Full-Stack Developer" },
  ]) {
    test(`/${locale}/ has an Open Graph and Twitter image in its language`, async ({ page, request }) => {
      await page.goto(`/${locale}/`);
      const imageUrl = `${siteUrl}/${locale}/og-image.png`;
      await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", imageUrl);
      await expect(page.locator('meta[property="og:image:alt"]')).toHaveAttribute("content", alt);
      await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute("content", "summary_large_image");
      await expect(page.locator('meta[name="twitter:image"]')).toHaveAttribute("content", imageUrl);

      const response = await expectServed(request, `/${locale}/og-image.png`, "image/png");
      const png = await response.body();
      // PNG header: width and height are big-endian uint32 at bytes 16 and 20.
      expect([png.readUInt32BE(16), png.readUInt32BE(20)]).toEqual([1200, 630]);
    });
  }
});

test.describe("crawling", () => {
  test("sitemap lists both locales with hreflang alternates", async ({ request }) => {
    const sitemap = await (await expectServed(request, "/sitemap.xml", "xml")).text();
    const locs = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(([, loc]) => loc);
    expect(locs).toEqual([`${siteUrl}/pt/`, `${siteUrl}/en/`]);
    expect(sitemap).toContain(`hreflang="pt-BR" href="${siteUrl}/pt/"`);
    expect(sitemap).toContain(`hreflang="en" href="${siteUrl}/en/"`);
  });

  test("robots.txt allows crawling and points to the sitemap", async ({ request }) => {
    const robots = await (await expectServed(request, "/robots.txt", "text/plain")).text();
    expect(robots).toContain("Allow: /");
    expect(robots).toContain(`Sitemap: ${siteUrl}/sitemap.xml`);
  });
});
