/* =============================================================
 * Footer Component — The Stronger Life
 *
 * Clean, organized footer with:
 * - Contact information and email link
 * - Condensed site navigation
 * - Social media links (ready for URLs to be added)
 * - Copyright notice
 * ============================================================= */

import Link from "next/link";
import { siteConfig, navigation } from "@/lib/config";

/* Inline SVG icons — eliminates react-icons dependency (~20MB) for 4 icons */
const FacebookIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 320 512" aria-hidden="true">
    <path d="M80 299.3V512h116V299.3h86.5l18-97.8H196V146.9c0-51.7 20.3-71.5 72.7-71.5 16.1 0 29.8.3 36.6.6V0h-52.1C176.5 0 140 52.1 140 148v53.5H80z" />
  </svg>
);

const InstagramIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 448 512" aria-hidden="true">
    <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9S160.5 370.9 224.1 370.9 339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1S3.8 128 2.1 163.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
  </svg>
);

const XTwitterIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 512 512" aria-hidden="true">
    <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8l164.9-188.5L26.8 48h145l100.5 132.9zm-24.8 373.8h39.1L151.1 88h-42z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 448 512" aria-hidden="true">
    <path d="M100.3 448H7.4V148.9h92.9zM53.8 108.1C24.1 108.1 0 83.5 0 53.8S24.1 0 53.8 0s53.8 24.1 53.8 53.8-24.1 54.3-53.8 54.3zM447.9 448h-92.7V302.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7V448h-92.8V148.9h89.1v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3V448z" />
  </svg>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-navy text-white/80" role="contentinfo">
      <div className="section-wrapper py-16">
        {/* --- Three-Column Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Column 1: Brand & Description */}
          <div>
            <h3 className="font-heading text-2xl text-white mb-4">
              {siteConfig.name}
            </h3>
            <p className="text-white/80 leading-relaxed mb-6">
              {siteConfig.tagline}. Helping couples grow stronger together
              through premarital counseling, marriage coaching, and
              personalized wedding ceremonies.
            </p>

            {/* Social Media Icons — padding provides 44px touch targets */}
            <div className="flex gap-1 -ml-3">
              {siteConfig.social.facebook && (
                <a href={siteConfig.social.facebook} aria-label="Facebook"
                   target="_blank" rel="noopener noreferrer"
                   className="p-3 text-white/80 hover:text-brand-gold transition-colors">
                  <FacebookIcon />
                </a>
              )}
              {siteConfig.social.instagram && (
                <a href={siteConfig.social.instagram} aria-label="Instagram"
                   target="_blank" rel="noopener noreferrer"
                   className="p-3 text-white/80 hover:text-brand-gold transition-colors">
                  <InstagramIcon />
                </a>
              )}
              {siteConfig.social.twitter && (
                <a href={siteConfig.social.twitter} aria-label="X (Twitter)"
                   target="_blank" rel="noopener noreferrer"
                   className="p-3 text-white/80 hover:text-brand-gold transition-colors">
                  <XTwitterIcon />
                </a>
              )}
              {siteConfig.social.linkedin && (
                <a href={siteConfig.social.linkedin} aria-label="LinkedIn"
                   target="_blank" rel="noopener noreferrer"
                   className="p-3 text-white/80 hover:text-brand-gold transition-colors">
                  <LinkedInIcon />
                </a>
              )}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-heading text-lg text-white mb-4">
              Quick Links
            </h4>
            <nav aria-label="Footer navigation">
              <ul className="space-y-2">
                {navigation.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-white/80 hover:text-brand-gold
                                 transition-colors no-underline text-sm"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
                {/* Extra link for contact since it's not in main nav array */}
                <li>
                  <Link
                    href="/contact"
                    className="text-white/80 hover:text-brand-gold
                               transition-colors no-underline text-sm"
                  >
                    Contact / Book Me
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h4 className="font-heading text-lg text-white mb-4">
              Get in Touch
            </h4>
            <div className="space-y-3 text-sm">
              <p>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="text-brand-gold-light hover:text-brand-gold
                             transition-colors no-underline"
                >
                  {siteConfig.contact.email}
                </a>
              </p>
              {siteConfig.contact.phone && (
                <p>
                  <a href={`tel:${siteConfig.contact.phone}`}
                     className="text-white/80 hover:text-brand-gold transition-colors no-underline">
                    {siteConfig.contact.phone}
                  </a>
                </p>
              )}
              <p className="text-white/80">
                Serving {siteConfig.contact.location} &amp; Central Minnesota
              </p>
              <p className="text-white/80">
                Virtual sessions available nationwide
              </p>
            </div>
          </div>
        </div>

        {/* --- Bottom Bar --- */}
        <div className="mt-12 pt-8 border-t border-white/10
                        flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/60 text-sm">
            &copy; {currentYear} {siteConfig.name}. All rights reserved.
          </p>
          <p className="text-white/60 text-sm">
            Christian Premarital Counseling &amp; Marriage Coaching
          </p>
        </div>
      </div>
    </footer>
  );
}
