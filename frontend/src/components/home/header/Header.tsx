import PostForm from '../post-form/PostForm';
import SearchInput from '../search-input/SearchInput';

function HomeHeader() {
  return (
    <nav className="bg-[var(--sol-main-bg)] w-screen h-[64px] fixed flex items-center justify-between px-6">
      <h3>.sol</h3>
      <div>
        <SearchInput />
      </div>
      <PostForm />
    </nav>
  );
}

export default HomeHeader;
