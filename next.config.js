/** @type {import('next').NextConfig} */
const nextConfig = {
  /* --- Routing --- */
  // Preserve old Weebly URL paths for SEO continuity
  // These redirects ensure backlinks and bookmarks still work after migration
  async redirects() {
    return [
      // Redirect old Weebly .html paths to clean Next.js routes
      {
        source: "/premarital-counseling.html",
        destination: "/premarital-counseling",
        permanent: true, // 301 redirect for SEO
      },
      {
        source: "/premarital-counselingcoaching.html",
        destination: "/premarital-counseling",
        permanent: true,
      },
      {
        source: "/wedding-officiant.html",
        destination: "/wedding-officiant",
        permanent: true,
      },
      {
        source: "/relationship--marriage-coaching.html",
        destination: "/marriage-coaching",
        permanent: true,
      },
      {
        source: "/virtual-counseling--coaching.html",
        destination: "/marriage-coaching",
        permanent: true,
      },
      {
        source: "/testimonials.html",
        destination: "/testimonials",
        permanent: true,
      },
      {
        source: "/why-matt.html",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/about-matt.html",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/services--prices.html",
        destination: "/services",
        permanent: true,
      },
      {
        source: "/contactbook-me.html",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/thestrongerlifeinsightsblogspotcom.html",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/wedding-ideas.html",
        destination: "/blog",
        permanent: true,
      },

      // Old Weebly blog post URLs still receiving traffic
      {
        source: "/thestrongerlifeinsightsblogspotcom/silent-invaders-three-enemies-of-a-strong-marriage",
        destination: "/blog/silent-invaders-three-enemies-of-a-strong-marriage",
        permanent: true,
      },
      {
        source: "/3/post/2025/10/silent-invaders-three-enemies-of-a-strong-marriage.html",
        destination: "/blog/silent-invaders-three-enemies-of-a-strong-marriage",
        permanent: true,
      },

      // Common shorthand and alternate URL patterns
      {
        source: "/premarital",
        destination: "/premarital-counseling",
        permanent: true,
      },
      {
        source: "/counseling",
        destination: "/premarital-counseling",
        permanent: true,
      },
      {
        source: "/officiant",
        destination: "/wedding-officiant",
        permanent: true,
      },
      {
        source: "/coaching",
        destination: "/marriage-coaching",
        permanent: true,
      },
      {
        source: "/pricing",
        destination: "/services",
        permanent: true,
      },
      {
        source: "/prices",
        destination: "/services",
        permanent: true,
      },
    ];
  },

  /* --- Performance --- */
  // Enable image optimization for faster load times
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.thestrongerlife.org",
      },
      {
        // Sanity CDN for CMS-hosted images
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },

  /* --- SEO --- */
  // Trailing slashes off for clean canonical URLs
  trailingSlash: false,

  /* --- Security Headers --- */
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "origin-when-cross-origin" },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            // Permissions-Policy — disable every browser API this site doesn't use.
            // Only autoplay/fullscreen/encrypted-media/pip/clipboard-write are
            // kept for self + trusted embed origins (Spotify, YouTube).
            key: "Permissions-Policy",
            value: [
              // Kept for AudioPlayer + Spotify embeds
              'autoplay=(self "https://open.spotify.com")',
              'fullscreen=(self "https://open.spotify.com" "https://www.youtube.com" "https://www.youtube-nocookie.com" "https://player.vimeo.com")',
              'encrypted-media=(self "https://open.spotify.com")',
              'picture-in-picture=(self "https://www.youtube.com" "https://www.youtube-nocookie.com" "https://player.vimeo.com" "https://open.spotify.com")',
              'clipboard-write=(self "https://open.spotify.com")',
              // Everything else: disabled
              "geolocation=()",
              "microphone=()",
              "camera=()",
              "payment=()",
              "usb=()",
              "bluetooth=()",
              "serial=()",
              "hid=()",
              "midi=()",
              "magnetometer=()",
              "gyroscope=()",
              "accelerometer=()",
              "ambient-light-sensor=()",
              "screen-wake-lock=()",
              "xr-spatial-tracking=()",
              "gamepad=()",
              "idle-detection=()",
              "display-capture=()",
              "document-domain=()",
              "publickey-credentials-get=()",
              "browsing-topics=()",
              "local-fonts=()",
              "window-management=()",
              "identity-credentials-get=()",
              "speaker-selection=()",
              "compute-pressure=()",
            ].join(", "),
          },
          {
            // Content Security Policy — controls which resources the browser can load.
            // 'unsafe-inline' is required for Next.js/Tailwind inline styles.
            // 'unsafe-eval' only included in dev mode (not in production builds).
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              // unsafe-eval only in dev (Next.js HMR); production builds exclude it
              `script-src 'self' 'unsafe-inline'${process.env.NODE_ENV === "development" ? " 'unsafe-eval'" : ""} https://www.googletagmanager.com`,
              "style-src 'self' 'unsafe-inline'",
              // Restrict images to known domains instead of blanket https:
              "img-src 'self' https://cdn.sanity.io https://www.thestrongerlife.org https://www.google-analytics.com data:",
              "font-src 'self' data:",
              "connect-src 'self' https://cdn.sanity.io https://api.sanity.io https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com",
              "frame-src https://open.spotify.com https://www.youtube.com https://www.youtube-nocookie.com https://player.vimeo.com https://w.soundcloud.com",
              "media-src 'self' blob:",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              // Prevent this site from being framed (belt + suspenders with X-Frame-Options)
              "frame-ancestors 'none'",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
