import { WagmiConfig } from 'wagmi';
import type { AppProps } from 'next/app';
import { Web3Modal } from '@web3modal/react';
import { ethereumClient, wagmiClient } from '@/utils/config/web3';
import { Anton, Raleway } from '@next/font/google';

import '@/styles/globals.css';

const anton = Anton({
  weight: '400',
  subsets: ['latin'],
});

const raleway = Raleway({
  weight: '400',
  subsets: ['latin'],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${raleway.style.fontFamily} !important;
        }

        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          font-family: ${anton.style.fontFamily};
        }
      `}</style>
      <WagmiConfig client={wagmiClient}>
        <Component {...pageProps} />
      </WagmiConfig>

      <Web3Modal
        projectId={String(process.env.walletConnectKey)}
        ethereumClient={ethereumClient}
      />
    </>
  );
}
