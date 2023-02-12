import Feed from '@/components/home/Feed';
import HomeHeader from '@/components/home/Header';

function Home() {
  return (
    <div className="home-page h-screen flex justify-center">
      <HomeHeader />
      <div className="content-container w-screen lg:w-1/2 max-w-xl mt-[96px]">
        <Feed />
      </div>
    </div>
  );
}

export default Home;
