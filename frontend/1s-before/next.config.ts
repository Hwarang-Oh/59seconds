import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'k11a404.p.ssafy.io',
      },
    ],
  },
};

export default nextConfig;
