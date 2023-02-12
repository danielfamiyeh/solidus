import PostForm from './PostForm';
import SearchInput from './SearchInput';
import Logo from '@/components/display/Logo';

function HomeHeader() {
  return (
    <nav className="bg-[var(--sol-bg-main)] w-screen h-[96px] fixed flex items-center justify-between border-b-black border-b-2 px-6">
      <Logo />
      <div>
        <SearchInput />
      </div>
      <PostForm />
    </nav>
  );
}

export default HomeHeader;
