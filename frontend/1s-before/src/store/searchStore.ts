import { create } from 'zustand';

interface RecentSearchState {
  recentSearches: string[];
  addRecentSearch: (searchTerm: string) => void;
  removeRecentSearch: (searchTerm: string) => void;
  clearAllRecentSearches: () => void;
}

export const useSearchStore = create<RecentSearchState>((set) => ({
  recentSearches: JSON.parse(sessionStorage.getItem('recentSearches') || '[]'),

  // IMP: 검색어 추가 함수
  addRecentSearch: (searchTerm: string) =>
    set((state) => {
      const updatedSearches = [
        searchTerm,
        ...state.recentSearches.filter((term) => term !== searchTerm),
      ].slice(0, 100);

      sessionStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
      return { recentSearches: updatedSearches };
    }),

  // IMP: 특정 검색어 삭제 함수
  removeRecentSearch: (searchTerm: string) =>
    set((state) => {
      const updatedSearches = state.recentSearches.filter(
        (term) => term !== searchTerm
      );

      sessionStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
      return { recentSearches: updatedSearches };
    }),

  // IMP: 전체 검색어 삭제 함수
  clearAllRecentSearches: () =>
    set(() => {
      sessionStorage.removeItem('recentSearches');
      return { recentSearches: [] };
    }),
}));
