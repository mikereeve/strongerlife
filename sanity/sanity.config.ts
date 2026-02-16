/* =============================================================
 * Sanity Studio Configuration — The Stronger Life
 *
 * This configures the Sanity Studio content management interface.
 *
 * Sanity Studio can be:
 *   A) Hosted separately at a URL like studio.thestrongerlife.org
 *   B) Embedded in the Next.js app at /studio (using next-sanity)
 *
 * For option B, create app/studio/[[...index]]/page.tsx.
 * For simplicity, this scaffold assumes option A (hosted separately).
 *
 * Deploy Studio: npx sanity deploy
 * Run locally:   npx sanity dev
 * ============================================================= */

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./schemas";

export default defineConfig({
  /* --- Project Identity ---
   * These must match the values in .env.local
   */
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "your-project-id",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",

  /* --- Studio Metadata --- */
  name: "the-stronger-life",
  title: "The Stronger Life — Content Studio",

  /* --- Plugins ---
   * structureTool: Provides the document list + editor UI
   * Add more plugins as needed (e.g., media browser, vision)
   */
  plugins: [
    structureTool({
      // Custom document structure for the Studio sidebar
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            // Blog Posts — primary content type
            S.listItem()
              .title("Blog Posts")
              .schemaType("post")
              .child(
                S.documentTypeList("post")
                  .title("All Blog Posts")
                  .defaultOrdering([
                    { field: "publishedAt", direction: "desc" },
                  ])
              ),

            S.divider(),

            // Taxonomy
            S.listItem()
              .title("Categories")
              .schemaType("category")
              .child(S.documentTypeList("category").title("Categories")),

            S.listItem()
              .title("Authors")
              .schemaType("author")
              .child(S.documentTypeList("author").title("Authors")),
          ]),
    }),
  ],

  /* --- Content Schemas --- */
  schema: {
    types: schemaTypes,
  },
});
