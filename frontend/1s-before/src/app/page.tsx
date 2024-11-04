import Header from '@/components/common/Header';
import BannerDummy from '@/mocks/BannerDummy.json';
import NormalBanner from '@/components/home/NormalBanner';
import CardBanner from '@/components/home/CardBanner';
import LargeBannerCarousel from '@/components/home/LargeBannerCarousel';
import NormalBannerList from '@/components/home/NormalBannerList';

export default function Home() {
  return (
    <div>
      <Header />
      {/* 첫 번째 배너 데이터를 LargeBanner에 전달 */}
      <LargeBannerCarousel Banners={BannerDummy.Banner} />
      <NormalBannerList Banners={BannerDummy.Banner} />
      <CardBanner
        image={BannerDummy.cardBanner[0].image}
        title={BannerDummy.cardBanner[0].title}
        leftTime={BannerDummy.cardBanner[0].leftTime}
        details={BannerDummy.cardBanner[0].details}
      />
    </div>
  );
}
