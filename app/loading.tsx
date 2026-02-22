/* =============================================================
 * Root Loading Skeleton — The Stronger Life
 *
 * Shown during page transitions for routes that don't have
 * their own loading.tsx. Provides a branded skeleton UI
 * that matches the site's visual structure.
 * ============================================================= */

export default function Loading() {
  return (
    <div className="animate-pulse">
      {/* Hero skeleton */}
      <div className="bg-brand-navy py-32 md:py-40">
        <div className="section-wrapper text-center">
          <div className="h-4 w-40 bg-white/10 rounded mx-auto mb-4" />
          <div className="h-10 w-96 max-w-full bg-white/10 rounded mx-auto mb-6" />
          <div className="h-5 w-80 max-w-full bg-white/5 rounded mx-auto" />
        </div>
      </div>

      {/* Content skeleton */}
      <div className="section-block bg-white">
        <div className="section-wrapper max-w-narrow space-y-4">
          <div className="h-8 w-64 bg-brand-navy/5 rounded" />
          <div className="h-4 w-full bg-brand-navy/5 rounded" />
          <div className="h-4 w-full bg-brand-navy/5 rounded" />
          <div className="h-4 w-3/4 bg-brand-navy/5 rounded" />
          <div className="h-4 w-full bg-brand-navy/5 rounded mt-6" />
          <div className="h-4 w-5/6 bg-brand-navy/5 rounded" />
        </div>
      </div>
    </div>
  );
}
