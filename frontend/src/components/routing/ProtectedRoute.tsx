import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useMetamask } from '../context/MetamaskContext';

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();
  const { account, isLoading } = useMetamask();

  useEffect(() => {
    if (!isLoading && !account) {
      router.push('/');
    }
  }, [account, isLoading]);

  return children;
}

interface ProtectedRouteProps {
  children: any;
}

export default ProtectedRoute;
