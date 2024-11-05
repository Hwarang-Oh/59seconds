import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import BannerDummy from '@/mocks/BannerDummy.json';
import CardDummy from '@/mocks/CardDummy.json';
import CardBannerGrid from '@/components/home/CardBannerGrid';
import NormalBannerList from '@/components/home/NormalBannerList';
import LargeBannerCarousel from '@/components/home/member/LargeBannerCarousel';
import FancyCard from '@/components/home/FancyCard';

export default function Home() {
  return (
    <div>
      <Header />
      {/* 첫 번째 배너 데이터를 LargeBanner에 전달 */}
      <LargeBannerCarousel Banners={BannerDummy.Banner} />
      <div className='flex flex-col gap-20 px-7 py-20'>
        <NormalBannerList Banners={BannerDummy.Banner} />
        <CardBannerGrid Banners={BannerDummy.cardBanner} />
        <div className='flex max-w-screen-xl mx-auto gap-6'>
          {CardDummy.FancyCards.map((card) => (
            <FancyCard key={card.id} id={card.id} title={card.title} content={card.content} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
