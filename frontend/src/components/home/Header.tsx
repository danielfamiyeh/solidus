import PostForm from './PostForm';
import SearchInput from './SearchInput';
import SettingsForm from './SettingsForm';
import Logo from '@/components/display/Logo';

function HomeHeader() {
  return (
    <nav className="bg-[var(--sol-bg-main)] w-screen h-[96px] fixed flex items-center justify-between border-b-black border-b-2 px-6">
      <Logo />
      <div className="mr-[-96px]">
        <SearchInput />
      </div>
      <div className="flex items-center justify-between w-[96px]">
        <PostForm />
        <SettingsForm />
      </div>
    </nav>
  );
}

export default HomeHeader;
