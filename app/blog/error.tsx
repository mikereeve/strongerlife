"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function BlogError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Blog error:", error);
  }, [error]);

  return (
    <section className="min-h-[70vh] flex items-center justify-center bg-white">
      <div className="text-center px-6">
        <p className="text-5xl mb-4">⚠</p>
        <h1 className="text-2xl md:text-3xl font-heading text-brand-navy mb-4">
          Unable to Load Blog
        </h1>
        <p className="text-brand-stone max-w-md mx-auto mb-8 leading-relaxed">
          We couldn&apos;t load the blog content right now. This is usually
          temporary — please try again in a moment.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <button onClick={reset} className="btn-primary">
            Try Again
          </button>
          <Link href="/" className="btn-secondary no-underline">
            Go Home
          </Link>
        </div>
      </div>
    </section>
  );
}
