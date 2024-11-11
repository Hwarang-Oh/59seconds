import { useState, useEffect } from 'react';
import { fetchEventInfo } from '@/apis/eventDetailApi';
import { EventData } from '@/types/eventDetail';
import { useEventStore } from '@/store/eventStore';

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

  const loadEventData = async () => {
    try {
      const data = await fetchEventInfo(id);
      setEventData(data);
      console.log(data);
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
    window.open(
      `/event-room/${id}`,
      '_blank',
      'width=1280,height=700,noopener,noreferrer'
    );
  };

  const handleCodeSubmit = () => {
    if (inputCode === eventData.enterCode) {
      setIsCodeValid(true);
    } else {
      alert('올바른 참여 코드를 입력하세요.');
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
    setInputCode,
    isCodeValid,
    openWindow,
    handleCodeSubmit,
    handleKeyDown,
    openSharePopUp,
    closeSharePopUp,
    isSharePopupOpen,
    copyUrl,
    lastUpdated,
    refreshUnlockCount,
  };
}
