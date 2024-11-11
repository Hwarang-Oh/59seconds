import {
  ChangeEvent,
  useState,
  useRef,
  useEffect,
  KeyboardEvent as ReactKeyboardEvent,
} from 'react';
import { useSearchStore } from '@/store/searchStore';
import { fetchSearchResults, fetchAutocompleteResults } from '@/apis/searchAPI';

export function useEventSearch() {
  const [autoCompletePage, setAutoCompletePage] = useState(0); // 자동완성 페이지 관리
  const [searchResultPage, setSearchResultPage] = useState(0); // 검색 결과 페이지 관리
  const [searchTerm, setSearchTerm] = useState<string>(''); // 검색어 상태 타입 정의
  const [suggestions, setSuggestions] = useState<string[]>([]); // 자동완성 리스트 상태 타입 정의
  const [searchResults, setSearchResults] = useState<any[]>([]); // 검색 결과 리스트 상태
  const [isLoadingMoreResults, setIsLoadingMoreResults] = useState(false); // 추가 결과 로딩 상태
  const recentSearches = useSearchStore((state) => state.recentSearches);
  const addRecentSearch = useSearchStore((state) => state.addRecentSearch);
  const removeRecentSearch = useSearchStore(
    (state) => state.removeRecentSearch
  );
  const clearAllRecentSearches = useSearchStore(
    (state) => state.clearAllRecentSearches
  );
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [isSearchResultVisible, setIsSearchResultVisible] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement | null>(null);

  // 자동완성 결과 로드
  const handleInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setSearchTerm(value);
    setSelectedIndex(-1);
    setAutoCompletePage(0);
    setSuggestions([]);

    if (value.trim()) {
      try {
        const results = await fetchAutocompleteResults(
          value,
          autoCompletePage,
          10
        );
        setSuggestions(results);
        console.log('자동완성 결과:', results);
      } catch (error) {
        console.error('자동완성 검색 중 오류 발생:', error);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSearch = async (
    selectedTerm?: string,
    router?: { push: (url: string) => void }
  ) => {
    const term =
      selectedTerm ??
      (selectedIndex >= 0 ? suggestions[selectedIndex] : searchTerm);
    if (!term) return;

    setSearchTerm(term);
    setSearchResults([]);
    setSearchResultPage(0);
    setIsLoadingMoreResults(true);

    try {
      const results = await fetchSearchResults(term, searchResultPage, 10);
      setSearchResults(results.data);
      addRecentSearch(term);
      setIsSearchResultVisible(false);
      router?.push(`/event-search?term=${encodeURIComponent(term)}`);
    } catch (error) {
      console.error('검색 중 오류 발생:', error);
    } finally {
      setIsLoadingMoreResults(false);
    }
  };

  // 무한 스크롤 로드 함수
  const loadMoreResults = async () => {
    if (isLoadingMoreResults) return;

    setIsLoadingMoreResults(true);
    try {
      const nextPage = searchResultPage + 1;
      const results = await fetchSearchResults(searchTerm, nextPage, 10);
      setSearchResults((prevResults) => [...prevResults, ...results.data]);
      setSearchResultPage(nextPage);
    } catch (error) {
      console.error('추가 검색 중 오류 발생:', error);
    } finally {
      setIsLoadingMoreResults(false);
    }
  };

  // 스크롤 감지하여 로드 추가
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100
      ) {
        loadMoreResults();
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [searchTerm, searchResultPage]);

  const handleKeyDown = (
    e: ReactKeyboardEvent<HTMLInputElement>,
    router?: { push: (url: string) => void }
  ) => {
    if (e.key === 'ArrowDown') {
      setSelectedIndex((prevIndex) =>
        prevIndex < suggestions.length - 1 ? prevIndex + 1 : 0
      );
    } else if (e.key === 'ArrowUp') {
      setSelectedIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : suggestions.length - 1
      );
    } else if (e.key === 'Enter') {
      handleSearch(undefined, router);
    }
  };

  const handleClickTerm = (
    term: string,
    router?: { push: (url: string) => void }
  ) => {
    handleSearch(term, router);
  };

  const handleClickSuggestion = (
    suggestion: string,
    router?: { push: (url: string) => void }
  ) => {
    handleSearch(suggestion, router);
  };

  const handleGlobalKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsSearchResultVisible(false);
    }
  };
  const handleClickOutside = (event: PointerEvent) => {
    if (
      searchContainerRef.current &&
      !searchContainerRef.current.contains(event.target as Node)
    ) {
      setIsSearchResultVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('pointerdown', handleClickOutside);
    document.addEventListener('keydown', handleGlobalKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handleClickOutside);
      document.removeEventListener('keydown', handleGlobalKeyDown);
    };
  }, [suggestions, selectedIndex]);

  const handleFocus = () => {
    setIsSearchResultVisible(true);
  };

  return {
    searchTerm,
    suggestions,
    searchResults,
    selectedIndex,
    recentSearches,
    searchContainerRef,
    isSearchResultVisible,
    isLoadingMoreResults,
    handleFocus,
    handleSearch,
    handleKeyDown,
    addRecentSearch,
    handleInputChange,
    removeRecentSearch,
    handleClickTerm,
    handleClickSuggestion,
    clearAllRecentSearches,
  };
}
