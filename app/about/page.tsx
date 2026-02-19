/* =============================================================
 * About Matt Page — The Stronger Life
 *
 * Consolidates the old "Why Matt?" and "About Matt" pages
 * into a single, comprehensive page with Person schema.
 * ============================================================= */

import type { Metadata } from "next";
import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";
import CTABanner from "@/components/sections/CTABanner";
import { siteConfig, generatePersonSchema } from "@/lib/config";

export const metadata: Metadata = {
  title: "About Matt Reeve",
  description:
    "Meet Matt Reeve — licensed premarital counselor, certified relationship coach, and ordained minister with 32+ years of experience helping couples in St. Cloud, Minnesota and beyond.",
  alternates: {
    canonical: `${siteConfig.url}/about`,
  },
};

export default function AboutPage() {
  const personSchema = generatePersonSchema();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />

      {/* ========== PAGE HERO ========== */}
      <section className="bg-brand-navy py-32 md:py-40">
        <div className="section-wrapper text-center">
          <h1 className="text-white text-4xl md:text-5xl font-heading font-bold mb-6">
            About Matt Reeve
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto leading-relaxed">
            Licensed premarital counselor, certified relationship coach,
            and ordained minister.
          </p>
        </div>
      </section>

      {/* ========== BIO SECTION ========== */}
      <section className="section-block bg-white">
        <div className="section-wrapper">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Photo */}
            <div className="aspect-[3/4] rounded-2xl bg-brand-navy/10 overflow-hidden lg:sticky lg:top-32">
              <Image
                src="/images/matt-jami.jpeg"
                alt="Matt and Jami Reeve"
                width={900}
                height={1200}
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 500px"
                className="w-full h-full object-cover"
                priority
              />
            </div>

            {/* Bio content */}
            <div className="space-y-6 text-brand-charcoal leading-relaxed">
              <SectionHeading
                title="Why Matt?"
                subtitle="Here's what you should know about who I am and how I work."
                centered={false}
                tag="h2"
              />

              <p>
                For over 32 years I&apos;ve served as a licensed premarital
                counselor, certified relationship coach, and ordained minister
                — helping couples grow stronger both personally and relationally.
                I live in Central Minnesota with my wife of 34+ years (my best
                friend and partner in everything). We have two grown daughters
                and three grandchildren.
              </p>

              <p>
                When I&apos;m not working with couples, you&apos;ll probably find me
                enjoying strong coffee, trying a new IPA, grilling outdoors, or
                just connecting with people. I try not to take myself too
                seriously — and I think that&apos;s exactly what makes the
                counseling and coaching feel comfortable.
              </p>

              <h3>My Approach</h3>
              <p>
                I believe the best officiant and counselor for you is one you click
                with and trust fully. That&apos;s why I always start with a
                no-obligation meeting — either video or in person — so we can get
                to know each other. I&apos;m not going to &ldquo;sell&rdquo; myself
                or have you sign something right away. I want you to figure out
                whether we&apos;re a great match.
              </p>

              <p>
                There&apos;s no one-size-fits-all solution to relationship
                challenges. I invest time understanding each couple and tailor my
                approach to your specific needs, goals, and circumstances. My goal
                is to help you create a strong foundation that sets you up for
                long-term success.
              </p>

              <h3>More Than an Officiant</h3>
              <p>
                When I officiate your wedding, I&apos;m your minister all the way
                through: the planning, the tension you&apos;re under, the last-minute
                surprises. I arrive early, offer a calm presence, check in with your
                other vendors, and handle the unexpected with grace and ease.
              </p>

              <h3>Credentials &amp; Experience</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-brand-sage mt-1">✓</span>
                  Licensed Premarital Counselor
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-sage mt-1">✓</span>
                  Certified Relationship Coach
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-sage mt-1">✓</span>
                  Ordained Minister — 32+ years
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-sage mt-1">✓</span>
                  Trained in family dynamics, pastoral counseling &amp; professional ethics
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-sage mt-1">✓</span>
                  Prepare/Enrich certified facilitator
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-sage mt-1">✓</span>
                  Hundreds of couples counseled and ceremonies performed
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <CTABanner
        heading="Let's See If We're a Great Match"
        subheading="Schedule a free, no-pressure meeting to get to know each other."
      />
    </>
  );
}
