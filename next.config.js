/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.service-market.com.ua',
        pathname: '/storage/**',
      },
      {
        protocol: 'https',
        hostname: 'service-market.com.ua',
        pathname: '/storage/**',
      },
    ],
  },
};

module.exports = nextConfig;
