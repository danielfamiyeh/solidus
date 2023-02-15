import Image from 'next/image';
import { ethers } from 'ethers';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import Feed from '@/components/home/Feed';
import HomeHeader from '@/components/home/Header';
import accountIcon from '@/assets/home/account/account.svg';
import { useMetamask } from '@/components/context/MetamaskContext';
import { getPostsFromIds } from '@/utils/methods/posts';

const fields = ['addr', 'name', 'avatar', 'coverPhoto', 'bio'];

function ProfilePage() {
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const [profile, setProfile] = useState();
  const { contract, account } = useMetamask();
  const [hasFetched, setHasFetched] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  const { userAddr } = router.query;

  useEffect(() => {
    if (!account || !ethers.utils.isAddress(account)) return;

    const init = async () => {
      setProfile({});
      contract
        ?.getUser(userAddr)
        .then((res) =>
          setProfile(
            Object.assign(
              {},
              ...res.map((field, i) => ({
                [fields[i]]: field,
              }))
            )
          )
        )
        .catch((err) => console.log({ err }));

      const postIds = await contract?.getPostIds(userAddr);
      const _posts = await getPostsFromIds(contract, postIds);

      const _isFollowing = await contract?.getIsFollowedBy(userAddr, account);

      setPosts(_posts);
      setIsFollowing(_isFollowing);
      setHasFetched(true);
    };

    init();
  }, [account, userAddr]);

  return (
    <div className="home-page h-screen flex justify-center">
      <HomeHeader />
      <div className="content-container w-screen lg:w-1/2 max-w-xl mt-[96px]">
        {profile?.addr === '0x0000000000000000000000000000000000000000' ||
        !profile?.addr ? (
          <>
            <h1 className="text-center text-2xl mt-5">
              User doesn&apos;t exist
            </h1>
            <p className="text-slate-600 text-center">(Address: {userAddr})</p>
          </>
        ) : (
          <>
            <div className="user-meta flex flex-col border-b-2 border-black px-2 py-4 text-center">
              {profile.avatar ? (
                <img
                  className="rounded-full self-center"
                  src={profile.avatar}
                  width={128}
                  height={128}
                  alt="User avatar"
                />
              ) : (
                <Image
                  src={accountIcon}
                  alt="Account icon"
                  className="self-center"
                  width={128}
                  height={128}
                />
              )}
              <h1 className="text-2xl">
                {profile?.name || "User hasn't set a name"}
              </h1>
              <small className="text-slate-500">{profile?.addr}</small>
              <p>{profile?.bio || "User hasn't set a bio"}</p>
              {hasFetched && userAddr !== account && (
                <button
                  className="bg-black text-white py-2 px-4 mt-8 hover:opacity-75 active:opacity-50"
                  onClick={() => {
                    const action = () =>
                      isFollowing
                        ? contract?.unfollowUser(userAddr)
                        : contract?.followUser(userAddr);
                    action();
                  }}
                >
                  {isFollowing ? 'Unfollow' : 'Follow'}
                </button>
              )}
            </div>
            <Feed posts={posts} />
          </>
        )}
      </div>
    </div>
  );
}

export default ProfilePage;
