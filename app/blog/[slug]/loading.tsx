/* =============================================================
 * Blog Post Loading Skeleton — The Stronger Life
 *
 * Shown while an individual blog post is being fetched.
 * Mimics the blog post layout with placeholder content.
 * ============================================================= */

export default function BlogPostLoading() {
  return (
    <div className="animate-pulse">
      {/* Header skeleton */}
      <div className="bg-brand-navy pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="section-wrapper max-w-narrow text-center">
          <div className="h-5 w-24 bg-brand-gold/10 rounded-full mx-auto mb-4" />
          <div className="h-10 w-full max-w-lg bg-white/10 rounded mx-auto mb-6" />
          <div className="flex items-center justify-center gap-3">
            <div className="h-3 w-24 bg-white/5 rounded" />
            <div className="h-3 w-28 bg-white/5 rounded" />
            <div className="h-3 w-20 bg-white/5 rounded" />
          </div>
        </div>
      </div>

      {/* Featured image skeleton */}
      <div className="section-wrapper -mt-8 mb-12">
        <div className="max-w-narrow mx-auto">
          <div className="aspect-[16/9] rounded-2xl bg-brand-navy/5" />
        </div>
      </div>

      {/* Article body skeleton */}
      <div className="section-block bg-white pt-8">
        <div className="section-wrapper max-w-narrow space-y-4">
          <div className="h-4 w-full bg-brand-navy/5 rounded" />
          <div className="h-4 w-full bg-brand-navy/5 rounded" />
          <div className="h-4 w-5/6 bg-brand-navy/5 rounded" />
          <div className="h-4 w-full bg-brand-navy/5 rounded mt-6" />
          <div className="h-4 w-full bg-brand-navy/5 rounded" />
          <div className="h-4 w-3/4 bg-brand-navy/5 rounded" />
          <div className="h-6 w-48 bg-brand-navy/5 rounded mt-8" />
          <div className="h-4 w-full bg-brand-navy/5 rounded" />
          <div className="h-4 w-full bg-brand-navy/5 rounded" />
          <div className="h-4 w-2/3 bg-brand-navy/5 rounded" />
        </div>
      </div>
    </div>
  );
}
