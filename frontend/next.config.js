/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    infuraKey: process.env.NEXT_APP_INFURA_KEY,
  },
};

module.exports = nextConfig;
