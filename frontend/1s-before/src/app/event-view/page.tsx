'use client';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import CardDummy from '@/assets/FancyCards.json';
import FancyCard from '@/components/home/FancyCard';
import useEventFetch from '@/hooks/useEventFetch';
import NormalBanner from '@/components/home/NormalBanner';
import NavigateButton from '@/components/search/NavigateButton';
import { getPopularEvents } from '@/apis/eventAPI';

export default function EventView() {
  const { eventList, fetchNextPage, hasNextPage, isFetchingNextPage } = useEventFetch({
    queryKey: ['popularEvents'],
    fetchData: getPopularEvents,
    initialPage: 0,
  });
  return (
    <div className='flex flex-col'>
      <Header />
      <div className='max-w-screen-xl mx-auto py-20'>
        <div className='flex flex-col gap-7'>
          <p className='text-3xl font-bold'>인기 이벤트</p>
          <div className='grid grid-cols-5 gap-5 items-center justify-center'>
            {eventList.map((banner, index) => (
              <NormalBanner
                key={`${banner.eventId}-${index}`}
                eventId={banner.eventId}
                title={banner.title}
                ranking={banner.ranking}
                endTime={banner.endTime}
                unlockCount={banner.unlockCount}
                isDeadline={banner.isDeadline}
                mainPrize={banner.mainPrize}
                prizeCount={banner.prizeCount}
                rectangleImage={banner.rectangleImage}
              />
            ))}
          </div>
          <div className='flex justify-center'>
            <NavigateButton onClick={fetchNextPage} disabled={!hasNextPage || isFetchingNextPage} />
          </div>
          <div className='flex max-w-screen-xl mx-auto gap-6 py-20'>
            {CardDummy.FancyCards.map((card) => (
              <FancyCard key={card.id} id={card.id} title={card.title} content={card.content} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
