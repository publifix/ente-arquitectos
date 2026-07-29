/** @type {import('next').NextConfig} */
const basePath = "/ente-arquitectos";

const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath,
  assetPrefix: basePath,
  // Mirrors `basePath` into the client bundle so app code can prefix raw
  // asset URLs (SVG <image>, iframe src, etc.) that next/image/next/link
  // don't touch automatically.
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
