import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you're looking for doesn't exist or may have been moved.",
  robots: { index: false, follow: true },
};

const popularPages = [
  { href: "/premarital-counseling", label: "Premarital Counseling" },
  { href: "/wedding-officiant", label: "Wedding Officiant" },
  { href: "/marriage-coaching", label: "Marriage Coaching" },
  { href: "/blog", label: "Blog" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/services", label: "Services & Pricing" },
];

export default function NotFound() {
  return (
    <section className="min-h-[70vh] flex items-center justify-center bg-brand-cream">
      <div className="text-center px-6 py-16">
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
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <Link href="/" className="btn-primary no-underline">
            Go Home
          </Link>
          <Link href="/contact" className="btn-secondary no-underline">
            Contact Matt
          </Link>
        </div>

        <div className="max-w-md mx-auto">
          <p className="text-sm font-medium text-brand-navy mb-4">
            Popular pages you might be looking for:
          </p>
          <ul className="space-y-2">
            {popularPages.map((page) => (
              <li key={page.href}>
                <Link
                  href={page.href}
                  className="text-brand-gold-dark hover:text-brand-navy transition-colors text-sm no-underline"
                >
                  {page.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
