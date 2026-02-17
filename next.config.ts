import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: "gen.pollinations.ai",
        pathname: '/**',
        port: "",
        protocol: "https"
      }
    ]
  }
};

export default nextConfig;
