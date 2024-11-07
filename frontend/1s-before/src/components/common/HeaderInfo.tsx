'use client';
import ToggleIcon from '@/components/icon/ToggleIcon';
import { useState } from 'react';
import Link from 'next/link';

export default function HeaderInfo() {
  const [toggle, setToggle] = useState(false);
  const handleToggle = () => {
    setToggle(!toggle);
  };
  return (
    <div className="flex justify-center items-start gap-[26px]">
      <p className="text-[15px] font-normal leading-[18px] text-[#474972]">
        로그인
      </p>
      <p className="text-[15px] font-normal leading-[18px] text-[#474972]">
        마이페이지
      </p>
      <Link href="/event-create">
        <p className="text-[15px] font-normal leading-[18px] text-[#474972]">
          이벤트 생성
        </p>
      </Link>
      <ToggleIcon toggle={toggle} handleToggle={handleToggle} />
    </div>
  );
}
