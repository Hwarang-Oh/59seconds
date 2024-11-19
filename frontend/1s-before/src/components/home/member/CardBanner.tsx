import Link from 'next/link';
import Image from 'next/image';
import Banner from '@/assets/defaultBanner.png';
import PresentIcon from '@/components/icon/PresentIcon';
import { useState, useEffect } from 'react';
import { CardBannerProps } from '@/types/home';
import {
  getRemainingTimeInSeconds,
  formatTimeRemaining,
} from '@/utils/timeUtils';
export default function CardBanner({
  eventId,
  title,
  endTime,
  mainPrize,
  prizeCount,
  rectangleImage,
}: Readonly<CardBannerProps>) {
  const [imageSrc, setImageSrc] = useState(rectangleImage);
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

  const mainPrizeText = mainPrize || null;

  return (
    <Link href={`/event-detail/${eventId}`}>
      <div className="flex h-[185px] shadow-md">
        <div className="relative w-[140px] overflow-hidden rounded-l-lg">
          <Image
            src={imageSrc}
            alt={title}
            fill
            className="object-cover"
            onError={() => setImageSrc(Banner.src)}
          />
        </div>
        <div className="flex flex-col w-[280px] justify-center px-5 gap-1 border rounded-r">
          <p className="text-[16px] font-semibold" style={{ color: '#FF7262' }}>
            {timeRemaining} 후 이벤트 시작
          </p>
          <p className="text-lg font-bold whitespace-pre-line">{title}</p>
          <div className="flex gap-1.5 items-center text-base">
            <PresentIcon />
            {mainPrizeText ? (
              <>
                <span className="font-bold">{mainPrize}</span> 외 {prizeCount}{' '}
                개의 상품
              </>
            ) : (
              '상품이 없습니다.'
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
