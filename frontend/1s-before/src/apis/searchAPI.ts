import axios from 'axios';
import api from '@/apis/commonAPI';
const SEARCH_URL = 'v1/search';

export const fetchSearchResults = async (
  query: string,
  page: number,
  size: number
): Promise<any> => {
  try {
    const response = await api.get(`${SEARCH_URL}/eventrooms`, {
      params: { keyword: query, page, size },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching search results:', error);
    throw new Error('검색 결과를 가져오는 중 오류가 발생했습니다.');
  }
};

export const fetchAutocompleteResults = async (
  keyword: string,
  page: number,
  size: number
): Promise<string[]> => {
  try {
    const response = await api.get(`${SEARCH_URL}/autocomplete`, {
      params: { keyword, page, size },
    });
    return response.data;
  } catch (error) {
    console.error('자동완성 결과를 가져오는 중 오류가 발생했습니다:', error);
    throw new Error('자동완성 결과를 가져오는 중 오류가 발생했습니다.');
  }
};
