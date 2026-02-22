/* =============================================================
 * Config Barrel — The Stronger Life
 *
 * Re-exports everything from the focused config modules so
 * existing imports from "@/lib/config" continue to work.
 * ============================================================= */

export { siteConfig, featuredMedia, musicTracks, navigation, services } from "./site";
export { allTestimonials, featuredTestimonials, galleryPhotos } from "./testimonials";
export { pricing, weddingDownloads, weddingPlaylists, trustedPartners, serviceFAQs } from "./pricing";
export {
  generateLocalBusinessSchema,
  generatePersonSchema,
  generateServiceSchema,
  generateFAQSchema,
  generateBreadcrumbSchema,
  generateWebSiteSchema,
  generateReviewSchema,
} from "./schemas";
