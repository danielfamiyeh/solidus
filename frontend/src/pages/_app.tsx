import type { AppProps } from 'next/app';
import { Anton, Raleway } from '@next/font/google';

import AppContext from '@/components/context';

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
      <AppContext>
        <Component {...pageProps} />
      </AppContext>
    </>
  );
}
