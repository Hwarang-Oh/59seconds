import Image from 'next/image';
import { LargeBannerProps } from '@/types/home';
export default function LargeBanner({
  id,
  image,
  title,
  content,
  date,
}: Readonly<LargeBannerProps>) {
  return (
    <div className='relative w-full h-[460px] flex items-center justify-center overflow-hidden'>
      <Image src={image} alt={title} fill className='object-cover' quality={100} />
      <div className='absolute inset-0 bg-black opacity-5' />
      <div className='absolute inset-y-10 left-[200px] flex'>
        <div className='relative z-10 p-4 text-left text-black'>
          <p className='text-[40px] font-bold whitespace-pre-line'>{title}</p>
          <p className='mt-2 text-[20px] font-semibold whitespace-pre-line'>{content}</p>
          <p className='mt-4 text-[20px] font-semibold'>{date}</p>
        </div>
      </div>
    </div>
  );
}
