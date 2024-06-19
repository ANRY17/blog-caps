import withBundleAnalyzer from '@next/bundle-analyzer';

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'develop.jejakwisata.site',
        port: '',
        pathname: '/uploads/**',
      },
    ],
  },
};

export default nextConfig;
