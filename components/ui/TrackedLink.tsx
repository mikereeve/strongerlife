/* =============================================================
 * TrackedLink — A Next.js Link that fires a GA4 CTA click event.
 * Drop-in replacement for <Link> when you need click tracking.
 * ============================================================= */

"use client";

import Link from "next/link";
import { trackCTAClick } from "@/lib/analytics";

interface TrackedLinkProps extends React.ComponentProps<typeof Link> {
  /** GA4 label for where this link lives (e.g. "hero", "nav", "footer") */
  ctaLocation: string;
  /** Human-readable button text for the event label */
  ctaText: string;
}

export default function TrackedLink({
  ctaLocation,
  ctaText,
  onClick,
  ...props
}: TrackedLinkProps) {
  return (
    <Link
      {...props}
      onClick={(e) => {
        trackCTAClick(ctaText, ctaLocation, String(props.href));
        onClick?.(e);
      }}
    />
  );
}
