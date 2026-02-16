"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Unhandled error:", error);
  }, [error]);

  return (
    <section className="min-h-[70vh] flex items-center justify-center bg-brand-cream">
      <div className="text-center px-6">
        <p className="text-5xl mb-4">⚠</p>
        <h1 className="text-2xl md:text-3xl font-heading text-brand-navy mb-4">
          Something Went Wrong
        </h1>
        <p className="text-brand-stone max-w-md mx-auto mb-8 leading-relaxed">
          We hit an unexpected error. You can try again, or head back to the
          homepage.
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
