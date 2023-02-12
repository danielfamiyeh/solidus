/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    infuraKey: process.env.NEXT_APP_INFURA_KEY,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cloudflare-ipfs.com',
        port: '',
        pathname: '/ipfs/**',
      },
    ],
  },
};

module.exports = nextConfig;
