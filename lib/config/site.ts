/* =============================================================
 * Site Configuration — The Stronger Life
 *
 * Core identity, contact info, social links, SEO defaults,
 * navigation, services, and featured media/music tracks.
 * ============================================================= */

export const siteConfig = {
  /* --- Core Identity --- */
  name: "The Stronger Life",
  tagline: "Strengthening Marriages Before They Begin",
  description:
    "Christian premarital counseling, marriage coaching, and wedding officiant services helping couples grow stronger together — personally and relationally.",
  url: "https://thestrongerlife.org",
  locale: "en_US",

  /* --- Contact Information --- */
  contact: {
    email: "thestrongerlife@gmail.com",
    phone: "(952) 393-8826",
    location: "St. Cloud, Minnesota",
  },

  /* --- Social Media Profiles --- */
  social: {
    facebook: "https://www.facebook.com/share/1Cbxd2gBEf/?mibextid=wwXIfr",
    instagram: "https://www.instagram.com/mattreeve.tsl?igsh=MWJ3cDExOGpld2JmaQ%3D%3D&utm_source=qr",
    linkedin: "https://www.linkedin.com/in/mattreeve02?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
    whatsapp: "https://whatsapp.com/channel/0029VbCUPwh9hXF9ZLBfoJ2F",
    threads: "https://www.threads.com/@mattreeve.tsl/post/DUmsZxBAArv?xmt=AQF0VEhO7lyK8nr8lXPwCHV4K8dKiFxD4TFyQzlzfwD2vQ",
  },

  /* --- SEO Defaults ---
   * These are used as fallbacks when individual pages
   * don't specify their own metadata.
   */
  seo: {
    titleTemplate: "%s | The Stronger Life",
    defaultTitle: "Christian Premarital Counseling & Wedding Officiant in St. Cloud, MN | The Stronger Life",
    openGraph: {
      type: "website",
      siteName: "The Stronger Life",
      images: [
        {
          url: "/images/og-default.jpg", // 1200x630px recommended
          width: 1200,
          height: 630,
          alt: "The Stronger Life — Christian Premarital Counseling & Wedding Officiant in St. Cloud, MN",
        },
      ],
    },
  },
} as const;

/* --- Featured Media ---
 * Song or video to showcase on the homepage.
 * Supports any URL that react-player handles:
 *   - Direct audio: "/audio/somebody-knew.mp3"
 *   - YouTube:      "https://www.youtube.com/watch?v=..."
 *   - SoundCloud:   "https://soundcloud.com/..."
 *   - Vimeo:        "https://vimeo.com/..."
 *
 * To add the audio file, place it in /public/audio/
 * and reference it as "/audio/filename.mp3".
 */
export const featuredMedia = {
  url: "/audio/SomebodyKnew.mp3",
  title: "Somebody Knew",
  subtitle: "Lyrics by Matt Reeve",
  description:
    "A personal song about the journey of love and the One who knew your story before it began.",
} as const;

/* --- Music Tracks ---
 * Full track list for the jukebox-style MusicPlayer on the homepage.
 * Add new tracks here — they appear automatically in the player.
 * Only "Somebody Knew" carries a subtitle; all others show title only.
 */
export const musicTracks = [
  {
    title: "Somebody Knew",
    subtitle: "Lyrics by Matt Reeve",
    url: "/audio/SomebodyKnew.mp3",
  },
  {
    title: "Always You",
    subtitle: undefined,
    url: "/audio/AlwaysYou.mp3",
  },
  {
    title: "Holy Hallelujah",
    subtitle: undefined,
    url: "/audio/HolyHallelujah.mp3",
  },
  {
    title: "Kiss You Back",
    subtitle: undefined,
    url: "/audio/KissYouBack.mp3",
  },
  {
    title: "Last First Dance",
    subtitle: undefined,
    url: "/audio/LastFirstDance.mp3",
  },
  {
    title: "Only You Always",
    subtitle: undefined,
    url: "/audio/OnlyYouAlways.mp3",
  },
  {
    title: "Our Forever",
    subtitle: undefined,
    url: "/audio/OurForever.mp3",
  },
  {
    title: "Starts Tonight",
    subtitle: undefined,
    url: "/audio/StartsTonight.mp3",
  },
  {
    title: "Your Hand",
    subtitle: undefined,
    url: "/audio/YourHand.mp3",
  },
  {
    title: "Two Made One",
    subtitle: undefined,
    url: "/audio/TwoMadeOne.mp3",
  },
  {
    title: "Covenant",
    subtitle: undefined,
    url: "/audio/Covenant.mp3",
  },
  {
    title: "Breath",
    subtitle: undefined,
    url: "/audio/Breath.mp3",
  },
] as const;

/* --- Primary Navigation ---
 * Consolidated from the original 12 items down to 6.
 * "Home" removed (logo links to /) and "Services & Pricing"
 * removed (each service page already shows its own pricing).
 */
export const navigation = [
  { label: "Premarital Counseling", href: "/premarital-counseling" },
  { label: "Wedding Officiant", href: "/wedding-officiant" },
  { label: "Marriage Coaching", href: "/marriage-coaching" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "About Matt", href: "/about" },
  { label: "Blog", href: "/blog" },
] as const;

/* --- Service Offerings ---
 * Used by the homepage service cards and the services page.
 * Centralized here so content stays consistent across pages.
 */
export const services = [
  {
    title: "Premarital Counseling",
    slug: "premarital-counseling",
    shortDescription:
      "Comprehensive sessions to build a strong foundation before you say 'I Do.'",
    icon: "premarital-counseling", // Maps to an icon component
  },
  {
    title: "Wedding Officiant",
    slug: "wedding-officiant",
    shortDescription:
      "Personalized, passionate ceremonies that reflect your unique love story.",
    icon: "wedding-officiant",
  },
  {
    title: "Marriage Coaching",
    slug: "marriage-coaching",
    shortDescription:
      "Ongoing support to help your relationship thrive — in person or virtually.",
    icon: "marriage-coaching",
  },
] as const;
