/* =============================================================
 * Portable Text Renderer — The Stronger Life
 *
 * Renders Sanity's Portable Text (rich text) blocks into
 * styled React components. This is where you control how
 * each content element from the CMS appears on the frontend.
 *
 * Customization Points:
 *   - block: Headings, paragraphs, blockquotes
 *   - marks: Bold, italic, links
 *   - types: Images, callout boxes, custom blocks
 *
 * Docs: https://github.com/portabletext/react-portabletext
 * ============================================================= */

import { PortableText, type PortableTextReactComponents } from "next-sanity";
import type { PortableTextBlock } from "next-sanity";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/lib/sanity/image";

/* --- Component Map ---
 * Maps Sanity content types to React components.
 * Each function receives the block/mark data from Sanity
 * and returns styled JSX.
 */
const components: Partial<PortableTextReactComponents> = {
  /* --- Block-Level Elements --- */
  block: {
    // Headings with proper hierarchy and anchor IDs for linking
    h2: ({ children, value }) => (
      <h2
        id={slugify(extractText(value))}
        className="text-3xl font-heading font-bold text-brand-navy mt-12 mb-4"
      >
        {children}
      </h2>
    ),

    h3: ({ children, value }) => (
      <h3
        id={slugify(extractText(value))}
        className="text-2xl font-heading font-semibold text-brand-navy mt-10 mb-3"
      >
        {children}
      </h3>
    ),

    h4: ({ children, value }) => (
      <h4 className="text-xl font-heading font-semibold text-brand-navy mt-8 mb-3">
        {children}
      </h4>
    ),

    // Standard paragraph
    normal: ({ children }) => (
      <p className="text-brand-charcoal leading-relaxed mb-6">{children}</p>
    ),

    // Styled blockquote with left border accent
    blockquote: ({ children }) => (
      <blockquote
        className="border-l-4 border-brand-gold pl-4 md:pl-6 py-2 my-8
                   italic text-brand-stone text-lg leading-relaxed"
      >
        {children}
      </blockquote>
    ),
  },

  /* --- List Elements --- */
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-outside ml-4 md:ml-6 mb-6 space-y-2 text-brand-charcoal">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-outside ml-4 md:ml-6 mb-6 space-y-2 text-brand-charcoal">
        {children}
      </ol>
    ),
  },

  listItem: {
    bullet: ({ children }) => (
      <li className="leading-relaxed">{children}</li>
    ),
    number: ({ children }) => (
      <li className="leading-relaxed">{children}</li>
    ),
  },

  /* --- Inline Marks --- */
  marks: {
    // Bold text
    strong: ({ children }) => (
      <strong className="font-semibold text-brand-navy">{children}</strong>
    ),

    // Italic text
    em: ({ children }) => <em>{children}</em>,

    // Inline code
    code: ({ children }) => (
      <code className="bg-brand-cream px-1.5 py-0.5 rounded text-sm font-mono break-words">
        {children}
      </code>
    ),

    // External links — open in new tab with security attributes
    link: ({ children, value }) => {
      const href = value?.href || "#";
      const isExternal = href.startsWith("http");
      return (
        <a
          href={href}
          className="text-brand-gold-dark underline underline-offset-2
                     hover:text-brand-navy transition-colors"
          {...(isExternal && {
            target: "_blank",
            rel: "noopener noreferrer",
          })}
        >
          {children}
        </a>
      );
    },

    // Internal links — use Next.js Link for client-side navigation
    internalLink: ({ children, value }) => (
      <Link
        href={value?.href || "/"}
        className="text-brand-gold-dark underline underline-offset-2
                   hover:text-brand-navy transition-colors"
      >
        {children}
      </Link>
    ),
  },

  /* --- Custom Block Types --- */
  types: {
    // Inline images with optional caption
    image: ({ value }) => {
      if (!value?.asset) return null;

      return (
        <figure className="my-10">
          <div className="rounded-xl overflow-hidden shadow-md">
            <Image
              src={urlFor(value).width(800).quality(85).auto("format").url()}
              alt={value.alt || "Blog post image"}
              width={800}
              height={500}
              className="w-full h-auto"
              sizes="(max-width: 800px) 100vw, 800px"
            />
          </div>
          {value.caption && (
            <figcaption className="text-center text-sm text-brand-stone mt-3 italic">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },

    // Callout box for tips, notes, and important info
    callout: ({ value }) => {
      // Style variants per callout type
      const styles = {
        tip: {
          bg: "bg-brand-sage-light/30",
          border: "border-brand-sage",
          icon: "💡",
          label: "Tip",
        },
        note: {
          bg: "bg-brand-gold-light/20",
          border: "border-brand-gold",
          icon: "📝",
          label: "Note",
        },
        important: {
          bg: "bg-red-50",
          border: "border-red-300",
          icon: "⚠️",
          label: "Important",
        },
      };

      const style = styles[value.type as keyof typeof styles] || styles.note;

      return (
        <div
          className={`${style.bg} border-l-4 ${style.border}
                      rounded-r-lg p-5 my-8`}
          role="note"
        >
          <p className="font-semibold text-brand-navy text-sm mb-1">
            {style.icon} {style.label}
          </p>
          <p className="text-brand-charcoal leading-relaxed text-sm">
            {value.text}
          </p>
        </div>
      );
    },
  },
};

/* --- Helper: Extract plain text from a Portable Text block --- */
function extractText(block: any): string {
  if (!block?.children) return "";
  return block.children.map((child: any) => child.text || "").join("");
}

/* --- Helper: Generate slug from text for heading anchor IDs --- */
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

/* --- Exported Renderer Component ---
 * Usage:
 *   import PortableTextRenderer from "@/components/ui/PortableTextRenderer";
 *   <PortableTextRenderer content={post.body} />
 */
interface PortableTextRendererProps {
  content: PortableTextBlock[];
}

export default function PortableTextRenderer({
  content,
}: PortableTextRendererProps) {
  if (!content) return null;

  return (
    <div className="portable-text max-w-none">
      <PortableText value={content} components={components} />
    </div>
  );
}
