import { NormalBannerProps } from '@/types/home';
import Image from 'next/image';
export default function NormalBanner({
  image,
  title,
  details,
  date,
  participants,
  isDeadline,
}: Readonly<NormalBannerProps>) {
  return (
    <div className='flex-row w-[240px]'>
      <div className='relative w-[240px] h-[320px] overflow-hidden rounded-lg'>
        <Image src={image} alt={title} layout='fill' className='w-full h-[150px] object-cover' />
        <div className='absolute bottom-2 left-2 text-white text-3xl font-bold'>1</div>
      </div>

      {/* 내용 */}
      <div className='p-4'>
        <h3 className='text-lg font-semibold'>{title}</h3>
        <p className='text-sm text-gray-500'>{details}</p>
        <p className='text-xs text-gray-400 mt-1'>{date}</p>
      </div>

      {/* 참가자 수와 마감 임박 배지 */}
      <div className='flex justify-between items-center px-4 pb-4'>
        <span className='text-xs bg-blue-100 text-blue-600 font-semibold px-2 py-1 rounded-full'>
          {participants}
        </span>
        {isDeadline && (
          <span className='text-xs bg-red-100 text-red-600 font-semibold px-2 py-1 rounded-full'>
            마감임박
          </span>
        )}
      </div>
    </div>
  );
}
