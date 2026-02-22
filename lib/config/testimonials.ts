/* =============================================================
 * Testimonials & Gallery — The Stronger Life
 *
 * All client testimonials and couple gallery photos.
 * ============================================================= */

/* --- All Testimonials ---
 * Complete collection from real clients. The first three are
 * used as featured testimonials on the homepage and service pages.
 */
export const allTestimonials = [
  // --- Featured testimonials (first 3) — one per service ---
  {
    quote:
      "Matt was personable. He took time to know us and gave us skills to flourish in a God-centered relationship.",
    author: "I & M Anderson",
    service: "Premarital Counseling",
  },
  {
    quote:
      "He was a calming presence that brought organization to our day and handled unexpected changes beautifully.",
    author: "T & K Voigt",
    service: "Wedding Officiant",
  },
  {
    quote:
      "He gives great advice and tools that help couples work through tough times and grow together as a team.",
    author: "T & K Abe",
    service: "Marriage Coaching",
  },
  // --- Remaining testimonials ---
  {
    quote:
      "He helped my wife and I foster meaningful and Christ-centered conversations that will guide us through marriage.",
    author: "C & P Christiansen",
    service: "Premarital Counseling",
  },
  {
    quote:
      "He created a space where we felt safe and respected, and where faith flourishes all around.",
    author: "C & S Curtis",
    service: "Premarital Counseling",
  },
  {
    quote:
      "He led us in valuable conversations. We have a stronger foundation starting our marriage because of him.",
    author: "B & M Kunkle",
    service: "Premarital Counseling",
  },
  {
    quote:
      "Matt made sure to hear both sides and give guidance to help structure our future together.",
    author: "A & B Engstrom",
    service: "Premarital Counseling & Wedding Officiant",
  },
  {
    quote:
      "Matt offered great insight and spiritual wisdom while helping us learn more about each other and grow.",
    author: "I & G Mahler",
    service: "Premarital Counseling",
  },
  {
    quote:
      "The program was very thorough and brought up thoughtful discussions that led to positive changes.",
    author: "A & J Donlin",
    service: "Premarital Counseling & Wedding Officiant",
  },
  {
    quote:
      "He took time to know us as a couple, making the ceremony a reflection of our love and unique journey.",
    author: "J & K Bedell",
    service: "Premarital Counseling & Wedding Officiant",
  },
  {
    quote:
      "Matt did an amazing job bringing our faith values of marriage into the service.",
    author: "J & J Sickles",
    service: "Wedding Officiant",
  },
  {
    quote:
      "Each session was in-depth and intentional. He equipped us with great tools to sustain a successful marriage.",
    author: "M & J Stoutenburg",
    service: "Premarital Counseling",
  },
  {
    quote:
      "He brings strong marriage experience and good humor while touching on every area of marriage.",
    author: "J & K Bunce",
    service: "Premarital Counseling",
  },
  {
    quote:
      "He dove into topics like faith, family, money, and kids, provoking us to think critically about expectations.",
    author: "J & T Fiedler",
    service: "Premarital Counseling",
  },
  {
    quote:
      "Learning about ourselves as individuals will help us down the road in our marriage.",
    author: "R & J Mendel",
    service: "Premarital Counseling & Wedding Officiant",
  },
  {
    quote:
      "Matt added personal touches, humor, and love to his message. The whole crowd was laughing!",
    author: "R & J Junes",
    service: "Premarital Counseling & Wedding Officiant",
  },
  {
    quote:
      "He made the process stress-free and enjoyable. The ceremony was beautiful and God-centered.",
    author: "K & E Lammers",
    service: "Premarital Counseling, Wedding Officiant & Baptism",
  },
  {
    quote:
      "His attention to detail and advocacy for our vision as a couple made everything run smoothly.",
    author: "L & J Marshall",
    service: "Premarital Counseling & Wedding Officiant",
  },
  {
    quote:
      "We started our marriage stronger than we thought possible with confidence and tools to maintain it.",
    author: "B & N Mallow",
    service: "Premarital Counseling & Wedding Officiant",
  },
  {
    quote:
      "He helped us identify parts needing work that we hadn't considered, even after six years together.",
    author: "B & M Scheff",
    service: "Premarital Counseling & Wedding Officiant",
  },
  {
    quote:
      "Matt was our voice of reason in storms. He saw what we didn't: that we were worth it.",
    author: "G & S Hendrickson",
    service: "Premarital Counseling & Wedding Officiant",
  },
  {
    quote:
      "The curriculum digs deep and helped us learn things about each other we wouldn't uncover for years.",
    author: "B & K Cheeley",
    service: "Premarital Counseling",
  },
  {
    quote:
      "He was sensitive to each partner and helped us compromise and consider each other.",
    author: "S & Z Haugen",
    service: "Premarital Counseling & Wedding Officiant",
  },
  {
    quote:
      "Matt provides the deepest level of care and is one of few we'd trust for marriage help.",
    author: "Travis & Dawn Rosinger",
    service: "Marriage Coaching",
  },
  {
    quote:
      "He helped us strengthen our relationship through communication and prayer despite religious differences.",
    author: "J & T Launer",
    service: "Premarital Counseling & Wedding Officiant",
  },
  {
    quote:
      "He isn't afraid to ask tough questions but doesn't make it awkward. He truly cares about success.",
    author: "J & G Molitor",
    service: "Premarital Counseling & Wedding Officiant",
  },
  {
    quote:
      "He gave us tools and resources to build communication and encouraged us to pray together.",
    author: "A & C Nordmark",
    service: "Premarital Counseling",
  },
] as const;

