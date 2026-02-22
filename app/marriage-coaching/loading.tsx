/* =============================================================
 * Service Page Loading Skeleton — Marriage Coaching
 * ============================================================= */

export default function ServiceLoading() {
  return (
    <div className="animate-pulse">
      {/* Hero skeleton */}
      <div className="bg-brand-navy py-32 md:py-40">
        <div className="section-wrapper text-center">
          <div className="h-4 w-28 bg-white/10 rounded mx-auto mb-4" />
          <div className="h-10 w-80 max-w-full bg-white/10 rounded mx-auto mb-6" />
          <div className="h-5 w-96 max-w-full bg-white/5 rounded mx-auto" />
        </div>
      </div>

      {/* Content skeleton */}
      <div className="section-block bg-white">
        <div className="section-wrapper max-w-narrow space-y-4">
          <div className="h-8 w-72 bg-brand-navy/5 rounded" />
          <div className="h-4 w-full bg-brand-navy/5 rounded" />
          <div className="h-4 w-full bg-brand-navy/5 rounded" />
          <div className="h-4 w-3/4 bg-brand-navy/5 rounded" />
        </div>
      </div>

      {/* Packages skeleton */}
      <div className="section-block bg-brand-cream">
        <div className="section-wrapper">
          <div className="h-8 w-48 bg-brand-navy/5 rounded mx-auto mb-4" />
          <div className="h-4 w-96 max-w-full bg-brand-navy/5 rounded mx-auto mb-12" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-xl bg-white p-8">
                <div className="h-6 w-40 bg-brand-navy/5 rounded mb-2" />
                <div className="h-7 w-24 bg-brand-gold/10 rounded mb-2" />
                <div className="h-3 w-full bg-brand-navy/5 rounded mb-5" />
                <div className="space-y-2">
                  {[1, 2, 3, 4].map((j) => (
                    <div key={j} className="h-3 w-full bg-brand-navy/5 rounded" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
