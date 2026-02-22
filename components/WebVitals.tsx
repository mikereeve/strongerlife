/* =============================================================
 * WebVitals Component — The Stronger Life
 *
 * Reports Core Web Vitals (LCP, CLS, INP, FCP, TTFB) to
 * Google Analytics so performance can be monitored in production.
 *
 * Uses the web-vitals library that Next.js includes internally.
 * Metrics are sent as GA events with the metric name and value.
 * ============================================================= */

"use client";

import { useReportWebVitals } from "next/web-vitals";

export default function WebVitals() {
  useReportWebVitals((metric) => {
    // Only report if GA is loaded
    if (typeof window.gtag !== "function") return;

    window.gtag("event", metric.name, {
      value: Math.round(metric.name === "CLS" ? metric.value * 1000 : metric.value),
      event_label: metric.id,
      non_interaction: true,
    });
  });

  return null;
}
