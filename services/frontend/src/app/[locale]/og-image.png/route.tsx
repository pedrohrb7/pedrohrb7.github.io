import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { getContent, profile } from "@/content";
import { readGeistFont } from "@/lib/geist-fonts";
import { isLocale, locales } from "@/lib/i18n";
import { ogImageSize } from "@/lib/site-metadata";
import { lightColors } from "@/styles/tokens";

// Required by output: "export" for route handlers.
export const dynamic = "force-static";

// Route handlers don't inherit generateStaticParams from the [locale] layout.
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const siteHost = new URL(profile.siteUrl).host;

// One Open Graph / Twitter card per locale, referenced from generateMetadata in [locale]/layout.tsx.
export async function GET(_request: Request, { params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) throw new Error(`Unknown locale for the Open Graph image: ${locale}`);
  const content = getContent(locale);
  const [sansRegular, sansSemiBold, monoRegular, icon] = await Promise.all([
    readGeistFont("sansRegular"),
    readGeistFont("sansSemiBold"),
    readGeistFont("monoRegular"),
    readFile(join(process.cwd(), "public/icon.svg")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: lightColors.background,
          color: lightColors.fg,
          fontFamily: "Geist",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontFamily: "Geist Mono", fontSize: 32, color: lightColors.accent }}>{content.title}</div>
          <div style={{ marginTop: 20, fontSize: 120, fontWeight: 600, letterSpacing: -4, lineHeight: 1.1 }}>
            {profile.name}
          </div>
          <div style={{ marginTop: 24, fontSize: 36, color: lightColors.muted }}>{content.location}</div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: 40,
            borderTop: `2px solid ${lightColors.border}`,
          }}
        >
          <div style={{ fontFamily: "Geist Mono", fontSize: 30, color: lightColors.muted }}>{siteHost}</div>
          {/* eslint-disable-next-line @next/next/no-img-element -- rendered by next/og, not the browser */}
          <img src={`data:image/svg+xml;base64,${icon.toString("base64")}`} width={72} height={72} alt="" />
        </div>
      </div>
    ),
    {
      ...ogImageSize,
      fonts: [
        { name: "Geist", data: sansRegular, weight: 400 },
        { name: "Geist", data: sansSemiBold, weight: 600 },
        { name: "Geist Mono", data: monoRegular, weight: 400 },
      ],
    },
  );
}
