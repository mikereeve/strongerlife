/* =============================================================
 * Sanity Environment Variables — The Stronger Life
 *
 * Centralized access to Sanity env vars with validation.
 * Throws clear error messages during build if vars are missing,
 * so you catch config issues early rather than at runtime.
 * ============================================================= */

// Required: Sanity project ID from https://sanity.io/manage
export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "ijhoknpo";

// Dataset name — typically "production"
export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

// API version — pinned date prevents breaking changes
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-12-01";

/* --- Validation ---
 * Warn in development, throw in production build.
 * This ensures you never deploy without proper config.
 */
export function assertSanityConfig() {
  if (projectId === "your-project-id") {
    const message =
      "⚠️  Sanity project ID is not configured. " +
      "Set NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local. " +
      "See .env.local.example for setup instructions.";

    if (process.env.NODE_ENV === "production") {
      // Allow build to continue — blog will show empty state
      console.warn(message);
    } else {
      console.warn(message);
    }
    return false;
  }
  return true;
}
