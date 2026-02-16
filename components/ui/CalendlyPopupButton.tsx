/* =============================================================
 * CalendlyPopupButton Component — The Stronger Life
 *
 * A button that opens Calendly in a popup overlay when clicked.
 * Useful for CTAs, nav buttons, and the floating action button.
 *
 * Uses Calendly's popup widget API, which opens a modal overlay
 * without navigating away from the current page.
 *
 * Props:
 *   url        — Calendly event URL (defaults to env var)
 *   text       — Button label text
 *   className  — CSS classes for the button
 *   variant    — "primary" | "secondary" | "floating" style
 *
 * Usage:
 *   <CalendlyPopupButton />
 *   <CalendlyPopupButton text="Schedule Now" variant="secondary" />
 *   <CalendlyPopupButton variant="floating" />
 * ============================================================= */

"use client";

import { useEffect, useCallback } from "react";
import { siteConfig } from "@/lib/config";

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (opts: { url: string }) => void;
    };
  }
}

/** Validate URL is a legitimate Calendly domain to prevent open redirect */
function isValidCalendlyUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.hostname === "calendly.com" || parsed.hostname.endsWith(".calendly.com");
  } catch {
    return false;
  }
}

interface CalendlyPopupButtonProps {
  url?: string;
  text?: string;
  className?: string;
  variant?: "primary" | "secondary" | "floating";
}

export default function CalendlyPopupButton({
  url = siteConfig.calendly.url,
  text = "Book a Free Consultation",
  className = "",
  variant = "primary",
}: CalendlyPopupButtonProps) {
  /* --- Load Calendly Script (once) --- */
  useEffect(() => {
    const existingScript = document.querySelector(
      'script[src="https://assets.calendly.com/assets/external/widget.js"]'
    );

    if (!existingScript) {
      const script = document.createElement("script");
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      document.head.appendChild(script);

      const link = document.createElement("link");
      link.href = "https://assets.calendly.com/assets/external/widget.css";
      link.rel = "stylesheet";
      document.head.appendChild(link);
    }
  }, []);

  /* --- Open Calendly Popup ---
   * Calls the Calendly global API to open the popup widget.
   * The Calendly object is available after the script loads.
   * Brand colors are passed as URL params for visual consistency.
   */
  const openCalendly = useCallback(() => {
    // Validate URL before any navigation to prevent open redirect
    if (!isValidCalendlyUrl(url)) {
      console.error("Invalid Calendly URL — must be a calendly.com domain");
      return;
    }

    // Access the Calendly global object injected by the widget script
    const calendly = window.Calendly;

    if (calendly) {
      calendly.initPopupWidget({
        url: `${url}?hide_gdpr_banner=1&background_color=faf7f2&text_color=2d2d2d&primary_color=c8913a`,
      });
    } else {
      // Fallback: open Calendly in a new tab if script hasn't loaded
      console.warn("Calendly script not yet loaded, opening in new tab");
      window.open(url, "_blank", "noopener,noreferrer");
    }
  }, [url]);

  /* --- Style Variants --- */
  const variantStyles = {
    // Standard gold CTA button
    primary: `btn-primary ${className}`,

    // Outline/bordered button
    secondary: `btn-secondary ${className}`,

    // Fixed-position floating action button (bottom-right corner)
    floating: `fixed bottom-6 right-6 z-40
               bg-brand-gold text-white px-6 py-3.5
               rounded-full font-semibold shadow-xl
               hover:brightness-90 hover:shadow-2xl
               transform hover:-translate-y-1
               transition-all duration-300
               flex items-center gap-2
               ${className}`,
  };

  return (
    <button
      type="button"
      onClick={openCalendly}
      className={variantStyles[variant]}
      aria-label={text}
    >
      {/* Calendar icon for floating variant */}
      {variant === "floating" && (
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
          />
        </svg>
      )}
      {text}
    </button>
  );
}
