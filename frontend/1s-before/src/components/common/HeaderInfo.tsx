'use client';
import ToggleIcon from '@/components/icon/ToggleIcon';
import { useState } from 'react';
import Link from 'next/link';
import LoginPopUp from '@/components/login/LoginPopUp';

export default function HeaderInfo() {
  const [toggle, setToggle] = useState(false);
  const [isLoginPopUpOpen, setIsLoginPopUpOpen] = useState(false);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  const openLoginPopUp = () => {
    setIsLoginPopUpOpen(true);
  };

  const closeLoginPopUp = () => {
    setIsLoginPopUpOpen(false);
  };
  return (
    <>
      <div className="flex justify-center items-start gap-[26px]">
        <button
          className="text-[15px] font-normal leading-[18px] text-[#474972] cursor-pointer bg-transparent border-none p-0"
          onClick={openLoginPopUp}
        >
          로그인
        </button>
        <Link href="/my-page">
          <p className="text-[15px] font-normal leading-[18px] text-[#474972]">
            마이페이지
          </p>
        </Link>
        <Link href="/event-create">
          <p className="text-[15px] font-normal leading-[18px] text-[#474972]">
            이벤트 생성
          </p>
        </Link>
        <ToggleIcon toggle={toggle} handleToggle={handleToggle} />
      </div>
      {isLoginPopUpOpen && <LoginPopUp closePopUp={closeLoginPopUp} />}
    </>
  );
}
