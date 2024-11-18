import Image from 'next/image';
import Banner from '@/assets/defaultBanner.png';
import { useState } from 'react';
import { CreatorBannerProps } from '@/types/home';

export default function CreatorBanner({ bannerImage }: Readonly<CreatorBannerProps>) {
  const [imageSrc, setImageSrc] = useState(bannerImage);
  return (
    <div className='relative w-full h-[460px] flex items-center justify-center overflow-hidden'>
      <Image
        src={imageSrc}
        alt='Creator Banner'
        fill
        className='object-cover'
        quality={100}
        onError={() => setImageSrc(Banner.src)}
      />
    </div>
  );
}
