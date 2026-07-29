import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath: "/ente-arquitectos",
  assetPrefix: "/ente-arquitectos",
};

export default nextConfig;
