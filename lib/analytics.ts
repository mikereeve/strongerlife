/**
 * GA4 event helpers — thin wrappers around window.gtag.
 * Safe to call server-side (no-ops when gtag is unavailable).
 */

export function trackCTAClick(ctaText: string, ctaLocation: string, destination: string) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", "cta_click", {
    event_category: "CTA",
    event_label: ctaText,
    cta_location: ctaLocation,
    link_url: destination,
  });
}
