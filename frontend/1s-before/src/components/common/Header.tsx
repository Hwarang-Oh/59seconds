'use client';
import Link from 'next/link';
import MainLogo from '@/components/icon/MainLogo';
import HeaderInfo from '@/components/common/HeaderInfo';
import SearchComponent from '@/components/common/SearchComponent';

export default function Header() {
  return (
    <div className='h-[100px] flex justify-center items-center px-7'>
      <div className='flex justify-between items-center max-w-screen-xl w-full h-[50px] '>
        <div className='flex items-start gap-[30px]'>
          <Link href='/'>
            <MainLogo />
          </Link>
          <SearchComponent />
        </div>
        <HeaderInfo />
      </div>
    </div>
  );
}
