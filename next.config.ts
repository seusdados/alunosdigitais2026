import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    // Supabase Storage public buckets will serve images through this host.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
      },
    ],
  },
  experimental: {
    // Keeps server actions as the default way to mutate from the CMS admin.
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
};

export default nextConfig;
