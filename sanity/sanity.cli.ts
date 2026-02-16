/* =============================================================
 * Sanity CLI Configuration
 *
 * Used by the `sanity` CLI tool for local development,
 * dataset management, and Studio deployments.
 *
 * Commands:
 *   npx sanity dev      — Run Studio locally
 *   npx sanity deploy   — Deploy Studio to Sanity's hosting
 *   npx sanity dataset  — Manage datasets (create, export, import)
 * ============================================================= */

import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "your-project-id",
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  },
  // Studio source files for the build
  studioHost: "thestrongerlife",
});
