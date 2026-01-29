import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      {
        source: '/carrier',
        destination: '/career',
        permanent: true,
      },
      {
        source: '/resume',
        destination: '/career',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
