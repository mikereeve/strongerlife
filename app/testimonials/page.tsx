/* =============================================================
 * Testimonials Page — The Stronger Life
 *
 * Displays all client testimonials in a masonry-style grid.
 * Featured testimonials come from config; additional ones
 * can be added directly to the array below.
 * ============================================================= */

import type { Metadata } from "next";
import TestimonialGrid from "@/components/ui/TestimonialGrid";
import PhotoGallery from "@/components/ui/PhotoGallery";
import SectionHeading from "@/components/ui/SectionHeading";
import CTABanner from "@/components/sections/CTABanner";
import { siteConfig, allTestimonials, galleryPhotos, generateBreadcrumbSchema, generateReviewSchema } from "@/lib/config";

export const metadata: Metadata = {
  title: "Testimonials — What Couples Are Saying",
  description:
    "Read 26+ five-star reviews from real couples about their premarital counseling, wedding officiant, and marriage coaching experience with Matt Reeve in St. Cloud, MN.",
  alternates: {
    canonical: `${siteConfig.url}/testimonials`,
  },
};

export default function TestimonialsPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: siteConfig.url },
    { name: "Testimonials", url: `${siteConfig.url}/testimonials` },
  ]);

  const reviewSchemaData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteConfig.name,
    url: siteConfig.url,
    review: generateReviewSchema(allTestimonials),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      reviewCount: allTestimonials.length,
      bestRating: "5",
      worstRating: "1",
    },
  };

  return (
    <>
      {/* Structured data for testimonials */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchemaData) }}
      />

      {/* ========== PAGE HERO ========== */}
      <section className="bg-brand-navy py-32 md:py-40">
        <div className="section-wrapper text-center">
          <h1 className="text-white text-4xl md:text-5xl font-heading font-bold mb-6">
            What Couples Are Saying
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto leading-relaxed">
            Real stories from real couples who have experienced
            The Stronger Life firsthand.
          </p>
        </div>
      </section>

      {/* ========== COUPLE GALLERY ========== */}
      <section className="section-block bg-white">
        <div className="section-wrapper">
          <SectionHeading
            title="Moments We've Been Part Of"
            subtitle="A glimpse into the beautiful celebrations we've had the honor of being part of."
            tag="h2"
          />
          <div className="mt-10">
            <PhotoGallery photos={[...galleryPhotos]} />
          </div>
        </div>
      </section>

      {/* ========== TESTIMONIALS WITH FILTERS ========== */}
      <section className="section-block bg-brand-cream bg-texture">
        <div className="section-wrapper">
          <SectionHeading
            title="What Couples Are Saying"
            tag="h2"
          />
          <div className="mt-10">
            <TestimonialGrid testimonials={[...allTestimonials]} />
          </div>
        </div>
      </section>

      <CTABanner
        heading="Ready to Write Your Own Story?"
        subheading="Join the couples who have invested in their relationship with The Stronger Life."
      />
    </>
  );
}
