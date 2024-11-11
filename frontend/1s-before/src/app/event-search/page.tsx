'use client';
import { useSearchParams } from 'next/navigation';
import { fetchSearchResults } from '@/apis/searchAPI';
import { useEffect, useState } from 'react';
import NormalBanner from '@/components/home/NormalBanner';

interface SearchResult {
  eventId: number;
  title: string;
  description: string;
  status: string;
  createdAt: string;
  startTime: string;
  endTime: string;
  winnerNum: number;
  bannerImage: string;
  squareImage: string;
  rectangleImage: string;
}

export default function EventSearch() {
  const searchParams = useSearchParams();
  const [page, setPage] = useState(0);
  const term = searchParams.get('term');
  const [results, setResults] = useState<SearchResult[]>([]);

  useEffect(() => {
    if (term) {
      const fetchResults = async () => {
        try {
          const searchResults = await fetchSearchResults(term, page, 10);
          setResults(searchResults);
        } catch (error) {
          console.error('검색 결과를 가져오는 중 오류 발생:', error);
        }
      };

      fetchResults();
    }
  }, [term]);

  return (
    <div>
      <p className="text-3xl font-bold">검색 결과</p>
      <div className="flex items-center justify-center gap-5">
        {results.length > 0 ? (
          results.map((result) => (
            <p>{result.title}</p>
            // <NormalBanner
            //   key={result.eventId}
            //   eventId={result.eventId}
            //   title={result.title}
            //   ranking={result.ranking}
            //   endTime={result.endTime}
            //   isDeadline={true}
            //   mainPrize={result.mainPrize}
            //   prizeCount={result.prizeCount}
            //   rectangleImage={result.rectangleImage}
            // />
          ))
        ) : (
          <p>검색 결과가 없습니다.</p>
        )}
      </div>
    </div>
  );
}
