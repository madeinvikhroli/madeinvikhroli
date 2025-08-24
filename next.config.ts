import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  swcMinify: false,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  telemetry: false,
  experimental: {
    esmExternals: false,
    craCompat: true,
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.optimization.splitChunks = {
      chunks: "all",
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
        },
      },
    };

    if (!dev) {
      config.optimization.minimize = true;
      config.optimization.usedExports = true;
      config.optimization.sideEffects = false;
    }

    return config;
  },
  productionBrowserSourceMaps: false,
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
        hostname: "ubkaudleykedlauhjmha.supabase.co",
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
