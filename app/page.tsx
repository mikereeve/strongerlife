/* =============================================================
 * Homepage — The Stronger Life
 *
 * Landing page structure:
 *   1. Hero section with value proposition and CTA
 *   2. Services overview (3 service cards)
 *   3. About/trust section with Matt's credentials
 *   4. Featured testimonials
 *   5. FAQ section (with FAQPage schema for rich results)
 *   6. Call-to-action banner
 *
 * SEO: Page-specific metadata exported below.
 * Schema: LocalBusiness JSON-LD is injected via root layout.
 * ============================================================= */

import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import SectionHeading from "@/components/ui/SectionHeading";
import ServiceCard from "@/components/ui/ServiceCard";
import TestimonialCard from "@/components/ui/TestimonialCard";
import CTABanner from "@/components/sections/CTABanner";

const MusicPlayer = dynamic(() => import("@/components/ui/MusicPlayer"), {
  loading: () => (
    <div className="rounded-2xl bg-brand-navy animate-pulse h-[200px]" />
  ),
});
import { siteConfig, services, featuredTestimonials, generateBreadcrumbSchema, generateWebSiteSchema, generateFAQSchema } from "@/lib/config";
import { serviceFAQs } from "@/lib/config/pricing";

/* --- Page Metadata ---
 * Overrides the default metadata from root layout.
 * Uses title.absolute to bypass the layout's title template
 * and prevent the brand name from being appended twice.
 */
export const metadata: Metadata = {
  title: { absolute: siteConfig.seo.defaultTitle },
  description:
    "Christian premarital counseling, wedding officiant, and marriage coaching in St. Cloud, MN. 32+ years experience helping couples grow stronger together. Book a free consultation.",
  alternates: {
    canonical: siteConfig.url,
  },
};

