/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's.wordpress.com',
        pathname: '/mshots/**',
      },
    ],
  },
};

module.exports = nextConfig;
