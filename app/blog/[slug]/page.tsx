/* =============================================================
 * Individual Blog Post Page — The Stronger Life
 *
 * Dynamic route: /blog/[slug]
 *
 * Features:
 *   - Static generation of all posts at build time (SSG)
 *   - Dynamic metadata from post title/excerpt for SEO
 *   - JSON-LD Article schema for rich search results
 *   - Portable Text rendering for rich content
 *   - Reading time estimate
 *   - Related CTA at bottom
 *   - ISR revalidation for content updates
 *
 * How It Works:
 *   1. generateStaticParams() pre-builds all known post URLs
 *   2. generateMetadata() creates SEO tags from Sanity data
 *   3. The page component fetches and renders the full post
 * ============================================================= */

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { client } from "@/lib/sanity/client";
import {
  postBySlugQuery,
  allPostSlugsQuery,
} from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";
import { assertSanityConfig } from "@/lib/sanity/env";
import type { Post } from "@/lib/sanity/types";
import PortableTextRenderer from "@/components/ui/PortableTextRenderer";
import CTABanner from "@/components/sections/CTABanner";
import { siteConfig, generateBreadcrumbSchema } from "@/lib/config";

/* --- ISR Revalidation ---
 * Revalidate individual post pages every 60 seconds
 * to pick up content edits from Sanity Studio.
 */
export const revalidate = 60;

/* --- Static Params (SSG) ---
 * Pre-renders all blog post pages at build time.
 * This means every post is a fast, static HTML file.
 * New posts added via Sanity are picked up by ISR.
 */
export async function generateStaticParams() {
  const isConfigured = assertSanityConfig();
  if (!isConfigured) return [];

  try {
    const slugs = await client.fetch<{ slug: string }[]>(allPostSlugsQuery);
    return (slugs || []).map((post) => ({ slug: post.slug }));
  } catch (error) {
    console.error("Failed to fetch blog slugs for static params:", error);
    return [];
  }
}

/* --- Dynamic Metadata ---
 * Generates unique title, description, and Open Graph tags
 * for each blog post based on its Sanity content.
 * Falls back to post title/excerpt if SEO fields are empty.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const isConfigured = assertSanityConfig();
  if (!isConfigured) return {};

  const { slug } = await params;

  try {
    const post = await client.fetch<Post>(postBySlugQuery, {
      slug,
    });

    if (!post) return {};

    const title = post.seoTitle || post.title;
    const description = post.seoDescription || post.excerpt;
    const postUrl = `${siteConfig.url}/blog/${post.slug}`;

    return {
      title,
      description,
      alternates: { canonical: postUrl },
      openGraph: {
        title,
        description,
        url: postUrl,
        type: "article",
        publishedTime: post.publishedAt,
        authors: post.author?.name ? [post.author.name] : undefined,
        // Include featured image in social sharing preview
        ...(post.mainImage?.url && {
          images: [
            {
              url: urlFor(post.mainImage).width(1200).height(630).quality(80).auto("format").url(),
              width: 1200,
              height: 630,
              alt: post.mainImage.alt || post.title,
            },
          ],
        }),
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
      },
    };
  } catch (error) {
    console.error("Failed to generate metadata for blog post:", error);
    return {};
  }
}

/* --- Page Component --- */
export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const isConfigured = assertSanityConfig();

  // If Sanity isn't configured, show 404
  if (!isConfigured) notFound();

  const { slug } = await params;
  let post: Post | null = null;

  try {
    post = await client.fetch<Post>(postBySlugQuery, {
      slug,
    });
  } catch (error) {
    console.error("Failed to fetch blog post:", error);
    notFound();
  }

  // Post not found — Next.js will show the 404 page
  if (!post) notFound();

  /* --- Article JSON-LD Schema ---
   * Helps Google display rich results (thumbnail, date, author)
   * in search results for blog posts.
   */
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: siteConfig.url },
    { name: "Blog", url: `${siteConfig.url}/blog` },
    { name: post.title, url: `${siteConfig.url}/blog/${post.slug}` },
  ]);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    url: `${siteConfig.url}/blog/${post.slug}`,
    datePublished: post.publishedAt,
    author: {
      "@type": "Person",
      name: post.author?.name || "Matt Reeve",
      url: `${siteConfig.url}/about`,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    ...(post.mainImage?.url && {
      image: urlFor(post.mainImage).width(1200).height(630).quality(80).auto("format").url(),
    }),
  };

  return (
    <>
      {/* Structured data for rich search results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* ========== POST HEADER ========== */}
      <section className="bg-brand-navy pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="section-wrapper max-w-narrow text-center">
          {/* Category badge */}
          {post.category && (
            <span className="inline-block text-xs font-medium text-brand-gold uppercase
                             tracking-wide bg-brand-gold/10 px-3 py-1 rounded-full mb-4">
              {post.category.title}
            </span>
          )}

          {/* Post title */}
          <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-heading
                         font-bold leading-tight mb-6">
            {post.title}
          </h1>

          {/* Meta line: author, date, reading time */}
          <div className="flex items-center justify-center gap-3 text-white/60 text-sm flex-wrap">
            {post.author && (
              <>
                <span>By {post.author.name}</span>
                <span>•</span>
              </>
            )}
            <time dateTime={post.publishedAt}>
              {new Date(post.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            {post.estimatedReadingTime && (
              <>
                <span>•</span>
                <span>{post.estimatedReadingTime} min read</span>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ========== FEATURED IMAGE ========== */}
      {post.mainImage?.url && (
        <div className="section-wrapper -mt-8 mb-12">
          <div className="max-w-narrow mx-auto">
            <div className="aspect-[16/9] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src={urlFor(post.mainImage)
                  .width(900)
                  .height(506)
                  .quality(85)
                  .auto("format")
                  .url()}
                alt={post.mainImage.alt || post.title}
                width={900}
                height={506}
                className="w-full h-full object-cover"
                sizes="(max-width: 800px) 100vw, 800px"
                priority // Preload for LCP
              />
            </div>
          </div>
        </div>
      )}

      {/* ========== POST BODY ========== */}
      <article className="section-block bg-white pt-8">
        <div className="section-wrapper max-w-narrow">
          <PortableTextRenderer content={post.body} />
        </div>
      </article>

      {/* ========== POST FOOTER ========== */}
      <section className="bg-white pb-16">
        <div className="section-wrapper max-w-narrow">
          {/* Back to blog link */}
          <div className="border-t border-brand-stone/10 pt-8 mt-8">
            <Link
              href="/blog"
              className="text-brand-gold-dark font-medium no-underline inline-flex
                         items-center gap-2 hover:gap-3 transition-all"
            >
              ← Back to All Articles
            </Link>
          </div>
        </div>
      </section>

      {/* ========== BOTTOM CTA ========== */}
      <CTABanner
        heading="Ready to Take the Next Step?"
        subheading="Schedule a free consultation to talk about your relationship goals."
      />
    </>
  );
}
