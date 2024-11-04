import MainLogo from '@/components/common/MainLogo';
import SearchComponent from '@/components/common/SearchComponent';
import HeaderInfo from '@/components/common/HeaderInfo';

export default function HeaderComponent() {
  return (
    <div>
      <MainLogo />
      <SearchComponent />
      <HeaderInfo />
    </div>
  );
}
