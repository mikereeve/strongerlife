/* =============================================================
 * Next.js Middleware — Admin Route Protection
 *
 * Redirects unauthenticated users to the admin login page.
 * Only applies to /admin routes (not /admin/login).
 * ============================================================= */

import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow the login page and API routes through
  if (pathname === "/admin/login" || pathname.startsWith("/api/")) {
    return NextResponse.next();
  }

  // Check for admin session cookie
  const session = request.cookies.get("admin_session");

  if (!session?.value) {
    const loginUrl = new URL("/admin/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
