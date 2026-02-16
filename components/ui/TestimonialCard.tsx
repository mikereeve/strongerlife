/* =============================================================
 * TestimonialCard Component
 *
 * Displays a single testimonial with quotation marks,
 * the quote text, author name, and associated service.
 *
 * Props:
 *   quote   — The testimonial text
 *   author  — Name(s) of the person(s) giving the testimonial
 *   service — Which service they used (optional)
 *   image   — Optional avatar image path (circular thumbnail)
 * ============================================================= */

import Image from "next/image";

interface TestimonialCardProps {
  quote: string;
  author: string;
  service?: string;
  image?: string;
}

export default function TestimonialCard({
  quote,
  author,
  service,
  image,
}: TestimonialCardProps) {
  return (
    <blockquote className="card relative">
      {/* Decorative opening quotation mark */}
      <span
        className="absolute -top-4 -left-2 text-7xl font-heading text-brand-gold/20
                   leading-none select-none pointer-events-none"
        aria-hidden="true"
      >
        &ldquo;
      </span>

      {/* Testimonial text */}
      <p className="text-brand-charcoal leading-relaxed mb-6 relative z-10 italic line-clamp-3">
        &ldquo;{quote}&rdquo;
      </p>

      {/* Attribution */}
      <footer className="flex items-center gap-3">
        {image ? (
          <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-brand-gold/20">
            <Image
              src={image}
              alt={author}
              width={40}
              height={40}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          /* Gold accent line (fallback when no image) */
          <span
            className="w-8 h-0.5 bg-brand-gold rounded-full"
            aria-hidden="true"
          />
        )}
        <div>
          <cite className="not-italic font-semibold text-brand-navy text-sm">
            {author}
          </cite>
          {service && (
            <p className="text-brand-stone text-xs mt-0.5">{service}</p>
          )}
        </div>
      </footer>
    </blockquote>
  );
}
