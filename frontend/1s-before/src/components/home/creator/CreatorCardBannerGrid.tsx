import Link from 'next/link';
import CreatorCardBanner from '@/components/home/creator/CreatorCardBanner';
import CreatorNavigateButton from '@/components/home/creator/CreatorNavigateButton';
import { CreatorCardListProps } from '@/types/home';

export default function CreatorCardGrid({ Banners }: Readonly<CreatorCardListProps>) {
  return (
    <div className='max-w-screen-xl mx-auto'>
      <div className='flex flex-col gap-7'>
        <div className='flex items-center justify-between'>
          <p className='text-3xl font-bold'>나의 이벤트</p>
        </div>
        <div className='grid grid-cols-2 md:grid-cols-3 gap-5'>
          {Banners.slice(0, 6).map((banner) => (
            <CreatorCardBanner
              key={banner.eventId}
              eventId={banner.eventId}
              title={banner.title}
              status={banner.status}
              unlockCount={banner.unlockCount}
              endTime={banner.endTime}
              rectangleUrl={banner.rectangleUrl}
            />
          ))}
        </div>
        <div className='flex justify-center'>
          <Link href='/my-page'>
            <CreatorNavigateButton />
          </Link>
        </div>
      </div>
    </div>
  );
}
