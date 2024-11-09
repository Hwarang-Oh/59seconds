
import axios from 'axios';

const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/v1`;

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const fetchSearchResults = async (query: string): Promise<any> => {
    try {
        const response = await api.get('/search/eventrooms', { params: { keyword: query } });
        return response.data;
    } catch (error) {
        console.error('Error fetching search results:', error);
        throw new Error('검색 결과를 가져오는 중 오류가 발생했습니다.');
    }
};
