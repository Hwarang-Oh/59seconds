import { useEffect, useState } from 'react';
import { fetchCreatorInfo } from '@/apis/memberAPI';
import { postWinnerUserInfo } from '@/apis/eventAPI';
import { useMemberStore } from '@/store/memberStore';
import { UserData, WinnerUserInfo } from '@/types/user';
export function usePrizeRequest(roomId: number) {
  const { member } = useMemberStore();
  const [formData, setFormData] = useState<WinnerUserInfo>({
    memberId: 0,
    winnerName: '',
    address: '',
    phone: '',
    ranking: 0,
  });
  const [isSavedData, setIsSavedData] = useState(false);
  const [showAddrModal, setShowAddrModal] = useState(false);

  const [detailedAddress, setDetailedAddress] = useState('');
  const [userData, setUserData] = useState<UserData | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  // IMP: 사용자 정보 가져오고 수정하는 기능
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchCreatorInfo();
        setUserData(data);

        setFormData({
          memberId: member?.memberId ?? 0,
          winnerName: data.participateName || '',
          address: data.address || '',
          phone: data.phone || '',
          ranking: 0,
        });
        setDetailedAddress('');
        setIsSavedData(true);
      } catch (error) {
        setIsSavedData(false);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'detailedAddress') {
      setDetailedAddress(value);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleCheckboxChange = () => {
    if (!isSavedData && userData) {
      // IMP: 체크박스가 체크될 때 기존 정보를 formData에 설정
      setFormData({
        memberId: member?.memberId ?? 0,
        winnerName: userData.participateName || '',
        address: userData.address || '',
        phone: userData.phone || '',
        ranking: 0,
      });
      setDetailedAddress('');
    }
    setIsSavedData(!isSavedData);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const fullAddress = `${formData.address} ${detailedAddress}`.trim();
    try {
      const response = await postWinnerUserInfo(roomId, {
        ...formData,
        address: fullAddress,
      });

      if (response.status === 200 || response.status === 201) {
        setModalMessage('정보가 성공적으로 전송되었습니다.');
      } else {
        throw new Error('정보 전송 실패');
      }

      setIsModalOpen(true);
    } catch (error: any) {
      const errorMessage =
        error.response?.status === 404
          ? '이벤트를 찾을 수 없습니다.'
          : '정보 전송 중 오류가 발생했습니다.';

      setModalMessage(errorMessage);
      setIsModalOpen(true);
    }
  };

  const openAddrModal = () => {
    setShowAddrModal(true);
  };

  const closeAddrModal = () => {
    setShowAddrModal(false);
  };

  const handleAddressComplete = async (data: any) => {
    let fullAddress = data.address;
    let extraAddress = '';

    const { addressType, bname, buildingName } = data;

    if (addressType === 'R') {
      if (bname) extraAddress += bname;
      if (buildingName)
        extraAddress += `${extraAddress ? ', ' : ''}${buildingName}`;
      fullAddress += extraAddress ? ` (${extraAddress})` : '';
    }

    setFormData({
      ...formData,
      address: fullAddress,
      phone: formData.phone,
    });
    setDetailedAddress('');
    setShowAddrModal(false);
    setIsSavedData(false);
  };

  return {
    userData,
    formData,
    isSavedData,
    isModalOpen,
    modalMessage,
    showAddrModal,
    detailedAddress,
    setUserData,
    handleSubmit,
    handleChange,
    openAddrModal,
    setIsModalOpen,
    closeAddrModal,
    handleCheckboxChange,
    handleAddressComplete,
  };
}
