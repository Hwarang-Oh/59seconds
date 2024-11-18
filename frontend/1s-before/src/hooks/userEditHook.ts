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

  // Modal 상태와 Modal 메시지
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  // 페이지 로드 시 fetchUserData 호출
  useEffect(() => {
    fetchUserData();
  }, []);

  // 초기 데이터 가져오기
  const fetchUserData = async () => {
    setLoading(true);
    try {
      const data = await fetchCreatorInfo();
      setUserData(data);
    } catch (err) {
      setError('데이터를 가져오는 중 오류 발생');
    } finally {
      setLoading(false);
    }
  };

  // 참여자 이름 업데이트

  const updateParticipateName = async (participateName: string) => {
    setLoading(true);
    try {
      await putParticipateName(participateName, 1);
      setUserData((prev) => ({ ...prev, participateName }));
      setModalMessage('참여자 이름이 성공적으로 변경되었습니다.');
      setIsModalOpen(true);
    } catch (err) {
      setModalMessage('이름 업데이트 중 오류 발생');
      setIsModalOpen(true);
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
      setModalMessage('개설자 이름이 성공적으로 변경되었습니다.');
      setIsModalOpen(true);
    } catch (err) {
      setModalMessage('개설자 이름 업데이트 중 오류 발생');
      setIsModalOpen(true);
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
      setModalMessage('주소가 성공적으로 변경되었습니다.');
      setIsModalOpen(true);
    } catch (err) {
      setModalMessage('주소 업데이트 중 오류 발생');
      setIsModalOpen(true);
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
      setModalMessage('전화번호가 성공적으로 변경되었습니다.');
      setIsModalOpen(true);
    } catch (err: any) {
      if (err.response?.data?.message?.includes('형식')) {
        setModalMessage('올바른 형식의 전화번호를 입력해주세요.');
      } else {
        setModalMessage('전화번호를 다시 입력해주세요.');
      }
      setIsModalOpen(true);
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
      setModalMessage('프로필 이미지가 성공적으로 변경되었습니다.');
      setIsModalOpen(true);
    } catch (err) {
      setModalMessage('프로필 이미지 업데이트 중 오류 발생');
      setIsModalOpen(true);
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
      setModalMessage('소개가 성공적으로 변경되었습니다.');
      setIsModalOpen(true);
    } catch (err) {
      setModalMessage('소개글 업데이트 중 오류 발생');
      setIsModalOpen(true);
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
      setModalMessage('SNS 링크가 성공적으로 변경되었습니다.');
      setIsModalOpen(true);
    } catch (err) {
      setModalMessage('SNS 링크 업데이트 중 오류 발생');
      setIsModalOpen(true);
    } finally {
      setLoading(false);
    }
  };

  return {
    error,
    loading,
    userData,
    isModalOpen,
    modalMessage,
    updatePhone,
    fetchUserData,
    updateAddress,
    updateSnsLink,
    setIsModalOpen,
    updateCreatorName,
    updateProfileImage,
    updateParticipateName,
    updateCreatorIntroduce,
  };
}
