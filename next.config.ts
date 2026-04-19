import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    // Otimização automática para formatos modernos. next/image serve
    // AVIF para navegadores que suportam, WebP como fallback, e o
    // original (JPG/PNG) como último recurso.
    formats: ["image/avif", "image/webp"],
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
