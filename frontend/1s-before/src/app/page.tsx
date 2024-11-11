'use client';
import { useEffect, useState } from 'react';
import CardDummy from '@/mocks/CardDummy.json';
import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import FancyCard from '@/components/home/FancyCard';
import CardBannerGrid from '@/components/home/CardBannerGrid';
import NormalBannerList from '@/components/home/NormalBannerList';
import LargeBannerCarousel from '@/components/home/member/LargeBannerCarousel';
import { getPopularEvents, getDeadlineEvents } from '@/apis/eventAPI';
import { PopularEventTypes, CardBannerProps } from '@/types/home';

export default function Home() {
  const [popularEvents, setPopularEvents] = useState<PopularEventTypes[]>([]);
  const [deadlineEvents, setDeadlineEvents] = useState<CardBannerProps[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const popularData = await getPopularEvents({ size: 5, page: 0 });
        setPopularEvents(popularData.content);

        const deadlineData = await getDeadlineEvents();
        setDeadlineEvents(deadlineData);
      } catch (error) {
        console.error('Failed to fetch events:', error);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div>
      <Header />
      {/* 첫 번째 배너 데이터를 LargeBanner에 전달 */}
      <LargeBannerCarousel Banners={popularEvents} />
      <div className='flex flex-col gap-20 px-7 py-20'>
        <NormalBannerList Banners={popularEvents} />
        <CardBannerGrid Banners={deadlineEvents} />
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
