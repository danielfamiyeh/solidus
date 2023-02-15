import { ethers } from 'ethers';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import HomeHeader from '@/components/home/Header';
import { useMetamask } from '@/components/context/MetamaskContext';

const fields = ['addr', 'name', 'avatar', 'coverPhoto', 'bio'];

function ProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState();
  const { contract, account } = useMetamask();

  const { userAddr } = router.query;

  useEffect(() => {
    if (!account || !ethers.utils.isAddress(account)) return;

    const init = () => {
      contract
        ?.getUser(account)
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
    };

    init();
  }, [account]);

  return (
    <div className="home-page h-screen flex justify-center">
      <HomeHeader />
      <div className="content-container w-screen lg:w-1/2 max-w-xl mt-[96px]">
        {profile?.addr === '0x0000000000000000000000000000000000000000' ? (
          <>
            <h1 className="text-center text-2xl mt-5">
              User doesn&apos;t exist
            </h1>
            <p className="text-slate-600 text-center">(Address: {userAddr})</p>
          </>
        ) : (
          <>
            <p>{profile?.name || "User hasn't set a name"}</p>
            <p>{profile?.bio || "User hasn't set a bio"}</p>
          </>
        )}
      </div>
    </div>
  );
}

export default ProfilePage;
