import Link from 'next/link';
import Image from 'next/image';
import ColorThief from 'colorthief';
import parse from 'html-react-parser';
import Banner from '@/assets/defaultBanner.png';
import { LargeBannerProps } from '@/types/home';
import { useState, useEffect, useRef } from 'react';
import { truncateHtmlByTotalLength } from '@/utils/wordUtils';

export default function LargeBanner({
  eventId,
  title,
  description,
  endTime,
  bannerImage,
}: Readonly<LargeBannerProps>) {
  const [imageSrc, setImageSrc] = useState(bannerImage);
  const [textColor, setTextColor] = useState<string>('black');
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && imageRef.current) {
      const colorThief = new ColorThief();
      const image = imageRef.current;

      const handleLoad = () => {
        try {
          const dominantColor = colorThief.getColor(image);
          console.log('Dominant color:', dominantColor);

          const [r, g, b] = dominantColor;
          const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
          const luminanceThreshold = 160;
          setTextColor(luminance > luminanceThreshold ? 'black' : 'white');
        } catch (error) {
          console.error('Color extraction failed:', error);
        }
      };

      if (image.complete) {
        handleLoad();
      } else {
        image.addEventListener('load', handleLoad);
      }

      return () => {
        image.removeEventListener('load', handleLoad);
      };
    }
  }, [imageSrc]);

  return (
    <div className="relative w-full h-[460px] flex items-center justify-center overflow-hidden">
      {/* 숨겨진 이미지로 색상 추출 */}
      <img
        ref={imageRef}
        src={imageSrc}
        alt={title}
        className="hidden"
        crossOrigin="anonymous" // CORS 이슈 방지
      />

      {/* 배너 이미지 */}
      <Image
        src={imageSrc}
        alt={title}
        fill
        className="object-cover"
        quality={100}
        onError={() => setImageSrc(Banner.src)}
      />

      <div className="absolute inset-0 bg-black opacity-5" />

      <Link href={`/event-detail/${eventId}`}>
        <div className="absolute inset-y-10 left-[200px] flex">
          <div
            className="relative z-10 p-4 text-left drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]"
            style={{ color: textColor }} // 동적으로 텍스트 색상 설정
          >
            <p
              className="text-[40px] w-[130vh] font-bold whitespace-pre-line"
              style={{
                display: '-webkit-box',
                WebkitLineClamp: 2, // 최대 두 줄로 제한
                WebkitBoxOrient: 'vertical',
              }}
            >
              {title}
            </p>
            <div
              className="mt-2 font-semibold whitespace-pre-line overflow-hidden text-ellipsis w-[500px]"
              style={{
                display: '-webkit-box',
                WebkitLineClamp: 6, // 최대 세 줄로 제한
                WebkitBoxOrient: 'vertical',
              }}
            >
              {parse(truncateHtmlByTotalLength(description, 120))}
            </div>
            <p className="mt-4 text-[20px] font-semibold">
              {new Date(endTime).toLocaleString()}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}
