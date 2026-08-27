/** @type {import('next').NextConfig} */

// NOTE: the original template defined a `/venus-nextjs` basePath here. It was
// never applied to the config, and applying it would break every canonical URL
// for a deployment at the site root, so it has been removed.
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
