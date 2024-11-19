import { useEffect } from 'react';
import { fetchCreatorInfo } from '@/apis/memberAPI';
import { postWinnerUserInfo } from '@/apis/eventAPI';
import { useWinnerInfoStore } from '@/store/winnerInfoStore';
import { useMemberStore } from '@/store/memberStore';

export function usePrizeRequest(roomId: number) {
  const {
    formData,
    isSavedData,
    showAddrModal,
    detailedAddress,
    userData,
    isModalOpen,
    modalMessage,
    setFormData,
    setIsSavedData,
    setShowAddrModal,
    setDetailedAddress,
    setUserData,
    setIsModalOpen,
    setModalMessage,
  } = useWinnerInfoStore();
  const { member } = useMemberStore();

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
  }, [member, setFormData, setIsSavedData, setDetailedAddress, setUserData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'detailedAddress') {
      setDetailedAddress(value);
    } else {
      setFormData({ [name]: value });
    }
  };

  const handleCheckboxChange = () => {
    if (!isSavedData && userData) {
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

  const openAddrModal = () => setShowAddrModal(true);

  const closeAddrModal = () => setShowAddrModal(false);

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

    setFormData({ address: fullAddress });
    setDetailedAddress('');
    setShowAddrModal(false);
    setIsSavedData(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const fullAddress = `${formData.address} ${detailedAddress}`.trim();

    try {
      const response = await postWinnerUserInfo(roomId, {
        ...formData,
        address: fullAddress,
      });

      if (response?.status === 200 || response?.status === 201) {
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

  return {
    formData,
    isSavedData,
    isModalOpen,
    modalMessage,
    showAddrModal,
    detailedAddress,
    handleSubmit,
    handleChange,
    openAddrModal,
    closeAddrModal,
    handleCheckboxChange,
    handleAddressComplete,
  };
}
