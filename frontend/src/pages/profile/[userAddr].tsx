import { useRouter } from 'next/router';

function ProfilePage() {
  const router = useRouter();
  const { userAddr } = router.query;

  return <div className="h-screen">{userAddr}</div>;
}

export default ProfilePage;
