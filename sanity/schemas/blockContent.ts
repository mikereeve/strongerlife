/* =============================================================
 * Block Content Schema — Sanity CMS
 *
 * Defines the rich text editor configuration for blog post
 * body content. This controls which formatting options and
 * embedded content types are available in the Portable Text
 * editor in Sanity Studio.
 *
 * Portable Text is Sanity's rich text format that renders
 * to semantic HTML on the frontend, giving full control
 * over styling and layout.
 * ============================================================= */

import { defineType, defineArrayMember } from "sanity";

export default defineType({
  name: "blockContent",
  title: "Block Content",
  type: "array",
  of: [
    /* --- Text Blocks ---
     * Standard paragraph and heading blocks with
     * inline formatting (bold, italic, links, etc.)
     */
    defineArrayMember({
      type: "block",
      title: "Block",

      // Heading styles available in the toolbar dropdown
      styles: [
        { title: "Normal", value: "normal" },
        { title: "H2", value: "h2" },
        { title: "H3", value: "h3" },
        { title: "H4", value: "h4" },
        { title: "Quote", value: "blockquote" },
      ],

      // List types
      lists: [
        { title: "Bullet", value: "bullet" },
        { title: "Numbered", value: "number" },
      ],

      // Inline formatting marks
      marks: {
        // Simple text decorators
        decorators: [
          { title: "Bold", value: "strong" },
          { title: "Italic", value: "em" },
          { title: "Underline", value: "underline" },
          { title: "Code", value: "code" },
        ],

        // Annotation types (marks that wrap text with data)
        annotations: [
          {
            title: "URL Link",
            name: "link",
            type: "object",
            fields: [
              {
                title: "URL",
                name: "href",
                type: "url",
                description: "External link (https://...)",
                validation: (Rule: any) =>
                  Rule.uri({
                    allowRelative: true,
                    scheme: ["http", "https", "mailto", "tel"],
                  }),
              },
              {
                title: "Open in new tab",
                name: "blank",
                type: "boolean",
                description: "Opens the link in a new browser tab.",
                initialValue: true,
              },
            ],
          },
          {
            // Internal link to another page on the site
            title: "Internal Link",
            name: "internalLink",
            type: "object",
            fields: [
              {
                title: "Page Path",
                name: "href",
                type: "string",
                description: 'Relative path (e.g., "/premarital-counseling")',
              },
            ],
          },
        ],
      },
    }),

    /* --- Inline Images ---
     * Images embedded within the post body.
     * Supports alt text and focal point cropping.
     */
    defineArrayMember({
      type: "image",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          title: "Alt Text",
          type: "string",
          description: "Describe this image for accessibility.",
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: "caption",
          title: "Caption",
          type: "string",
          description: "Optional caption displayed below the image.",
        },
      ],
    }),

    /* --- Callout Block ---
     * A styled callout/highlight box for tips, warnings,
     * or important notes within a post.
     */
    defineArrayMember({
      name: "callout",
      title: "Callout Box",
      type: "object",
      fields: [
        {
          name: "type",
          title: "Callout Type",
          type: "string",
          options: {
            list: [
              { title: "Tip", value: "tip" },
              { title: "Note", value: "note" },
              { title: "Important", value: "important" },
            ],
          },
          initialValue: "tip",
        },
        {
          name: "text",
          title: "Callout Text",
          type: "text",
          rows: 3,
        },
      ],
      preview: {
        select: { calloutType: "type", calloutText: "text" },
        prepare({ calloutType, calloutText }: Record<string, string>) {
          return {
            title: `${calloutType?.toUpperCase() || "CALLOUT"}: ${calloutText?.slice(0, 60) || ""}...`,
          };
        },
      },
    }),
  ],
});
