import Link from 'next/link';
import Image from 'next/image';
import Banner from '@/assets/defaultBanner.png';
import CreatorEventStatusButton from '@/components/home/creator/CreatorEventStatusButton';
import { useState, useEffect } from 'react';
import { CreatorEventTypes } from '@/types/home';
import { getRemainingTimeInSeconds, formatTimeRemaining } from '@/utils/timeUtils';
export default function CreatorCardBanner({
  eventId,
  title,
  status,
  unlockCount,
  endTime,
  rectangleUrl,
}: Readonly<CreatorEventTypes>) {
  const [imageSrc, setImageSrc] = useState(rectangleUrl);
  const participantLabel = status === 'ONGOING' ? '예상 참여자' : '최종 참여자';
  const [timeRemaining, setTimeRemaining] = useState('');
  useEffect(() => {
    const updateTimeRemaining = () => {
      const remainingSeconds = getRemainingTimeInSeconds(endTime);
      setTimeRemaining(formatTimeRemaining(remainingSeconds));
    };
    updateTimeRemaining();
    const intervalId = setInterval(updateTimeRemaining, 1000);
    return () => clearInterval(intervalId);
  }, [endTime]);

  return (
    <Link href={`/event-detail/${eventId}`}>
      <div className='flex h-[185px] shadow-md'>
        <div className='relative w-[140px] overflow-hidden rounded-l-lg'>
          <Image
            src={imageSrc}
            alt={title}
            fill
            className='object-cover'
            onError={() => setImageSrc(Banner.src)}
          />
        </div>
        <div className='flex flex-col w-[280px] justify-center px-5 gap-1 border rounded-r'>
          <CreatorEventStatusButton status={status} />
          <p className='text-[16px] font-semibold' style={{ color: '#FF7262' }}>
            {timeRemaining} 후 이벤트 시작
          </p>
          <p className='text-lg font-bold whitespace-pre-line'>{title}</p>
          <div className='flex gap-1.5 items-center text-base'>
            <p>{participantLabel}:</p>
            <span className='font-bold'>{unlockCount}명</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
