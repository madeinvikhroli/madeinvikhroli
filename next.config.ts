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
        hostname: "madeinvikhroli.s3.ap-south-1.amazonaws.com",
        pathname: "*/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        pathname: "*/**",
      },
      {
        protocol: "http",
        hostname: "152.58.45.75",
        pathname: "*/**",
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
