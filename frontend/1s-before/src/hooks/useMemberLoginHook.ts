import { useState } from 'react';
import { useMemberStore } from '@/store/memberStore';

export const useMemberLogin = () => {
  const { member, setMember, clearMember, toggleCreatorMode } = useMemberStore();
  const [isLoginPopUpOpen, setIsLoginPopUpOpen] = useState(false);

  const handleToggle = () => {
    if (member) {
      toggleCreatorMode(); // Member가 존재할 때만 CreatorMode를 토글합니다.
    } else {
      openLoginPopUp();
    }
  };

  const openLoginPopUp = () => {
    setIsLoginPopUpOpen(true);
  };

  const closeLoginPopUp = () => {
    setIsLoginPopUpOpen(false);
  };

  const handleLogin = (memberId: number, nickname: string) => {
    setMember(memberId, nickname); // Member 정보 설정
    setIsLoginPopUpOpen(false); // 로그인 후 팝업 닫기
  };

  const handleLogout = () => {
    clearMember(); // 로그아웃 시 Member 정보 초기화
  };

  return {
    member,
    isCreatorMode: member?.isCreatorMode ?? false,
    isLoginPopUpOpen,
    handleToggle,
    openLoginPopUp,
    closeLoginPopUp,
    handleLogin,
    handleLogout,
  };
};
