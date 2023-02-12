import Logo from '@/components/display/Logo';
import PostForm from '../post-form/PostForm';
import SearchInput from '../search-input/SearchInput';

function HomeHeader() {
  return (
    <nav className="bg-[var(--sol-main-bg)] w-screen h-[96px] fixed flex items-center justify-between border-b-black border-b-2 px-6">
      <Logo />
      <div>
        <SearchInput />
      </div>
      <PostForm />
    </nav>
  );
}

export default HomeHeader;
