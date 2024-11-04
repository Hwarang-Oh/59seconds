import { CardBannerProps } from '@/types/home';
import Image from 'next/image';
export default function CardBanner({ image, title, leftTime, details }: Readonly<CardBannerProps>) {
  return (
    <div className='flex border rounded-lg shadow-md overflow-hidden w-[400px] h-[180px]'>
      {/* 이미지 영역 */}
      <div className='relative w-[140px] h-[180px] overflow-hidden rounded-lg'>
        <Image src={image} alt={title} layout='fill' className='w-full h-full object-cover' />
      </div>

      {/* 텍스트 정보 영역 */}
      <div className='w-[260px] flex flex-col justify-center'>
        <p className='text-sm text-red-500 font-semibold'>{leftTime} 후 이벤트 시작</p>
        <h3 className='text-lg font-semibold mt-1'>{title}</h3>
        <p className='text-sm text-gray-600 mt-2'>
          🎁 <span className='font-bold'>{details}</span> 외 {details}개의 상품
        </p>
      </div>
    </div>
  );
}
