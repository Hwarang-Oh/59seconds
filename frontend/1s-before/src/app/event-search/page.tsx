'use client';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import CardDummy from '@/assets/FancyCards.json';
import FancyCard from '@/components/home/FancyCard';
import useEventsFetch from '@/hooks/useEventsFetch';
import NormalBanner from '@/components/home/NormalBanner';
import NavigateButton from '@/components/search/NavigateButton';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { fetchSearchResults } from '@/apis/searchAPI';

export default function EventSearch() {
  const searchParams = useSearchParams();
  const [term, setTerm] = useState('');

  useEffect(() => {
    const searchTerm = searchParams.get('term') ?? '';
    setTerm(searchTerm);
  }, [searchParams]);

  const { eventList, fetchNextPage, hasNextPage, isFetchingNextPage } = useEventsFetch({
    query: term,
    queryKey: ['searchEvents', term],
    fetchData: fetchSearchResults,
    initialPage: 0,
  });

  return (
    <div className='flex flex-col'>
      <Header />
      <div className='max-w-screen-xl mx-auto py-20'>
        <div className='flex flex-col gap-7'>
          <p className='text-3xl font-bold'>이벤트 검색 결과</p>
          <div className='grid grid-cols-5 gap-5 items-center justify-center'>
            {eventList.length > 0 ? (
              eventList.map((result, index) => (
                <NormalBanner
                  key={`${result.eventId}-${index}`}
                  eventId={result.eventId}
                  title={result.title}
                  ranking={result.ranking}
                  endTime={result.endTime}
                  unlockCount={result.unlockCount}
                  isDeadline={result.isDeadline}
                  mainPrize={result.mainPrize}
                  prizeCount={result.prizeCount}
                  rectangleImage={result.rectangleImage}
                />
              ))
            ) : (
              <p>검색 결과가 없습니다.</p>
            )}
          </div>
          <div className='flex justify-center'>
            <NavigateButton onClick={fetchNextPage} disabled={!hasNextPage || isFetchingNextPage} />
          </div>
        </div>
        <div className='flex max-w-screen-xl mx-auto gap-6 pb-20 py-20'>
          {CardDummy.FancyCards.map((card) => (
            <FancyCard key={card.id} id={card.id} title={card.title} content={card.content} />
          ))}
        </div>
        <Footer />
      </div>
    </div>
  );
}
