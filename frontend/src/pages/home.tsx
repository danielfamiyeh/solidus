import Feed from '@/components/home/feed/Feed';
import HomeHeader from '@/components/home/header/Header';

function Home() {
  return (
    <div className="home-page h-screen flex justify-center">
      <HomeHeader />
      <div className="content-container w-screen lg:w-1/2 max-w-xl mt-[64px]">
        <Feed />
      </div>
    </div>
  );
}

export default Home;
