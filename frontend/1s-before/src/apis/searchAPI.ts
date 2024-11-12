import api from '@/apis/commonAPI';
import { isAxiosError } from 'axios';
import { PageType } from '@/types/common/common';
const SEARCH_URL = 'v1/search';

export const fetchSearchResults = async (
  query: string,
  page: number,
  size: number
): Promise<PageType> => {
  try {
    const response = await api.get(`${SEARCH_URL}/eventrooms`, {
      params: { keyword: query, page, size },
    });
    return response.data;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      if (error.response?.status === 404) throw new Error('Not Found');
      else throw error;
    } else throw error;
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
