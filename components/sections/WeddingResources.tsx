/* =============================================================
 * WeddingResources Section — The Stronger Life
 *
 * Renders two sub-sections on the wedding officiant page:
 *   1. Free Downloads — Wedding Day Emergency Kit PDFs
 *   2. Trusted Partners — Vendor cards
 *
 * All data sourced from lib/config.ts.
 * ============================================================= */

"use client";

import SectionHeading from "@/components/ui/SectionHeading";
import { weddingDownloads, trustedPartners } from "@/lib/config";

/* --- Inline SVG Icons --- */
const DownloadIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m.75 12 3 3m0 0 3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
  </svg>
);

const ExternalLinkIcon = () => (
  <svg className="w-4 h-4 inline-block ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
  </svg>
);

export default function WeddingResources() {
  return (
    <section className="section-block bg-brand-cream bg-texture">
      <div className="section-wrapper">
        <SectionHeading
          title="Wedding Resources"
          subtitle="Free tools and trusted partners to help make your big day unforgettable."
          tag="h2"
        />

        {/* ========== FREE DOWNLOADS ========== */}
        <div className="mt-12">
          <h3 className="text-xl font-heading font-semibold text-brand-navy mb-6 flex items-center gap-2">
            <DownloadIcon />
            Wedding Day Emergency Kit
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {weddingDownloads.map((download) => (
              <a
                key={download.file}
                href={download.file}
                download
                className="card flex flex-col items-center text-center group no-underline
                           hover:border-brand-gold border border-transparent transition-all"
              >
                <div className="w-12 h-12 rounded-full bg-brand-gold/10 flex items-center
                                justify-center mb-3 text-brand-gold group-hover:bg-brand-gold
                                group-hover:text-white transition-all">
                  <DownloadIcon />
                </div>
                <h4 className="font-semibold text-brand-navy text-sm mb-1">
                  {download.title}
                </h4>
                <p className="text-brand-stone text-xs leading-relaxed">
                  {download.description}
                </p>
                <span className="text-brand-gold-dark text-xs font-medium mt-3">
                  Download PDF
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* ========== TRUSTED PARTNERS ========== */}
        <div className="mt-16">
          <h3 className="text-xl font-heading font-semibold text-brand-navy mb-2">
            Trusted Partners
          </h3>
          <p className="text-brand-stone text-sm mb-6">
            Vendors I personally recommend for your wedding day.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {trustedPartners.map((partner) => (
              <a
                key={partner.url}
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                className="card group no-underline hover:border-brand-gold
                           border border-transparent transition-all relative"
              >
                {/* Partner badge */}
                <span className="absolute -top-2 right-4 bg-brand-sage text-white
                                 text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Partner
                </span>
                <h4 className="font-semibold text-brand-navy text-base mb-1 group-hover:text-brand-gold-dark transition-colors">
                  {partner.name}
                  <ExternalLinkIcon />
                </h4>
                <p className="text-xs text-brand-gold-dark font-medium uppercase tracking-wide mb-2">
                  {partner.category}
                </p>
                <p className="text-brand-stone text-sm leading-relaxed">
                  {partner.description}
                </p>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
