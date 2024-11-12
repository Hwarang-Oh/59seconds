import {
  ChangeEvent,
  useState,
  useRef,
  useEffect,
  KeyboardEvent as ReactKeyboardEvent,
} from 'react';
import { useSearchStore } from '@/store/searchStore';
import { fetchAutocompleteResults } from '@/apis/searchAPI';

export function useEventSearch() {
  // IMP: 검색어 상태 정의
  const [searchTerm, setSearchTerm] = useState<string>('');
  // const autoCompletePageRef = useRef(0);
  // IMP: 자동완성 리스트 상태 타입 정의
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const recentSearches = useSearchStore((state) => state.recentSearches);
  const addRecentSearch = useSearchStore((state) => state.addRecentSearch);
  const removeRecentSearch = useSearchStore(
    (state) => state.removeRecentSearch
  );
  const clearAllRecentSearches = useSearchStore(
    (state) => state.clearAllRecentSearches
  );
  // IMP: 키보드 업다운으로 검색 결과 접근하기 위해 index값 저장
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [isSuggestionsVisible, setIsSuggestionsVisible] = useState(false);
  const [isRecentSearchesVisible, setIsRecentSearchesVisible] = useState(true);
  // IMP: 검색창 꺼지도록 하는 기능
  const [isSearchResultVisible, setIsSearchResultVisible] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement | null>(null);

  // IMP: 자동완성 결과 로드
  const handleInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setSearchTerm(value);
    setSelectedIndex(-1);
    setSuggestions([]);

    if (value.trim()) {
      setIsRecentSearchesVisible(false); // 검색어 입력 시 최근 검색 숨김
      setIsSuggestionsVisible(true); // 자동완성 표시

      try {
        const results = await fetchAutocompleteResults(value, 0, 10);
        setSuggestions(results);
      } catch (error) {
        console.error('자동완성 검색 중 오류 발생:', error);
      }
    } else {
      setIsRecentSearchesVisible(true); // 검색어 지워지면 최근 검색 표시
      setSuggestions([]); // 자동완성 리스트 초기화
      setIsSuggestionsVisible(false); // 자동완성 숨김
    }
  };

  // IMP: 검색하면 작동할 것들
  const handleSearch = (
    term: string = searchTerm,
    router?: { push: (url: string) => void }
  ) => {
    const selectedTerm =
      term || (selectedIndex >= 0 ? suggestions[selectedIndex] : searchTerm);
    if (!selectedTerm) return;

    setSearchTerm(selectedTerm);
    addRecentSearch(selectedTerm);
    setIsSuggestionsVisible(false);
    setIsRecentSearchesVisible(false);
    setIsSearchResultVisible(false);
    setSelectedIndex(-1);

    router?.push(`/event-search?term=${encodeURIComponent(term)}`);
  };

  // IMP: 키보드 작동
  const handleKeyDown = (
    e: ReactKeyboardEvent<HTMLInputElement>,
    router?: { push: (url: string) => void }
  ) => {
    const listToNavigate = isRecentSearchesVisible
      ? recentSearches
      : suggestions;

    if (listToNavigate.length === 0) return;

    if (e.key === 'ArrowDown') {
      setSelectedIndex((prevIndex) =>
        prevIndex < listToNavigate.length - 1 ? prevIndex + 1 : 0
      );
    } else if (e.key === 'ArrowUp') {
      setSelectedIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : listToNavigate.length - 1
      );
    } else if (e.key === 'Enter') {
      // 선택된 항목이 있을 경우 검색 실행
      const selectedTerm =
        selectedIndex >= 0 ? listToNavigate[selectedIndex] : searchTerm;
      handleSearch(selectedTerm, router);
    }
  };

  const handleClickTerm = (
    term: string,
    router?: { push: (url: string) => void }
  ) => {
    handleSearch(term, router);
  };

  const handleFocus = () => {
    if (searchTerm) {
      setIsSuggestionsVisible(true);
      setIsRecentSearchesVisible(false);
    } else {
      setIsRecentSearchesVisible(true);
      setIsSuggestionsVisible(false);
    }
    setIsSearchResultVisible(true);
  };

  useEffect(() => {
    const handleClickOutside = (event: PointerEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsSearchResultVisible(false);
      }
    };

    document.addEventListener('pointerdown', handleClickOutside);
    return () => {
      document.removeEventListener('pointerdown', handleClickOutside);
    };
  }, []);

  return {
    searchTerm,
    suggestions,
    selectedIndex,
    recentSearches,
    searchContainerRef,
    isSuggestionsVisible,
    isSearchResultVisible,
    isRecentSearchesVisible,
    handleFocus,
    handleSearch,
    handleKeyDown,
    addRecentSearch,
    handleClickTerm,
    handleInputChange,
    removeRecentSearch,
    clearAllRecentSearches,
    setIsSearchResultVisible,
  };
}
