import { ethers } from 'ethers';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useMetamask } from '@/components/context/MetamaskContext';
import { solidusAbi } from '@/utils/contract/solidus';

function ProfilePage() {
  const router = useRouter();
  const { contract, signer, account } = useMetamask();
  const [profile, setProfile] = useState();
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');

  const { userAddr } = router.query;

  useEffect(() => {
    if (!account || !ethers.utils.isAddress(account)) return;

    const init = () => {
      contract
        ?.getUserName(account)
        .then((res) => setName(res))
        .catch((err) => console.log({ err }));

      contract
        ?.getUserBio(account)
        .then((res) => setBio(res))
        .catch((err) => console.log({ err }));
    };

    init();
  }, [account]);

  console.log({ name, bio });

  return (
    <div className="h-screen">
      <p>{name || 'No name set'}</p>
      <p>{bio || 'No bio set'}</p>
    </div>
  );
}

export default ProfilePage;
