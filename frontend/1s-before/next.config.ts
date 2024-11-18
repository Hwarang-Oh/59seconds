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
  // TODO : NextJS는 기본적으로 Error Message를 배포 환경에서는 숨겨주긴 한다.
  productionBrowserSourceMaps: false,
};

export default nextConfig;
