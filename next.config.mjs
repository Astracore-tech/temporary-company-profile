/** @type {import('next').NextConfig} */

// The site was previously a static export (`output: "export"`). The inquiry
// form and founder inbox need server routes, so it now runs as a normal
// Next.js server app — Vercel (the current host) supports this directly.
//
// NOTE: the original template defined a `/venus-nextjs` basePath here. It was
// never applied to the config, and applying it would break every canonical URL
// for a deployment at the site root, so it has been removed.

/**
 * Slugs of the template's fictional case studies. /portfolio/ now shows real
 * work, so each old URL goes to the list. They are listed one by one: a
 * `/portfolio/:slug/` wildcard would also catch the real project pages,
 * because redirects run before the filesystem routes.
 */
const RETIRED_PORTFOLIO_SLUGS = [
  "apex-middleware", "apps-built-for-africa", "automation-redefined", "bots-that-work",
  "cozycasa", "fusion-dynamics", "innovatex-ventures", "mars-fintech", "nebula-holdings",
  "panda-logo", "rocket-squared", "systems-that-scale", "websites-that-convert",
];

/**
 * Retired public routes: template content (fictional case studies and Lorem
 * Ipsum posts). Each old URL lands on the closest real page.
 * See README.md › "Redirects".
 */
const RETIRED_ROUTES = [
  ...RETIRED_PORTFOLIO_SLUGS.map((slug) => ({
    source: `/portfolio/${slug}/`,
    destination: "/portfolio/",
  })),
  { source: "/blog/", destination: "/" },
  { source: "/blog/:slug/", destination: "/" },
  // The brief calls it "Our Work"; keep /portfolio/ as the canonical URL.
  { source: "/our-work/", destination: "/portfolio/" },
];

const nextConfig = {
  poweredByHeader: false,
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  // libsql ships a native binding; load it from node_modules at runtime.
  serverExternalPackages: ["@libsql/client"],
  async redirects() {
    return RETIRED_ROUTES.map((r) => ({ ...r, permanent: true }));
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains",
          },
        ],
      },
      {
        // Private area: never index, never cache, never leak the URL onward.
        source: "/inbox/:path*",
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
          { key: "Cache-Control", value: "no-store" },
          { key: "Referrer-Policy", value: "no-referrer" },
        ],
      },
    ];
  },
};

export default nextConfig;
