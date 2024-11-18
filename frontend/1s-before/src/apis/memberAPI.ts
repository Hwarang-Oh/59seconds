import { UserData, ParticipatedRoom, CreatedRoom } from '@/types/user';
import { MemberInfo } from '@/types/common/common';
import { isAxiosError } from 'axios';
import api from '@/apis/commonAPI';
const MEMBER_URL = '/members';
const OAUTH_URL = '/oauth2';

// IMP : Kakao Oauth 로그인
export const getLogin = async (OauthCode: string): Promise<MemberInfo> => {
  try {
    const response = await api.get(`${OAUTH_URL}/kakao/callback`, {
      params: { code: OauthCode },
      withCredentials: true,
    });
    return response.data;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      if (error.response?.status === 404) throw new Error('Not Found');
      else throw error;
    } else throw error;
  }
};

// IMP : Kakao Oauth 로그아웃
export const getLogout = async (): Promise<void> => {
  try {
    await api.post(`${OAUTH_URL}/logout`);
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      if (error.response?.status === 404) throw new Error('Not Found');
      else throw error;
    } else throw error;
  }
};

// IMP: 개설자 정보 GET
export const fetchCreatorInfo = async (): Promise<UserData> => {
  try {
    const response = await api.get(MEMBER_URL);
    return response.data;
  } catch (error) {
    console.error('기본 정보 가져오기 오류:', error);
    throw error;
  }
};

// IMP: 개설자 정보 수정
export const putCreatorInfo = async (formData: FormData): Promise<string> => {
  try {
    const response = await api.put(`${MEMBER_URL}/update-from-event`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (response.status === 200) {
      return '업데이트 성공';
    } else {
      return '업데이트 실패';
    }
  } catch (error) {
    if (isAxiosError(error)) {
      return 'API 오류 발생';
    } else {
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
export const putCreatorIntroduce = async (creatorIntroduce: string): Promise<string> => {
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
export const fetchParticipatedRooms = async (memberId: number): Promise<ParticipatedRoom[]> => {
  try {
    const response = await api.get<ParticipatedRoom[]>(`${MEMBER_URL}/participatedroom`, {
      params: { memberId },
    });
    return response.data;
  } catch (error) {
    console.error('참여한 방 가져오기 실패:', error);
    throw error;
  }
};

// IMP: 생성한 이벤트 방 정보 호출
export const fetchCreatedRooms = async (memberId: number): Promise<CreatedRoom[]> => {
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
