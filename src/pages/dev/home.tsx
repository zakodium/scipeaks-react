import { HomeContextProvider } from '../../components/dev/home/HomeContext';
import HomeHeader from '../../components/dev/home/HomeHeader';
import HomeIframe from '../../components/dev/home/HomeIframe';
import HomeSamples from '../../components/dev/home/HomeSamples';

export default function Home() {
  return (
    <HomeContextProvider>
      <div className="flex flex-col w-screen h-screen">
        <HomeHeader />
        <div className="flex flex-row flex-1 mt-2 border-t border-neutral-300 ">
          <HomeSamples />
          <HomeIframe />
        </div>
      </div>
    </HomeContextProvider>
  );
}
