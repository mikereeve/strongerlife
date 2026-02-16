/* =============================================================
 * Premarital Counseling Page — The Stronger Life
 *
 * Dedicated service page with:
 *   - Service-specific SEO metadata
 *   - JSON-LD Service schema for rich results
 *   - Content sections: overview, what to expect, FAQ-ready
 *   - Embedded testimonial for social proof
 *   - Strong CTA at bottom
 * ============================================================= */

import type { Metadata } from "next";
import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import TestimonialCard from "@/components/ui/TestimonialCard";
import CTABanner from "@/components/sections/CTABanner";
import { siteConfig, generateServiceSchema, featuredTestimonials, pricing } from "@/lib/config";

/* --- Page-Specific SEO Metadata --- */
export const metadata: Metadata = {
  title: "Christian Premarital Counseling",
  description:
    "Personalized Christian premarital counseling to build a strong foundation for your marriage. Comprehensive sessions covering communication, conflict resolution, finances, and more.",
  alternates: {
    canonical: `${siteConfig.url}/premarital-counseling`,
  },
  openGraph: {
    title: "Christian Premarital Counseling | The Stronger Life",
    description:
      "Comprehensive premarital counseling to ensure you have everything you need for a lasting, thriving marriage.",
    url: `${siteConfig.url}/premarital-counseling`,
  },
};

export default function PremaritalCounselingPage() {
  // Generate service-specific structured data
  const serviceSchema = generateServiceSchema(
    "Christian Premarital Counseling",
    "Comprehensive premarital counseling sessions helping couples build a strong foundation for marriage through communication skills, conflict resolution, and deeper understanding.",
    `${siteConfig.url}/premarital-counseling`,
    [
      { price: "600", description: "Standalone Premarital Counseling (5–6 sessions)" },
      { price: "400", description: "Premarital Counseling bundled with Officiant services" },
    ]
  );

  return (
    <>
      {/* Inject Service schema for this page */}
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
            Premarital Counseling
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto leading-relaxed">
            Deciding to get married is one of the biggest decisions of your life.
            Let&apos;s make sure you have everything you need for a marriage
            that lasts — and thrives.
          </p>
        </div>
      </section>

      {/* ========== OVERVIEW SECTION ========== */}
      <section className="section-block bg-white">
        <div className="section-wrapper max-w-narrow">
          <SectionHeading
            title="Building a Foundation That Lasts"
            tag="h2"
          />

          <div className="prose prose-lg max-w-prose space-y-6 text-brand-charcoal leading-relaxed">
            <p>
              Premarital counseling isn&apos;t about finding problems — it&apos;s
              about building strengths. Together, we&apos;ll explore the areas
              that matter most for a healthy, lasting marriage and equip you with
              tools to navigate them confidently.
            </p>

            <p>
              With over 32 years of experience as a licensed premarital
              counselor, I&apos;ve helped hundreds of couples prepare for married
              life. Every couple is unique, and so is every counseling journey.
              Sessions are tailored to your specific needs, concerns, and goals.
            </p>

            <h3>The Prepare/Enrich Assessment</h3>
            <p>
              Our program uses <strong>Prepare/Enrich</strong>, one of the most
              widely researched relationship assessment tools available. It covers
              12 distinct categories — including commitment, communication, family
              systems, and relationship dynamics — giving us deep insight into
              your strengths and growth areas. Research shows couples who complete
              Prepare/Enrich-based counseling lower their divorce risk by 31%.
            </p>
          </div>

          {/* Pricing snapshot */}
          <div className="mt-10 flex flex-wrap gap-6">
            <div className="card bg-brand-cream border border-brand-gold/20 text-center px-6 py-5">
              <p className="text-brand-gold-dark font-bold text-3xl font-heading">
                {pricing.premaritalCounseling.standalone}
              </p>
              <p className="text-brand-stone text-sm mt-1">Counseling only</p>
            </div>
            <div className="card bg-brand-cream border border-brand-gold/20 text-center px-6 py-5">
              <p className="text-brand-gold-dark font-bold text-3xl font-heading">
                {pricing.premaritalCounseling.withOfficiant}
              </p>
              <p className="text-brand-stone text-sm mt-1">When Matt officiates</p>
            </div>
            <div className="card bg-brand-cream border border-brand-gold/20 text-center px-6 py-5">
              <p className="text-brand-stone font-bold text-3xl font-heading">
                {pricing.premaritalCounseling.assessmentFee}
              </p>
              <p className="text-brand-stone text-sm mt-1">Prepare/Enrich (one-time)</p>
            </div>
          </div>

          <p className="mt-6 text-sm text-brand-stone">
            {pricing.premaritalCounseling.sessions} &middot;{" "}
            {pricing.premaritalCounseling.sessionLength} &middot;{" "}
            In-person or virtual via Google Meet
          </p>
        </div>
      </section>

      {/* ========== WHAT WE COVER ========== */}
      <section className="section-block bg-brand-cream bg-texture">
        <div className="section-wrapper">
          <SectionHeading
            title="What We'll Explore Together"
            subtitle="Each session is personalized, but here are some of the key areas we'll cover."
            tag="h2"
          />

          {/* Topic cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {/* TODO: Extract these into a data array in lib/config.ts */}
            {[
              {
                title: "Communication Skills",
                description:
                  "Learn to express your needs clearly and listen deeply — the foundation of every healthy relationship.",
              },
              {
                title: "Conflict Resolution",
                description:
                  "Develop strategies to navigate disagreements constructively, without letting them erode your connection.",
              },
              {
                title: "Financial Partnership",
                description:
                  "Align on money values, budgeting approaches, and financial goals before they become a source of tension.",
              },
              {
                title: "Family Dynamics",
                description:
                  "Understand how your family backgrounds shape your expectations and learn to build your own family culture.",
              },
              {
                title: "Intimacy & Connection",
                description:
                  "Build a foundation of emotional and physical intimacy that deepens over time rather than fading.",
              },
              {
                title: "Shared Vision & Values",
                description:
                  "Clarify your shared goals, spiritual life, and the vision you have for your life together.",
              },
            ].map((topic, index) => (
              <div key={index} className="card">
                <h3 className="text-lg font-heading font-semibold text-brand-navy mb-2">
                  {topic.title}
                </h3>
                <p className="text-brand-stone text-sm leading-relaxed">
                  {topic.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== INLINE TESTIMONIAL ========== */}
      <section className="section-block bg-white">
        <div className="section-wrapper max-w-2xl">
          <TestimonialCard {...featuredTestimonials[0]} />
        </div>
      </section>

      {/* ========== BOTTOM CTA ========== */}
      <CTABanner
        heading="Ready to Invest in Your Future Together?"
        subheading="Start with a free 30-minute consultation. No pressure, no sales pitch — just a conversation to see if we're a great fit."
      />
    </>
  );
}
