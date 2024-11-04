import Image from 'next/image';
import MiniBanner from '@/components/home/MiniBanner';
import { LargeBannerProps } from '@/types/home';
export default function LargeBanner({ image, title, content, date }: Readonly<LargeBannerProps>) {
  return (
    <div className='relative w-full h-[460px] flex items-center justify-center overflow-hidden'>
      {/* 로컬 이미지 배경 */}
      <Image src={image} alt={title} layout='fill' objectFit='cover' quality={100} />

      {/* 오버레이 */}
      <div className='absolute inset-0 bg-black opacity-10' />

      {/* 텍스트 내용 */}
      <div className='absolute inset-y-0 left-10 flex items-center '>
        <div className='relative z-10 p-4 text-left text-white max-w-md'>
          <h2 className='text-2xl font-bold whitespace-pre-line'>{title}</h2>
          <p className='mt-2 text-sm max-w-sm whitespace-pre-line'>{content}</p>
          <p className='mt-4 text-sm font-light'>{date}</p>
        </div>
      </div>
      <div className='absolute bottom-10 left-10 flex justify-center gap-4 mt-4'>
        <MiniBanner image={image} />
        <MiniBanner image={image} />
        <MiniBanner image={image} />
        <MiniBanner image={image} />
        <MiniBanner image={image} />
        <MiniBanner image={image} />
      </div>
    </div>
  );
}
