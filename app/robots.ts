/* =============================================================
 * Robots.txt Generator — The Stronger Life
 *
 * Tells search engines which pages to crawl and where
 * to find the sitemap. Next.js serves this at /robots.txt.
 *
 * See: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
 * ============================================================= */

import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Block any admin or draft paths from indexing
        disallow: ["/api/", "/admin/", "/draft/"],
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
