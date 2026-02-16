/* =============================================================
 * Wedding Officiant Page — The Stronger Life
 *
 * Service page for Matt's wedding officiant services.
 * Highlights personalized ceremonies and Matt's full-service
 * approach to wedding day support.
 * ============================================================= */

import type { Metadata } from "next";
import SectionHeading from "@/components/ui/SectionHeading";
import TestimonialCard from "@/components/ui/TestimonialCard";
import CTABanner from "@/components/sections/CTABanner";
import WeddingResources from "@/components/sections/WeddingResources";
import { siteConfig, generateServiceSchema, featuredTestimonials, pricing } from "@/lib/config";

/* --- Page-Specific SEO Metadata --- */
export const metadata: Metadata = {
  title: "Wedding Officiant",
  description:
    "Personalized, passionate wedding ceremonies that reflect your unique love story. Ordained minister with 32+ years of experience serving St. Cloud, Minnesota and beyond.",
  alternates: {
    canonical: `${siteConfig.url}/wedding-officiant`,
  },
};

export default function WeddingOfficiantPage() {
  const serviceSchema = generateServiceSchema(
    "Wedding Officiant Services",
    "Personalized, passionate wedding ceremonies crafted to reflect each couple's unique love story. Full-service officiant support from planning through ceremony.",
    `${siteConfig.url}/wedding-officiant`,
    [
      { price: "750", description: "Custom Ceremony — fully customized script, rehearsal coordination, vendor coordination" },
      { price: "600", description: "Personalized Ceremony — professionally written with minor customization" },
      { price: "500", description: "Simple & Intimate — 15-minute ceremony to legalize your union" },
    ]
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      {/* ========== PAGE HERO ========== */}
      <section className="bg-brand-navy py-32 md:py-40">
        <div className="section-wrapper text-center">
          <p className="text-brand-gold font-medium tracking-wide uppercase text-sm mb-4">
            Our Services
          </p>
          <h1 className="text-white text-4xl md:text-5xl font-heading font-bold mb-6">
            Wedding Officiant
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto leading-relaxed">
            No more boring wedding ceremonies. If every couple is unique,
            your ceremony should be too.
          </p>
        </div>
      </section>

      {/* ========== CONTENT ========== */}
      <section className="section-block bg-white">
        <div className="section-wrapper max-w-narrow">
          <SectionHeading
            title="Personalized, Passionate & Inspiring Ceremonies"
            tag="h2"
          />

          <div className="max-w-prose space-y-6 text-brand-charcoal leading-relaxed">
            <p>
              Whether you envision a romantic ceremony in the park, an elegant
              ballroom wedding, a quirky backyard BBQ, or just the two of you
              on a mountaintop — I&apos;ll work with you to create a ceremony
              that reflects who you are as a couple.
            </p>

            <p>
              As your officiant, I&apos;m with you all the way: through the planning,
              the tension, and the beautiful moments. I arrive early, check in with
              your vendors, handle last-minute surprises with grace, and ensure that
              by the time the ceremony begins, you and your family feel relaxed,
              at ease, and fully present.
            </p>

            {/* Key differentiators */}
            <h3>What Sets This Apart</h3>
            <p>
              With 32+ years of ministry experience, I bring more than words to your
              ceremony. I bring extensive training in family dynamics, pastoral
              counseling, and the professional ethics to handle the complexities
              that come with bringing two families together. You&apos;ll feel
              confident knowing exactly what your officiant will say — because
              we&apos;ll craft it together.
            </p>
          </div>
        </div>
      </section>

      {/* ========== PACKAGES ========== */}
      <section className="section-block bg-brand-cream bg-texture">
        <div className="section-wrapper">
          <SectionHeading
            title="Ceremony Packages"
            subtitle="Every package includes legal registration and timely certificate filing."
            tag="h2"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {pricing.weddingOfficiant.packages.map((pkg, index) => (
              <div
                key={index}
                className={`card relative ${
                  pkg.label ? "border-2 border-brand-gold" : ""
                }`}
              >
                {pkg.label && (
                  <span className="absolute -top-3 left-6 bg-brand-gold text-white
                                   text-xs font-semibold px-3 py-1 rounded-full">
                    {pkg.label}
                  </span>
                )}
                <h3 className="text-xl font-heading font-semibold text-brand-navy mb-1">
                  {pkg.name}
                </h3>
                <p className="text-brand-gold-dark font-bold text-2xl font-heading mb-5">
                  {pkg.price}
                </p>
                <ul className="space-y-2">
                  {pkg.includes.map((feature, i) => (
                    <li key={i} className="text-sm text-brand-charcoal flex items-start gap-2">
                      <span className="text-brand-sage mt-0.5">✓</span> {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className="text-sm text-brand-stone mt-8 text-center italic">
            {pricing.weddingOfficiant.notes}
          </p>

          <div className="text-center mt-4">
            <p className="text-sm text-brand-charcoal font-medium">
              Also available: {pricing.weddingOfficiant.extras.join(" · ")}
            </p>
          </div>
        </div>
      </section>

      {/* ========== INLINE TESTIMONIAL ========== */}
      <section className="section-block bg-white">
        <div className="section-wrapper max-w-2xl">
          <TestimonialCard {...featuredTestimonials[1]} />
        </div>
      </section>

      {/* ========== WEDDING RESOURCES ========== */}
      <WeddingResources />

      {/* ========== BOTTOM CTA ========== */}
      <CTABanner
        heading="Let's Create Your Perfect Ceremony"
        subheading="Schedule a free meeting to get to know each other. No sales pitch — just a conversation to see if we click."
      />
    </>
  );
}
