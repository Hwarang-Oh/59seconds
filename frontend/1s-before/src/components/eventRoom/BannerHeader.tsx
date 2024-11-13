import Image from 'next/image';
import { BannerHeaderProps } from '@/types/eventRoom';
export default function BannerHeader({
  bannerImage,
}: Readonly<BannerHeaderProps>) {
  return (
    <div className="relative h-[170px] w-full mx-auto">
      <Image
        src={bannerImage}
        alt="배너 이미지"
        fill
        className="object-cover"
        quality={100}
      />
    </div>
  );
}
