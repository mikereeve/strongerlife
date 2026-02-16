/* =============================================================
 * Blog Post Schema — Sanity CMS
 *
 * Defines the "post" document type for The Stronger Life blog.
 * This schema appears in Sanity Studio as a content type that
 * Matt can use to create and manage blog articles.
 *
 * Fields:
 *   - title, slug, excerpt (required for SEO)
 *   - mainImage (featured/hero image)
 *   - body (Portable Text rich content)
 *   - category, author (references)
 *   - publishedAt (publication date)
 *   - seoTitle, seoDescription (optional SEO overrides)
 * ============================================================= */

import { defineField, defineType } from "sanity";

export default defineType({
  name: "post",
  title: "Blog Post",
  type: "document",

  /* --- Field Definitions --- */
  fields: [
    /* Title — The post headline */
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "The main headline for this blog post.",
      validation: (Rule) => Rule.required().max(100),
    }),

    /* Slug — URL-friendly identifier
     * Auto-generates from the title but can be customized.
     * Used in the URL: /blog/{slug}
     */
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      description: "The URL path for this post (e.g., 'my-post-title').",
      options: {
        source: "title",
        maxLength: 96,
        // Generates URL-safe slugs from the title
        slugify: (input: string) =>
          input
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^\w-]+/g, "")
            .slice(0, 96),
      },
      validation: (Rule) => Rule.required(),
    }),

    /* Excerpt — Short summary for listings and SEO */
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      description:
        "A brief summary (1-2 sentences) shown on the blog index page and in search results.",
      rows: 3,
      validation: (Rule) => Rule.required().max(300),
    }),

    /* Main Image — Featured/hero image */
    defineField({
      name: "mainImage",
      title: "Main Image",
      type: "image",
      description: "Featured image displayed at the top of the post and in listings.",
      options: {
        hotspot: true, // Enable focal point selection for cropping
      },
      fields: [
        // Alt text for accessibility and SEO
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",
          description: "Describe this image for screen readers and SEO.",
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),

    /* Body — Rich text content (Portable Text)
     * Supports headings, lists, links, images, and custom blocks.
     * Portable Text renders to semantic HTML on the frontend.
     */
    defineField({
      name: "body",
      title: "Body Content",
      type: "blockContent",
    }),

    /* Category — Reference to a category document */
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "category" }],
      description: "Select the most relevant category for this post.",
    }),

    /* Author — Reference to an author document */
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      to: [{ type: "author" }],
      description: "Who wrote this post?",
    }),

    /* Published Date — Controls sort order and display */
    defineField({
      name: "publishedAt",
      title: "Published Date",
      type: "datetime",
      description: "When this post should appear as published.",
      initialValue: () => new Date().toISOString(),
    }),

    /* --- SEO Override Fields ---
     * Optional. When empty, the title and excerpt are used
     * as the page title and meta description respectively.
     */
    defineField({
      name: "seoTitle",
      title: "SEO Title Override",
      type: "string",
      description:
        "Custom page title for search results (leave empty to use the post title).",
      group: "seo",
      validation: (Rule) => Rule.max(70),
    }),

    defineField({
      name: "seoDescription",
      title: "SEO Description Override",
      type: "text",
      description:
        "Custom meta description for search results (leave empty to use the excerpt).",
      group: "seo",
      rows: 3,
      validation: (Rule) => Rule.max(160),
    }),
  ],

  /* --- Field Groups ---
   * Organize fields into tabs in Sanity Studio for cleaner UX.
   */
  groups: [
    { name: "seo", title: "SEO Settings" },
  ],

  /* --- Studio Preview ---
   * Controls how posts appear in the Studio document list.
   */
  preview: {
    select: {
      title: "title",
      author: "author.name",
      media: "mainImage",
      date: "publishedAt",
    },
    prepare(selection) {
      const { title, author, media, date } = selection;
      const formattedDate = date
        ? new Date(date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })
        : "No date";
      return {
        title,
        subtitle: `${author || "No author"} · ${formattedDate}`,
        media,
      };
    },
  },

  /* --- Default Ordering ---
   * Most recent posts appear first in the Studio list.
   */
  orderings: [
    {
      title: "Published Date (Newest)",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
});
