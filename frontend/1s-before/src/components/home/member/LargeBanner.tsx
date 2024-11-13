import Image from 'next/image';
import Link from 'next/link';
import { LargeBannerProps } from '@/types/home';
export default function LargeBanner({
  eventId,
  title,
  description,
  endTime,
  bannerImage,
  rectangleImage,
}: Readonly<LargeBannerProps>) {
  const a = 'https://inflearn-nextjs.vercel.app/example.jpg';
  return (
    <div className='relative w-full h-[460px] flex items-center justify-center overflow-hidden'>
      <Image src={a} alt={title} fill className='object-cover' quality={100} />
      {/* <img src={bannerImage} alt={title} className='object-cover h-full' /> */}
      <div className="absolute inset-0 bg-black opacity-5" />
      <Link href={`/event-detail/${eventId}`}>
        <div className="absolute inset-y-10 left-[200px] flex">
          <div className="relative z-10 p-4 text-left text-black">
            <p className="text-[40px] font-bold whitespace-pre-line">{title}</p>
            <p className="mt-2 text-[20px] font-semibold whitespace-pre-line">
              {description}
            </p>
            <p className="mt-4 text-[20px] font-semibold">
              {new Date(endTime).toLocaleString()}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}
