/* =============================================================
 * Root Layout — The Stronger Life
 *
 * This is the top-level layout that wraps every page.
 * It loads fonts, sets global metadata, injects JSON-LD
 * structured data, and renders the shared Header/Footer.
 * ============================================================= */

import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Playfair_Display, Source_Sans_3 } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { siteConfig, generateLocalBusinessSchema } from "@/lib/config";
import "@/styles/globals.css";

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

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

        {/* JSON-LD Structured Data — helps Google understand the business */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        {/* Hidden form for Netlify Forms bot detection.
            Netlify's build bots scan static HTML for forms with
            data-netlify="true" so it can set up form handling.
            The actual form is rendered by ContactForm.tsx and
            submits via JS fetch.
            Configure email notifications to thestrongerlife@gmail.com
            in Netlify Dashboard → Site settings → Forms → Notifications. */}
        <form name="contact" data-netlify="true" netlify-honeypot="bot-field" hidden>
          <input type="text" name="name" />
          <input type="email" name="email" />
          <input type="tel" name="phone" />
          <input type="text" name="service" />
          <textarea name="message" />
        </form>

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

        {/* Google Analytics — only loads when Measurement ID is configured */}
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}');
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
