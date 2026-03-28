/* =============================================================
 * Admin Analytics API Route
 *
 * Fetches GA4 data server-side and returns it as JSON.
 * Protected by session cookie (middleware handles redirect,
 * but we double-check here for API safety).
 * ============================================================= */

import { NextRequest, NextResponse } from "next/server";
import {
  getOverviewMetrics,
  getDailySessions,
  getTopPages,
  getTrafficSources,
  getDeviceBreakdown,
} from "@/lib/ga4";

export async function GET(request: NextRequest) {
  // Verify admin session
  const session = request.cookies.get("admin_session");
  if (!session?.value) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const range = searchParams.get("range") ?? "30";

  const endDate = "today";
  const startDate = `${range}daysAgo`;

  try {
    const [overview, daily, topPages, sources, devices] = await Promise.all([
      getOverviewMetrics(startDate, endDate),
      getDailySessions(startDate, endDate),
      getTopPages(startDate, endDate),
      getTrafficSources(startDate, endDate),
      getDeviceBreakdown(startDate, endDate),
    ]);

    return NextResponse.json({
      overview,
      daily,
      topPages,
      sources,
      devices,
    });
  } catch (error) {
    console.error("GA4 API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch analytics data" },
      { status: 500 }
    );
  }
}