export default function HomePage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: siteConfig.url },
  ]);
  const webSiteSchema = generateWebSiteSchema();
  const faqSchema = generateFAQSchema([...serviceFAQs.homepage]);

  return (
    <>
      {/* Structured data for homepage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ========== HERO SECTION ========== */}
      <section className="relative min-h-[85vh] flex items-center bg-brand-navy overflow-hidden">
        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-navy via-brand-navy/90 to-brand-navy/70" />

        {/* Hero content */}
        <div className="section-wrapper relative z-10 py-32">
          <div className="max-w-2xl">
            {/* Eyebrow text — establishes context */}
            <p className="text-brand-gold font-medium tracking-wide uppercase text-sm mb-4
                          animate-fade-in">
              Christian Premarital Counseling &amp; Marriage Coaching
            </p>

            {/* Primary heading — the core value proposition */}
            <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-heading
                          font-bold leading-tight mb-6 animate-fade-in-up">
              Helping Couples Grow Stronger{" "}
              <span className="text-brand-gold">Together</span>
            </h1>

            {/* Supporting description */}
            <p className="text-white/70 text-lg md:text-xl leading-relaxed mb-8
                          max-w-xl animate-fade-in-up"
               style={{ animationDelay: "0.2s" }}>
              The goal isn&apos;t just to get you married — it&apos;s to get you
              90 years down the road, together. Personalized counseling, coaching,
              and wedding ceremonies that reflect who you are.
            </p>

            {/* Dual CTAs — primary action + secondary exploration */}
            <div className="flex flex-wrap gap-4 animate-fade-in-up"
                 style={{ animationDelay: "0.4s" }}>
              <Link href="/contact" className="btn-primary text-base md:text-lg no-underline">
                Book a Free Consultation
              </Link>
              <Link
                href="/services"
                className="inline-block px-8 py-3.5 border-2 border-white/30
                           text-white font-semibold rounded-md
                           hover:text-white hover:bg-white/10 transition-all duration-300 no-underline"
              >
                View Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========== SERVICES SECTION ========== */}
      <section className="section-block bg-white">
        <div className="section-wrapper">
          <SectionHeading
            title="How Can I Help You?"
            subtitle="Whether you're preparing for marriage, looking for a meaningful ceremony, or seeking to strengthen your relationship, I'm here to walk alongside you."
          />

          {/* Service cards grid — 3 columns on desktop */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {services.map((service) => (
              <ServiceCard key={service.slug} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* ========== ABOUT / TRUST SECTION ========== */}
      <section className="section-block bg-brand-cream bg-texture">
        <div className="section-wrapper">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Photo column */}
            <div className="relative">
              <div className="aspect-[4/5] rounded-2xl bg-brand-navy/10 overflow-hidden">
                <Image
                  src="/images/matt-profile.jpg"
                  alt="Matt Reeve — Premarital Counselor, Marriage Coach & Wedding Officiant"
                  width={1044}
                  height={1200}
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 500px"
                  className="w-full h-full object-cover"
                  priority
                />
              </div>

              {/* Floating credential badge */}
              <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-lg p-5
                              hidden md:block">
                <p className="text-3xl font-heading font-bold text-brand-gold-dark">32+</p>
                <p className="text-sm text-brand-stone">Years of Ministry</p>
              </div>
            </div>

            {/* Text column */}
            <div>
              <SectionHeading
                title="Meet Matt Reeve"
                subtitle="Licensed premarital counselor, certified relationship coach, and ordained minister."
                centered={false}
                tag="h2"
              />

              <div className="space-y-4 text-brand-charcoal leading-relaxed">
                <p>
                  For over 32 years, I&apos;ve dedicated my life to helping
                  couples grow stronger — both personally and relationally. As a
                  licensed premarital counselor and certified relationship coach,
                  I bring extensive training in family dynamics, pastoral
                  counseling, and professional ethics to every session.
                </p>
                <p>
                  I believe every couple deserves a great match in their counselor
                  and officiant. That&apos;s why I always start with a no-pressure
                  meeting so we can see if we click. The best officiant for you is
                  one you trust fully.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/about" className="btn-secondary no-underline">
                  Learn More About Matt
                </Link>
                <Link href="/testimonials" className="text-brand-gold-dark font-medium
                  hover:text-brand-navy transition-colors no-underline inline-flex
                  items-center gap-1">
                  Read Testimonials →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== FEATURED SONG SECTION ========== */}
      <section className="section-block bg-white">
        <div className="section-wrapper max-w-4xl">
          <SectionHeading
            title="Listen"
            subtitle="A curated collection of original songs by Matt Reeve — tap a title to listen."
            tag="h2"
          />
          <div className="mt-8">
            <MusicPlayer />
          </div>
        </div>
      </section>

      {/* ========== TESTIMONIALS SECTION ========== */}
      <section className="section-block bg-white">
        <div className="section-wrapper">
          <SectionHeading
            title="What Couples Are Saying"
            subtitle="Hear from couples who have experienced The Stronger Life firsthand."
          />

          {/* Testimonial cards — 3 columns on desktop */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {featuredTestimonials.map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} />
            ))}
          </div>

          {/* Link to full testimonials page */}
          <div className="text-center mt-10">
            <Link href="/testimonials" className="text-brand-gold-dark font-medium
              hover:text-brand-navy transition-colors no-underline">
              View All Testimonials →
            </Link>
          </div>
        </div>
      </section>

      {/* ========== FAQ SECTION ========== */}
      <section className="section-block bg-brand-cream bg-texture">
        <div className="section-wrapper max-w-narrow">
          <SectionHeading
            title="Frequently Asked Questions"
            subtitle="Answers to the questions couples ask most."
            tag="h2"
          />

          <div className="mt-10 space-y-6">
            {serviceFAQs.homepage.map((faq, index) => (
              <div key={index} className="card bg-white">
                <h3 className="text-lg font-heading font-semibold text-brand-navy mb-3">
                  {faq.question}
                </h3>
                <p className="text-brand-charcoal leading-relaxed text-sm">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== BOTTOM CTA ========== */}
      <CTABanner />
    </>
  );
}
