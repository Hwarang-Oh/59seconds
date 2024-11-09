'use client';
import { fetchSearchResults } from '@/apis/searchAPI';
import SearchIcon from '@/components/icon/SearchIcon';
import { useState } from 'react';

export default function SearchComponent() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = async () => {
      if(!searchTerm)
          return;
      try {
        const results = await fetchSearchResults(searchTerm);
        console.log('검색 결과:', results); // 결과 출력
      } catch (error) {
        console.error('검색 중 오류 발생:', error);
      }
  };

  return (
    <div className='flex items-center justify-between px-4 rounded-[25px] border-[3px] border-search-border w-[450px] h-[50px] cursor-pointer'>
      <input
        className='w-full text-[16px] font-normal leading-[18px] 
        placeholder:text-search-input placeholder:font-normal placeholder:leading-[18px]
        focus:outline-none focus:border-transparent'
        placeholder='관심있는 이벤트를 검색해보세요.'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
        <button onClick={handleSearch}>
          <SearchIcon />
        </button>
    </div>
  );
}
