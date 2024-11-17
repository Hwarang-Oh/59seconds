import Image from 'next/image';
import Banner from '@/assets/defaultBanner.png';
import { useState } from 'react';
import { BannerHeaderProps } from '@/types/eventRoom';
export default function BannerHeader({ bannerImage }: Readonly<BannerHeaderProps>) {
  const [imageSrc, setImageSrc] = useState(bannerImage);
  return (
    <div className='relative h-[170px] w-full mx-auto'>
      <Image
        src={imageSrc}
        alt='배너 이미지'
        fill
        className='object-cover'
        quality={100}
        onError={() => setImageSrc(Banner.src)}
      />
    </div>
  );
}
