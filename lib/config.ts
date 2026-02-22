/* =============================================================
 * Site Configuration — The Stronger Life
 *
 * Central config for site metadata, navigation, contact info,
 * and structured data defaults. Update these values once and
 * they propagate across the entire site.
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

/* --- Pricing ---
 * Sourced from the live site's Services & Prices page.
 * Centralized here so services page and individual service
 * pages stay consistent.
 */
export const pricing = {
  premaritalCounseling: {
    standalone: "$600",
    withOfficiant: "$400",
    assessmentFee: "$35",
    sessions: "5–6 sessions",
    sessionLength: "1.5–2 hours each",
    includes: [
      "Customized Prepare/Enrich relationship assessment",
      "5–6 personalized counseling sessions",
      "Flexible scheduling (weekly, biweekly, or monthly)",
      "In-person or virtual via Google Meet",
      "Communication & conflict resolution tools",
      "Take-home resources",
      "1 free post-marital session (within 1 year of wedding)",
      "Eligibility for discounted MN marriage license",
    ],
  },
  weddingOfficiant: {
    packages: [
      {
        name: "Custom Ceremony",
        label: "Most Popular",
        price: "Starting at $750",
        includes: [
          "Face-to-face planning session (in-person or virtual)",
          "Fully customized ceremony script",
          "Unlimited revisions and edits",
          "Ongoing phone, text & email communication",
          "Full rehearsal coordination",
          "Early arrival & vendor coordination on wedding day",
          "Professional officiation of the ceremony",
          "Legal registration & timely certificate filing",
        ],
      },
      {
        name: "Personalized Ceremony",
        label: "",
        price: "Starting at $600",
        includes: [
          "Phone consultation",
          "Professionally written ceremony with minor customization",
          "Experienced officiant",
          "Legal registration & certificate filing",
        ],
      },
      {
        name: "Simple & Intimate",
        label: "",
        price: "Starting at $500",
        includes: [
          "15-minute ceremony to legalize your union",
          "Professional officiant",
          "Legal registration & certificate filing",
        ],
      },
    ],
    extras: [
      "Vow renewals",
      "House blessings",
      "Commitment ceremonies",
      "Memorial services",
    ],
    notes:
      "Additional fees may apply for travel beyond 30 miles and weddings on major holidays (Valentine's Day, Memorial Day, Independence Day, Thanksgiving, New Year's Eve).",
  },
  marriageCoaching: {
    sessionLength: "1–2 hours",
    frequency: "Weekly or biweekly",
    format: "In-person (St. Cloud area) or virtual nationwide",
    packages: [
      {
        name: "Single Session",
        label: "",
        price: "$150",
        description: "Individual coaching session for couples or individuals",
        includes: [
          "1–2 hour session",
          "In-person or virtual",
          "Personalized guidance",
          "Between-session support",
        ],
      },
      {
        name: "4-Session Package",
        label: "Best Value",
        price: "$525",
        description: "Save $75 with a 4-session commitment",
        includes: [
          "4 sessions (1–2 hours each)",
          "In-person or virtual",
          "Personalized coaching plan",
          "Communication & conflict strategies",
          "Between-session support",
          "Flexible scheduling",
        ],
      },
      {
        name: "Marriage Coaching Program",
        label: "",
        price: "$600",
        description: "Comprehensive program with relationship assessment",
        includes: [
          "Relationship assessment",
          "4–6 personalized sessions",
          "In-person or virtual",
          "Identify goals & growth areas",
          "Communication & conflict tools",
          "Between-session support",
        ],
      },
    ],
    formats: [
      "In-person couples coaching",
      "Individual coaching",
      "Phone or virtual sessions",
      "Family relationship coaching",
    ],
    notes:
      "Cancellation required within 24 hours to avoid charges. Unused package sessions can be applied to future dates.",
  },
} as const;

/* --- JSON-LD Structured Data ---
 * Generates schema.org markup for the site.
 * This helps Google understand the business and can
 * trigger rich results in search.
 */
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

/* --- Wedding Resources ---
 * Free downloads, curated playlists, and trusted partners
 * displayed on the wedding officiant page.
 */
export const weddingDownloads = [
  { title: "Bride Edition", description: "Everything the bride needs for a stress-free wedding day.", file: "/downloads/wedding-kit-bride.pdf" },
  { title: "Groom Edition", description: "A groom's guide to being prepared and present on the big day.", file: "/downloads/wedding-kit-groom.pdf" },
  { title: "Wedding Planner Edition", description: "The ultimate checklist for coordinators and planners.", file: "/downloads/wedding-kit-planner.pdf" },
] as const;

export const weddingPlaylists = [
  { title: "Wedding Ceremony & Celebration", url: "https://open.spotify.com/playlist/2WD9TA3XjM6aIrkUxYrE0j" },
  { title: "Extended Wedding Celebration", url: "https://open.spotify.com/playlist/05oR08WwvpLtHmsKGBTuyF" },
  { title: "Wedding 80's Mix", url: "https://open.spotify.com/playlist/1LfZZ0dOhkhWa91YXKevHN" },
  { title: "Tommee Profitt & Fleurie", url: "https://open.spotify.com/album/3e2GfHTpoxEbCUdCj5TRzl" },
] as const;

