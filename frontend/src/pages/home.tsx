import { useMetamask } from '@/components/context/MetamaskContext';
import Feed from '@/components/home/Feed';
import HomeHeader from '@/components/home/Header';
import { getPostsFromIds } from '@/utils/methods/posts';
import { useState, useEffect } from 'react';

function Home() {
  const [posts, setPosts] = useState([]);
  const { contract, account } = useMetamask();

  useEffect(() => {
    const init = async () => {
      const userPostIds = await contract?.getPostIds(account);
      const userPosts = await getPostsFromIds(contract, userPostIds);

      setPosts(
        [...userPosts].sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1))
      );
    };

    init();
  }, [account, contract]);
  return (
    <div className="home-page h-screen flex justify-center">
      <HomeHeader />
      <div className="content-container w-screen lg:w-1/2 max-w-xl mt-[96px]">
        <Feed posts={posts} />
      </div>
    </div>
  );
}

export default Home;
