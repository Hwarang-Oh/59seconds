import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'k11a404.p.ssafy.io',
      },
      {
        protocol: 'https',
        hostname: 'inflearn-nextjs.vercel.app',
      },
    ],
  },
};

export default nextConfig;
