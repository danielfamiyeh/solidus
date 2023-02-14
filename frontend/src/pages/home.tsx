import { useEffect } from 'react';
import { Contract, providers } from 'ethers';

import Feed from '@/components/home/Feed';
import HomeHeader from '@/components/home/Header';
import { solidusAbi } from '@/utils/contract/solidus';

function Home() {
  useEffect(() => {
    const userAuth = async () => {
      const { ethereum } = window;
      if (!ethereum) return;
      const web3Provider = new providers.Web3Provider(ethereum);

      const signer = web3Provider.getSigner();
      const solidusContract = new Contract(
        String(process.env.solidusAddress),
        solidusAbi,
        signer
      );

      const user = await solidusContract.userAuth();

      console.log({ user });
    };

    userAuth();
  }, []);
  return (
    <div className="home-page h-screen flex justify-center">
      <HomeHeader />
      <div className="content-container w-screen lg:w-1/2 max-w-xl mt-[96px]">
        <Feed />
      </div>
    </div>
  );
}

export default Home;
