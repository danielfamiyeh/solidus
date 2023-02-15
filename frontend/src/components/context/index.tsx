import Web3 from 'web3';
import { Web3ReactProvider } from '@web3-react/core';
import { MetamaskProvider } from './MetamaskContext';
import { QueryClient, QueryClientProvider } from 'react-query';

const client = new QueryClient();

function getLibrary(provider, connector) {
  return new Web3(provider);
}

function AppContext({ children }: { children: any }) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <MetamaskProvider>
        <QueryClientProvider client={client}>{children}</QueryClientProvider>
      </MetamaskProvider>
    </Web3ReactProvider>
  );
}

export default AppContext;
