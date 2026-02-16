/* =============================================================
 * Author Schema — Sanity CMS
 *
 * Blog post authors. Currently just Matt Reeve, but structured
 * to support guest contributors in the future.
 * ============================================================= */

import { defineField, defineType } from "sanity";

export default defineType({
  name: "author",
  title: "Author",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      description: "Author's display name.",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      description: "URL-friendly version of the author's name.",
      options: { source: "name", maxLength: 50 },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "image",
      title: "Photo",
      type: "image",
      description: "Author headshot / avatar.",
      options: { hotspot: true },
    }),

    defineField({
      name: "bio",
      title: "Bio",
      type: "array",
      description: "Short author biography.",
      of: [{ type: "block" }],
    }),
  ],

  preview: {
    select: { title: "name", media: "image" },
  },
});
