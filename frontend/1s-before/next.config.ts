import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'k11a404.p.ssafy.io',
      },
    ],
  },
};

export default nextConfig;
