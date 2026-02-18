/* =============================================================
 * Contact / Book Me Page — The Stronger Life
 *
 * Contact experience with form and contact details.
 * ============================================================= */

import type { Metadata } from "next";
import ContactForm from "@/components/ui/ContactForm";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Contact & Book a Consultation",
  description:
    "Schedule a free 30-minute consultation with Matt Reeve. Get in touch about premarital counseling, wedding officiant services, or marriage coaching.",
  alternates: {
    canonical: `${siteConfig.url}/contact`,
  },
};

export default function ContactPage() {
  return (
    <>
      {/* ========== PAGE HERO ========== */}
      <section className="bg-brand-navy py-32 md:py-40">
        <div className="section-wrapper text-center">
          <h1 className="text-white text-4xl md:text-5xl font-heading font-bold mb-6">
            Let&apos;s Connect
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto leading-relaxed">
            Ready to take the next step? Send a message and I&apos;ll
            get back to you within 24 hours.
          </p>
        </div>
      </section>

      {/* ========== CONTACT FORM SECTION ========== */}
      <section className="section-block bg-brand-cream bg-texture">
        <div className="section-wrapper">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Form column — 3/5 width */}
            <div className="lg:col-span-3">
              <h2 className="text-2xl font-heading font-bold text-brand-navy mb-2">
                Prefer to Send a Message?
              </h2>
              <p className="text-brand-stone mb-6">
                Not ready to schedule? No problem. Send me a message and
                I&apos;ll respond within 24 hours.
              </p>
              <ContactForm />
            </div>

            {/* Info column — 2/5 width */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-heading font-bold text-brand-navy mb-6">
                Contact Details
              </h2>

              <div className="space-y-8">
                {/* Email */}
                <div>
                  <h3 className="text-sm font-medium text-brand-stone uppercase tracking-wide mb-2">
                    Email
                  </h3>
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="text-brand-gold-dark hover:text-brand-navy transition-colors text-lg"
                  >
                    {siteConfig.contact.email}
                  </a>
                </div>

                {siteConfig.contact.phone && (
                  <div>
                    <h3 className="text-sm font-medium text-brand-stone uppercase tracking-wide mb-2">
                      Phone
                    </h3>
                    <a href={`tel:${siteConfig.contact.phone}`}
                       className="text-brand-gold-dark hover:text-brand-navy transition-colors text-lg">
                      {siteConfig.contact.phone}
                    </a>
                  </div>
                )}

                {/* Location */}
                <div>
                  <h3 className="text-sm font-medium text-brand-stone uppercase tracking-wide mb-2">
                    Location
                  </h3>
                  <p className="text-brand-charcoal">
                    {siteConfig.contact.location} &amp; Central Minnesota
                  </p>
                  <p className="text-brand-stone text-sm mt-1">
                    Virtual sessions available nationwide
                  </p>
                </div>

                {/* What to expect callout */}
                <div className="card bg-white border border-brand-gold/20">
                  <h3 className="text-lg font-heading font-semibold text-brand-navy mb-3">
                    What to Expect
                  </h3>
                  <div className="space-y-3 text-sm text-brand-stone leading-relaxed">
                    <div className="flex gap-3">
                      <span className="text-brand-gold-dark font-bold shrink-0">1.</span>
                      <p>
                        <strong className="text-brand-navy">Reach Out</strong> —
                        Send a message using the form.
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <span className="text-brand-gold-dark font-bold shrink-0">2.</span>
                      <p>
                        <strong className="text-brand-navy">Meet</strong> —
                        We&apos;ll have a relaxed 30-minute conversation
                        (video or in person).
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <span className="text-brand-gold-dark font-bold shrink-0">3.</span>
                      <p>
                        <strong className="text-brand-navy">Decide</strong> —
                        No pressure. Take your time to decide if we&apos;re a
                        great match.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Response time note */}
                <p className="text-sm text-brand-stone/70 italic">
                  Matt typically responds to messages within 24 hours.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
