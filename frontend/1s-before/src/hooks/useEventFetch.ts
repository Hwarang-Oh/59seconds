import { useInfiniteQuery } from '@tanstack/react-query';
import { PageType, ContentsFetchType } from '@/types/common/common';

/**
 * IMP : Event List를 Fetch하는 Hook
 * @param queryKey : Query Key
 * @param query : Query String ( 검색어 : Optional )
 * @param fetchData : Fetch Data Method ( API를 통해 Data를 가져오는 Method )
 * @param initialPage : 초기 Page Number ( Default : 0 )
 */
function useEventFetch<T extends PageType>({
  queryKey,
  query,
  fetchData,
  initialPage = 0,
}: ContentsFetchType<T>) {
  // IMP : useInfiniteQuery를 통해 Event List를 Fetch
  // IMP : 처음에는 5개의 Data를 가져오고, 그 이후에는 10개의 Data를 가져옴
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, error, isError } =
    useInfiniteQuery({
      queryKey: queryKey,
      queryFn: ({ pageParam = initialPage }) => {
        const size = pageParam === 0 ? 5 : 10;
        if (query) return fetchData({ query, size, page: pageParam });
        else return fetchData({ size, page: pageParam });
      },
      getNextPageParam: (lastPage) => {
        if (lastPage.sliceDetails?.hasNext) {
          return lastPage.sliceDetails.currentPage + 1;
        }
        return undefined;
      },
      initialPageParam: initialPage,
    });

  // IMP : eventList는 기존의 Page들을 합친 후, Content만 추출하여 반환
  const pages = data?.pages || [];
  const sliceDetails = pages.length > 0 ? pages[pages.length - 1].sliceDetails : {};
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

export default useEventFetch;
