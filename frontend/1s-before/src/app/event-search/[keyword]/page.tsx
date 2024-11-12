'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { fetchSearchResults } from '@/apis/searchAPI';
import { PopularEventTypes } from '@/types/home';
import Header from '@/components/common/Header';
import NormalBanner from '@/components/home/NormalBanner';
import NavigateButton from '@/components/search/NavigateButton';

export default function EventSearch() {
  const params = useParams();
  const { term } = params as { term: string };

  // const searchParams = useSearchParams();
  // const term = searchParams.get('term');
  const [page, setPage] = useState(0);
  const [results, setResults] = useState<PopularEventTypes[]>([]);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    if (term) {
      const fetchResults = async () => {
        try {
          const searchResults = await fetchSearchResults(term, page, 10);

          // 새로운 결과를 기존 결과에 추가
          setResults((prevResults) => [...prevResults, ...searchResults]);

          // 검색 결과가 10개 미만이면 더 이상 로드하지 않음
          setHasMore(searchResults.length === 10);
        } catch (error) {
          console.error('검색 결과를 가져오는 중 오류 발생:', error);
        }
      };

      fetchResults();
    }
  }, [term, page]);

  const loadMoreResults = () => {
    if (hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <>
      <Header />
      <div className="max-w-screen-xl mx-auto my-12">
        <div className="flex flex-col gap-7">
          <p className="text-3xl font-bold mb-12">이벤트 검색 결과</p>
          <div className="flex flex-wrap justify- gap-10 mb-10">
            {results.length > 0 ? (
              results.map((result, index) => (
                <div
                  key={`${result.eventId}-${index}`}
                  className="flex-1 min-w-[200px] max-w-[calc(20%-1rem)]"
                >
                  <NormalBanner
                    eventId={result.eventId}
                    title={result.title}
                    ranking={result.ranking}
                    endTime={result.endTime}
                    unlockCount={result.unlockCount}
                    isDeadline={result.isDeadline}
                    mainPrize={result.mainPrize}
                    prizeCount={result.winnerNum}
                    rectangleImage={result.rectangleImage}
                  />
                </div>
              ))
            ) : (
              <p>검색 결과가 없습니다.</p>
            )}
          </div>
          <div className="flex justify-center">
            <NavigateButton onClick={loadMoreResults} disabled={!hasMore} />
          </div>
        </div>
      </div>
    </>
  );
}
