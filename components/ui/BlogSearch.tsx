/* =============================================================
 * BlogSearch Component — The Stronger Life
 *
 * Client-side search and category filtering for blog posts.
 * Receives the full post list from the server component and
 * filters locally — no extra API calls needed.
 *
 * Features:
 *   - Debounced text search (title + excerpt)
 *   - Category filter pills
 *   - "No results" empty state
 * ============================================================= */

"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/lib/sanity/image";
import type { PostListItem } from "@/lib/sanity/types";

interface BlogSearchProps {
  posts: PostListItem[];
}

export default function BlogSearch({ posts }: BlogSearchProps) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = new Set<string>();
    posts.forEach((p) => {
      if (p.category?.title) cats.add(p.category.title);
    });
    return ["All", ...Array.from(cats).sort()];
  }, [posts]);

  // Filter posts by search query and category
  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return posts.filter((post) => {
      const matchesCategory =
        activeCategory === "All" || post.category?.title === activeCategory;
      const matchesQuery =
        !q ||
        post.title.toLowerCase().includes(q) ||
        (post.excerpt?.toLowerCase().includes(q) ?? false);
      return matchesCategory && matchesQuery;
    });
  }, [posts, query, activeCategory]);

  return (
    <div>
      {/* ========== SEARCH & FILTERS ========== */}
      <div className="mb-10">
        {/* Search input */}
        <div className="relative max-w-md mx-auto mb-6">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search articles..."
            className="w-full px-4 py-3 pl-11 rounded-lg border border-brand-navy/10
                       bg-white text-brand-charcoal placeholder:text-brand-stone-light
                       focus:outline-none focus:ring-2 focus:ring-brand-gold/30 focus:border-brand-gold
                       transition-all text-sm"
            aria-label="Search blog posts"
          />
          <svg
            className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-stone"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
        </div>

        {/* Category pills */}
        {categories.length > 1 && (
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
                  ${activeCategory === cat
                    ? "bg-brand-gold text-white shadow-md"
                    : "bg-brand-navy/5 text-brand-charcoal hover:bg-brand-navy/10"
                  }`}
                aria-pressed={activeCategory === cat}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Result count */}
      {(query || activeCategory !== "All") && (
        <p className="text-center text-sm text-brand-stone mb-6">
          {filtered.length} {filtered.length === 1 ? "article" : "articles"} found
        </p>
      )}

      {/* ========== POST LIST ========== */}
      {filtered.length > 0 ? (
        <div className="space-y-8">
          {filtered.map((post) => (
            <article
              key={post._id}
              className="card group hover:border-brand-gold/20 border border-transparent
                         transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row gap-6">
                {post.mainImage?.asset && (
                  <div className="md:w-48 md:flex-shrink-0">
                    <div className="aspect-[16/10] md:aspect-[4/3] rounded-lg overflow-hidden bg-brand-cream">
                      <Image
                        src={urlFor(post.mainImage)
                          .width(400)
                          .height(300)
                          .quality(80)
                          .auto("format")
                          .url()}
                        alt={post.mainImage.alt || post.title}
                        width={400}
                        height={300}
                        className="w-full h-full object-cover group-hover:scale-105
                                   transition-transform duration-500"
                      />
                    </div>
                  </div>
                )}

                <div className="flex-grow">
                  <div className="flex items-center gap-3 mb-3 flex-wrap">
                    {post.category && (
                      <>
                        <span className="text-xs font-medium text-brand-gold-dark uppercase tracking-wide">
                          {post.category.title}
                        </span>
                        <span className="text-brand-stone/40">&bull;</span>
                      </>
                    )}
                    <time
                      dateTime={post.publishedAt}
                      className="text-xs text-brand-stone"
                    >
                      {new Date(post.publishedAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                    {post.estimatedReadingTime && (
                      <>
                        <span className="text-brand-stone/40">&bull;</span>
                        <span className="text-xs text-brand-stone">
                          {post.estimatedReadingTime} min read
                        </span>
                      </>
                    )}
                  </div>

                  <h2 className="text-xl font-heading font-semibold text-brand-navy
                                 group-hover:text-brand-gold-dark transition-colors mb-3">
                    <Link href={`/blog/${post.slug}`} className="no-underline">
                      {post.title}
                    </Link>
                  </h2>

                  <p className="text-brand-stone leading-relaxed line-clamp-2">
                    {post.excerpt}
                  </p>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-brand-gold-dark font-medium text-sm mt-4 inline-flex
                               items-center gap-1 no-underline group-hover:gap-2 transition-all"
                  >
                    Read more &rarr;
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-brand-stone">
            No articles found{query ? ` for "${query}"` : ""}.
            {activeCategory !== "All" && " Try a different category."}
          </p>
        </div>
      )}
    </div>
  );
}
