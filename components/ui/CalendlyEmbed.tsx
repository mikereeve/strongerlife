/* =============================================================
 * CalendlyEmbed Component — The Stronger Life
 *
 * Renders an inline Calendly scheduling widget embedded
 * directly into the page. Uses Calendly's embed script
 * loaded dynamically to avoid blocking page render.
 *
 * Props:
 *   url        — Calendly event URL (defaults to env var)
 *   height     — Embed height in px (default: 700)
 *   className  — Additional CSS classes for the wrapper
 *
 * Usage:
 *   <CalendlyEmbed />
 *   <CalendlyEmbed url="https://calendly.com/matt/30min" height={650} />
 *
 * Note:
 *   The Calendly URL is read from NEXT_PUBLIC_CALENDLY_URL
 *   in .env.local. Update this value after creating your
 *   Calendly event type.
 * ============================================================= */

"use client";

import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/lib/config";

interface CalendlyEmbedProps {
  url?: string;
  height?: number;
  className?: string;
}

export default function CalendlyEmbed({
  url = siteConfig.calendly.url,
  height = 700,
  className = "",
}: CalendlyEmbedProps) {
  // Track whether the Calendly script has loaded
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    /* --- Load Calendly Embed Script ---
     * Only loads once. Checks if the script already exists
     * (e.g., from another CalendlyEmbed instance on the page)
     * before injecting a new one.
     */
    const existingScript = document.querySelector(
      'script[src="https://assets.calendly.com/assets/external/widget.js"]'
    );

    if (existingScript) {
      // Script already loaded — mark as ready
      setIsLoaded(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    script.onload = () => setIsLoaded(true);
    script.onerror = () => {
      console.error("Failed to load Calendly embed script");
    };

    document.head.appendChild(script);

    // Also load Calendly's CSS for consistent styling
    const link = document.createElement("link");
    link.href = "https://assets.calendly.com/assets/external/widget.css";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    // Cleanup on unmount
    return () => {
      // Don't remove script — other instances may need it
    };
  }, []);

  return (
    <div className={`relative ${className}`}>
      {/* Loading state — shown while Calendly script loads */}
      {!isLoaded && (
        <div
          role="status"
          aria-label="Loading scheduling calendar"
          className="flex items-center justify-center bg-brand-cream/50 rounded-xl"
          style={{ height: `clamp(500px, 80vh, ${height}px)` }}
        >
          <div className="text-center">
            <div
              className="w-8 h-8 border-3 border-brand-gold/30 border-t-brand-gold
                         rounded-full animate-spin mx-auto mb-3"
              aria-hidden="true"
            />
            <p className="text-brand-stone text-sm">
              Loading scheduling calendar...
            </p>
          </div>
        </div>
      )}

      {/* Calendly Inline Widget Container ---
       * Calendly's script looks for elements with the
       * "calendly-inline-widget" class and the data-url
       * attribute to initialize the embed.
       */}
      <div
        ref={containerRef}
        className="calendly-inline-widget rounded-xl overflow-hidden"
        data-url={`${url}?hide_gdpr_banner=1&background_color=faf7f2&text_color=2d2d2d&primary_color=c8913a`}
        style={{
          minWidth: "320px",
          height: `clamp(500px, 80vh, ${height}px)`,
          // Hide until loaded to prevent layout flash
          opacity: isLoaded ? 1 : 0,
          transition: "opacity 0.3s ease-in-out",
        }}
      />
    </div>
  );
}
