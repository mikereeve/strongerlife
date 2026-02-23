/* =============================================================
 * HomeFAQSection — The Stronger Life
 *
 * Below-fold FAQ block; loaded via dynamic import
 * to reduce initial JS bundle and improve LCP.
 * ============================================================= */

import SectionHeading from "@/components/ui/SectionHeading";

export type FAQItem = { question: string; answer: string };

export default function HomeFAQSection({ faqs }: { faqs: FAQItem[] }) {
  return (
    <section className="section-block bg-brand-cream bg-texture">
      <div className="section-wrapper max-w-narrow">
        <SectionHeading
          title="Frequently Asked Questions"
          subtitle="Answers to the questions couples ask most."
          tag="h2"
        />
        <div className="mt-10 space-y-6">
          {faqs.map((faq, index) => (
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
  );
}
