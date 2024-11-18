import { useState, useEffect } from 'react';
import { UserData } from '@/types/user';
import { putCreatorInfo, fetchCreatorInfo } from '@/apis/memberAPI';

export function useEventOwner() {
  const [ownerData, setOwnerData] = useState<UserData>({
    participateName: '',
    creatorName: '',
    address: '',
    phone: '',
    profileImage: '',
    creatorIntroduce: '',
    snsLink: '',
  });

  const [imageUrl, setImageUrl] = useState<string>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  // IMP: profileImage가 File일 때 URL 생성, 문자열일 때 그대로 사용
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
    setOwnerData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditorChange = (content: string) => {
    setOwnerData((prev) => ({
      ...prev,
      creatorIntroduce: content,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setOwnerData((prev) => ({ ...prev, profileImage: file }));
    }
  };

  const handleSaveCreatorName = async () => {
    const formData = new FormData();
    formData.append('creatorName', ownerData.creatorName);

    try {
      await putCreatorInfo(formData);
      setModalMessage('이름을 업데이트하였습니다.');
      setIsModalOpen(true);
    } catch (error) {
      setModalMessage('이름을 업데이트에 실패하였습니다.');
      setIsModalOpen(true);
    }
  };

  // IMP: 폼 데이터 검증
  const validateOwnerData = (): boolean => {
    const requiredFields = ['creatorName', 'snsLink'];
    for (const field of requiredFields) {
      if (!ownerData[field as keyof UserData]) {
        setModalMessage(`${field}을(를) 입력해주세요.`);
        setIsModalOpen(true);
        return false;
      }
    }
    return true;
  };

  const handleUserSubmit = async (): Promise<boolean> => {
    try {
      const formData = new FormData();
      Object.entries(ownerData).forEach(([key, value]) => {
        if (value && key !== 'profileImage') {
          formData.append(key, value as string);
        }
      });

      if (ownerData.profileImage instanceof File) {
        formData.append('profileImage', ownerData.profileImage);
      }

      await putCreatorInfo(formData);
      return true;
    } catch (error) {
      setModalMessage('정보 수정에 실패했습니다.');
      setIsModalOpen(true);
      return false;
    }
  };

  return {
    ownerData,
    imageUrl,
    isModalOpen,
    modalMessage,
    setIsModalOpen,
    getProfileImageSrc,
    handleInputChange,
    handleEditorChange,
    handleImageChange,
    handleUserSubmit,
    validateOwnerData,
    handleSaveCreatorName,
  };
}
