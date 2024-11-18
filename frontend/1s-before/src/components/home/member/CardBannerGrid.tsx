import CardBanner from '@/components/home/member/CardBanner'; // 앞서 만든 CardBanner 컴포넌트를 가져옵니다.
import { CardBannerListProps } from '@/types/home';

export default function CardBannerGrid({ Banners }: Readonly<CardBannerListProps>) {
  return (
    <div className='max-w-screen-xl mx-auto'>
      <div className='flex flex-col gap-7'>
        <div className='flex items-center justify-between'>
          <p className='text-3xl font-bold'>마감 임박</p>
        </div>
        <div className='grid grid-cols-2 md:grid-cols-3 gap-5'>
          {Banners.map((banner) => (
            <CardBanner
              key={banner.eventId}
              eventId={banner.eventId}
              title={banner.title}
              endTime={banner.endTime}
              mainPrize={banner.mainPrize}
              prizeCount={banner.prizeCount}
              rectangleImage={banner.rectangleImage}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
