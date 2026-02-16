/* =============================================================
 * Sanity GROQ Queries — The Stronger Life
 *
 * All GROQ queries for fetching content from Sanity.
 * Queries are exported as constants so they can be reused
 * across pages (blog index, individual posts, sitemap, RSS).
 *
 * GROQ Reference: https://www.sanity.io/docs/groq
 * ============================================================= */

import { groq } from "next-sanity";

/* --- All Posts (List View) ---
 * Fetches published posts sorted by date (newest first).
 * Uses projection to return only the fields needed for
 * the blog index page — keeps the response payload small.
 *
 * The category and author are dereferenced inline using
 * Sanity's `->` operator so we get their fields directly.
 */
export const allPostsQuery = groq`
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    mainImage {
      ...,
      "url": asset->url
    },
    "category": category-> {
      title,
      "slug": slug.current
    },
    "author": author-> {
      name,
      "slug": slug.current
    },
    // Rough reading time: ~200 words per minute
    "estimatedReadingTime": round(length(pt::text(body)) / 5 / 200)
  }
`;

/* --- Single Post (Full View) ---
 * Fetches a complete post by slug, including the Portable Text
 * body for rendering on the individual post page.
 *
 * @param $slug — The URL-friendly slug (e.g., "5-tips-for-marriage")
 */
export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    body,
    mainImage {
      ...,
      "url": asset->url,
      alt
    },
    "category": category-> {
      title,
      "slug": slug.current
    },
    "author": author-> {
      name,
      "slug": slug.current,
      bio,
      image {
        ...,
        "url": asset->url
      }
    },
    // SEO field overrides (falls back to title/excerpt if empty)
    seoTitle,
    seoDescription,
    "estimatedReadingTime": round(length(pt::text(body)) / 5 / 200)
  }
`;

/* --- All Post Slugs ---
 * Used by generateStaticParams() to pre-render all post pages
 * at build time (Static Site Generation). This ensures every
 * blog post is a fast, static HTML page.
 */
export const allPostSlugsQuery = groq`
  *[_type == "post" && defined(slug.current)] {
    "slug": slug.current
  }
`;

/* --- Posts by Category ---
 * Fetches posts filtered by category slug.
 *
 * @param $categorySlug — The category slug to filter by
 */
export const postsByCategoryQuery = groq`
  *[_type == "post" && category->slug.current == $categorySlug] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    mainImage {
      ...,
      "url": asset->url
    },
    "category": category-> {
      title,
      "slug": slug.current
    },
    "author": author-> {
      name,
      "slug": slug.current
    }
  }
`;

/* --- All Categories ---
 * Fetches all blog categories for navigation/filtering.
 */
export const allCategoriesQuery = groq`
  *[_type == "category"] | order(title asc) {
    _id,
    title,
    "slug": slug.current,
    description
  }
`;

/* --- Sitemap Posts ---
 * Minimal query for generating sitemap entries.
 * Only fetches slug and date to keep it lightweight.
 */
export const sitemapPostsQuery = groq`
  *[_type == "post" && defined(slug.current)] {
    "slug": slug.current,
    "updatedAt": _updatedAt,
    publishedAt
  }
`;
