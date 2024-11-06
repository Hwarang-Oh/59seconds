import { useState } from 'react';
import { useEventStore } from '@/store/eventStore';

export function useEventDetail(id: number, participationCode: string) {
  const [inputCode, setInputCode] = useState('');
  const [isSharePopupOpen, setIsSharePopupOpen] = useState(false);

  const isCodeValid = useEventStore((state) => state.isCodeValid);
  const setIsCodeValid = useEventStore((state) => state.setCodeValid);

  const openWindow = () => {
    window.open(`/event-room/${id}`, '_blank', 'width=1280,height=700,noopener,noreferrer');
  };

  const handleCodeSubmit = () => {
    if (inputCode === participationCode) {
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
  };
}
