import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        hostname: '**',
        protocol: 'https',
      },
    ],
  },
  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/app/dashboard',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
