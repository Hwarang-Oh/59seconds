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
      creatorIntroduce: content, // 에디터 내용이 creatorIntroduce에 반영되도록 설정
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
      const result = await putCreatorInfo(formData);
      console.log('이름 저장 성공:', result);
    } catch (error) {
      console.error('이름 저장 중 오류 발생:', error);
    }
  };

  const handleUserSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    const formData = new FormData();
    Object.entries(ownerData).forEach(([key, value]) => {
      if (value && key !== 'profileImage') {
        formData.append(key, value as string);
      }
    });

    if (ownerData.profileImage instanceof File) {
      formData.append('profileImage', ownerData.profileImage);
    }

    try {
      const result = await putCreatorInfo(formData);
      console.log(result);
    } catch (error) {
      console.error('정보 수정 중 오류 발생:', error);
    }
  };

  return {
    ownerData,
    imageUrl,
    getProfileImageSrc,
    handleInputChange,
    handleEditorChange,
    handleImageChange,
    handleSaveCreatorName,
    handleUserSubmit,
  };
}
