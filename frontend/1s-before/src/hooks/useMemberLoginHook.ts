import { useState } from 'react';
import { useMemberStore } from '@/store/memberStore';

export const useMemberLogin = () => {
  const [isCreatorMode, setIsCreatorMode] = useState(false);
  const [isLoginPopUpOpen, setIsLoginPopUpOpen] = useState(false);
  const { member, toggleCreatorMode, clearMember } = useMemberStore();

  const handleToggle = () => {
    if (member) {
      setIsCreatorMode(!isCreatorMode);
      toggleCreatorMode();
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

  const handleLogout = () => {
    clearMember();
    setIsCreatorMode(false);
  };

  return {
    member,
    isCreatorMode,
    isLoginPopUpOpen,
    handleToggle,
    openLoginPopUp,
    closeLoginPopUp,
    handleLogout,
  };
};
