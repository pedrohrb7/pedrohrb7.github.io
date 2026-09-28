import type { MetadataRoute } from "next";
import { profile } from "@/content";

// Required by output: "export" for generated metadata routes.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: new URL("/sitemap.xml", profile.siteUrl).href,
  };
}
