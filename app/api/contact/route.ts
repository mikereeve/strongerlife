/* =============================================================
 * Contact Form API Route — The Stronger Life
 *
 * Server-side proxy for the contact form that provides:
 *   - Server-side input validation (defense in depth)
 *   - IP-based rate limiting (in-memory, per-instance)
 *   - Honeypot verification
 *   - Forwards validated data to Formspree
 *
 * The client-side ContactForm.tsx should POST here instead
 * of directly to Formspree, keeping the Formspree endpoint
 * private (not exposed in the client JS bundle).
 * ============================================================= */

import { NextRequest, NextResponse } from "next/server";

/* --- Configuration --- */
const FORMSPREE_ENDPOINT = process.env.FORMSPREE_ENDPOINT || "";

// Rate limiting: max submissions per IP in a rolling window
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const RATE_LIMIT_MAX = 3;            // 3 submissions per window

// Field constraints (mirror client-side for defense in depth)
const MAX_NAME = 100;
const MAX_EMAIL = 254;
const MAX_PHONE = 20;
const MAX_MESSAGE = 5000;

const VALID_SERVICES = [
  "Premarital Counseling",
  "Wedding Officiant",
  "Marriage Coaching",
  "Virtual Counseling",
  "Other / Not Sure",
  "",
];

/* --- In-Memory Rate Limiter ---
 * Simple per-instance store. Resets on deploy/restart.
 * For production at scale, use Redis or Vercel KV.
 */
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitStore.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  entry.count++;
  return entry.count > RATE_LIMIT_MAX;
}

// Periodic cleanup to prevent memory leak (every 5 minutes)
setInterval(() => {
  const now = Date.now();
  rateLimitStore.forEach((entry, ip) => {
    if (now > entry.resetAt) rateLimitStore.delete(ip);
  });
}, 300_000);

/* --- Validation Helpers --- */
function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePhone(phone: string): boolean {
  if (!phone) return true;
  return /^[\d\-+() .]+$/.test(phone) && phone.replace(/\D/g, "").length >= 7;
}

/* --- POST Handler --- */
export async function POST(request: NextRequest) {
  // 1. Check Formspree endpoint is configured
  if (!FORMSPREE_ENDPOINT) {
    console.error("FORMSPREE_ENDPOINT env var is not set (server-side).");
    return NextResponse.json(
      { error: "Form service not configured." },
      { status: 503 }
    );
  }

  // 2. Rate limiting by IP
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  // 3. Parse body
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // 4. Honeypot check
  if (body._gotcha) {
    // Silently accept but don't forward — bots think it worked
    return NextResponse.json({ ok: true });
  }

  // 5. Extract and validate fields
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const phone = typeof body.phone === "string" ? body.phone.trim() : "";
  const service = typeof body.service === "string" ? body.service : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  const errors: string[] = [];

  if (!name || name.length > MAX_NAME) {
    errors.push("Name is required and must be under 100 characters.");
  }
  if (!email || email.length > MAX_EMAIL || !validateEmail(email)) {
    errors.push("A valid email address is required.");
  }
  if (phone && (phone.length > MAX_PHONE || !validatePhone(phone))) {
    errors.push("Phone number is invalid.");
  }
  if (!VALID_SERVICES.includes(service)) {
    errors.push("Invalid service selection.");
  }
  if (!message || message.length > MAX_MESSAGE) {
    errors.push("Message is required and must be under 5,000 characters.");
  }

  if (errors.length > 0) {
    return NextResponse.json({ error: errors.join(" ") }, { status: 400 });
  }

  // 6. Forward to Formspree
  try {
    const response = await fetch(FORMSPREE_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ name, email, phone, service, message }),
    });

    if (response.ok) {
      return NextResponse.json({ ok: true });
    }

    console.error("Formspree returned non-OK:", response.status);
    return NextResponse.json(
      { error: "Failed to send message." },
      { status: 502 }
    );
  } catch (err) {
    console.error("Formspree request failed:", err);
    return NextResponse.json(
      { error: "Failed to send message." },
      { status: 502 }
    );
  }
}
