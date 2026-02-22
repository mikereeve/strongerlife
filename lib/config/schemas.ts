/* =============================================================
 * JSON-LD Structured Data Generators — The Stronger Life
 *
 * Generates schema.org markup for the site.
 * This helps Google understand the business and can
 * trigger rich results in search.
 * ============================================================= */

import { siteConfig } from "./site";
import { allTestimonials } from "./testimonials";

export function generateLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": siteConfig.url,
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    email: siteConfig.contact.email,
    ...(siteConfig.contact.phone ? { telephone: siteConfig.contact.phone } : {}),
    address: {
      "@type": "PostalAddress",
      addressLocality: "St. Cloud",
      addressRegion: "MN",
      postalCode: "56301",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 45.5579,
      longitude: -94.1632,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "17:00",
    },
    priceRange: "$$",
    image: `${siteConfig.url}/images/og-default.jpg`,
    serviceType: [
      "Premarital Counseling",
      "Marriage Coaching",
      "Wedding Officiant",
    ],
    areaServed: [
      { "@type": "City", name: "St. Cloud", containedInPlace: { "@type": "State", name: "Minnesota" } },
      { "@type": "City", name: "Sartell" },
      { "@type": "City", name: "Sauk Rapids" },
      { "@type": "City", name: "Waite Park" },
      { "@type": "City", name: "Monticello" },
      { "@type": "City", name: "Elk River" },
      { "@type": "City", name: "Clearwater" },
      { "@type": "AdministrativeArea", name: "Stearns County, Minnesota" },
      { "@type": "AdministrativeArea", name: "Benton County, Minnesota" },
      { "@type": "AdministrativeArea", name: "Wright County, Minnesota" },
      { "@type": "AdministrativeArea", name: "Central Minnesota" },
      { "@type": "State", name: "Minnesota" },
      { "@type": "Country", name: "United States" },
    ],
    sameAs: Object.values(siteConfig.social).filter(Boolean),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      reviewCount: allTestimonials.length,
      bestRating: "5",
      worstRating: "1",
    },
  };
}

export function generatePersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Matt Reeve",
    jobTitle: "Premarital Counselor, Marriage Coach & Wedding Officiant",
    description:
      "Licensed premarital counselor, certified relationship coach, and ordained minister with 32+ years of experience helping couples grow stronger together.",
    url: `${siteConfig.url}/about`,
    sameAs: Object.values(siteConfig.social).filter(Boolean),
    knowsAbout: [
      "Premarital Counseling",
      "Marriage Coaching",
      "Wedding Ceremonies",
      "Prepare/Enrich Assessment",
    ],
    worksFor: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };
}

export function generateServiceSchema(
  serviceName: string,
  serviceDescription: string,
  serviceUrl: string,
  offers?: { price: string; description: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: serviceName,
    description: serviceDescription,
    url: serviceUrl,
    provider: {
      "@type": "Person",
      name: "Matt Reeve",
      url: `${siteConfig.url}/about`,
    },
    areaServed: [
      {
        "@type": "Place",
        name: "St. Cloud, Minnesota",
      },
      {
        "@type": "Place",
        name: "Central Minnesota",
      },
    ],
    ...(offers && offers.length > 0
      ? {
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: serviceName,
            itemListElement: offers.map((offer) => ({
              "@type": "Offer",
              price: offer.price,
              priceCurrency: "USD",
              description: offer.description,
              availability: "https://schema.org/InStock",
            })),
          },
        }
      : {}),
  };
}

/* --- FAQ Schema ---
 * Generates FAQPage structured data for service pages.
 * Eligible for rich results with expandable Q&A in SERPs.
 */
export function generateFAQSchema(
  faqs: { question: string; answer: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/* --- Breadcrumb Schema ---
 * Generates BreadcrumbList structured data.
 * Shows navigation breadcrumbs in Google search results.
 */
export function generateBreadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/* --- WebSite Schema ---
 * Generates WebSite structured data with SearchAction.
 * Can trigger a sitelinks search box in Google results.
 */
export function generateWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteConfig.url}/blog?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/* --- Review Schema ---
 * Generates individual Review structured data for testimonials.
 * Can trigger star ratings in search results.
 */
export function generateReviewSchema(
  testimonials: readonly { quote: string; author: string; service: string }[]
) {
  return testimonials.map((t) => ({
    "@type": "Review",
    author: {
      "@type": "Person",
      name: t.author,
    },
    reviewRating: {
      "@type": "Rating",
      ratingValue: "5",
      bestRating: "5",
      worstRating: "1",
    },
    reviewBody: t.quote,
    itemReviewed: {
      "@type": "LocalBusiness",
      name: siteConfig.name,
    },
  }));
}
