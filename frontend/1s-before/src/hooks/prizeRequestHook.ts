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
      await postWinnerUserInfo(roomId, {
        ...formData,
        address: fullAddress,
      });
      alert('정보가 성공적으로 저장되었습니다.');
    } catch (error) {
      console.error('정보 저장 중 오류 발생:', error);
      alert('정보 저장 중 오류가 발생했습니다.');
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
    showAddrModal,
    detailedAddress,
    setUserData,
    handleSubmit,
    handleChange,
    openAddrModal,
    closeAddrModal,
    handleCheckboxChange,
    handleAddressComplete,
  };
}
