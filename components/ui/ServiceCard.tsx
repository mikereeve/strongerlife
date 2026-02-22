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
 *   icon             — Icon identifier (maps to icon component)
 * ============================================================= */

import Link from "next/link";
import PremaritalCounselingIcon from "@/components/icons/PremaritalCounselingIcon";
import WeddingOfficiantIcon from "@/components/icons/WeddingOfficiantIcon";
import MarriageCoachingIcon from "@/components/icons/MarriageCoachingIcon";

interface ServiceCardProps {
  title: string;
  slug: string;
  shortDescription: string;
  icon: string;
}

/* --- Icon Map ---
 * Maps icon identifiers to extracted SVG components.
 */
function ServiceIcon({ icon }: { icon: string }) {
  const iconClass = "w-10 h-10 text-brand-gold";

  switch (icon) {
    case "premarital-counseling":
      return <PremaritalCounselingIcon className={iconClass} />;
    case "wedding-officiant":
      return <WeddingOfficiantIcon className={iconClass} />;
    case "marriage-coaching":
      return <MarriageCoachingIcon className={iconClass} />;
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
