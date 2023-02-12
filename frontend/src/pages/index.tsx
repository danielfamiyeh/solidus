import Head from 'next/head';
import Image from 'next/image';

import landingBlobs from '@/assets/landing/blobs';

const blobSize = 240;

export default function Home() {
  return (
    <>
      <Head>
        <title>Solidus</title>
        <meta
          name="description"
          content="Decentralised social networking application"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="h-screen">
        <div className="hero rounded-lg p-5 text-center flex h-[100%]">
          <div className="hero__left border-slate w-[100%] lg:w-1/2 p-1">
            <h1 className="text-7xl xl:text-8xl 2xl:text-9xl select-none p-2">
              a decentralised social network for the people
            </h1>
            <hr className="my-6" />
            <p className="p-2 pt-0">
              Join a community where your data is secure, your privacy is
              protected, and you&apos;re in control. Our decentralized social
              network is built on the Ethereum blockchain, giving you the power
              to connect with friends, share content, and build a better online
              experience - all without the risk of data breaches, censorship, or
              manipulation.
            </p>
          </div>
          <div className="hero__right border-zinc w-1/2 hidden lg:flex flex-col items-center justify-center">
            <div className="flex items-center justify-center">
              <Image
                src={landingBlobs.black}
                width={blobSize}
                height={blobSize}
                style={{
                  borderLeft: '4px dashed lightgrey',
                  borderTop: '4px dashed lightgrey',
                }}
                alt="Blob vector graphic"
              />
              <Image
                src={landingBlobs.green}
                width={blobSize}
                height={blobSize}
                alt="Blob vector graphic"
              />
            </div>
            <div className="flex items-center justify-center">
              <Image
                src={landingBlobs.purple}
                width={blobSize}
                height={blobSize}
                style={{
                  borderTop: '4px dashed lightgrey',
                }}
                alt="Blob vector graphic"
              />
              <Image
                src={landingBlobs.pink}
                width={blobSize}
                height={blobSize}
                style={{
                  borderBottom: '4px dashed lightgrey',
                  borderRight: '4px dashed lightgrey',
                  borderTop: '4px dashed lightgrey',
                }}
                alt="Blob vector graphic"
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
