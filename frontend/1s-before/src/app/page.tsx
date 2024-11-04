'use client';
import Header from '@/components/common/Header';
import LargeBanner from '@/components/home/LargeBanner';
import BannerDummy from '@/mocks/BannerDummy.json';
import NormalBanner from '@/components/home/NormalBanner';
import CardBanner from '@/components/home/CardBanner';

export default function Home() {
  return (
    <div>
      <Header />
      {/* 첫 번째 배너 데이터를 LargeBanner에 전달 */}
      <LargeBanner
        image={BannerDummy.largeBanner[0].image}
        title={BannerDummy.largeBanner[0].title}
        content={BannerDummy.largeBanner[0].content}
        date={BannerDummy.largeBanner[0].date}
      />
      <NormalBanner
        image={BannerDummy.normalBanner[0].image}
        title={BannerDummy.normalBanner[0].title}
        details={BannerDummy.normalBanner[0].details}
        date={BannerDummy.normalBanner[0].date}
        participants={BannerDummy.normalBanner[0].participants}
        isDeadline={BannerDummy.normalBanner[0].isDeadline}
      />
      <CardBanner
        image={BannerDummy.cardBanner[0].image}
        title={BannerDummy.cardBanner[0].title}
        leftTime={BannerDummy.cardBanner[0].leftTime}
        details={BannerDummy.cardBanner[0].details}
      />
    </div>
  );
}
