import MainLogo from '@/components/icon/MainLogo';
import SearchComponent from '@/components/common/SearchComponent';
import HeaderInfo from '@/components/common/HeaderInfo';

export default function Header() {
  return (
    <div className='flex items-center justify-around'>
      <div className='flex justify-center items-start gap-[30px]'>
        <MainLogo />
        <SearchComponent />
      </div>
      <HeaderInfo />
    </div>
  );
}
