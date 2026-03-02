import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/industries',
        destination: '/las-vegas-industries',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
