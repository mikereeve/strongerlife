/* =============================================================
 * security.txt — The Stronger Life
 *
 * Standard vulnerability disclosure file per RFC 9116.
 * Served at /.well-known/security.txt
 * ============================================================= */

import { NextResponse } from "next/server";
import { siteConfig } from "@/lib/config";

export function GET() {
  const body = [
    `Contact: mailto:${siteConfig.contact.email}`,
    `Preferred-Languages: en`,
    `Canonical: ${siteConfig.url}/.well-known/security.txt`,
    `Expires: 2027-02-16T00:00:00.000Z`,
  ].join("\n");

  return new NextResponse(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
