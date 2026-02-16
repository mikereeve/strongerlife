/* =============================================================
 * Schema Index — Sanity CMS
 *
 * Aggregates all document and object type schemas for
 * registration with Sanity Studio.
 *
 * To add a new content type:
 *   1. Create a schema file in /sanity/schemas/
 *   2. Import and add it to the schemaTypes array below
 * ============================================================= */

import post from "./post";
import category from "./category";
import author from "./author";
import blockContent from "./blockContent";

// All schema types registered with Sanity Studio
export const schemaTypes = [post, category, author, blockContent];