/* --- Featured Testimonials ---
 * Curated subset (first 3 from allTestimonials) used on the
 * homepage and service pages — one per service category.
 */
export const featuredTestimonials = allTestimonials.slice(0, 3);

/* --- Couple Gallery Photos ---
 * Displayed on the testimonials page in a masonry gallery.
 * Images are placed in /public/images/couples/ at 1200px wide.
 * Next.js generates optimized AVIF/WebP variants automatically.
 * Width/height are the actual source dimensions — used by
 * Next.js to calculate aspect ratio and prevent layout shift.
 */
export const galleryPhotos = [
  { src: "/images/couples/couple-1.jpg", alt: "Matt and Amanda — wedding ceremony couple", label: "Matt & Amanda", width: 1200, height: 1801 },
  { src: "/images/couples/couple-2.jpg", alt: "Brody and Meghan — wedding day celebration", label: "Brody & Meghan", width: 1200, height: 900 },
  { src: "/images/couples/couple-3.jpg", alt: "Brody and Meghan — ceremony moment", label: "Brody & Meghan", width: 1200, height: 800 },
  { src: "/images/couples/couple-4.jpg", alt: "Bronson and Alisha — wedding couple portrait", label: "Bronson & Alisha", width: 1200, height: 1600 },
  { src: "/images/couples/couple-5.jpg", alt: "Wedding celebration group photo", label: "Celebrating Together", width: 1200, height: 800 },
  { src: "/images/couples/couple-6.jpg", alt: "Wedding party group photo", label: "The Wedding Party", width: 1200, height: 795 },
  { src: "/images/couples/couple-7.jpg", alt: "Friends and family wedding gathering", label: "Friends & Family", width: 1200, height: 800 },
  { src: "/images/couples/couple-8.jpg", alt: "Wedding couple portrait", label: "A Beautiful Day", width: 800, height: 1200 },
  { src: "/images/couples/couple-9.jpg", alt: "Wedding couple celebration", label: "Celebrating Love", width: 1200, height: 1233 },
  { src: "/images/couples/couple-10.jpg", alt: "Wedding couple moment", label: "A Perfect Moment", width: 1200, height: 1196 },
  { src: "/images/couples/couple-11.jpg", alt: "Wedding couple portrait", label: "Together Forever", width: 1200, height: 1259 },
  { src: "/images/couples/couple-12.jpg", alt: "Wedding couple photo", label: "Stronger Together", width: 1200, height: 1200 },
  { src: "/images/couples/couple-13.jpg", alt: "Wedding couple portrait", label: "A Joyful Union", width: 1200, height: 1196 },
] as const;
