/* =============================================================
 * Footer Component — The Stronger Life
 *
 * Clean, organized footer with:
 * - Contact information and email link
 * - Condensed site navigation
 * - Social media links with branded icons
 * - Copyright notice
 * ============================================================= */

import Link from "next/link";
import Image from "next/image";
import { siteConfig, navigation } from "@/lib/config";

const socialLinks = [
  {
    href: siteConfig.social.facebook,
    label: "Facebook",
    src: "/icons/facebook.svg",
    width: 28,
    height: 28,
  },
  {
    href: siteConfig.social.instagram,
    label: "Instagram",
    src: "/icons/Instagram.svg",
    width: 28,
    height: 28,
  },
  {
    href: siteConfig.social.linkedin,
    label: "LinkedIn",
    src: "/icons/linkedin.png",
    width: 28,
    height: 28,
  },
  {
    href: siteConfig.social.whatsapp,
    label: "WhatsApp",
    src: "/icons/WhatsApp.svg",
    width: 28,
    height: 28,
  },
  {
    href: siteConfig.social.threads,
    label: "Threads",
    src: "/icons/threads.svg",
    width: 28,
    height: 28,
  },
];

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
            <div className="flex flex-wrap items-end gap-1 -ml-3">
              {socialLinks.map(({ href, label, src, width, height }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 opacity-80 hover:opacity-100 transition-opacity"
                >
                  <Image
                    src={src}
                    alt={label}
                    width={width}
                    height={height}
                    className="object-contain"
                  />
                </a>
              ))}
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
