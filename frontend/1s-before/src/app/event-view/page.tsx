'use client';
import Header from '@/components/common/Header';
import NormalBannerList from '@/components/home/NormalBannerList';
import useEventsFetch from '@/hooks/useEventsFetch';
import { getPopularEvents } from '@/apis/eventAPI';

export default function EventView() {
  const { eventList, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, error } =
    useEventsFetch({
      queryKey: ['popularEvents'],
      fetchData: getPopularEvents, // fetch 함수로 getPopularEvents를 전달
      initialPage: 0,
    });
  return (
    <div>
      <Header />
      {/* NormalBannerList에 eventList를 props로 전달 */}
      <NormalBannerList Banners={eventList} />
      {hasNextPage && (
        <button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
          {isFetchingNextPage ? 'Loading more...' : 'Load More'}
        </button>
      )}
    </div>
  );
}
