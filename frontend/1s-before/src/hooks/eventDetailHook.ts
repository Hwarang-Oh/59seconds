import { useState, useEffect } from 'react';
import { EventData } from '@/types/eventDetail';
import { useEventStore } from '@/store/eventStore';
import { fetchEventInfo, postRoomUnlock } from '@/apis/eventDetailApi';

const defaultEventData: EventData = {
  memberResponseDto: {
    participateName: '',
    creatorName: '',
    address: '',
    phone: '',
    profileImage: '',
    creatorIntroduce: '',
    snsLink: '',
  },
  title: '',
  description: '',
  status: '',
  startTime: '',
  endTime: '',
  winnerNum: 0,
  enterCode: '',
  unlockCount: 0,
  bannerImage: '',
  squareImage: '',
  rectangleImage: '',
  createdAt: '',
  prizes: [],
};

export function useEventDetail(id: number) {
  const [inputCode, setInputCode] = useState('');
  const [isSharePopupOpen, setIsSharePopupOpen] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [eventData, setEventData] = useState<EventData>(defaultEventData);

  const isCodeValid = useEventStore((state) => state.isCodeValid);
  const setIsCodeValid = useEventStore((state) => state.setCodeValid);
  const setAuthenticated = useEventStore((state) => state.setAuthenticated);

  const loadEventData = async () => {
    try {
      const data = await fetchEventInfo(id);
      setEventData(data);
    } catch (error) {
      console.error('이벤트 정보 로드 오류:', error);
    }
  };

  useEffect(() => {
    loadEventData();
  }, [id]);

  const refreshUnlockCount = () => {
    loadEventData();
    const currentTime = new Date().toLocaleTimeString();
    setLastUpdated(currentTime);
  };

  useEffect(() => {
    refreshUnlockCount();

    const interval = setInterval(refreshUnlockCount, 600000);

    return () => clearInterval(interval);
  }, [id]);

  // IMP: 새창으로 여는 코드
  const openWindow = () => {
    const memberData = sessionStorage.getItem('member-storage');
    console.log(memberData);
    const encodedMemberData = encodeURIComponent(memberData ?? '');
    window.open(
      `/event-room/${id}?memberData=${encodedMemberData}`,
      '_blank',
      'width=1280,height=700,noopener,noreferrer'
    );
  };

  const handleCodeSubmit = async () => {
    try {
      const response = await postRoomUnlock(id, inputCode);
      if (response && response.success) {
        setIsCodeValid(true);
        setAuthenticated(true);
        alert('방 잠금이 해제되었습니다.');
      } else {
        alert('올바른 참여 코드를 입력하세요.');
      }
    } catch (error) {
      console.error('코드 제출 오류:', error);
      alert('코드 제출 중 오류가 발생했습니다.');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCodeSubmit();
    }
  };

  const openSharePopUp = () => {
    setIsSharePopupOpen(true);
  };

  const closeSharePopUp = () => {
    setIsSharePopupOpen(false);
  };

  const copyUrl = async () => {
    try {
      const currentUrl = window.location.href;
      await navigator.clipboard.writeText(currentUrl);
      alert('클립보드에 복사되었습니다');
    } catch (err) {
      console.error('Failed to copy: ', err);
      alert('복사에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return {
    eventData,
    inputCode,
    isCodeValid,
    lastUpdated,
    isSharePopupOpen,
    copyUrl,
    openWindow,
    setInputCode,
    handleKeyDown,
    openSharePopUp,
    closeSharePopUp,
    handleCodeSubmit,
    refreshUnlockCount,
  };
}
