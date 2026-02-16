/* =============================================================
 * ServiceCard Component
 *
 * Displays a single service offering with icon, title,
 * description, and a link to the full service page.
 * Used on the homepage and the services page.
 *
 * Props:
 *   title            — Service name
 *   slug             — URL path segment (e.g., "premarital-counseling")
 *   shortDescription — Brief summary of the service
 *   icon             — Icon identifier (maps to inline SVG)
 * ============================================================= */

import Link from "next/link";

interface ServiceCardProps {
  title: string;
  slug: string;
  shortDescription: string;
  icon: string;
}

/* --- Icon Map ---
 * Simple inline SVGs for each service.
 * Replace with react-icons or custom SVGs as the design evolves.
 */
function ServiceIcon({ icon }: { icon: string }) {
  const iconClass = "w-10 h-10 text-brand-gold";

  switch (icon) {
    case "heart":
      return (
        <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
        </svg>
      );
    case "rings":
      return (
        <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.745 3.745 0 011.043 3.296A3.745 3.745 0 0121 12z" />
        </svg>
      );
    case "users":
      return (
        <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
        </svg>
      );
    default:
      return null;
  }
}

export default function ServiceCard({
  title,
  slug,
  shortDescription,
  icon,
}: ServiceCardProps) {
  return (
    <Link
      href={`/${slug}`}
      className="card group block no-underline hover:border-brand-gold/20
                 border border-transparent transition-all duration-300"
    >
      {/* Icon with subtle scale animation on hover */}
      <div className="mb-5 transform group-hover:scale-110 transition-transform duration-300">
        <ServiceIcon icon={icon} />
      </div>

      {/* Service title */}
      <h3 className="text-xl font-heading font-semibold text-brand-navy mb-3
                     group-hover:text-brand-gold-dark transition-colors">
        {title}
      </h3>

      {/* Brief description */}
      <p className="text-brand-stone leading-relaxed mb-4">
        {shortDescription}
      </p>

      {/* "Learn more" indicator */}
      <span className="text-brand-gold-dark font-medium text-sm inline-flex items-center gap-1
                       group-hover:gap-2 transition-all">
        Learn more
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
        </svg>
      </span>
    </Link>
  );
}
