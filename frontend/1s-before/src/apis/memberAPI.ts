import axios from 'axios';

const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/v1/members`;

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const creatorInfoPut = async (formData: FormData): Promise<string> => {
  try {
    const response = await api.put('/update-from-event', formData, {
      headers: {
        memberId: 1,
      },
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
