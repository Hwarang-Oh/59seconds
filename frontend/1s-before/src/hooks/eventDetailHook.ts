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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const { eventStates, setEventState } = useEventStore();

  // IMP: event store에서 현재 상태 가져오기
  const currentEventState = eventStates[id] || {
    isAuthenticated: false,
    isCodeValid: false,
  };

  const loadEventData = async () => {
    try {
      const data = await fetchEventInfo(id);
      console.log('이벤트 데이터는?!', data);
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

  const openWindow = () => {
    const memberData = sessionStorage.getItem('member-storage');
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
      if (response?.success) {
        setEventState(id, { isAuthenticated: true, isCodeValid: true });
        setModalMessage('방 잠금이 해제되었습니다.');
        setIsModalOpen(true);
      } else {
        setModalMessage('올바른 참여 코드를 입력하세요.');
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error('코드 제출 오류:', error);
      setModalMessage('코드 검사 중 오류가 발생했습니다.');
      setIsModalOpen(true);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleCodeSubmit();
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
      setModalMessage('클립보드에 복사되었습니다.');
      setIsModalOpen(true);
    } catch (err) {
      console.error('Failed to copy: ', err);
      setModalMessage('복사에 실패했습니다. 다시 시도해주세요.');
      setIsModalOpen(true);
    }
  };

  return {
    eventData,
    inputCode,
    lastUpdated,
    isModalOpen,
    modalMessage,
    isSharePopupOpen,
    isCodeValid: currentEventState.isCodeValid,
    copyUrl,
    openWindow,
    setInputCode,
    handleKeyDown,
    openSharePopUp,
    setIsModalOpen,
    closeSharePopUp,
    handleCodeSubmit,
    refreshUnlockCount,
  };
}
