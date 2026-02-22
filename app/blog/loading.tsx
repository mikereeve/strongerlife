/* =============================================================
 * Blog Index Loading Skeleton — The Stronger Life
 *
 * Shown while blog posts are being fetched from Sanity CMS.
 * Mimics the blog index layout with placeholder cards.
 * ============================================================= */

export default function BlogLoading() {
  return (
    <div className="animate-pulse">
      {/* Hero skeleton */}
      <div className="bg-brand-navy py-32 md:py-40">
        <div className="section-wrapper text-center">
          <div className="h-10 w-80 max-w-full bg-white/10 rounded mx-auto mb-6" />
          <div className="h-5 w-64 max-w-full bg-white/5 rounded mx-auto" />
        </div>
      </div>

      {/* Blog posts skeleton */}
      <div className="section-block bg-white">
        <div className="section-wrapper max-w-narrow">
          {/* Search bar skeleton */}
          <div className="h-12 w-full bg-brand-navy/5 rounded-lg mb-8" />

          {/* Post cards skeleton */}
          <div className="space-y-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border border-brand-navy/5 rounded-xl p-6">
                <div className="h-3 w-20 bg-brand-gold/10 rounded mb-3" />
                <div className="h-6 w-3/4 bg-brand-navy/5 rounded mb-3" />
                <div className="h-4 w-full bg-brand-navy/5 rounded mb-2" />
                <div className="h-4 w-2/3 bg-brand-navy/5 rounded mb-4" />
                <div className="flex gap-3">
                  <div className="h-3 w-24 bg-brand-navy/5 rounded" />
                  <div className="h-3 w-20 bg-brand-navy/5 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
