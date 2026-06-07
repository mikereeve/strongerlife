/* =============================================================
 * Page Metadata Helper — The Stronger Life
 *
 * Builds consistent title, description, canonical, and Open Graph
 * tags from siteConfig.url so every page uses thestrongerlifemn.org.
 * ============================================================= */

import type { Metadata } from "next";
import { siteConfig } from "./site";

export type BuildPageMetadataOptions = {
  title: string;
  description: string;
  /** Path after domain, e.g. "/about". Omit for homepage. */
  path?: string;
  /** Bypass the root layout title template (homepage only). */
  titleAbsolute?: boolean;
  openGraph?: {
    title?: string;
    description?: string;
  };
};

export function buildPageMetadata({
  title,
  description,
  path = "",
  titleAbsolute = false,
  openGraph,
}: BuildPageMetadataOptions): Metadata {
  const canonical = path ? `${siteConfig.url}${path}` : siteConfig.url;
  const ogTitle =
    openGraph?.title ??
    (titleAbsolute ? title : `${title} | The Stronger Life`);
  const ogDescription = openGraph?.description ?? description;

  return {
    title: titleAbsolute ? { absolute: title } : title,
    description,
    alternates: { canonical },
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url: canonical,
    },
  };
}
