/* =============================================================
 * Admin Dashboard Page
 *
 * Displays GA4 analytics data with interactive charts.
 * ============================================================= */

"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

/* ---- Types ---- */

interface OverviewMetrics {
  totalSessions: number;
  totalPageViews: number;
  totalUsers: number;
  avgSessionDuration: number;
  bounceRate: number;
  engagementRate: number;
  pagesPerSession: number;
  avgEngagementTimePerPage: number;
}

interface DailySessions {
  date: string;
  sessions: number;
  pageViews: number;
}

interface TopPage {
  path: string;
  pageViews: number;
  sessions: number;
}

interface TrafficSource {
  source: string;
  sessions: number;
}

interface DeviceBreakdown {
  device: string;
  sessions: number;
}

interface NewVsReturning {
  userType: string;
  users: number;
}

interface LandingPage {
  path: string;
  sessions: number;
  bounceRate: number;
  avgDuration: number;
}

interface GeoBreakdown {
  city: string;
  region: string;
  sessions: number;
  users: number;
}

interface CountryBreakdown {
  country: string;
  sessions: number;
  users: number;
}

interface AnalyticsData {
  overview: OverviewMetrics;
  daily: DailySessions[];
  topPages: TopPage[];
  sources: TrafficSource[];
  devices: DeviceBreakdown[];
  newVsReturning: NewVsReturning[];
  landingPages: LandingPage[];
  geo: GeoBreakdown[];
  countries: CountryBreakdown[];
}

/* ---- Constants ---- */

const RANGES = [
  { label: "7 days", value: "7" },
  { label: "14 days", value: "14" },
  { label: "30 days", value: "30" },
  { label: "90 days", value: "90" },
];

const CHART_COLORS = [
  "#1B2A4A", // navy
  "#C8913A", // gold
  "#7A9E7E", // sage
  "#2A3F6E", // navy-light
  "#E5C88E", // gold-light
  "#B5CDB8", // sage-light
  "#33302B", // charcoal
  "#6B655A", // stone
];

/* ---- Helpers ---- */

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.round(seconds % 60);
  return `${m}m ${s}s`;
}

function formatNumber(n: number): string {
  return n.toLocaleString();
}

/* ---- Components ---- */

function MetricCard({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
      <p className="text-sm text-brand-stone mb-1">{label}</p>
      <p className="text-2xl font-heading text-brand-navy">{value}</p>
      {sub && <p className="text-xs text-brand-stone mt-1">{sub}</p>}
    </div>
  );
}

