import MainLogo from '@/components/icon/MainLogo';
import SearchComponent from '@/components/common/SearchComponent';
import HeaderInfo from '@/components/common/HeaderInfo';

export default function Header() {
  return (
    <div className='h-[100px] flex justify-center items-center px-8'>
      <div className='flex justify-between items-center max-w-[1280px] w-full h-[50px] '>
        <div className='flex items-start gap-[30px]'>
          <MainLogo />
          <SearchComponent />
        </div>
        <HeaderInfo />
      </div>
    </div>
  );
}
