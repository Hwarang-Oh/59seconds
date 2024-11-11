import { useEffect, useState } from 'react';
import { PageType, ContentsFetchType } from '@/types/common/common';

function usePageRender<T extends PageType>({
  fetchData,
  initialPage = 0,
}: ContentsFetchType<T>) {
  const [eventList, setEventList] = useState<T['content']>([]);
  const [page, setPage] = useState(initialPage);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [isFetchingNextPage, setIsFetchingNextPage] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchEvents = async () => {
    setIsFetchingNextPage(true);
    try {
      const result = await fetchData({ size: 10, page });
      setEventList((prevEvents) => [...prevEvents, ...result.content]);
      setHasNextPage(result.sliceDetails?.hasNext || false);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsFetchingNextPage(false);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [page]);

  const fetchNextPage = () => {
    if (hasNextPage) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return {
    eventList,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  };
}

export default usePageRender;
