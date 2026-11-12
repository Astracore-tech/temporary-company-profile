/** @type {import('next').NextConfig} */

// The site was previously a static export (`output: "export"`). The inquiry
// form and founder inbox need server routes, so it now runs as a normal
// Next.js server app — Vercel (the current host) supports this directly.
//
// NOTE: the original template defined a `/venus-nextjs` basePath here. It was
// never applied to the config, and applying it would break every canonical URL
// for a deployment at the site root, so it has been removed.

/**
 * Retired public routes. These pages held template content (fictional client
 * case studies and Lorem Ipsum posts) that could not stay live for a company
 * with no client work to show yet. Each old URL lands on the closest real page.
 * See README.md › "Redirects".
 */
const RETIRED_ROUTES = [
  { source: "/portfolio/", destination: "/services/" },
  { source: "/portfolio/:slug/", destination: "/services/" },
  { source: "/blog/", destination: "/" },
  { source: "/blog/:slug/", destination: "/" },
];

const nextConfig = {
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
