import { MiniBannerProps } from '@/types/home';
import Image from 'next/image';
export default function MiniBanner({ rectImage, isSelected, onClick }: Readonly<MiniBannerProps>) {
  return (
    <div className='relative w-[52px] h-[52px] overflow-hidden rounded-lg' onClick={onClick}>
      <Image src={rectImage} alt='title' layout='fill' className='object-cover w-full h-full' />
      <div className='absolute inset-0 bg-black opacity-30' />
    </div>
  );
}
