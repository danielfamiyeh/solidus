import { ethers } from 'ethers';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useMetamask } from '@/components/context/MetamaskContext';
import { solidusAbi } from '@/utils/contract/solidus';

function ProfilePage() {
  const router = useRouter();
  const { contract, signer, account } = useMetamask();
  const [profile, setProfile] = useState();
  const { userAddr } = router.query;

  useEffect(() => {
    if (!account || !ethers.utils.isAddress(account)) return;

    const init = () => {
      contract
        ?.getUserName(account)
        .then((res) => console.log({ res }))
        .catch((err) => console.log({ err }));
    };

    init();
  }, [account]);

  return <div className="h-screen">{userAddr}</div>;
}

export default ProfilePage;
