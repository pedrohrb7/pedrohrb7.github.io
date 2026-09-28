import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n";

/*
 * Icons and social images are plain routes with a file extension (public/icon.svg, apple-touch-icon.png/route.tsx,
 * [locale]/og-image.png/route.tsx) instead of Next's icon/opengraph-image conventions: those export extensionless
 * files, which GitHub Pages and nginx serve without an image Content-Type.
 */

export const appleTouchIconPath = "/apple-touch-icon.png";

// Shared by every root layout ([locale], (root) and global-not-found), since there is no single app/layout.tsx.
export const siteIcons: Metadata["icons"] = {
  icon: { url: "/icon.svg", type: "image/svg+xml" },
  apple: { url: appleTouchIconPath, sizes: "180x180", type: "image/png" },
};

export const ogImageSize = { width: 1200, height: 630 } as const;

export function ogImagePath(locale: Locale): string {
  return `/${locale}/og-image.png`;
}
