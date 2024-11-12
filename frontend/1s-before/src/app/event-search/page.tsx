'use client';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import CardDummy from '@/assets/FancyCards.json';
import FancyCard from '@/components/home/FancyCard';
import useEventsFetch from '@/hooks/useEventsFetch';
import NormalBanner from '@/components/home/NormalBanner';
import NavigateButton from '@/components/search/NavigateButton';
import { useSearchParams } from 'next/navigation';
import { fetchSearchResults } from '@/apis/searchAPI';

export default function EventSearch() {
  const searchParams = useSearchParams();
  const term: string = searchParams.get('term') ?? '';

  const { eventList, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useEventsFetch({
      query: term,
      queryKey: ['searchEvents', term],
      fetchData: fetchSearchResults,
      initialPage: 0,
    });

  return (
    <>
      <Header />
      <div className="max-w-screen-xl mx-auto my-12">
        <div className="flex flex-col gap-5">
          <p className="text-3xl font-bold mb-5">이벤트 검색 결과</p>
          <div className="grid grid-cols-5 gap-4 mb-10">
            {eventList.length > 0 ? (
              eventList.map((result, index) => (
                <div
                  key={`${result.eventId}-${index}`}
                  className="flex-1 min-w-sm mb-5"
                >
                  <NormalBanner
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
                </div>
              ))
            ) : (
              <p>검색 결과가 없습니다.</p>
            )}
          </div>
          <div className="flex justify-center">
            <NavigateButton
              onClick={fetchNextPage}
              disabled={!hasNextPage || isFetchingNextPage}
            />
          </div>
        </div>
        <div className="flex max-w-screen-xl mx-auto gap-6 pb-20 py-20">
          {CardDummy.FancyCards.map((card) => (
            <FancyCard
              key={card.id}
              id={card.id}
              title={card.title}
              content={card.content}
            />
          ))}
        </div>
        <Footer />
      </div>
    </>
  );
}
