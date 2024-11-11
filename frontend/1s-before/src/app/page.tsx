'use client';
import { useEffect, useState } from 'react';
import CardDummy from '@/mocks/CardDummy.json';
import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import FancyCard from '@/components/home/FancyCard';
import CardBannerGrid from '@/components/home/member/CardBannerGrid';
import NormalBannerList from '@/components/home/NormalBannerList';
import LargeBannerCarousel from '@/components/home/member/LargeBannerCarousel';
import { useMemberStore } from '@/store/memberStore';
import { PopularEventTypes, CardBannerProps } from '@/types/home';
import { getPopularEvents, getDeadlineEvents } from '@/apis/eventAPI';

export default function Home() {
  const [popularEvents, setPopularEvents] = useState<PopularEventTypes[]>([]);
  const [deadlineEvents, setDeadlineEvents] = useState<CardBannerProps[]>([]);
  const { member } = useMemberStore();

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

      {member.isCreatorMode ? (
        // Creator Mode View
        <div className='flex flex-col gap-20 px-7 py-20 bg-gray-100'>
          <h2 className='text-2xl font-bold'>Creator Dashboard</h2>
          <CardBannerGrid Banners={deadlineEvents} />
          <div className='flex max-w-screen-xl mx-auto gap-6'>
            {CardDummy.FancyCards.map((card) => (
              <FancyCard key={card.id} id={card.id} title={card.title} content={card.content} />
            ))}
          </div>
        </div>
      ) : (
        // General Mode view
        <>
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
        </>
      )}

      <Footer />
    </div>
  );
}
