/* =============================================================
 * ContactForm Component
 *
 * Client-side contact form with:
 * - Input validation and error states
 * - Service type selection (maps to offerings)
 * - Submission via Netlify Forms
 * - Success/error state handling
 * - Accessible labels and error messages
 * - Honeypot spam protection
 *
 * Netlify Forms Integration:
 *   Netlify detects the hidden static form in app/layout.tsx
 *   and processes submissions automatically. Configure email
 *   notifications to thestrongerlife@gmail.com in Netlify
 *   Dashboard → Site settings → Forms → Notifications.
 * ============================================================= */

"use client";

import { useState, useRef, FormEvent } from "react";
import { siteConfig } from "@/lib/config";

// Available services for the dropdown — matches site offerings
const SERVICE_OPTIONS = [
  "Premarital Counseling",
  "Wedding Officiant",
  "Marriage Coaching",
  "Virtual Counseling",
  "Other / Not Sure",
] as const;

// Field length constraints
const MAX_NAME = 100;
const MAX_EMAIL = 254;
const MAX_PHONE = 20;
const MAX_MESSAGE = 5000;

// Minimum seconds between submissions (client-side rate limit)
const SUBMIT_COOLDOWN_MS = 10_000;

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePhone(phone: string): boolean {
  if (!phone) return true; // optional field
  return /^[\d\-+() .]+$/.test(phone) && phone.replace(/\D/g, "").length >= 7;
}

interface FieldErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

/** Encode form data as URL-encoded string for Netlify Forms */
function encode(data: Record<string, string>) {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
}

