import { useAccount } from 'wagmi';
import { useRouter } from 'next/router';
import { createContext, useEffect } from 'react';

interface IAuthContext {
  address: `0x${string}` | undefined;
  isConnecting: boolean;
}

const AuthContext = createContext<IAuthContext>({
  address: undefined,
  isConnecting: false,
});

function AuthProvider({ children }: { children: any }) {
  const { address, isConnecting } = useAccount();
  const router = useRouter();

  useEffect(() => {
    if (!address) router.push('/');
    // TODO: Display loading spinner if connecting
    else if (address && !isConnecting) router.push('/home');
  }, [address, router, isConnecting]);

  return (
    <AuthContext.Provider
      value={{
        address,
        isConnecting,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
