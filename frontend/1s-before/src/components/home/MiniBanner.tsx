import { MiniBannerProps } from '@/types/home';
import Image from 'next/image';
export default function MiniBanner({ image }: Readonly<MiniBannerProps>) {
  return (
    <div className='relative w-[52px] h-[52px] overflow-hidden rounded-lg'>
      <Image src={image} alt='title' layout='fill' className='object-cover w-full h-full' />
      <div className='absolute inset-0 bg-black opacity-30' />
    </div>
  );
}
