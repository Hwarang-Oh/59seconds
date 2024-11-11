import axios from 'axios';
import api from '@/apis/commonAPI';
const SEARCH_URL = 'v1/search';

export const fetchSearchResults = async (query: string): Promise<any> => {
  try {
    const response = await api.get(`${SEARCH_URL}/eventrooms`, { params: { keyword: query } });
    return response.data;
  } catch (error) {
    console.error('Error fetching search results:', error);
    throw new Error('검색 결과를 가져오는 중 오류가 발생했습니다.');
  }
};

export const fetchAutocompleteResults = async (keyword: string): Promise<string[]> => {
  try {
    const response = await axios.get(`${SEARCH_URL}/autocomplete`, {
      params: { keyword },
    });
    return response.data;
  } catch (error) {
    console.error('자동완성 결과를 가져오는 중 오류가 발생했습니다:', error);
    throw new Error('자동완성 결과를 가져오는 중 오류가 발생했습니다.');
  }
};
