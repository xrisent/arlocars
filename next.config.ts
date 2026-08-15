import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "linen-moose-272653.hostingersite.com",
      },
      {
        protocol: "https",
        hostname: "arlocars.ae",
      },
    ],
  },
};

export default nextConfig;
