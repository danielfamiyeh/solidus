import Image from 'next/image';
import Logo from '@/components/display/Logo';
import { useMetamask } from '../context/MetamaskContext';
import landingTitles from '@/utils/constants/landingTitles';
import metamaskIcon from '@/assets/landing/metamask.png';

function LandingHeader() {
  const { connect, disconnect, account, isActive, isConnecting } =
    useMetamask();
  return (
    <nav className="bg-[var(--sol-bg-main)] w-[100vw] h-[64px] fixed flex items-center justify-between px-6 border-b-black border-b-2">
      <h3 className="select-none text-xl">.sol</h3>

      <div className="lg:hidden">
        <button
          className="px-4 py-2 bg-black flex items-center text-white hover:opacity-75 active:opacity-50 disabled:opacity-50"
          disabled={isConnecting}
          onClick={account ? disconnect : connect}
        >
          <Image
            className="mr-2"
            height={24}
            src={metamaskIcon}
            alt="Metamask icon"
          />
          {account ? 'Disconnect' : 'Connect'} Wallet
        </button>
      </div>
    </nav>
  );
}

export default LandingHeader;
