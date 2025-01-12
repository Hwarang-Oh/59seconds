import Link from 'next/link';
import NormalBanner from '@/components/home/NormalBanner';
import NavigateButton from '@/components/home/member/NavigateButton';
import { NormalBannerListProps } from '@/types/home';

export default function NormalBannerList({ Banners }: Readonly<NormalBannerListProps>) {
  return (
    <div className='max-w-screen-xl mx-auto'>
      <div className='flex flex-col gap-7'>
        <p className='text-3xl font-bold'>인기 이벤트</p>
        <div className='flex items-center justify-center gap-5'>
          {Banners.map((banner, index) => (
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
          <Link href='/event-view'>
            <NavigateButton />
          </Link>
        </div>
      </div>
    </div>
  );
}
