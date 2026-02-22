/* =============================================================
 * Pricing, FAQs & Wedding Resources — The Stronger Life
 *
 * All service pricing, FAQ content, wedding downloads,
 * playlists, and trusted partner data.
 * ============================================================= */

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
