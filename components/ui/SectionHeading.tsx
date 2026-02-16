/* =============================================================
 * SectionHeading Component
 *
 * Consistent heading block used at the top of each page section.
 * Includes a decorative gold divider and optional subtitle.
 * 
 * Props:
 *   title     — Main heading text (required)
 *   subtitle  — Supporting description text (optional)
 *   centered  — Center-align the heading block (default: true)
 *   tag       — HTML heading tag to render: h1-h6 (default: "h2")
 * ============================================================= */

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

export default function SectionHeading({
  title,
  subtitle,
  centered = true,
  tag: Tag = "h2",
}: SectionHeadingProps) {
  return (
    <div className={`mb-12 ${centered ? "text-center" : ""}`}>
      <Tag>{title}</Tag>
      {/* Decorative divider — brand gold accent */}
      <div
        className={`w-16 h-1 bg-brand-gold rounded-full mt-4 mb-6
          ${centered ? "mx-auto" : ""}`}
      />
      {subtitle && (
        <p className={`text-lg text-brand-stone max-w-2xl leading-relaxed
                      ${centered ? "mx-auto" : ""}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
