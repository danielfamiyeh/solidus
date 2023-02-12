import { useRouter } from 'next/router';

function ProfilePage() {
  const router = useRouter();
  const { userAddr } = router.query;
}

export default ProfilePage;
