import { useAccount } from 'wagmi';
import { useRouter } from 'next/router';
import { createContext, useContext, useEffect } from 'react';

interface IAuthContext {
  address: `0x${string}` | undefined;
  isConnecting: boolean;
  signOut?: () => void;
}

const AuthContext = createContext<IAuthContext>({
  address: undefined,
  isConnecting: false,
  signOut: () => {},
});

function AuthProvider({ children }: { children: any }) {
  const { address, isConnecting, connector } = useAccount();
  const router = useRouter();

  useEffect(() => {
    if (!address) router.push('/');
    // TODO: Display loading spinner if connecting
    else if (
      (address && !isConnecting) ||
      (address && router.pathname === '/')
    ) {
      router.push('/home');
    }
  }, [address, isConnecting]);

  return (
    <AuthContext.Provider
      value={{
        address,
        isConnecting,
        signOut: connector?.disconnect,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => useContext(AuthContext);
export default AuthProvider;
