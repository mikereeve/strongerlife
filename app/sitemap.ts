/* =============================================================
 * Sitemap Generator — The Stronger Life
 *
 * Generates a dynamic sitemap.xml that includes both static
 * pages and dynamically fetched blog posts from Sanity CMS.
 *
 * Next.js automatically serves this at /sitemap.xml.
 * The sitemap is regenerated on each build and during ISR.
 * ============================================================= */

import { MetadataRoute } from "next";
import { client } from "@/lib/sanity/client";
import { sitemapPostsQuery } from "@/lib/sanity/queries";
import { assertSanityConfig } from "@/lib/sanity/env";
import { siteConfig } from "@/lib/config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url;

  /* --- Static Pages ---
   * Core site pages with manually assigned priority and
   * update frequency hints for search engines.
   */
  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl,                                lastModified: new Date(), changeFrequency: "monthly", priority: 1.0  },
    // Premarital counseling = highest-intent service; ranked above others
    { url: `${baseUrl}/premarital-counseling`,     lastModified: new Date(), changeFrequency: "monthly", priority: 0.95 },
    { url: `${baseUrl}/wedding-officiant`,         lastModified: new Date(), changeFrequency: "monthly", priority: 0.9  },
    { url: `${baseUrl}/marriage-coaching`,         lastModified: new Date(), changeFrequency: "monthly", priority: 0.85 },
    { url: `${baseUrl}/services`,                  lastModified: new Date(), changeFrequency: "monthly", priority: 0.8  },
    { url: `${baseUrl}/contact`,                   lastModified: new Date(), changeFrequency: "monthly", priority: 0.8  },
    { url: `${baseUrl}/testimonials`,              lastModified: new Date(), changeFrequency: "monthly", priority: 0.75 },
    { url: `${baseUrl}/about`,                     lastModified: new Date(), changeFrequency: "monthly", priority: 0.7  },
    { url: `${baseUrl}/blog`,                      lastModified: new Date(), changeFrequency: "weekly",  priority: 0.7  },
  ];

  /* --- Dynamic Blog Posts ---
   * Fetches all published post slugs and dates from Sanity.
   * Gracefully returns static-only sitemap if Sanity isn't configured.
   */
  let blogPages: MetadataRoute.Sitemap = [];

  const isConfigured = assertSanityConfig();
  if (isConfigured) {
    try {
      const posts = await client.fetch<
        { slug: string; updatedAt: string; publishedAt: string }[]
      >(sitemapPostsQuery);

      blogPages = (posts || []).map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        // Use the most recent date between updated and published
        lastModified: new Date(post.updatedAt || post.publishedAt),
        changeFrequency: "monthly" as const,
        priority: 0.6,
      }));
    } catch (error) {
      console.error("Failed to fetch blog posts for sitemap:", error);
      // Continue with static pages only — don't break the sitemap
    }
  }

  return [...staticPages, ...blogPages];
}
