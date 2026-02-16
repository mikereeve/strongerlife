/* =============================================================
 * Marriage Coaching Page — The Stronger Life
 *
 * Consolidates the old "Relationship / Marriage Coaching" and
 * "Virtual Counseling & Coaching" pages into a single service
 * page that covers both in-person and virtual options.
 * ============================================================= */

import type { Metadata } from "next";
import SectionHeading from "@/components/ui/SectionHeading";
import TestimonialCard from "@/components/ui/TestimonialCard";
import CTABanner from "@/components/sections/CTABanner";
import { siteConfig, generateServiceSchema, featuredTestimonials, pricing } from "@/lib/config";

export const metadata: Metadata = {
  title: "Marriage & Relationship Coaching",
  description:
    "Ongoing relationship and marriage coaching to help your relationship thrive. Available in person in St. Cloud, Minnesota and virtually nationwide.",
  alternates: {
    canonical: `${siteConfig.url}/marriage-coaching`,
  },
};

export default function MarriageCoachingPage() {
  const serviceSchema = generateServiceSchema(
    "Marriage & Relationship Coaching",
    "Ongoing coaching and support for couples at any stage of their relationship. Available in person and virtually nationwide.",
    `${siteConfig.url}/marriage-coaching`,
    [
      { price: "150", description: "Single Session — 1–2 hour coaching session" },
      { price: "525", description: "4-Session Package — save $75 with a 4-session commitment" },
      { price: "600", description: "Marriage Coaching Program — comprehensive program with assessment" },
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
            Marriage &amp; Relationship Coaching
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto leading-relaxed">
            Whether you&apos;re navigating a rough patch or simply want to deepen
            your connection, coaching provides the tools and support to help
            your relationship thrive.
          </p>
        </div>
      </section>

      {/* ========== CONTENT ========== */}
      <section className="section-block bg-white">
        <div className="section-wrapper max-w-narrow">
          <SectionHeading title="Grow Stronger at Every Stage" tag="h2" />

          <div className="max-w-prose space-y-6 text-brand-charcoal leading-relaxed">
            <p>
              Marriage coaching isn&apos;t just for couples in crisis. It&apos;s
              for any couple who wants to invest in their relationship — to learn
              to resolve issues, communicate better, and recapture the spark.
            </p>

            <h3>In-Person &amp; Virtual Sessions</h3>
            <p>
              I offer in-person sessions in the St. Cloud, Minnesota area and
              virtual sessions for couples anywhere in the country. All you need
              is a strong WiFi connection and a smartphone or computer with a
              camera and microphone. Virtual coaching is just as effective as
              meeting face to face — the connection and the work happen regardless
              of distance.
            </p>

            <h3>What Coaching Looks Like</h3>
            <p>
              Every couple&apos;s journey is different. We&apos;ll start by
              understanding where you are and where you want to be, then build a
              personalized path forward. Sessions are {pricing.marriageCoaching.sessionLength},
              typically scheduled {pricing.marriageCoaching.frequency.toLowerCase()},
              and focus on communication patterns, conflict resolution, rebuilding
              trust, deepening intimacy, or navigating major life transitions
              together.
            </p>
          </div>
        </div>
      </section>

      {/* ========== PRICING PACKAGES ========== */}
      <section className="section-block bg-brand-cream bg-texture">
        <div className="section-wrapper">
          <SectionHeading
            title="Coaching Options"
            subtitle="Flexible packages to fit your needs — from a single session to a comprehensive program."
            tag="h2"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {pricing.marriageCoaching.packages.map((pkg, index) => (
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
                <p className="text-brand-gold-dark font-bold text-2xl font-heading mb-2">
                  {pkg.price}
                </p>
                <p className="text-brand-stone text-sm mb-5">
                  {pkg.description}
                </p>
                <ul className="space-y-2">
                  {pkg.includes.map((feature, i) => (
                    <li key={i} className="text-sm text-brand-charcoal flex items-start gap-2">
                      <span className="text-brand-sage mt-0.5">&#10003;</span> {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className="text-sm text-brand-stone mt-8 text-center italic">
            {pricing.marriageCoaching.notes}
          </p>

          {/* Session formats */}
          <div className="text-center mt-4">
            <p className="text-sm text-brand-charcoal font-medium">
              Available formats: {pricing.marriageCoaching.formats.join(" · ")}
            </p>
          </div>
        </div>
      </section>

      {/* ========== INLINE TESTIMONIAL ========== */}
      <section className="section-block bg-white">
        <div className="section-wrapper max-w-2xl">
          <TestimonialCard {...featuredTestimonials[2]} />
        </div>
      </section>

      <CTABanner
        heading="Your Relationship Deserves Investment"
        subheading="Start with a free consultation — in person or via video. Let's talk about where you are and how I can help."
      />
    </>
  );
}
