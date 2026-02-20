/* =============================================================
 * Blog Index Page — The Stronger Life
 *
 * Fetches and displays all published blog posts from Sanity CMS.
 * Falls back to a placeholder/empty state if Sanity is not
 * yet configured, so the site works during initial setup.
 *
 * Data Flow:
 *   Sanity Studio (Matt writes) → Sanity CDN → This page
 *
 * Revalidation:
 *   Uses ISR (Incremental Static Regeneration) to rebuild
 *   the page every 60 seconds, so new posts appear without
 *   a full redeploy.
 * ============================================================= */

import type { Metadata } from "next";
import Link from "next/link";
import { client } from "@/lib/sanity/client";
import { allPostsQuery } from "@/lib/sanity/queries";
import { assertSanityConfig } from "@/lib/sanity/env";
import type { PostListItem } from "@/lib/sanity/types";
import BlogSearch from "@/components/ui/BlogSearch";
import { siteConfig, generateBreadcrumbSchema } from "@/lib/config";

/* --- Page Metadata --- */
export const metadata: Metadata = {
  title: "Blog — Before and After You Say 'I Do'",
  description:
    "Insights, advice, and encouragement for couples before and after the wedding. Articles on communication, conflict resolution, wedding planning, and building a thriving marriage.",
  alternates: {
    canonical: `${siteConfig.url}/blog`,
  },
};

/* --- ISR Revalidation ---
 * Rebuild this page every 60 seconds when new requests come in.
 * This means new posts appear within a minute of publishing
 * without needing a full site redeploy.
 */
export const revalidate = 60;

/* --- Data Fetching ---
 * Runs at build time (SSG) and during ISR revalidation.
 * Returns an empty array if Sanity isn't configured yet.
 */
async function getPosts(): Promise<PostListItem[]> {
  // Check if Sanity is properly configured
  const isConfigured = assertSanityConfig();
  if (!isConfigured) return [];

  try {
    const posts = await client.fetch<PostListItem[]>(allPostsQuery);
    return posts || [];
  } catch (error) {
    console.error("Failed to fetch blog posts from Sanity:", error);
    return [];
  }
}

export default async function BlogPage() {
  const posts = await getPosts();
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: siteConfig.url },
    { name: "Blog", url: `${siteConfig.url}/blog` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* ========== PAGE HERO ========== */}
      <section className="bg-brand-navy py-32 md:py-40">
        <div className="section-wrapper text-center">
          <h1 className="text-white text-4xl md:text-5xl font-heading font-bold mb-6">
            Before &amp; After You Say &ldquo;I Do&rdquo;
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto leading-relaxed">
            Insights, advice, and encouragement for your journey together.
          </p>
        </div>
      </section>

      {/* ========== BLOG POSTS ========== */}
      <section className="section-block bg-white">
        <div className="section-wrapper max-w-narrow">
          {posts.length > 0 ? (
            <BlogSearch posts={posts} />
          ) : (
            /* --- Empty State ---
             * Shown when Sanity isn't configured yet or no posts exist.
             */
            <div className="text-center py-16">
              <div className="text-5xl mb-4" aria-hidden="true">&#9997;&#65039;</div>
              <h2 className="text-2xl font-heading text-brand-navy mb-3">
                Coming Soon
              </h2>
              <p className="text-brand-stone max-w-md mx-auto leading-relaxed">
                New articles on marriage, relationships, and wedding planning
                are on the way. In the meantime, feel free to{" "}
                <Link href="/contact" className="text-brand-gold-dark">
                  reach out with any questions
                </Link>
                .
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
