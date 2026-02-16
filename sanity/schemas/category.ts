/* =============================================================
 * Category Schema — Sanity CMS
 *
 * Blog post categories for organizing content.
 * Suggested starting categories:
 *   - Premarital
 *   - Marriage
 *   - Wedding Planning
 *   - Faith & Relationships
 *   - Communication
 * ============================================================= */

import { defineField, defineType } from "sanity";

export default defineType({
  name: "category",
  title: "Category",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "Category name (e.g., 'Premarital', 'Marriage').",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      description: "URL-friendly version of the category name.",
      options: { source: "title", maxLength: 50 },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "description",
      title: "Description",
      type: "text",
      description: "Brief description of what this category covers.",
      rows: 2,
    }),
  ],
});
