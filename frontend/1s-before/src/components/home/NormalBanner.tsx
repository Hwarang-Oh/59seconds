import Image from 'next/image';
import Link from 'next/link';
import Banner from '@/assets/defaultBanner.png';
import DeadlineButton from '@/components/home/member/DeadlineButton';
import ParticipantButton from '@/components/home/member/ParticipantButton';
import { useState } from 'react';
import { NormalBannerProps } from '@/types/home';
export default function NormalBanner({
  eventId,
  title,
  ranking,
  endTime,
  unlockCount,
  isDeadline,
  mainPrize,
  prizeCount,
  rectangleImage,
}: Readonly<NormalBannerProps>) {
  const [imageSrc, setImageSrc] = useState(rectangleImage);
  return (
    <div className='flex flex-col w-[240px]'>
      <Link href={`/event-detail/${eventId}`}>
        <div className='relative w-[240px] h-[320px] overflow-hidden rounded-lg'>
          <Image
            src={imageSrc}
            alt={title}
            fill
            className='object-cover'
            quality={100}
            onError={() => setImageSrc(Banner.src)}
          />
          <div
            className='absolute bottom-3 left-4 text-white text-[60px] font-bold'
            style={{
              textShadow: '0px 4px 4px rgba(0, 0, 0, 0.20)',
              fontFamily: '"Segoe UI", sans-serif',
            }}>
            {ranking}
          </div>
        </div>

        {/* 내용 */}
        <div className='py-[5px]'>
          <p className='text-lg font-bold whitespace-pre-line'>{title}</p>
          <p className='text-base'>
            {mainPrize} 외 {prizeCount} 개의 상품
          </p>
          <p className='text-bse text-gray-400'>{new Date(endTime).toLocaleString()}</p>
        </div>
      </Link>
      {/* 참가자 수와 마감 임박 배지 */}
      <div className='flex justify-start gap-5 items-center'>
        <ParticipantButton unlockCount={unlockCount} />
        {isDeadline && <DeadlineButton />}
      </div>
    </div>
  );
}
