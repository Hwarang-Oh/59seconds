'use client';
import { Clock, Search, X } from 'lucide-react';
import { useEventSearch } from '@/hooks/eventSearchHook';

interface SearchResultProps {
  suggestions?: string[];
  recentSearches?: string[];
  searchTerm?: string;
  selectedIndex?: number;
  onSuggestionClick?: (suggestion: string) => void;
}

export default function SearchResult({
  suggestions = [],
  recentSearches = [],
  searchTerm = '',
  selectedIndex = -1,
  onSuggestionClick,
}: Readonly<SearchResultProps>) {
  const { removeRecentSearch, clearAllRecentSearches } = useEventSearch();

  return (
    <div className="w-full bg-white rounded-xl shadow-lg border-[3px] border-search-border max-h-[400px] overflow-y-auto custom-scrollbar">
      {/* 검색어가 없을 때: 최근 검색어 표시 */}
      {!searchTerm && recentSearches.length > 0 && (
        <div className="p-3">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-gray-600">
              최근 검색어
            </span>
            <button
              className="text-xs text-gray-400 hover:text-gray-600"
              onClick={clearAllRecentSearches}
            >
              전체삭제
            </button>
          </div>

          {recentSearches.map((term, index) => (
            <div
              key={term}
              role="presentation"
              className={`flex items-center justify-between py-2 hover:bg-gray-50 rounded-md px-2 cursor-pointer group ${
                index === selectedIndex ? 'bg-gray-200' : 'hover:bg-gray-50'
              }`}
              onKeyDown={(e) =>
                e.key === 'Enter' &&
                onSuggestionClick &&
                onSuggestionClick(term)
              }
            >
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-700">{term}</span>
              </div>
              <X
                className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100"
                onClick={() => removeRecentSearch(term)}
              />
            </div>
          ))}
        </div>
      )}

      {/* 검색어가 있을 때: 추천 검색어 표시 */}
      {searchTerm && suggestions.length > 0 && (
        <div className="p-3">
          {suggestions.map((suggestion, index) => (
            <div
              key={suggestion}
              role="presentation"
              className={`flex items-center gap-2 py-2 px-2 rounded-md cursor-pointer ${
                index === selectedIndex ? 'bg-gray-200' : 'hover:bg-gray-50'
              }`}
              onKeyDown={(e) =>
                e.key === 'Enter' &&
                onSuggestionClick &&
                onSuggestionClick(suggestion)
              }
            >
              <Search className="w-4 h-4 text-gray-400" />
              <div className="text-sm">
                <span className="text-gray-700">
                  {suggestion.substring(
                    0,
                    suggestion.toLowerCase().indexOf(searchTerm.toLowerCase())
                  )}
                  <strong className="text-blue-500">{searchTerm}</strong>
                  {suggestion.substring(
                    suggestion.toLowerCase().indexOf(searchTerm.toLowerCase()) +
                      searchTerm.length
                  )}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 검색 결과가 없을 때 */}
      {(searchTerm && suggestions.length === 0) ||
      (!searchTerm && recentSearches.length === 0) ? (
        <div className="p-8 text-center text-gray-500">
          검색 결과가 없습니다
        </div>
      ) : null}
    </div>
  );
}
