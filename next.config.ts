import type { NextConfig } from "next";

// Empty when the site is served from a custom domain; set to "/portfolio-site"
// to publish under the github.io project URL instead.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath,
  assetPrefix: basePath,
  images: {
    unoptimized: true
  }
};

export default nextConfig;
