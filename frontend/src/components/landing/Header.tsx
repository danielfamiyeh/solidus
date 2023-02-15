import Logo from '@/components/display/Logo';
import { useMetamask } from '../context/MetamaskContext';
import landingTitles from '@/utils/constants/landingTitles';

function LandingHeader() {
  const { connect, disconnect, account, isActive, isConnecting } =
    useMetamask();
  return (
    <nav className="bg-[var(--sol-bg-main)] w-[100vw] h-[64px] fixed flex items-center justify-between px-6 border-b-black border-b-2">
      <Logo />
      <div className="nav-links">
        {landingTitles.map((title: string) => (
          <button key={title} className="mr-3 hover:opacity-50">
            {title}
          </button>
        ))}
      </div>
      <div className="lg:hidden">
        <button
          className="px-4 py-2 bg-black text-white hover:opacity-75 active:opacity-50 disabled:opacity-50"
          disabled={isConnecting}
          onClick={account ? disconnect : connect}
        >
          {account ? 'Disconnect' : 'Connect'} Wallet
        </button>
      </div>
    </nav>
  );
}

export default LandingHeader;
