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
  const [searchTerm, setSearchTerm] = useState<string>(''); // 검색어 상태 타입 정의
  const [suggestions, setSuggestions] = useState<string[]>([]); // 자동완성 리스트 상태 타입 정의
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

  const handleInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setSearchTerm(value);
    setSelectedIndex(-1);

    if (value.trim()) {
      try {
        const results = await fetchAutocompleteResults(value);
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
    try {
      const results = await fetchSearchResults(term);
      console.log('검색 결과:', results);

      addRecentSearch(term);
      setSearchTerm('');
      setSuggestions([]);
      setSelectedIndex(-1);
      setIsSearchResultVisible(false);

      router?.push(`/event-search?term=${encodeURIComponent(term)}`);
    } catch (error) {
      console.error('검색 중 오류 발생:', error);
    }
  };

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
    selectedIndex,
    recentSearches,
    searchContainerRef,
    isSearchResultVisible,
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
