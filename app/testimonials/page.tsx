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
import { siteConfig, allTestimonials, galleryPhotos } from "@/lib/config";

export const metadata: Metadata = {
  title: "Testimonials",
  description:
    "Read what couples are saying about their experience with The Stronger Life. Real stories from real couples about premarital counseling, marriage coaching, and wedding ceremonies.",
  alternates: {
    canonical: `${siteConfig.url}/testimonials`,
  },
};

export default function TestimonialsPage() {
  return (
    <>
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
