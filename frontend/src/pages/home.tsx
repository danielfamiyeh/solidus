import Feed from '@/components/home/feed/Feed';
import PostForm from '@/components/home/post-form/PostForm';
import SearchInput from '@/components/home/search-input/SearchInput';

function Home() {
  return (
    <div className="home-page h-screen flex justify-center">
      <div className="content-container w-screen lg:w-1/2 max-w-xl">
        <SearchInput />
        <PostForm />
        <Feed />
      </div>
    </div>
  );
}

export default Home;
