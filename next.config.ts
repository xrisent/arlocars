import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",

  outputFileTracingIncludes: {
    "/**": ["./node_modules/.prisma/client/*.wasm", "./node_modules/.prisma/client/*.mjs"],
  },

  experimental: {
    cpus: 2,
    webpackBuildWorker: false,
  },

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
