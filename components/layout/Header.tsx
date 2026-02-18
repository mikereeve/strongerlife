/* =============================================================
 * Header Component — The Stronger Life
 *
 * Responsive navigation with:
 * - Sticky positioning with backdrop blur on scroll
 * - Mobile hamburger menu with slide-in drawer
 * - Highlighted CTA button for the contact/booking page
 * - Accessible keyboard navigation and ARIA labels
 * ============================================================= */

"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigation } from "@/lib/config";

export default function Header() {
  // Track mobile menu open/close state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Track scroll position for sticky header styling
  const [isScrolled, setIsScrolled] = useState(false);

  // Get current path for active link highlighting
  const pathname = usePathname();

  // Ref for the mobile menu drawer (focus trap)
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const menuToggleRef = useRef<HTMLButtonElement>(null);

  /* --- Scroll Listener ---
   * Adds a subtle background/shadow to the header
   * once the user scrolls past 50px.
   */
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* --- Close mobile menu on route change --- */
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  /* --- Lock body scroll when mobile menu is open --- */
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileMenuOpen]);

  /* --- Focus trap & Escape key for mobile menu ---
   * Keeps keyboard focus within the menu drawer when open.
   * Escape key closes the menu and returns focus to the toggle button.
   */
  const handleMenuKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isMobileMenuOpen) return;

      if (e.key === "Escape") {
        setIsMobileMenuOpen(false);
        menuToggleRef.current?.focus();
        return;
      }

      if (e.key !== "Tab") return;

      const menu = mobileMenuRef.current;
      if (!menu) return;

      const focusable = menu.querySelectorAll<HTMLElement>(
        'a[href], button, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    },
    [isMobileMenuOpen]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleMenuKeyDown);
    return () => document.removeEventListener("keydown", handleMenuKeyDown);
  }, [handleMenuKeyDown]);

  /* --- Auto-focus first menu item when opened --- */
  useEffect(() => {
    if (isMobileMenuOpen && mobileMenuRef.current) {
      const firstLink = mobileMenuRef.current.querySelector<HTMLElement>("a[href]");
      firstLink?.focus();
    }
  }, [isMobileMenuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${isMobileMenuOpen
          ? "bg-white shadow-md py-3"
          : isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-md py-3"
            : "bg-transparent py-5"
        }`}
      role="banner"
    >
      <div className="section-wrapper flex items-center justify-between">
        {/* --- Logo / Site Name --- */}
        <Link
          href="/"
          className="flex items-center gap-3 no-underline group"
          aria-label="The Stronger Life — Home"
        >
          {/* TODO: Add /public/images/logo.png and replace text with <Image> */}
          <span className={`font-heading text-xl md:text-2xl font-bold transition-colors
                           ${isScrolled || isMobileMenuOpen ? "text-brand-navy group-hover:text-brand-gold-dark" : "text-white group-hover:text-brand-gold"}`}>
            The Stronger Life
          </span>
        </Link>

        {/* --- Desktop Navigation --- */}
        <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors no-underline
                ${pathname === item.href
                  ? isScrolled
                    ? "text-brand-gold-dark bg-brand-gold-dark/10"
                    : "text-brand-gold bg-white/10"
                  : isScrolled
                    ? "text-brand-charcoal hover:text-brand-gold-dark hover:bg-brand-gold-dark/5"
                    : "text-white/80 hover:text-brand-gold hover:bg-white/10"
                }`}
              // Mark active page for screen readers
              aria-current={pathname === item.href ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}

          {/* CTA Button — visually distinct from nav links */}
          <Link href="/contact" className="btn-primary ml-4 text-sm no-underline">
            Book a Free Consultation
          </Link>
        </nav>

        {/* --- Mobile Menu Toggle --- */}
        <button
          ref={menuToggleRef}
          className="lg:hidden flex items-center gap-2.5 p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {/* Animated hamburger icon → X transformation */}
          <div className="flex flex-col gap-1.5">
            <span
              className={`block w-6 h-0.5 transition-all duration-300
                ${isScrolled || isMobileMenuOpen ? "bg-brand-navy" : "bg-white"}
                ${isMobileMenuOpen ? "rotate-45 translate-y-2" : ""}`}
            />
            <span
              className={`block w-6 h-0.5 transition-all duration-300
                ${isScrolled || isMobileMenuOpen ? "bg-brand-navy" : "bg-white"}
                ${isMobileMenuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block w-6 h-0.5 transition-all duration-300
                ${isScrolled || isMobileMenuOpen ? "bg-brand-navy" : "bg-white"}
                ${isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}
            />
          </div>
          <span className={`text-sm font-medium transition-colors
            ${isScrolled || isMobileMenuOpen ? "text-brand-navy" : "text-white"}`}>
            {isMobileMenuOpen ? "Close" : "Menu"}
          </span>
        </button>
      </div>

      {/* --- Mobile Menu Drawer --- */}
      <div
        ref={mobileMenuRef}
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={`lg:hidden fixed inset-0 top-[60px] bg-white z-40
          transform transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}
        aria-hidden={!isMobileMenuOpen}
      >
        <nav className="flex flex-col p-6 gap-2" aria-label="Mobile navigation">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`px-4 py-3 rounded-lg text-lg font-medium no-underline transition-colors
                ${pathname === item.href
                  ? "text-brand-gold-dark bg-brand-gold-dark/10"
                  : "text-brand-charcoal hover:bg-brand-cream"
                }`}
              aria-current={pathname === item.href ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}

          {/* Mobile CTA */}
          <Link
            href="/contact"
            className="btn-primary text-center mt-4 no-underline"
          >
            Book a Free Consultation
          </Link>
        </nav>
      </div>
    </header>
  );
}
