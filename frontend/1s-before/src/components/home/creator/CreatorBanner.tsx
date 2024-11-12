import Image from 'next/image';
import { CreatorBannerProps } from '@/types/home';

export default function CreatorBanner({ bannerImage }: Readonly<CreatorBannerProps>) {
  return (
    <div className='relative w-full h-[460px] flex items-center justify-center overflow-hidden'>
      <Image src={bannerImage} alt='Creator Banner' fill className='object-cover' quality={100} />
    </div>
  );
}
