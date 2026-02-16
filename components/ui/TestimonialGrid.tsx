/* =============================================================
 * TestimonialGrid Component — The Stronger Life
 *
 * Interactive testimonial display with:
 * - Service category filter pills
 * - CSS-column masonry layout for natural card sizing
 * - Smooth fade transitions when filtering
 * - Testimonial count indicator
 * ============================================================= */

"use client";

import { useState, useMemo } from "react";
import TestimonialCard from "./TestimonialCard";

interface Testimonial {
  quote: string;
  author: string;
  service?: string;
}

interface TestimonialGridProps {
  testimonials: Testimonial[];
}

/* Service filter categories — each maps to a keyword check
 * against the testimonial's `service` field. Compound services
 * like "Premarital Counseling & Wedding Officiant" appear in
 * both matching categories.
 */
const FILTER_CATEGORIES = [
  { label: "All", keyword: null },
  { label: "Premarital Counseling", keyword: "Premarital" },
  { label: "Wedding Officiant", keyword: "Officiant" },
  { label: "Marriage Coaching", keyword: "Coaching" },
] as const;

export default function TestimonialGrid({ testimonials }: TestimonialGridProps) {
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const filtered = useMemo(() => {
    if (activeFilter === "All") return testimonials;

    const category = FILTER_CATEGORIES.find((c) => c.label === activeFilter);
    if (!category?.keyword) return testimonials;

    return testimonials.filter((t) =>
      t.service?.toLowerCase().includes(category.keyword!.toLowerCase())
    );
  }, [activeFilter, testimonials]);

  return (
    <div>
      {/* ========== FILTER PILLS ========== */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {FILTER_CATEGORIES.map((category) => {
          const isActive = activeFilter === category.label;
          return (
            <button
              key={category.label}
              onClick={() => setActiveFilter(category.label)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200
                ${isActive
                  ? "bg-brand-gold text-white shadow-md"
                  : "bg-brand-navy/5 text-brand-charcoal hover:bg-brand-navy/10"
                }`}
              aria-pressed={isActive}
            >
              {category.label}
            </button>
          );
        })}
      </div>

      {/* Testimonial count */}
      <p className="text-center text-sm text-brand-stone mb-8">
        Showing {filtered.length} of {testimonials.length} testimonials
      </p>

      {/* ========== MASONRY GRID ========== */}
      <div className="masonry-grid">
        {filtered.map((testimonial, index) => (
          <div
            key={`${testimonial.author}-${index}`}
            className="masonry-item animate-fade-in"
            style={{ animationDelay: `${Math.min(index * 0.05, 0.5)}s` }}
          >
            <TestimonialCard {...testimonial} />
          </div>
        ))}
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="text-center py-12">
          <p className="text-brand-stone">
            No testimonials found for this category.
          </p>
        </div>
      )}
    </div>
  );
}
