'use client';
import Link from 'next/link';
import ToggleIcon from '@/components/icon/ToggleIcon';
import LoginPopUp from '@/components/login/LoginPopUp';
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
          <button
            className='text-[15px] font-normal leading-[18px] text-[#474972] cursor-pointer bg-transparent border-none p-0'
            onClick={openLoginPopUp}>
            로그인
          </button>
        )}
        <ToggleIcon toggle={isCreatorMode} handleToggle={handleToggle} />
      </div>
      {isLoginPopUpOpen && (
        <LoginPopUp closePopUp={closeLoginPopUp} />
        // <LoginPopUp handleKakaoLogin={handleKakaoLogin} closePopUp={closeLoginPopUp} />
      )}
    </>
  );
}