export default function ContactForm() {
  // Form field state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  // Validation errors per field
  const [errors, setErrors] = useState<FieldErrors>({});

  // Submission state
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  // Rate limiting — track last submission time
  const lastSubmitRef = useRef<number>(0);

  // Honeypot field — bots fill this in, real users don't see it
  const [honeypot, setHoneypot] = useState("");

  /* --- Handle Input Changes --- */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear field error on change
    if (errors[name as keyof FieldErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  /* --- Validate all fields before submission --- */
  function validate(): FieldErrors {
    const errs: FieldErrors = {};

    const trimmedName = formData.name.trim();
    if (!trimmedName) {
      errs.name = "Name is required.";
    } else if (trimmedName.length > MAX_NAME) {
      errs.name = `Name must be under ${MAX_NAME} characters.`;
    }

    const trimmedEmail = formData.email.trim();
    if (!trimmedEmail) {
      errs.email = "Email is required.";
    } else if (trimmedEmail.length > MAX_EMAIL) {
      errs.email = "Email address is too long.";
    } else if (!validateEmail(trimmedEmail)) {
      errs.email = "Please enter a valid email address.";
    }

    if (formData.phone && !validatePhone(formData.phone)) {
      errs.phone = "Please enter a valid phone number.";
    } else if (formData.phone.length > MAX_PHONE) {
      errs.phone = "Phone number is too long.";
    }

    const trimmedMessage = formData.message.trim();
    if (!trimmedMessage) {
      errs.message = "Message is required.";
    } else if (trimmedMessage.length > MAX_MESSAGE) {
      errs.message = `Message must be under ${MAX_MESSAGE.toLocaleString()} characters.`;
    }

    return errs;
  }

  /* --- Handle Form Submission --- */
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Honeypot check — if filled, it's a bot
    if (honeypot) return;

    // Client-side rate limiting
    const now = Date.now();
    if (now - lastSubmitRef.current < SUBMIT_COOLDOWN_MS) {
      setStatus("error");
      return;
    }

    // Validate
    const fieldErrors = validate();
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }

    setStatus("submitting");
    lastSubmitRef.current = now;

    try {
      const response = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({
          "form-name": "contact",
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          service: formData.service,
          message: formData.message.trim(),
        }),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", phone: "", service: "", message: "" });
        setErrors({});
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Contact form submission failed:", error);
      setStatus("error");
    }
  };

  // Shared input field styles
  const inputStyles = `w-full px-4 py-3 rounded-lg border border-brand-stone/20
    bg-white text-brand-charcoal placeholder:text-brand-stone/50
    focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold
    transition-all duration-200`;

  const inputErrorStyles = `${inputStyles} border-red-400 focus:ring-red-300 focus:border-red-400`;

  // Shared label styles
  const labelStyles = "block text-sm font-medium text-brand-navy mb-1.5";

  /* --- Success State --- */
  if (status === "success") {
    return (
      <div className="card text-center py-12">
        <div className="text-5xl mb-4">✓</div>
        <h3 className="text-2xl font-heading text-brand-navy mb-2">
          Message Sent!
        </h3>
        <p className="text-brand-stone">
          Thanks for reaching out. Matt will get back to you within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {/* Honeypot field — hidden from real users, traps bots */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="bot-field">Do not fill this out</label>
        <input
          type="text"
          id="bot-field"
          name="bot-field"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/* --- Name Field --- */}
      <div>
        <label htmlFor="name" className={labelStyles}>
          Your Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          maxLength={MAX_NAME}
          value={formData.name}
          onChange={handleChange}
          placeholder="First and last name"
          className={errors.name ? inputErrorStyles : inputStyles}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "name-error" : undefined}
        />
        {errors.name && (
          <p id="name-error" className="text-red-600 text-xs mt-1" role="alert">
            {errors.name}
          </p>
        )}
      </div>

      {/* --- Email & Phone (Side by Side on Desktop) --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label htmlFor="email" className={labelStyles}>
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            maxLength={MAX_EMAIL}
            value={formData.email}
            onChange={handleChange}
            placeholder="your@email.com"
            className={errors.email ? inputErrorStyles : inputStyles}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email && (
            <p id="email-error" className="text-red-600 text-xs mt-1" role="alert">
              {errors.email}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="phone" className={labelStyles}>
            Phone <span className="text-brand-stone/50">(optional)</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            maxLength={MAX_PHONE}
            value={formData.phone}
            onChange={handleChange}
            placeholder="(555) 123-4567"
            className={errors.phone ? inputErrorStyles : inputStyles}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "phone-error" : undefined}
          />
          {errors.phone && (
            <p id="phone-error" className="text-red-600 text-xs mt-1" role="alert">
              {errors.phone}
            </p>
          )}
        </div>
      </div>

      {/* --- Service Selection --- */}
      <div>
        <label htmlFor="service" className={labelStyles}>
          I&apos;m Interested In
        </label>
        <select
          id="service"
          name="service"
          value={formData.service}
          onChange={handleChange}
          className={inputStyles}
        >
          <option value="">Select a service...</option>
          {SERVICE_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      {/* --- Message Field --- */}
      <div>
        <label htmlFor="message" className={labelStyles}>
          Tell Me About You <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          maxLength={MAX_MESSAGE}
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell Matt a bit about you and your partner, your timeline, and any questions you have"
          className={`${errors.message ? inputErrorStyles : inputStyles} resize-vertical`}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
        {errors.message && (
          <p id="message-error" className="text-red-600 text-xs mt-1" role="alert">
            {errors.message}
          </p>
        )}
      </div>

      {/* --- Error State --- */}
      {status === "error" && (
        <div className="bg-red-50 text-red-700 px-4 py-3 rounded-lg text-sm" role="alert">
          Something went wrong. Please try again or email Matt directly at{" "}
          <a href={`mailto:${siteConfig.contact.email}`} className="underline">
            {siteConfig.contact.email}
          </a>
        </div>
      )}

      {/* --- Submit Button --- */}
      <button
        type="submit"
        disabled={status === "submitting"}
        className="btn-primary w-full text-center disabled:opacity-50
                   disabled:cursor-not-allowed disabled:transform-none"
      >
        {status === "submitting" ? "Sending..." : "Send Message"}
      </button>

      <p className="text-xs text-brand-stone/60 text-center">
        Your information is kept private and never shared with third parties.
      </p>
    </form>
  );
}
