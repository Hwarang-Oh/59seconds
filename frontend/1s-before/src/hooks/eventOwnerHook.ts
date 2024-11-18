import { useState, useEffect } from 'react';
import { UserData } from '@/types/user';
import { useEventOwnerStore } from '@/store/eventOwnerStore';
import { putCreatorInfo, fetchCreatorInfo } from '@/apis/memberAPI';

export function useEventOwner() {
  const { ownerData, setOwnerData } = useEventOwnerStore();

  const [imageUrl, setImageUrl] = useState<string>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const [userErrorMessage, setUserErrorMessage] = useState<string | null>(null);

  // 이미지 처리: File 또는 URL
  useEffect(() => {
    if (ownerData.profileImage instanceof File) {
      const url = URL.createObjectURL(ownerData.profileImage);
      setImageUrl(url);
      return () => URL.revokeObjectURL(url);
    } else if (
      typeof ownerData.profileImage === 'string' &&
      ownerData.profileImage !== ''
    ) {
      setImageUrl(ownerData.profileImage);
    }
  }, [ownerData.profileImage]);

  // IMP: 초기 데이터 가져오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchCreatorInfo();
        setOwnerData(data);
      } catch (error) {
        console.error('기존 정보 가져오기 오류:', error);
      }
    };
    fetchData();
  }, []);

  const getProfileImageSrc = () => {
    if (imageUrl && imageUrl !== '') {
      return imageUrl;
    } else if (
      typeof ownerData.profileImage === 'string' &&
      ownerData.profileImage !== ''
    ) {
      return ownerData.profileImage;
    }
    return undefined;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setOwnerData({ [name]: value } as Partial<UserData>);
  };

  const handleEditorChange = (content: string) => {
    setOwnerData({
      creatorIntroduce: content,
    } as Partial<UserData>);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setOwnerData({ profileImage: file } as Partial<UserData>);
    }
  };

  const validateOwnerData = (): boolean => {
    const requiredFields = ['creatorName', 'snsLink'];
    for (const field of requiredFields) {
      if (!ownerData[field as keyof UserData]) {
        setUserErrorMessage(`${field}을(를) 입력해주세요.`);
        return false;
      }
    }

    setUserErrorMessage(null);
    return true;
  };

  const handleUserSubmit = async (): Promise<boolean> => {
    try {
      const formData = new FormData();

      // 1. updateDto 생성
      const updateDto = {
        participateName: ownerData.participateName,
        creatorName: ownerData.creatorName,
        address: ownerData.address,
        phone: ownerData.phone,
        creatorIntroduce: ownerData.creatorIntroduce,
        snsLink: ownerData.snsLink,
      };

      // 2. updateDto를 Blob으로 변환하여 FormData에 추가
      const updateDtoBlob = new Blob([JSON.stringify(updateDto)], {
        type: 'application/json',
      });
      formData.append('updateDto', updateDtoBlob);

      // 3. profileImage 추가 (파일이 있을 경우만)
      if (ownerData.profileImage instanceof File) {
        formData.append('profileImage', ownerData.profileImage);
      }

      // 4. API 호출
      await putCreatorInfo(formData);
      setModalMessage('정보가 성공적으로 수정되었습니다.');
      setIsModalOpen(true);
      return true;
    } catch (error) {
      console.error('정보 수정 실패:', error);
      setModalMessage('정보 수정에 실패했습니다.');
      setIsModalOpen(true);
      return false;
    }
  };

  return {
    imageUrl,
    ownerData,
    isModalOpen,
    modalMessage,
    userErrorMessage,
    setIsModalOpen,
    getProfileImageSrc,
    handleInputChange,
    handleEditorChange,
    handleImageChange,
    handleUserSubmit,
    validateOwnerData,
  };
}
