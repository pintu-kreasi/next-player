import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  pageExtensions: ['ts', 'tsx'],
  sassOptions: {
    silenceDeprecations: ['legacy-js-api'],
  }
  /*
  async rewrites() {
    return [
      {
        source: "/dashboard",
        destination: "/"
      },
      {
        source: "/login",
        destination: "/"
      }
    ];
  }
    */
};

export default nextConfig;
