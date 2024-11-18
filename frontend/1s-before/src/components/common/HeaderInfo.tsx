'use client';
import Link from 'next/link';
import ToggleIcon from '@/components/icon/ToggleIcon';
import TempPopup from '@/components/common/TempPopup';
import LoginPopUp from '@/components/common/LoginPopUp';
import { useState } from 'react';
import { useMemberLogin } from '@/hooks/useMemberLoginHook';

export default function HeaderInfo() {
  const {
    member,
    isCreatorMode,
    isLoginPopUpOpen,
    handleToggle,
    openLoginPopUp,
    closeLoginPopUp,
    handleKakaoLogin,
    handleLogout,
  } = useMemberLogin();

  // TODO : 임시 로그인을 없애려면, 주석 처리
  // const [isTempPopupOpen, setIsTempPopupOpen] = useState(false);

  return (
    <>
      <div className='flex justify-center items-start gap-[26px]'>
        {member.isLoggedIn ? (
          <>
            <Link href='/my-page' className='text-[15px] font-normal leading-[18px] text-[#474972]'>
              마이페이지
            </Link>
            {isCreatorMode && (
              <Link
                href='/event-create'
                className='text-[15px] font-normal leading-[18px] text-[#474972]'>
                이벤트 생성
              </Link>
            )}
            <button
              onClick={handleLogout}
              className='text-[15px] font-normal leading-[18px] text-[#474972] cursor-pointer bg-transparent border-none p-0'>
              로그아웃
            </button>
          </>
        ) : (
          <>
            {/* 임시 로그인을 없애기 위해서는 해당 button을 주석처리하세요. */}
            {/* <button
              className='text-[15px] font-normal leading-[18px] text-[#474972] cursor-pointer bg-transparent border-none p-0'
              onClick={() => setIsTempPopupOpen(true)}>
              임시로그인
            </button> */}
            <button
              className='text-[15px] font-normal leading-[18px] text-[#474972] cursor-pointer bg-transparent border-none p-0'
              onClick={openLoginPopUp}>
              로그인
            </button>
          </>
        )}
        <ToggleIcon toggle={isCreatorMode} handleToggle={handleToggle} />
      </div>
      {isLoginPopUpOpen && (
        <LoginPopUp handleKakaoLogin={handleKakaoLogin} closePopUp={closeLoginPopUp} />
      )}
      // TODO : 임시로그인을 없애기 위해서는 주석처리하세요.
      {/* {isTempPopupOpen && <TempPopup closePopUp={() => setIsTempPopupOpen(false)} />} */}
    </>
  );
}
