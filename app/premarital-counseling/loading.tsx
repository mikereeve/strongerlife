/* =============================================================
 * Service Page Loading Skeleton — Premarital Counseling
 * ============================================================= */

export default function ServiceLoading() {
  return (
    <div className="animate-pulse">
      {/* Hero skeleton */}
      <div className="bg-brand-navy py-32 md:py-40">
        <div className="section-wrapper text-center">
          <div className="h-4 w-28 bg-white/10 rounded mx-auto mb-4" />
          <div className="h-10 w-72 max-w-full bg-white/10 rounded mx-auto mb-6" />
          <div className="h-5 w-96 max-w-full bg-white/5 rounded mx-auto" />
        </div>
      </div>

      {/* Content skeleton */}
      <div className="section-block bg-white">
        <div className="section-wrapper max-w-narrow space-y-4">
          <div className="h-8 w-80 bg-brand-navy/5 rounded" />
          <div className="h-4 w-full bg-brand-navy/5 rounded" />
          <div className="h-4 w-full bg-brand-navy/5 rounded" />
          <div className="h-4 w-3/4 bg-brand-navy/5 rounded" />

          {/* Pricing cards skeleton */}
          <div className="flex flex-wrap gap-6 mt-10">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-xl bg-brand-cream border border-brand-gold/10 px-6 py-5 w-40">
                <div className="h-8 w-16 bg-brand-gold/10 rounded mx-auto mb-2" />
                <div className="h-3 w-20 bg-brand-navy/5 rounded mx-auto" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Topics grid skeleton */}
      <div className="section-block bg-brand-cream">
        <div className="section-wrapper">
          <div className="h-8 w-64 bg-brand-navy/5 rounded mx-auto mb-4" />
          <div className="h-4 w-96 max-w-full bg-brand-navy/5 rounded mx-auto mb-12" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="rounded-xl bg-white p-6">
                <div className="h-5 w-40 bg-brand-navy/5 rounded mb-3" />
                <div className="h-3 w-full bg-brand-navy/5 rounded mb-2" />
                <div className="h-3 w-5/6 bg-brand-navy/5 rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
