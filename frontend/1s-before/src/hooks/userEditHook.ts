import { useEffect, useState } from 'react';
import {
  putParticipateName,
  putCreatorName,
  putAddress,
  putPhone,
  putProfileImage,
  putCreatorIntroduce,
  putSnsLink,
  fetchCreatorInfo,
} from '@/apis/memberAPI';
import { UserData } from '@/types/user';

export function useUserEdit() {
  const [userData, setUserData] = useState<UserData>({
    participateName: '',
    creatorName: '',
    address: '',
    phone: '',
    profileImage: '',
    creatorIntroduce: '',
    snsLink: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 페이지 로드 시 fetchUserData 호출
  useEffect(() => {
    fetchUserData();
  }, []); // 빈 배열을 넣어 컴포넌트 마운트 시에만 호출되도록 설정

  // 초기 데이터 가져오기
  const fetchUserData = async () => {
    setLoading(true);
    try {
      const data = await fetchCreatorInfo();
      setUserData(data);
      console.log(data);
    } catch (err) {
      setError('데이터를 가져오는 중 오류 발생');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 참여자 이름 업데이트

  const updateParticipateName = async (participateName: string) => {
    setLoading(true);
    try {
      await putParticipateName(participateName);
      setUserData((prev) => ({ ...prev, participateName }));
    } catch (err) {
      setError('participateName 업데이트 중 오류 발생');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 개설자 이름 업데이트
  const updateCreatorName = async (creatorName: string) => {
    setLoading(true);
    try {
      await putCreatorName(creatorName);
      setUserData((prev) => ({ ...prev, creatorName }));
    } catch (err) {
      setError('creatorName 업데이트 중 오류 발생');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 주소 업데이트
  const updateAddress = async (address: string) => {
    setLoading(true);
    try {
      await putAddress(address);
      setUserData((prev) => ({ ...prev, address }));
    } catch (err) {
      setError('address 업데이트 중 오류 발생');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 전화번호 업데이트
  const updatePhone = async (phone: string) => {
    setLoading(true);
    try {
      await putPhone(phone);
      setUserData((prev) => ({ ...prev, phone }));
    } catch (err) {
      setError('phone 업데이트 중 오류 발생');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 프로필 이미지 업데이트
  const updateProfileImage = async (profileImage: File) => {
    setLoading(true);
    try {
      await putProfileImage(profileImage);
      setUserData((prev) => ({
        ...prev,
        profileImage: URL.createObjectURL(profileImage),
      }));
    } catch (err) {
      setError('profileImage 업데이트 중 오류 발생');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 개설자 소개 업데이트
  const updateCreatorIntroduce = async (creatorIntroduce: string) => {
    setLoading(true);
    try {
      await putCreatorIntroduce(creatorIntroduce);
      setUserData((prev) => ({ ...prev, creatorIntroduce }));
    } catch (err) {
      setError('creatorIntroduce 업데이트 중 오류 발생');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // SNS 링크 업데이트
  const updateSnsLink = async (snsLink: string) => {
    setLoading(true);
    try {
      await putSnsLink(snsLink);
      setUserData((prev) => ({ ...prev, snsLink }));
    } catch (err) {
      setError('snsLink 업데이트 중 오류 발생');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    userData,
    loading,
    error,
    fetchUserData,
    updateParticipateName,
    updateCreatorName,
    updateAddress,
    updatePhone,
    updateProfileImage,
    updateCreatorIntroduce,
    updateSnsLink,
  };
}
