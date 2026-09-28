import type { NextConfig } from "next";

// Static export for GitHub Pages: no server runtime, every route is prerendered to out/.
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  // Needed for a site-styled 404: the app has two root layouts ([locale] and (root)), so no single layout can wrap not-found.
  experimental: { globalNotFound: true },
};

export default nextConfig;
