import { EventOwnerData } from '@/types/eventCreate';
import axios from 'axios';

const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/v1`;

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// IMP: 개설자 정보 GET
export const fetchCreatorInfo = async (): Promise<EventOwnerData> => {
  try {
    const response = await api.get('/members', {
      headers: { memberId: 1 },
    });
    return response.data;
  } catch (error) {
    console.error('기존 정보 가져오기 오류:', error);
    throw error;
  }
};

// IMP: 개설자 정보 수정
export const putCreatorInfo = async (formData: FormData): Promise<string> => {
  try {
    const response = await api.put('/members/update-from-event', formData, {
      headers: { memberId: 1 },
    });

    if (response.status === 200) {
      console.log('업데이트 성공');
      return '업데이트 성공';
    } else {
      console.error('업데이트 실패');
      return '업데이트 실패';
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('API 오류:', error.message);
      return 'API 오류 발생';
    } else {
      console.error('알 수 없는 오류:', error);
      return '알 수 없는 오류 발생';
    }
  }
};
