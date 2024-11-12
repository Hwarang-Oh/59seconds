import { UserData, ParticipatedRoom, CreatedRoom } from '@/types/user';
import { isAxiosError } from 'axios';
import api from '@/apis/commonAPI';
const MEMBER_URL = '/v1/members';

// IMP: 개설자 정보 GET
export const fetchCreatorInfo = async (): Promise<UserData> => {
  try {
    const response = await api.get(MEMBER_URL);
    return response.data;
  } catch (error) {
    console.error('기존 정보 가져오기 오류:', error);
    throw error;
  }
};

// IMP: 개설자 정보 수정
export const putCreatorInfo = async (formData: FormData): Promise<string> => {
  try {
    const response = await api.put(`${MEMBER_URL}/update-from-event`, formData);

    if (response.status === 200) {
      console.log('업데이트 성공');
      return '업데이트 성공';
    } else {
      console.error('업데이트 실패');
      return '업데이트 실패';
    }
  } catch (error) {
    if (isAxiosError(error)) {
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
    const response = await api.put(`${MEMBER_URL}/participateName`, null, {
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
    const response = await api.put(`${MEMBER_URL}/creatorName`, null, {
      params: { creatorName },
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
    const response = await api.put(`${MEMBER_URL}/address`, null, {
      params: { address },
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
    const response = await api.put(`${MEMBER_URL}/phone`, null, {
      params: { phone },
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
    const response = await api.put(`${MEMBER_URL}/profileImage`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
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
    const response = await api.put(`${MEMBER_URL}/creatorIntroduce`, null, {
      params: { creatorIntroduce },
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
    const response = await api.put(`${MEMBER_URL}/snsLink`, null, {
      params: { snsLink },
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
      `${MEMBER_URL}/participatedroom`,
      {
        params: { memberId },
      }
    );
    return response.data;
  } catch (error) {
    console.error('참여한 방 가져오기 실패:', error);
    throw error;
  }
};

// IMP: 생성한 이벤트 방 정보 호출
export const fetchCreatedRooms = async (
  memberId: number
): Promise<CreatedRoom[]> => {
  try {
    const response = await api.get<CreatedRoom[]>(`${MEMBER_URL}/createdroom`, {
      params: { memberId },
    });
    return response.data;
  } catch (error) {
    console.error('개설한 방 가져오기 실패:', error);
    throw error;
  }
};
