/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
  infuraKey: process.env.NEXT_APP_INFURA_KEY,
    solidusAddress: process.env.NEXT_APP_SOLIDUS_ADDRESS,
    walletConnectKey: process.env.NEXT_APP_WALLET_CONNECT_ID,
  },
};

module.exports = nextConfig;
