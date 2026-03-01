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
import { siteConfig, generateServiceSchema, generateFAQSchema, generateBreadcrumbSchema, allTestimonials, pricing, serviceFAQs } from "@/lib/config";

/* --- Page-Specific SEO Metadata --- */
export const metadata: Metadata = {
  title: "Premarital Counseling in St. Cloud, MN — Prepare/Enrich Certified",
  description:
    "Premarital counseling in St. Cloud, MN and Central Minnesota. Prepare/Enrich certified with 32+ years experience. 5–6 personalized sessions, in-person or virtual. Free consultation — eligible for MN marriage license discount.",
  alternates: {
    canonical: `${siteConfig.url}/premarital-counseling`,
  },
  openGraph: {
    title: "Premarital Counseling in St. Cloud, MN — Prepare/Enrich Certified | The Stronger Life",
    description:
      "Premarital counseling in St. Cloud, MN and Central Minnesota. Prepare/Enrich certified with 32+ years experience. Free consultation — no pressure, no obligation.",
    url: `${siteConfig.url}/premarital-counseling`,
  },
};

export default function PremaritalCounselingPage() {
  const faqSchema = generateFAQSchema([...serviceFAQs.premaritalCounseling]);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: siteConfig.url },
    { name: "Services", url: `${siteConfig.url}/services` },
    { name: "Premarital Counseling", url: `${siteConfig.url}/premarital-counseling` },
  ]);

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
      {/* Inject structured data schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
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
            that lasts — and thrives. Serving couples in St. Cloud, Central
            Minnesota, and virtually nationwide.
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

            <h3>Serving St. Cloud &amp; Central Minnesota</h3>
            <p>
              Our office is in St. Cloud, Minnesota, and we serve engaged couples
              throughout Stearns County, Benton County, and Wright County —
              including Sartell, Sauk Rapids, Waite Park, Monticello, and Elk River.
              If you&apos;re planning a wedding anywhere in Central Minnesota,
              premarital counseling sessions can be scheduled in person. For couples
              outside the area or those who prefer the convenience of meeting from
              home, virtual sessions via Google Meet are equally effective.
            </p>

            <h3>The Prepare/Enrich Assessment</h3>
            <p>
              Our program uses <strong>Prepare/Enrich</strong>, one of the most
              widely researched relationship assessment tools available. It covers
              12 distinct categories — including commitment, communication, family
              systems, relationship dynamics, personality traits, leisure activities,
              and spiritual beliefs — giving us deep insight into
              your strengths and growth areas. Research shows couples who complete
              Prepare/Enrich-based counseling lower their divorce risk by 31%.
            </p>

            <p>
              Your premarital counseling program includes a customized
              Prepare/Enrich relationship assessment, 5–6 personalized counseling
              sessions with flexible scheduling, communication and conflict
              resolution tools, take-home resources, one free follow-up session
              within a year of your wedding, and eligibility for Minnesota&apos;s
              discounted marriage license fee.
            </p>

            <h3>Who Is Premarital Counseling For?</h3>
            <p>
              Premarital counseling is for any engaged couple who wants to start
              their marriage with confidence and clarity. You don&apos;t need to
              be in crisis or have concerns about your relationship — most couples
              who come to us are excited and simply want to invest in their future
              together.
            </p>
            <p>You&apos;ll especially benefit from premarital counseling if:</p>
            <ul>
              <li>You&apos;re newly engaged and want to prepare intentionally for marriage</li>
              <li>Your church or officiant requires or recommends premarital counseling</li>
              <li>You want to learn how to navigate conflict before it becomes a pattern</li>
              <li>You come from different backgrounds (cultural, religious, or family) and want help bridging those differences</li>
              <li>You&apos;ve been together a long time and want fresh perspective before making it official</li>
              <li>You want to qualify for Minnesota&apos;s marriage license fee discount</li>
            </ul>
            <p>
              Whether you&apos;ve been together six months or six years, premarital
              counseling gives you a shared language and toolkit for the challenges
              every marriage faces.
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
                  "Learn to express your needs clearly and listen deeply — the foundation of every healthy relationship. We'll practice active listening techniques, explore your communication styles using your Prepare/Enrich results, and build habits that prevent misunderstandings.",
              },
              {
                title: "Conflict Resolution",
                description:
                  "Develop strategies to navigate disagreements constructively, without letting them erode your connection. Every couple disagrees — what matters is how you handle it. We'll identify your conflict patterns and replace destructive habits with healthy ones.",
              },
              {
                title: "Financial Partnership",
                description:
                  "Align on money values, budgeting approaches, and financial goals before they become a source of tension. Finances are one of the top causes of marital stress. We'll discuss debt, spending habits, saving strategies, and how to make financial decisions as a team.",
              },
              {
                title: "Family Dynamics",
                description:
                  "Understand how your family backgrounds shape your expectations and learn to build your own family culture. We'll explore your families of origin, discuss boundaries with in-laws, and talk about how upbringing influences everything from parenting to holiday traditions.",
              },
              {
                title: "Intimacy & Connection",
                description:
                  "Build a foundation of emotional and physical intimacy that deepens over time rather than fading. We'll discuss expectations, love languages, and how to keep your connection strong through the busy seasons of life.",
              },
              {
                title: "Shared Vision & Values",
                description:
                  "Clarify your shared goals, spiritual life, and the vision you have for your life together. From career ambitions to where you want to live, from faith practices to whether and when to have children — we'll make sure you're on the same page.",
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

      {/* ========== WHAT TO EXPECT ========== */}
      <section className="section-block bg-white">
        <div className="section-wrapper max-w-narrow">
          <SectionHeading
            title="What to Expect"
            subtitle="A clear, step-by-step look at how premarital counseling works — from first call to wedding day."
            tag="h2"
          />

          <div className="prose prose-lg max-w-prose space-y-6 text-brand-charcoal leading-relaxed mt-10">
            <h3>Step 1: Free Consultation</h3>
            <p>
              It starts with a free 30-minute phone or video call. We&apos;ll get
              to know each other, talk about your relationship, and make sure
              we&apos;re a good fit. No pressure, no obligation — just a
              conversation.
            </p>

            <h3>Step 2: The Prepare/Enrich Assessment</h3>
            <p>
              Once you decide to move forward, you&apos;ll each complete the
              Prepare/Enrich online assessment ($35 one-time fee). This takes
              about 30–45 minutes per person and gives us a detailed map of your
              relationship&apos;s strengths and growth areas across 12 categories.
            </p>

            <h3>Step 3: Personalized Sessions</h3>
            <p>
              Over 5–6 sessions (each 1.5–2 hours), we&apos;ll work through your
              assessment results together. Sessions are tailored to your specific
              needs — no cookie-cutter curriculum. We&apos;ll go deeper on the
              areas that matter most to you as a couple, whether that&apos;s
              communication, finances, family dynamics, intimacy, or all of the
              above.
            </p>

            <h3>Step 4: Tools You Keep</h3>
            <p>
              You&apos;ll leave each session with practical tools and take-home
              resources you can use immediately and throughout your marriage.
              These aren&apos;t just abstract concepts — they&apos;re concrete
              strategies for the real challenges couples face.
            </p>

            <h3>Step 5: Post-Wedding Follow-Up</h3>
            <p>
              Your program includes one free follow-up session within a year of
              your wedding. The first year of marriage brings its own surprises,
              and this session gives you a chance to check in, celebrate your
              progress, and address anything new that&apos;s come up.
            </p>
          </div>
        </div>
      </section>

      {/* ========== TESTIMONIALS ========== */}
      <section className="section-block bg-brand-cream bg-texture">
        <div className="section-wrapper">
          <SectionHeading
            title="What Couples Are Saying"
            tag="h2"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            <TestimonialCard {...allTestimonials[0]} />
            <TestimonialCard {...allTestimonials[3]} />
            <TestimonialCard {...allTestimonials[5]} />
          </div>
        </div>
      </section>

      {/* ========== FAQ SECTION ========== */}
      <section className="section-block bg-white">
        <div className="section-wrapper max-w-narrow">
          <SectionHeading
            title="Frequently Asked Questions"
            subtitle="Common questions about premarital counseling with The Stronger Life."
            tag="h2"
          />

          <div className="mt-10 space-y-6">
            {serviceFAQs.premaritalCounseling.map((faq, index) => (
              <div key={index} className="card bg-white border border-brand-stone/10">
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

      {/* ========== CROSS-LINKS ========== */}
      <section className="section-block bg-brand-cream bg-texture">
        <div className="section-wrapper max-w-narrow">
          <SectionHeading
            title="Explore More Services"
            tag="h2"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <Link href="/wedding-officiant" className="card bg-white hover:shadow-md transition-shadow no-underline group">
              <h3 className="text-lg font-heading font-semibold text-brand-navy mb-2 group-hover:text-brand-gold-dark transition-colors">
                Wedding Officiant Services
              </h3>
              <p className="text-brand-stone text-sm leading-relaxed">
                Many couples bundle premarital counseling with officiant services and save $200. Let Matt craft a ceremony as unique as your love story.
              </p>
            </Link>
            <Link href="/marriage-coaching" className="card bg-white hover:shadow-md transition-shadow no-underline group">
              <h3 className="text-lg font-heading font-semibold text-brand-navy mb-2 group-hover:text-brand-gold-dark transition-colors">
                Marriage Coaching
              </h3>
              <p className="text-brand-stone text-sm leading-relaxed">
                Already married? Ongoing coaching helps you strengthen communication, navigate challenges, and grow together at every stage.
              </p>
            </Link>
          </div>
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
