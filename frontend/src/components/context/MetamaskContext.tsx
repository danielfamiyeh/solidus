import { useWeb3React } from '@web3-react/core';
import { InjectedConnector } from '@web3-react/injected-connector';
import { useContext, createContext, useState, useMemo, useEffect } from 'react';

const injected = new InjectedConnector({
  supportedChainIds: [1, 42, 1337],
});

const MetamaskContext = createContext<{
  account: string | null | undefined;
  isActive: boolean;
  isLoading: boolean;
  isConnecting: boolean;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
}>({
  account: '',
  isActive: false,
  isLoading: false,
  isConnecting: false,
  connect: async () => {},
  disconnect: async () => {},
});

export const MetamaskProvider = ({ children }: { children: any }) => {
  const { activate, account, library, connector, active, deactivate } =
    useWeb3React();

  const [isLoading, setIsLoading] = useState(true);
  const [isConnecting, setIsConnecting] = useState(false);

  // Init Loading
  useEffect(() => {
    connect().then(() => {
      setIsLoading(false);
    });
  }, []);

  // Connect to MetaMask wallet
  const connect = async () => {
    console.log('Connecting to MetaMask...');
    setIsConnecting(true);
    try {
      await activate(injected).then(() => {
        console.log(`Connected to account: ${account}`);
        setIsConnecting(false);
      });
    } catch (error) {
      console.log('Error on connecting: ', error);
    }
  };

  // Disconnect from Metamask wallet
  const disconnect = async () => {
    console.log('Disconnecting wallet from App...');
    try {
      await deactivate();
    } catch (error) {
      console.log('Error on disconnnect: ', error);
    }
  };

  const values = useMemo(
    () => ({
      isActive: active,
      account,
      isLoading,
      connect,
      disconnect,
      isConnecting,
    }),
    [active, isLoading, isConnecting, account]
  );

  return (
    <MetamaskContext.Provider value={values}>
      {children}
    </MetamaskContext.Provider>
  );
};

export function useMetamask() {
  const context = useContext(MetamaskContext);

  if (context === undefined) {
    throw new Error(
      'useMetamask hook must be used with a MetaMaskProvider component'
    );
  }

  return context;
}
