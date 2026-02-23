/* =============================================================
 * CTABanner Component — The Stronger Life
 *
 * Full-width call-to-action section with a link to the
 * contact page.
 *
 * Props:
 *   heading       — Primary CTA heading
 *   subheading    — Supporting text
 *   buttonText    — CTA button label
 *   buttonHref    — Link target
 *   variant       — "navy" (dark bg) or "cream" (light bg)
 * ============================================================= */

import Link from "next/link";

interface CTABannerProps {
  heading?: string;
  subheading?: string;
  buttonText?: string;
  buttonHref?: string;
  variant?: "navy" | "cream";
}

export default function CTABanner({
  heading = "Ready to Start Your Journey?",
  subheading = "Schedule a free 30-minute consultation to see if we're a great fit.",
  buttonText = "Book Your Free Consultation",
  buttonHref = "/contact",
  variant = "navy",
}: CTABannerProps) {
  const isNavy = variant === "navy";

  const buttonStyle = `inline-block px-10 py-4 rounded-md font-semibold text-lg
    transition-all duration-300 shadow-lg hover:shadow-xl
    transform hover:-translate-y-0.5 no-underline cursor-pointer
    ${isNavy
      ? "bg-brand-gold-btn text-white hover:bg-brand-gold"
      : "bg-brand-navy text-white hover:bg-brand-navy-light"
    }`;

  return (
    <section
      className={`section-block ${
        isNavy ? "bg-brand-navy text-white" : "bg-brand-cream text-brand-navy"
      }`}
    >
      <div className="section-wrapper text-center max-w-3xl">
        <h2
          className={`text-3xl md:text-4xl font-heading font-bold mb-4 ${
            isNavy ? "text-white" : "text-brand-navy"
          }`}
        >
          {heading}
        </h2>

        <p
          className={`text-lg mb-8 leading-relaxed ${
            isNavy ? "text-white/80" : "text-brand-stone"
          }`}
        >
          {subheading}
        </p>

        <Link href={buttonHref} className={buttonStyle}>
          {buttonText}
        </Link>
      </div>
    </section>
  );
}
