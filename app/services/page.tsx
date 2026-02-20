/* =============================================================
 * Services & Pricing Page — The Stronger Life
 *
 * Overview of all service offerings with pricing.
 * Links out to individual service pages for details.
 * ============================================================= */

import type { Metadata } from "next";
import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import ServiceCard from "@/components/ui/ServiceCard";
import CTABanner from "@/components/sections/CTABanner";
import { siteConfig, services, pricing, generateBreadcrumbSchema } from "@/lib/config";

export const metadata: Metadata = {
  title: "Services & Pricing — Premarital Counseling, Officiant & Coaching",
  description:
    "Transparent pricing for premarital counseling ($400–$600), wedding officiant ($500–$750), and marriage coaching ($150/session) in St. Cloud, MN. Free first consultation.",
  alternates: {
    canonical: `${siteConfig.url}/services`,
  },
};

export default function ServicesPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: siteConfig.url },
    { name: "Services & Pricing", url: `${siteConfig.url}/services` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* ========== PAGE HERO ========== */}
      <section className="bg-brand-navy py-32 md:py-40">
        <div className="section-wrapper text-center">
          <h1 className="text-white text-4xl md:text-5xl font-heading font-bold mb-6">
            Services &amp; Pricing
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto leading-relaxed">
            Transparent pricing for every service. Your first consultation
            is always free.
          </p>
        </div>
      </section>

      {/* ========== SERVICES OVERVIEW ========== */}
      <section className="section-block bg-white">
        <div className="section-wrapper">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service) => (
              <ServiceCard key={service.slug} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* ========== PREMARITAL COUNSELING PRICING ========== */}
      <section className="section-block bg-brand-cream bg-texture">
        <div className="section-wrapper max-w-narrow">
          <SectionHeading
            title="Investment in Your Relationship"
            subtitle="You're investing in your future — not just the day. Here's what each service includes."
            tag="h2"
          />

          <div className="space-y-8 mt-12">
            {/* Premarital Counseling */}
            <div className="card">
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                <div className="flex-grow">
                  <h3 className="text-xl font-heading font-semibold text-brand-navy mb-2">
                    Premarital Counseling
                  </h3>
                  <p className="text-brand-stone mb-4">
                    {pricing.premaritalCounseling.sessions} of personalized counseling
                    ({pricing.premaritalCounseling.sessionLength}), using the research-backed
                    Prepare/Enrich assessment. In-person or virtual.
                  </p>

                  <div className="flex flex-wrap gap-4 mb-4">
                    <div className="bg-brand-cream rounded-lg px-4 py-3">
                      <p className="text-brand-gold-dark font-bold text-2xl font-heading">
                        {pricing.premaritalCounseling.standalone}
                      </p>
                      <p className="text-brand-stone text-xs">Counseling only</p>
                    </div>
                    <div className="bg-brand-cream rounded-lg px-4 py-3">
                      <p className="text-brand-gold-dark font-bold text-2xl font-heading">
                        {pricing.premaritalCounseling.withOfficiant}
                      </p>
                      <p className="text-brand-stone text-xs">When Matt officiates your wedding</p>
                    </div>
                    <div className="bg-brand-cream rounded-lg px-4 py-3">
                      <p className="text-brand-stone font-bold text-2xl font-heading">
                        {pricing.premaritalCounseling.assessmentFee}
                      </p>
                      <p className="text-brand-stone text-xs">Prepare/Enrich assessment (one-time)</p>
                    </div>
                  </div>

                  <ul className="space-y-1.5">
                    {pricing.premaritalCounseling.includes.map((feature, i) => (
                      <li key={i} className="text-sm text-brand-charcoal flex items-start gap-2">
                        <span className="text-brand-sage mt-0.5">✓</span> {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Wedding Officiant Packages */}
            <div className="card">
              <h3 className="text-xl font-heading font-semibold text-brand-navy mb-6">
                Wedding Officiant Packages
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {pricing.weddingOfficiant.packages.map((pkg, index) => (
                  <div
                    key={index}
                    className={`rounded-xl border p-6 ${
                      pkg.label
                        ? "border-brand-gold bg-brand-gold/5 relative"
                        : "border-brand-navy/10"
                    }`}
                  >
                    {pkg.label && (
                      <span className="absolute -top-3 left-4 bg-brand-gold text-white
                                       text-xs font-semibold px-3 py-1 rounded-full">
                        {pkg.label}
                      </span>
                    )}
                    <h4 className="text-lg font-heading font-semibold text-brand-navy mb-1">
                      {pkg.name}
                    </h4>
                    <p className="text-brand-gold-dark font-bold text-xl font-heading mb-4">
                      {pkg.price}
                    </p>
                    <ul className="space-y-1.5">
                      {pkg.includes.map((feature, i) => (
                        <li key={i} className="text-sm text-brand-charcoal flex items-start gap-2">
                          <span className="text-brand-sage mt-0.5">✓</span> {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <p className="text-sm text-brand-stone mt-6 italic">
                {pricing.weddingOfficiant.notes}
              </p>

              <div className="mt-4">
                <p className="text-sm text-brand-charcoal font-medium mb-2">Also available:</p>
                <p className="text-sm text-brand-stone">
                  {pricing.weddingOfficiant.extras.join(" · ")}
                </p>
              </div>
            </div>

            {/* Marriage Coaching */}
            <div className="card">
              <div className="flex-grow">
                <h3 className="text-xl font-heading font-semibold text-brand-navy mb-2">
                  Marriage &amp; Relationship Coaching
                </h3>
                <p className="text-brand-stone mb-4">
                  {pricing.marriageCoaching.sessionLength} sessions, scheduled{" "}
                  {pricing.marriageCoaching.frequency.toLowerCase()}.{" "}
                  {pricing.marriageCoaching.format}.
                </p>

                <div className="flex flex-wrap gap-4 mb-4">
                  {pricing.marriageCoaching.packages.map((pkg, i) => (
                    <div key={i} className="bg-brand-cream rounded-lg px-4 py-3 text-center">
                      <p className="text-brand-gold-dark font-bold text-lg font-heading">
                        {pkg.price}
                      </p>
                      <p className="text-brand-stone text-xs">{pkg.name}</p>
                    </div>
                  ))}
                </div>

                <ul className="space-y-1.5">
                  {pricing.marriageCoaching.packages[1].includes.map((feature, i) => (
                    <li key={i} className="text-sm text-brand-charcoal flex items-start gap-2">
                      <span className="text-brand-sage mt-0.5">&#10003;</span> {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTABanner
        heading="Your First Consultation Is Free"
        subheading="Let's talk about your needs and find the right path forward — no obligation."
      />
    </>
  );
}
