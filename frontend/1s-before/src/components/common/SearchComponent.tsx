'use client';
import SearchResult from './SearchResult';
import { useRouter } from 'next/navigation';
import SearchIcon from '@/components/icon/SearchIcon';
import { useEventSearch } from '@/hooks/eventSearchHook';

export default function SearchComponent() {
  const router = useRouter();
  const {
    searchTerm,
    suggestions,
    selectedIndex,
    recentSearches,
    searchContainerRef,
    isSearchResultVisible,
    handleFocus,
    handleKeyDown,
    handleClickTerm,
    handleInputChange,
  } = useEventSearch();

  return (
    <div className="relative w-[450px]" ref={searchContainerRef}>
      <div className="flex items-center justify-between px-4 rounded-[25px] border-[3px] border-search-border w-[450px] h-[50px] cursor-pointer">
        <input
          className="w-full text-[16px] font-normal leading-[18px] 
          placeholder:text-search-input placeholder:font-normal placeholder:leading-[18px]
          focus:outline-none focus:border-transparent"
          placeholder="관심있는 이벤트를 검색해보세요."
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onKeyDown={(e) => handleKeyDown(e, router)}
        />
        <button onClick={() => handleClickTerm(searchTerm, router)}>
          <SearchIcon />
        </button>
      </div>
      {isSearchResultVisible && (
        <div className="absolute w-full mt-2 z-10">
          <SearchResult
            suggestions={suggestions}
            recentSearches={recentSearches}
            searchTerm={searchTerm}
            selectedIndex={selectedIndex}
            onSuggestionClick={(suggestion: string) =>
              handleClickTerm(suggestion, router)
            }
            onTermClick={(term: string) => handleClickTerm(term, router)}
          />
        </div>
      )}
    </div>
  );
}
