import { UserData, ParticipatedRoom, CreatedRoom } from '@/types/user';
import axios from 'axios';

const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/v1`;

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// IMP: 개설자 정보 GET
export const fetchCreatorInfo = async (): Promise<UserData> => {
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

// IMP: 참여자 이름 업데이트
export const putParticipateName = async (
  participateName: string,
  memberId: number
): Promise<string> => {
  try {
    const response = await api.put('/members/participateName', null, {
      params: { participateName },
      headers: { memberId },
    });
    return response.status === 200 ? '업데이트 성공' : '업데이트 실패';
  } catch (error) {
    console.error('participateName 업데이트 오류:', error);
    throw error;
  }
};

// IMP: 개설자 이름 업데이트
export const putCreatorName = async (creatorName: string): Promise<string> => {
  try {
    const response = await api.put('/members/creatorName', null, {
      params: { creatorName },
      headers: { memberId: 1 },
    });
    return response.status === 200 ? '업데이트 성공' : '업데이트 실패';
  } catch (error) {
    console.error('creatorName 업데이트 오류:', error);
    throw error;
  }
};

// IMP: 주소 업데이트
export const putAddress = async (address: string): Promise<string> => {
  try {
    const response = await api.put('/members/address', null, {
      params: { address },
      headers: { memberId: 1 },
    });
    return response.status === 200 ? '업데이트 성공' : '업데이트 실패';
  } catch (error) {
    console.error('address 업데이트 오류:', error);
    throw error;
  }
};

// IMP: 전화번호 업데이트
export const putPhone = async (phone: string): Promise<string> => {
  try {
    const response = await api.put('/members/phone', null, {
      params: { phone },
      headers: { memberId: 1 },
    });
    return response.status === 200 ? '업데이트 성공' : '업데이트 실패';
  } catch (error) {
    console.error('phone 업데이트 오류:', error);
    throw error;
  }
};

// IMP: 프로필 이미지 업데이트
export const putProfileImage = async (profileImage: File): Promise<string> => {
  const formData = new FormData();
  formData.append('profileImage', profileImage);

  try {
    const response = await api.put('/members/profileImage', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        memberId: 1,
      },
    });
    return response.status === 200 ? '업데이트 성공' : '업데이트 실패';
  } catch (error) {
    console.error('profileImage 업데이트 오류:', error);
    throw error;
  }
};

// IMP: 개설자 소개 업데이트
export const putCreatorIntroduce = async (
  creatorIntroduce: string
): Promise<string> => {
  try {
    const response = await api.put('/members/creatorIntroduce', null, {
      params: { creatorIntroduce },
      headers: { memberId: 1 },
    });
    return response.status === 200 ? '업데이트 성공' : '업데이트 실패';
  } catch (error) {
    console.error('creatorIntroduce 업데이트 오류:', error);
    throw error;
  }
};

// IMP: SNS 링크 업데이트
export const putSnsLink = async (snsLink: string): Promise<string> => {
  try {
    const response = await api.put('/members/snsLink', null, {
      params: { snsLink },
      headers: { memberId: 1 },
    });
    return response.status === 200 ? '업데이트 성공' : '업데이트 실패';
  } catch (error) {
    console.error('snsLink 업데이트 오류:', error);
    throw error;
  }
};

// IMP: 참여한 이벤트 호출
export const fetchParticipatedRooms = async (
  memberId: number
): Promise<ParticipatedRoom[]> => {
  try {
    const response = await api.get<ParticipatedRoom[]>(
      '/members/participatedroom',
      {
        params: { memberId },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching participated rooms:', error);
    throw error;
  }
};

// IMP: 생성한 이벤트 방 정보 호출
export const fetchCreatedRooms = async (
  memberId: number
): Promise<CreatedRoom[]> => {
  try {
    const response = await api.get<CreatedRoom[]>('/members/createdroom', {
      params: { memberId },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching created rooms:', error);
    throw error;
  }
};
