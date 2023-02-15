import { Contract, providers } from 'ethers';
import { useWeb3React } from '@web3-react/core';
import { InjectedConnector } from '@web3-react/injected-connector';
import { useContext, createContext, useState, useEffect } from 'react';

import { solidusAbi } from '@/utils/contract/solidus';

const injected = new InjectedConnector({
  supportedChainIds: [1, 42, 1337],
});

const MetamaskContext = createContext<{
  account: string | null | undefined;
  isActive: boolean;
  isLoading: boolean;
  isConnecting: boolean;
  contract: Contract | undefined;
  signer: providers.JsonRpcSigner | undefined;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
}>({
  account: '',
  isActive: false,
  isLoading: false,
  isConnecting: false,
  signer: undefined,
  contract: undefined,
  connect: async () => {},
  disconnect: async () => {},
});

export const MetamaskProvider = ({ children }: { children: any }) => {
  const { activate, account, library, connector, active, deactivate } =
    useWeb3React();

  const [isLoading, setIsLoading] = useState(true);
  const [isConnecting, setIsConnecting] = useState(false);
  const [contract, setContract] = useState<Contract | undefined>();
  const [signer, setSigner] = useState<providers.JsonRpcSigner | undefined>();

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
      await activate(injected).then(async () => {
        const { ethereum } = window;
        if (!ethereum) return;
        const web3Provider = new providers.Web3Provider(ethereum);

        const web3Signer = web3Provider.getSigner();
        const solidusContract = new Contract(
          String(process.env.solidusAddress),
          solidusAbi,
          web3Signer
        );

        setSigner(web3Signer);
        setContract(solidusContract);
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

  return (
    <MetamaskContext.Provider
      value={{
        isActive: active,
        account,
        isLoading,
        connect,
        disconnect,
        isConnecting,
        contract,
        signer,
      }}
    >
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
