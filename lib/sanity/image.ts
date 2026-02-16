/* =============================================================
 * Sanity Image Helpers — The Stronger Life
 *
 * Utility for generating optimized image URLs from Sanity assets.
 * Uses @sanity/image-url to apply transformations like resizing,
 * cropping, and format conversion at the CDN level.
 *
 * Usage:
 *   import { urlFor } from "@/lib/sanity/image";
 *   <img src={urlFor(post.mainImage).width(800).url()} />
 * ============================================================= */

import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client } from "./client";

/* --- Image URL Builder Instance ---
 * Configured with the Sanity client so it knows
 * which project/dataset to reference for asset URLs.
 */
const builder = imageUrlBuilder(client);

/* --- urlFor Helper ---
 * Takes a Sanity image field and returns a chainable builder.
 *
 * Common transformations:
 *   urlFor(image).width(800).height(600).url()
 *   urlFor(image).width(400).format("webp").url()
 *   urlFor(image).width(1200).quality(80).auto("format").url()
 *
 * The .auto("format") method returns WebP for supported browsers
 * and falls back to the original format for others.
 */
export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}