function PageTable({
  title,
  pages,
  columns,
}: {
  title: string;
  pages: { path: string; primary: string; secondary?: string }[];
  columns: { label: string; key: "primary" | "secondary" }[];
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h2 className="font-heading text-lg text-brand-navy mb-4">{title}</h2>
      <div className="space-y-2">
        <div className="flex items-center justify-between pb-2 border-b border-gray-100">
          <span className="text-xs text-brand-stone uppercase tracking-wide">Page</span>
          <div className="flex gap-6">
            {columns.map((col) => (
              <span
                key={col.key}
                className="text-xs text-brand-stone uppercase tracking-wide w-16 text-right"
              >
                {col.label}
              </span>
            ))}
          </div>
        </div>
        {pages.map((page, i) => (
          <div
            key={`${page.path}-${i}`}
            className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0"
          >
            <div className="flex items-center gap-3 min-w-0">
              <span className="text-xs text-brand-stone w-5 text-right shrink-0">
                {i + 1}
              </span>
              <span className="text-sm text-brand-charcoal truncate">
                {page.path === "/" ? "Homepage" : page.path}
              </span>
            </div>
            <div className="flex gap-6">
              <span className="text-sm font-medium text-brand-navy w-16 text-right shrink-0">
                {page.primary}
              </span>
              {page.secondary && (
                <span className="text-sm text-brand-stone w-16 text-right shrink-0">
                  {page.secondary}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---- Main Dashboard ---- */

export default function AdminDashboard() {
  const router = useRouter();
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [range, setRange] = useState("30");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchData = useCallback(async (selectedRange: string) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/admin/analytics?range=${selectedRange}`);
      if (res.status === 401) {
        router.push("/admin/login");
        return;
      }
      if (!res.ok) throw new Error("Failed to fetch data");
      const json = await res.json();
      setData(json);
    } catch {
      setError("Failed to load analytics data. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchData(range);
  }, [range, fetchData]);

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  }

  return (
    <div className="min-h-screen bg-brand-cream">
      {/* Header */}
      <header className="bg-brand-navy text-white px-6 py-4 flex items-center justify-between">
        <h1 className="font-heading text-xl">Site Analytics</h1>
        <div className="flex items-center gap-4">
          <div className="flex gap-1 bg-brand-navy-light rounded-lg p-1">
            {RANGES.map((r) => (
              <button
                key={r.value}
                onClick={() => setRange(r.value)}
                className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                  range === r.value
                    ? "bg-white text-brand-navy font-medium"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
          <button
            onClick={handleLogout}
            className="text-sm text-white/70 hover:text-white transition-colors"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {loading && !data && (
          <div className="flex items-center justify-center h-64">
            <div className="text-brand-stone">Loading analytics...</div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 text-red-700 rounded-xl p-4 mb-6">
            {error}
          </div>
        )}

        {data && (
          <div className="space-y-8">
            {/* Overview Cards — Row 1 */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <MetricCard
                label="Total Users"
                value={formatNumber(data.overview.totalUsers)}
              />
              <MetricCard
                label="Sessions"
                value={formatNumber(data.overview.totalSessions)}
              />
              <MetricCard
                label="Page Views"
                value={formatNumber(data.overview.totalPageViews)}
              />
              <MetricCard
                label="Avg. Duration"
                value={formatDuration(data.overview.avgSessionDuration)}
              />
            </div>

            {/* Overview Cards — Row 2 */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <MetricCard
                label="Bounce Rate"
                value={`${(data.overview.bounceRate * 100).toFixed(1)}%`}
              />
              <MetricCard
                label="Engagement Rate"
                value={`${(data.overview.engagementRate * 100).toFixed(1)}%`}
                sub="Sessions with meaningful interaction"
              />
              <MetricCard
                label="Pages / Session"
                value={data.overview.pagesPerSession.toFixed(1)}
                sub="How deep visitors explore"
              />
              <MetricCard
                label="Avg. Engagement / Page"
                value={formatDuration(data.overview.avgEngagementTimePerPage)}
                sub="Time actively engaged per page"
              />
            </div>

            {/* Sessions & Page Views Chart */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="font-heading text-lg text-brand-navy mb-4">
                Sessions &amp; Page Views
              </h2>
              <ResponsiveContainer width="100%" height={320}>
                <LineChart data={data.daily}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: 12, fill: "#6B655A" }}
                    interval="preserveStartEnd"
                  />
                  <YAxis tick={{ fontSize: 12, fill: "#6B655A" }} />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="sessions"
                    stroke="#1B2A4A"
                    strokeWidth={2}
                    dot={false}
                    name="Sessions"
                  />
                  <Line
                    type="monotone"
                    dataKey="pageViews"
                    stroke="#C8913A"
                    strokeWidth={2}
                    dot={false}
                    name="Page Views"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Two Column: Top Pages + Landing Pages */}
            <div className="grid md:grid-cols-2 gap-6">
              <PageTable
                title="Top Pages"
                columns={[{ label: "Views", key: "primary" }]}
                pages={data.topPages.map((p) => ({
                  path: p.path,
                  primary: formatNumber(p.pageViews),
                }))}
              />
              <PageTable
                title="Landing Pages"
                columns={[
                  { label: "Sessions", key: "primary" },
                  { label: "Bounce", key: "secondary" },
                ]}
                pages={data.landingPages.map((p) => ({
                  path: p.path,
                  primary: formatNumber(p.sessions),
                  secondary: `${(p.bounceRate * 100).toFixed(0)}%`,
                }))}
              />
            </div>

            {/* Two Column: Traffic Sources + New vs Returning */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Traffic Sources */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h2 className="font-heading text-lg text-brand-navy mb-4">
                  Traffic Sources
                </h2>
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={data.sources} layout="vertical">
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="#e5e7eb"
                      horizontal={false}
                    />
                    <XAxis type="number" tick={{ fontSize: 12, fill: "#6B655A" }} />
                    <YAxis
                      dataKey="source"
                      type="category"
                      tick={{ fontSize: 12, fill: "#6B655A" }}
                      width={120}
                    />
                    <Tooltip />
                    <Bar dataKey="sessions" fill="#1B2A4A" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* New vs Returning Users */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h2 className="font-heading text-lg text-brand-navy mb-4">
                  New vs Returning Users
                </h2>
                <ResponsiveContainer width="100%" height={280}>
                  <PieChart>
                    <Pie
                      data={data.newVsReturning}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      dataKey="users"
                      nameKey="userType"
                      label={(props) => {
                        const name = (props.name as string) ?? "";
                        const pct = ((props.percent ?? 0) * 100).toFixed(0);
                        return `${name} ${pct}%`;
                      }}
                    >
                      {data.newVsReturning.map((_, i) => (
                        <Cell
                          key={i}
                          fill={CHART_COLORS[i % CHART_COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Two Column: Countries + City/Region */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Top Countries */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h2 className="font-heading text-lg text-brand-navy mb-4">
                  Top Countries
                </h2>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={data.countries} layout="vertical">
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="#e5e7eb"
                      horizontal={false}
                    />
                    <XAxis type="number" tick={{ fontSize: 12, fill: "#6B655A" }} />
                    <YAxis
                      dataKey="country"
                      type="category"
                      tick={{ fontSize: 12, fill: "#6B655A" }}
                      width={120}
                    />
                    <Tooltip />
                    <Bar dataKey="sessions" fill="#7A9E7E" radius={[0, 4, 4, 0]} name="Sessions" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* City / Region */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h2 className="font-heading text-lg text-brand-navy mb-4">
                  Top Cities &amp; Regions
                </h2>
                <div className="space-y-2">
                  <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                    <span className="text-xs text-brand-stone uppercase tracking-wide">City</span>
                    <div className="flex gap-6">
                      <span className="text-xs text-brand-stone uppercase tracking-wide w-20 text-right">Region</span>
                      <span className="text-xs text-brand-stone uppercase tracking-wide w-16 text-right">Sessions</span>
                      <span className="text-xs text-brand-stone uppercase tracking-wide w-14 text-right">Users</span>
                    </div>
                  </div>
                  {data.geo.map((g, i) => (
                    <div
                      key={`${g.city}-${g.region}-${i}`}
                      className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0"
                    >
                      <span className="text-sm text-brand-charcoal truncate">
                        {g.city === "(not set)" ? "Unknown" : g.city}
                      </span>
                      <div className="flex gap-6">
                        <span className="text-sm text-brand-stone w-20 text-right truncate">
                          {g.region === "(not set)" ? "-" : g.region}
                        </span>
                        <span className="text-sm font-medium text-brand-navy w-16 text-right">
                          {formatNumber(g.sessions)}
                        </span>
                        <span className="text-sm text-brand-stone w-14 text-right">
                          {formatNumber(g.users)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Device Breakdown */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 max-w-md">
              <h2 className="font-heading text-lg text-brand-navy mb-4">
                Devices
              </h2>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={data.devices}
                    cx="50%"
                    cy="50%"
                    outerRadius={90}
                    dataKey="sessions"
                    nameKey="device"
                    label={(props) => {
                      const name = (props.name as string) ?? "";
                      const pct = ((props.percent ?? 0) * 100).toFixed(0);
                      return `${name} ${pct}%`;
                    }}
                  >
                    {data.devices.map((_, i) => (
                      <Cell
                        key={i}
                        fill={CHART_COLORS[i % CHART_COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
