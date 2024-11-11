import Image from 'next/image';
import PresentIcon from '@/components/icon/PresentIcon';
import { CardBannerProps } from '@/types/home';
export default function CardBanner({
  eventId,
  title,
  leftTime,
  mainPrize,
  prizeCount,
  rectangleImage,
}: Readonly<CardBannerProps>) {
  return (
    <div className='flex h-[185px] shadow-md'>
      <div className='relative w-[140px] overflow-hidden rounded-l-lg'>
        <Image src={rectangleImage} alt={title} fill className='object-cover' />
      </div>

      <div className='flex flex-col w-[280px] justify-center px-5 gap-1 border rounded-r'>
        <p className='text-[16px] font-semibold' style={{ color: '#FF7262' }}>
          {leftTime} 후 이벤트 시작
        </p>
        <p className='text-lg font-bold whitespace-pre-line'>{title}</p>
        <div className='flex gap-1.5 items-center text-base'>
          <PresentIcon />
          <span className='font-bold'>{mainPrize}</span> 외 {prizeCount} 개의 상품
        </div>
      </div>
    </div>
  );
}
