/* =============================================================
 * Google Analytics 4 Data API — Server-side data fetching
 *
 * Uses a service account to pull analytics data for the admin
 * dashboard. All functions run server-side only.
 * ============================================================= */

import { BetaAnalyticsDataClient } from "@google-analytics/data";

const propertyId = process.env.GA4_PROPERTY_ID;

function getClient() {
  const clientEmail = process.env.GA_CLIENT_EMAIL;
  const privateKey = process.env.GA_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!clientEmail || !privateKey || !propertyId) {
    throw new Error("Missing GA4 API credentials in environment variables");
  }

  return new BetaAnalyticsDataClient({
    credentials: { client_email: clientEmail, private_key: privateKey },
  });
}

/* ---- Types ---- */

export interface DailySessions {
  date: string;
  sessions: number;
  pageViews: number;
}

export interface TopPage {
  path: string;
  pageViews: number;
  sessions: number;
}

export interface TrafficSource {
  source: string;
  sessions: number;
}

export interface DeviceBreakdown {
  device: string;
  sessions: number;
}

export interface OverviewMetrics {
  totalSessions: number;
  totalPageViews: number;
  totalUsers: number;
  avgSessionDuration: number;
  bounceRate: number;
}

/* ---- Data Fetchers ---- */

export async function getOverviewMetrics(
  startDate: string,
  endDate: string
): Promise<OverviewMetrics> {
  const client = getClient();
  const [response] = await client.runReport({
    property: `properties/${propertyId}`,
    dateRanges: [{ startDate, endDate }],
    metrics: [
      { name: "sessions" },
      { name: "screenPageViews" },
      { name: "totalUsers" },
      { name: "averageSessionDuration" },
      { name: "bounceRate" },
    ],
  });

  const row = response.rows?.[0];
  return {
    totalSessions: Number(row?.metricValues?.[0]?.value ?? 0),
    totalPageViews: Number(row?.metricValues?.[1]?.value ?? 0),
    totalUsers: Number(row?.metricValues?.[2]?.value ?? 0),
    avgSessionDuration: Number(row?.metricValues?.[3]?.value ?? 0),
    bounceRate: Number(row?.metricValues?.[4]?.value ?? 0),
  };
}

export async function getDailySessions(
  startDate: string,
  endDate: string
): Promise<DailySessions[]> {
  const client = getClient();
  const [response] = await client.runReport({
    property: `properties/${propertyId}`,
    dateRanges: [{ startDate, endDate }],
    dimensions: [{ name: "date" }],
    metrics: [{ name: "sessions" }, { name: "screenPageViews" }],
    orderBys: [{ dimension: { dimensionName: "date" } }],
  });

  return (
    response.rows?.map((row) => {
      const raw = row.dimensionValues?.[0]?.value ?? "";
      const formatted = `${raw.slice(4, 6)}/${raw.slice(6, 8)}`;
      return {
        date: formatted,
        sessions: Number(row.metricValues?.[0]?.value ?? 0),
        pageViews: Number(row.metricValues?.[1]?.value ?? 0),
      };
    }) ?? []
  );
}

export async function getTopPages(
  startDate: string,
  endDate: string,
  limit = 10
): Promise<TopPage[]> {
  const client = getClient();
  const [response] = await client.runReport({
    property: `properties/${propertyId}`,
    dateRanges: [{ startDate, endDate }],
    dimensions: [{ name: "pagePath" }],
    metrics: [{ name: "screenPageViews" }, { name: "sessions" }],
    orderBys: [
      { metric: { metricName: "screenPageViews" }, desc: true },
    ],
    limit,
  });

  return (
    response.rows?.map((row) => ({
      path: row.dimensionValues?.[0]?.value ?? "",
      pageViews: Number(row.metricValues?.[0]?.value ?? 0),
      sessions: Number(row.metricValues?.[1]?.value ?? 0),
    })) ?? []
  );
}

export async function getTrafficSources(
  startDate: string,
  endDate: string,
  limit = 8
): Promise<TrafficSource[]> {
  const client = getClient();
  const [response] = await client.runReport({
    property: `properties/${propertyId}`,
    dateRanges: [{ startDate, endDate }],
    dimensions: [{ name: "sessionSource" }],
    metrics: [{ name: "sessions" }],
    orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
    limit,
  });

  return (
    response.rows?.map((row) => ({
      source: row.dimensionValues?.[0]?.value ?? "(unknown)",
      sessions: Number(row.metricValues?.[0]?.value ?? 0),
    })) ?? []
  );
}

export async function getDeviceBreakdown(
  startDate: string,
  endDate: string
): Promise<DeviceBreakdown[]> {
  const client = getClient();
  const [response] = await client.runReport({
    property: `properties/${propertyId}`,
    dateRanges: [{ startDate, endDate }],
    dimensions: [{ name: "deviceCategory" }],
    metrics: [{ name: "sessions" }],
    orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
  });

  return (
    response.rows?.map((row) => ({
      device: row.dimensionValues?.[0]?.value ?? "unknown",
      sessions: Number(row.metricValues?.[0]?.value ?? 0),
    })) ?? []
  );
}
