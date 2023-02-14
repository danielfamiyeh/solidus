import {
  EthereumClient,
  modalConnectors,
  walletConnectProvider,
} from '@web3modal/ethereum';
import { arbitrum, mainnet, polygon } from 'wagmi/chains';
import { configureChains, createClient } from 'wagmi';

const chains = [arbitrum, mainnet, polygon];

// Wagmi client
export const { provider } = configureChains(chains, [
  walletConnectProvider({ projectId: String(process.env.walletConnectKey) }),
]);
export const wagmiClient = createClient({
  autoConnect: true,
  connectors: modalConnectors({
    projectId: process.env.walletConnectKey,
    version: '2', // or "2"
    appName: 'web3Modal',
    chains,
  }),
  provider,
});

// Web3Modal Ethereum Client
export const ethereumClient = new EthereumClient(wagmiClient, chains);
