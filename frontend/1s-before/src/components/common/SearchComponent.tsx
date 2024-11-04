import SearchIcon from '@/components/icon/SearchIcon';

export default function SearchComponent() {
  return (
    <div className='flex items-center justify-between px-4 rounded-[25px] border-[3px] border-search-border w-[450px] h-[50px] cursor-pointer'>
      <input
        className='w-full text-[16px] font-normal leading-[18px] 
        placeholder:text-search-input placeholder:font-normal placeholder:leading-[18px]
        focus:outline-none focus:border-transparent'
        placeholder='관심있는 이벤트를 검색해보세요.'
      />
      <SearchIcon />
    </div>
  );
}
