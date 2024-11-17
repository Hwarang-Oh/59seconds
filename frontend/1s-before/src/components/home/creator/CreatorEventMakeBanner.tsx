import Link from 'next/link';
import Image from 'next/image';
import CreateBanner from '@/assets/CreateBanner.png';

export default function CreatorEventMakeBanner() {
  return (
    <div className='flex max-w-screen-xl mx-auto pb-20 cursor-pointer'>
      <Link href='/event-create'>
        <Image src={CreateBanner} alt='Create Event Banner' />
      </Link>
    </div>
  );
}