export const trustedPartners = [
  {
    name: "Northern Oaks Events",
    description: "Beautiful wedding venue surrounded by oak trees, located north of Minneapolis in Sauk Rapids, Minnesota.",
    url: "https://www.northernoaksevents.com",
    category: "Venue",
  },
  {
    name: "Bridesmaid Gifts Boutique",
    description: "Specializes in helping you find the perfect bridesmaid gifts for your bridal party.",
    url: "https://www.bridesmaidgiftsboutique.com",
    category: "Gifts",
  },
  {
    name: "The Groom's Shop",
    description: "Hundreds of products and thousands of designs for custom groomsmen gifts.",
    url: "https://www.groomsshop.com",
    category: "Gifts",
  },
] as const;

/* --- JSON-LD Structured Data ---
 * Generates schema.org markup for the site.
 * This helps Google understand the business and can
 * trigger rich results in search.
 */
export function generateLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": siteConfig.url,
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    email: siteConfig.contact.email,
    ...(siteConfig.contact.phone ? { telephone: siteConfig.contact.phone } : {}),
    address: {
      "@type": "PostalAddress",
      addressLocality: "St. Cloud",
      addressRegion: "MN",
      postalCode: "56301",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 45.5579,
      longitude: -94.1632,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "17:00",
    },
    priceRange: "$$",
    image: `${siteConfig.url}/images/og-default.jpg`,
    serviceType: [
      "Premarital Counseling",
      "Marriage Coaching",
      "Wedding Officiant",
    ],
    areaServed: [
      { "@type": "City", name: "St. Cloud", containedInPlace: { "@type": "State", name: "Minnesota" } },
      { "@type": "City", name: "Sartell" },
      { "@type": "City", name: "Sauk Rapids" },
      { "@type": "City", name: "Waite Park" },
      { "@type": "City", name: "Monticello" },
      { "@type": "City", name: "Elk River" },
      { "@type": "City", name: "Clearwater" },
      { "@type": "AdministrativeArea", name: "Stearns County, Minnesota" },
      { "@type": "AdministrativeArea", name: "Benton County, Minnesota" },
      { "@type": "AdministrativeArea", name: "Wright County, Minnesota" },
      { "@type": "AdministrativeArea", name: "Central Minnesota" },
      { "@type": "State", name: "Minnesota" },
      { "@type": "Country", name: "United States" },
    ],
    sameAs: Object.values(siteConfig.social).filter(Boolean),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      reviewCount: allTestimonials.length,
      bestRating: "5",
      worstRating: "1",
    },
  };
}

export function generatePersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Matt Reeve",
    jobTitle: "Premarital Counselor, Marriage Coach & Wedding Officiant",
    description:
      "Licensed premarital counselor, certified relationship coach, and ordained minister with 32+ years of experience helping couples grow stronger together.",
    url: `${siteConfig.url}/about`,
    sameAs: Object.values(siteConfig.social).filter(Boolean),
    knowsAbout: [
      "Premarital Counseling",
      "Marriage Coaching",
      "Wedding Ceremonies",
      "Prepare/Enrich Assessment",
    ],
    worksFor: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };
}

export function generateServiceSchema(
  serviceName: string,
  serviceDescription: string,
  serviceUrl: string,
  offers?: { price: string; description: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: serviceName,
    description: serviceDescription,
    url: serviceUrl,
    provider: {
      "@type": "Person",
      name: "Matt Reeve",
      url: `${siteConfig.url}/about`,
    },
    areaServed: [
      {
        "@type": "Place",
        name: "St. Cloud, Minnesota",
      },
      {
        "@type": "Place",
        name: "Central Minnesota",
      },
    ],
    ...(offers && offers.length > 0
      ? {
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: serviceName,
            itemListElement: offers.map((offer) => ({
              "@type": "Offer",
              price: offer.price,
              priceCurrency: "USD",
              description: offer.description,
              availability: "https://schema.org/InStock",
            })),
          },
        }
      : {}),
  };
}

/* --- FAQ Schema ---
 * Generates FAQPage structured data for service pages.
 * Eligible for rich results with expandable Q&A in SERPs.
 */
