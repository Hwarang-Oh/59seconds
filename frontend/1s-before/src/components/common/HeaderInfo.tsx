'use client';
import Link from 'next/link';
import ToggleIcon from '@/components/icon/ToggleIcon';
import LoginPopUp from '@/components/login/LoginPopUp';
import { useState } from 'react';
import { useMemberStore } from '@/store/memberStore';

export default function HeaderInfo() {
  const [isCreatorMode, setIsCreatorMode] = useState(false);
  const [isLoginPopUpOpen, setIsLoginPopUpOpen] = useState(false);
  const { member, toggleCreatorMode } = useMemberStore();

  const handleToggle = () => {
    setIsCreatorMode(!isCreatorMode);
    toggleCreatorMode();
  };

  const openLoginPopUp = () => {
    setIsLoginPopUpOpen(true);
  };

  const closeLoginPopUp = () => {
    setIsLoginPopUpOpen(false);
  };
  return (
    <>
      <div className='flex justify-center items-start gap-[26px]'>
        <button
          className='text-[15px] font-normal leading-[18px] text-[#474972] cursor-pointer bg-transparent border-none p-0'
          onClick={openLoginPopUp}>
          로그인
        </button>
        <Link href='/my-page'>
          <p className='text-[15px] font-normal leading-[18px] text-[#474972]'>마이페이지</p>
        </Link>
        <Link href='/event-create'>
          <p className='text-[15px] font-normal leading-[18px] text-[#474972]'>이벤트 생성</p>
        </Link>
        <ToggleIcon toggle={isCreatorMode} handleToggle={handleToggle} />
      </div>
      {isLoginPopUpOpen && <LoginPopUp closePopUp={closeLoginPopUp} />}
    </>
  );
}
