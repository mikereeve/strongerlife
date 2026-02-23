/* =============================================================
 * HomeTestimonialsSection — The Stronger Life
 *
 * Below-fold testimonials block; loaded via dynamic import
 * to reduce initial JS bundle and improve LCP.
 * ============================================================= */

import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import TestimonialCard from "@/components/ui/TestimonialCard";

export type FeaturedTestimonial = {
  quote: string;
  author: string;
  service?: string;
  image?: string;
};

export default function HomeTestimonialsSection({
  testimonials,
}: {
  testimonials: FeaturedTestimonial[];
}) {
  return (
    <section className="section-block bg-white">
      <div className="section-wrapper">
        <SectionHeading
          title="What Couples Are Saying"
          subtitle="Hear from couples who have experienced The Stronger Life firsthand."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>
        <div className="text-center mt-10">
          <Link
            href="/testimonials"
            className="text-brand-gold-dark font-medium hover:text-brand-navy transition-colors no-underline"
          >
            View All Testimonials →
          </Link>
        </div>
      </div>
    </section>
  );
}