export function generateFAQSchema(
  faqs: { question: string; answer: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/* --- Breadcrumb Schema ---
 * Generates BreadcrumbList structured data.
 * Shows navigation breadcrumbs in Google search results.
 */
export function generateBreadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/* --- WebSite Schema ---
 * Generates WebSite structured data with SearchAction.
 * Can trigger a sitelinks search box in Google results.
 */
export function generateWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteConfig.url}/blog?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/* --- Review Schema ---
 * Generates individual Review structured data for testimonials.
 * Can trigger star ratings in search results.
 */
export function generateReviewSchema(
  testimonials: readonly { quote: string; author: string; service: string }[]
) {
  return testimonials.map((t) => ({
    "@type": "Review",
    author: {
      "@type": "Person",
      name: t.author,
    },
    reviewRating: {
      "@type": "Rating",
      ratingValue: "5",
      bestRating: "5",
      worstRating: "1",
    },
    reviewBody: t.quote,
    itemReviewed: {
      "@type": "LocalBusiness",
      name: siteConfig.name,
    },
  }));
}

/* --- FAQ Data for Service Pages ---
 * Centralized FAQ content used both for visible FAQ sections
 * and FAQPage structured data on service pages.
 */
export const serviceFAQs = {
  premaritalCounseling: [
    {
      question: "How many premarital counseling sessions will we need?",
      answer: "Our premarital counseling program typically consists of 5–6 sessions, each lasting 1.5–2 hours. The exact number depends on your unique needs and goals as a couple. Sessions can be scheduled weekly, biweekly, or monthly to fit your calendar.",
    },
    {
      question: "What is the Prepare/Enrich assessment?",
      answer: "Prepare/Enrich is one of the most widely researched and validated relationship assessment tools available. It evaluates 12 key areas of your relationship — including communication, conflict resolution, financial management, and family dynamics — giving us deep insight into your strengths and growth areas. Research shows couples who complete Prepare/Enrich-based counseling lower their divorce risk by 31%.",
    },
    {
      question: "Can we do premarital counseling online?",
      answer: "Yes! Virtual premarital counseling sessions are available via Google Meet for couples anywhere in the country. All you need is a stable internet connection and a device with a camera and microphone. Virtual sessions are just as effective as in-person meetings.",
    },
    {
      question: "How much does premarital counseling cost?",
      answer: "Premarital counseling is $600 for the full program (5–6 sessions). If Matt also officiates your wedding, counseling is discounted to $400. There is also a one-time $35 fee for the Prepare/Enrich relationship assessment. Your first consultation is always free.",
    },
    {
      question: "Do we get a discount on our Minnesota marriage license?",
      answer: "Yes! Minnesota law provides a discount on the marriage license fee for couples who complete at least 12 hours of premarital counseling. Our program meets and exceeds this requirement, making you eligible for the reduced fee.",
    },
  ],
  weddingOfficiant: [
    {
      question: "What areas do you serve as a wedding officiant?",
      answer: "Matt serves as a wedding officiant throughout St. Cloud, Central Minnesota, and the Twin Cities metro area. Travel beyond 30 miles from St. Cloud may incur an additional travel fee. Whether you're planning an outdoor ceremony, a church wedding, or a courthouse service, Matt can be there.",
    },
    {
      question: "Can we write our own wedding vows?",
      answer: "Absolutely! Matt encourages couples to incorporate their own personal vows. With the Custom Ceremony package, you'll work together to craft a fully personalized ceremony script — including your vows, readings, and any traditions that are meaningful to you. Matt provides guidance and unlimited revisions.",
    },
    {
      question: "What's included in each wedding officiant package?",
      answer: "The Custom Ceremony ($750) includes a face-to-face planning session, fully customized script, unlimited revisions, rehearsal coordination, early arrival and vendor coordination on the wedding day, professional officiation, and legal certificate filing. The Personalized Ceremony ($600) includes a phone consultation, professionally written ceremony, and legal filing. The Simple & Intimate ($500) is a 15-minute ceremony to legalize your union with legal filing included.",
    },
    {
      question: "Do you perform non-religious ceremonies?",
      answer: "Yes. While Matt's foundation is in the Christian faith, he serves couples from a variety of backgrounds. Each ceremony is crafted to reflect your values and story, while remaining true to The Stronger Life's commitment to biblical marriage and grace-filled guidance.",
    },
  ],
  marriageCoaching: [
    {
      question: "What's the difference between marriage coaching and marriage counseling?",
      answer: "Marriage coaching is forward-focused and goal-oriented — it helps couples build skills, improve communication, and strengthen their relationship proactively. Unlike clinical counseling or therapy, coaching doesn't diagnose or treat mental health conditions. It's for any couple who wants to invest in their relationship, not just those in crisis.",
    },
    {
      question: "How long are marriage coaching sessions?",
      answer: "Each coaching session is 1–2 hours long, typically scheduled weekly or biweekly. The length and frequency are flexible based on your needs and schedule. You can choose between in-person sessions in the St. Cloud, Minnesota area or virtual sessions from anywhere in the country.",
    },
    {
      question: "Do you offer virtual marriage coaching?",
      answer: "Yes! Virtual coaching sessions are available nationwide via video call. Many couples find virtual sessions equally effective — the connection and the work happen regardless of physical distance. All you need is a smartphone or computer with a camera and a reliable internet connection.",
    },
    {
      question: "How much does marriage coaching cost?",
      answer: "A single coaching session is $150. The 4-Session Package is $525 (saving $75). The comprehensive Marriage Coaching Program, which includes a relationship assessment and 4–6 personalized sessions, is $600. Your first consultation is always free with no obligation.",
    },
  ],
} as const;
