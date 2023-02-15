import { useQuery } from 'react-query';

import Feed from '@/components/home/Feed';
import HomeHeader from '@/components/home/Header';

import { getPostsFromIds } from '@/utils/methods/posts';
import { useMetamask } from '@/components/context/MetamaskContext';

function Home() {
  const { contract, account } = useMetamask();

  const { data } = useQuery(['feed', !!contract, account], async () => {
    const userPostIds = await contract?.getPostIds(account);
    const userPosts = await getPostsFromIds(contract, userPostIds);
    const followedUsers = await contract?.getFollowingList(account);
    const followedUsersPostIds = await Promise.all(
      (followedUsers ?? []).map((followedUserId) =>
        contract?.getPostIds(followedUserId)
      )
    );
    const followedUsersPosts = await Promise.all(
      (followedUsersPostIds ?? []).map((postIds) =>
        getPostsFromIds(contract, postIds)
      )
    );

    return [...userPosts, ...followedUsersPosts?.flat()].sort((a, b) =>
      a.createdAt > b.createdAt ? -1 : 1
    );
  });

  return (
    <div className="home-page h-screen flex justify-center">
      <HomeHeader />
      <div className="content-container w-screen lg:w-1/2 max-w-xl mt-[96px]">
        <Feed posts={data ?? []} />
      </div>
    </div>
  );
}

export default Home;
