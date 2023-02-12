import Logo from '@/components/display/Logo';
import landingTitles from '@/utils/constants/landingTitles';

function LandingHeader() {
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
    </nav>
  );
}

export default LandingHeader;
