import Image from 'next/image';

export default function InfluencerBanner(bannerImage: string) {
  return (
    <div className='relative w-full h-[460px] flex items-center justify-center overflow-hidden'>
      <Image
        src={`/${bannerImage}`}
        alt='InfluencerBanner'
        fill
        className='object-cover'
        quality={100}
      />
    </div>
  );
}
