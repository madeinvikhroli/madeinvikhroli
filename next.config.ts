import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/artifacts",
        permanent: false,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "j32rk6nxjmjwddyw.public.blob.vercel-storage.com",
        pathname: "*/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        pathname: "*/**",
      },
      {
        protocol: "http",
        hostname: "152.58.0.133",
        pathname: "*/**",
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
