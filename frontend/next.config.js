/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    walletConnectKey: process.env.NEXT_APP_WALLET_CONNECT_ID,
  },
};

module.exports = nextConfig;
