/* =============================================================
 * Root Layout — The Stronger Life
 *
 * This is the top-level layout that wraps every page.
 * It loads fonts, sets global metadata, injects JSON-LD
 * structured data, and renders the shared Header/Footer.
 * ============================================================= */

import type { Metadata, Viewport } from "next";
import { Playfair_Display, Source_Sans_3 } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { siteConfig, generateLocalBusinessSchema } from "@/lib/config";
import "@/styles/globals.css";

/* --- Font Loading ---
 * Next.js automatically optimizes these Google Fonts:
 * - Self-hosts them (no external requests)
 * - Applies font-display: swap for fast rendering
 * - Generates preload hints
 */
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

/* --- Global Metadata ---
 * Default metadata for the entire site. Individual pages
 * can override these with their own `export const metadata`.
 * See: https://nextjs.org/docs/app/api-reference/functions/generate-metadata
 */
export const viewport: Viewport = {
  themeColor: "#1B2A4A",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.seo.defaultTitle,
    template: siteConfig.seo.titleTemplate,
  },
  description: siteConfig.description,
  keywords: [
    "premarital counseling",
    "Christian premarital counseling",
    "marriage coaching",
    "wedding officiant",
    "relationship coaching",
    "couples counseling",
    "St. Cloud Minnesota wedding officiant",
    "Central Minnesota premarital counseling",
    "Prepare Enrich counseling",
  ],
  authors: [{ name: "Matt Reeve" }],
  creator: "The Stronger Life",
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.seo.defaultTitle,
    description: siteConfig.description,
    images: [...siteConfig.seo.openGraph.images],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.seo.defaultTitle,
    description: siteConfig.description,
    images: siteConfig.seo.openGraph.images.map((img) => img.url) as string[],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  // Canonical URL prevents duplicate content issues
  alternates: {
    canonical: siteConfig.url,
  },
};

/* --- Root Layout Component --- */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Generate structured data for the business
  const jsonLd = generateLocalBusinessSchema();

  return (
    <html lang="en" className={`${playfair.variable} ${sourceSans.variable}`}>
      <head>
        {/* Preconnect to external domains for faster resource loading */}
        <link rel="preconnect" href="https://cdn.sanity.io" />
        <link rel="preconnect" href="https://assets.calendly.com" />

        {/* JSON-LD Structured Data — helps Google understand the business */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        {/* Skip to main content link for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4
                     bg-brand-navy text-white px-4 py-2 rounded z-50"
        >
          Skip to main content
        </a>

        <Header />

        <main id="main-content" className="flex-grow">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
