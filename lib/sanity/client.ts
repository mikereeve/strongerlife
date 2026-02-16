/* =============================================================
 * Sanity Client — The Stronger Life
 *
 * Configures the Sanity.io client for fetching blog content.
 * Two clients are exported:
 *
 *   client     — Production client using the CDN (fast, cached)
 *   previewClient — Authenticated client for draft previews
 *
 * Usage:
 *   import { client } from "@/lib/sanity/client";
 *   const posts = await client.fetch(query);
 *
 * Setup:
 *   1. Create a project at https://sanity.io/manage
 *   2. Copy the Project ID to .env.local
 *   3. Run `npx sanity@latest init` in the /sanity directory
 *   4. Deploy Sanity Studio: `npx sanity deploy`
 * ============================================================= */

import { createClient } from "next-sanity";
import { projectId, dataset, apiVersion } from "./env";

/* --- Production Client ---
 * Uses the Sanity CDN for fast, globally cached reads.
 * This is what all public-facing pages use to fetch content.
 *
 * The `stega` option is disabled to prevent visual editing
 * tokens from leaking into production HTML.
 */
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // Use the CDN for faster reads in production
  useCdn: true,
  // Disable stega encoding in production output
  stega: { enabled: false },
});

/* --- Preview Client ---
 * Bypasses the CDN and uses an auth token to fetch
 * draft (unpublished) content. Used only in preview mode.
 *
 * Requires SANITY_API_READ_TOKEN to be set in .env.local.
 * Generate a token in: Sanity Dashboard → API → Tokens
 */
export const previewClient = createClient({
  projectId,
  dataset,
  apiVersion,
  // Skip CDN to get real-time draft content
  useCdn: false,
  // Auth token for reading draft documents
  token: process.env.SANITY_API_READ_TOKEN || "",
  stega: { enabled: false },
});

/* --- Client Selector ---
 * Helper to pick the right client based on preview mode.
 * Use in data-fetching functions:
 *
 *   const sanity = getClient(isPreview);
 *   const posts = await sanity.fetch(query);
 */
export function getClient(preview = false) {
  return preview ? previewClient : client;
}
