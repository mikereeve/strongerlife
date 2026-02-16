import Link from "next/link";

export default function NotFound() {
  return (
    <section className="min-h-[70vh] flex items-center justify-center bg-brand-cream">
      <div className="text-center px-6">
        <p className="text-6xl font-heading font-bold text-brand-gold-dark mb-4">
          404
        </p>
        <h1 className="text-2xl md:text-3xl font-heading text-brand-navy mb-4">
          Page Not Found
        </h1>
        <p className="text-brand-stone max-w-md mx-auto mb-8 leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or may have been
          moved. Let&apos;s get you back on track.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/" className="btn-primary no-underline">
            Go Home
          </Link>
          <Link href="/contact" className="btn-secondary no-underline">
            Contact Matt
          </Link>
        </div>
      </div>
    </section>
  );
}
