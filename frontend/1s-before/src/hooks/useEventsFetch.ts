import { useInfiniteQuery } from 'react-query';
import { PageType, ContentsFetchType } from '@/types/common/common';

function useEventsFetch<T extends PageType>({
  queryKey,
  query,
  fetchData,
  initialPage = 0,
}: ContentsFetchType<T>) {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
    isError,
  } = useInfiniteQuery(
    queryKey,
    ({ pageParam = initialPage }) => {
      const size = pageParam === 0 ? 5 : 10;
      if (query) return fetchData({ query, size, page: pageParam });
      else return fetchData({ size, page: pageParam });
    },
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.sliceDetails?.hasNext)
          return lastPage.sliceDetails.currentPage + 1;
        return undefined;
      },
    }
  );

  const pages = data?.pages || [];
  const sliceDetails =
    pages.length > 0 ? pages[pages.length - 1].sliceDetails : {};
  const eventList = pages.flatMap((page) => page.content || []).filter(Boolean);

  return {
    queryKey,
    eventList,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    sliceDetails,
    error,
    isError,
  };
}

export default useEventsFetch;
