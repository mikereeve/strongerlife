/* =============================================================
 * CTABanner Component — The Stronger Life
 *
 * Full-width call-to-action section. Now supports two modes:
 *   1. Link mode (default) — navigates to a page (e.g., /contact)
 *   2. Calendly mode — opens the Calendly popup overlay
 *
 * Set useCalendly={true} to enable the popup behavior.
 * The button text and appearance remain the same either way.
 *
 * Props:
 *   heading       — Primary CTA heading
 *   subheading    — Supporting text
 *   buttonText    — CTA button label
 *   buttonHref    — Link target (used when useCalendly is false)
 *   variant       — "navy" (dark bg) or "cream" (light bg)
 *   useCalendly   — If true, button opens Calendly popup
 * ============================================================= */

"use client";

import Link from "next/link";
import dynamic from "next/dynamic";

// Lazy-load CalendlyPopupButton — only fetched when useCalendly={true}
const CalendlyPopupButton = dynamic(
  () => import("@/components/ui/CalendlyPopupButton"),
  { ssr: false }
);

interface CTABannerProps {
  heading?: string;
  subheading?: string;
  buttonText?: string;
  buttonHref?: string;
  variant?: "navy" | "cream";
  useCalendly?: boolean;
}

export default function CTABanner({
  heading = "Ready to Start Your Journey?",
  subheading = "Schedule a free 30-minute consultation to see if we're a great fit.",
  buttonText = "Book Your Free Consultation",
  buttonHref = "/contact",
  variant = "navy",
  useCalendly = false,
}: CTABannerProps) {
  const isNavy = variant === "navy";

  // Shared button styling for both link and Calendly modes
  const buttonStyle = `inline-block px-10 py-4 rounded-md font-semibold text-lg
    transition-all duration-300 shadow-lg hover:shadow-xl
    transform hover:-translate-y-0.5 no-underline cursor-pointer
    ${isNavy
      ? "bg-brand-gold text-white hover:bg-brand-gold-light"
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

        {/* Render either a Calendly popup trigger or a standard link */}
        {useCalendly ? (
          <CalendlyPopupButton
            text={buttonText}
            className={buttonStyle}
            variant="primary"
          />
        ) : (
          <Link href={buttonHref} className={buttonStyle}>
            {buttonText}
          </Link>
        )}
      </div>
    </section>
  );
}
