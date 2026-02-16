/* =============================================================
 * Sanity Types — The Stronger Life
 *
 * TypeScript interfaces for Sanity CMS content models.
 * These match the schemas defined in /sanity/schemas/ and
 * the shape of data returned by GROQ queries.
 *
 * Keeping types in sync with schemas ensures type safety
 * from CMS → API → component rendering.
 * ============================================================= */

import type { PortableTextBlock } from "next-sanity";

/* --- Image Asset ---
 * Sanity stores images as references to uploaded assets.
 * This type covers the common fields after GROQ projection.
 */
export interface SanityImage {
  _type: "image";
  alt?: string;
  asset: {
    _ref: string;
    _type: "reference";
    url?: string;
  };
}

/* --- Category ---
 * Blog post categories (e.g., "Premarital", "Marriage", "Wedding Planning")
 */
export interface Category {
  _id: string;
  title: string;
  slug: string;
  description?: string;
}

/* --- Author ---
 * Blog post author — currently just Matt, but structured
 * to support guest authors in the future.
 */
export interface Author {
  _id: string;
  name: string;
  slug: string;
  bio?: PortableTextBlock[];
  image?: SanityImage;
}

/* --- Blog Post (List View) ---
 * Lightweight post data used on the blog index page.
 * Excludes the full body content to keep the payload small.
 */
export interface PostListItem {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  mainImage?: SanityImage & { url?: string };
  category?: {
    title: string;
    slug: string;
  };
  author?: {
    name: string;
    slug: string;
  };
  // Estimated reading time (calculated in GROQ or component)
  estimatedReadingTime?: number;
}

/* --- Blog Post (Full View) ---
 * Complete post data for the individual post page.
 * Includes the Portable Text body and all related fields.
 */
export interface Post extends PostListItem {
  body: PortableTextBlock[];
  // SEO fields (optional overrides)
  seoTitle?: string;
  seoDescription?: string;
}
