import React, { FC } from 'react';
import { X } from 'lucide-react';
import Logo from '@/components/icon/MainLogo';

interface LogoutPopUpProps {
  closePopUp: () => void;
  confirmLogout: () => void;
}

const LogoutPopUp: FC<LogoutPopUpProps> = ({ closePopUp, confirmLogout }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="relative bg-white p-8 rounded-lg text-center w-full max-w-md md:max-w-lg lg:max-w-xl flex flex-col items-center">
        <button
          onClick={closePopUp}
          className="absolute top-4 right-4 text-2xl cursor-pointer text-gray-400"
          aria-label="Close"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>

        <div className="mb-10">
          <Logo />
        </div>
        <p className="text-lg text-mainColor1 font-semibold mb-8">
          로그아웃 하시겠습니까?
        </p>

        <div className="flex gap-4">
          <button
            onClick={closePopUp}
            className="px-6 py-2 bg-gray-300 text-gray-700 rounded-md"
          >
            취소
          </button>
          <button
            onClick={confirmLogout}
            className="px-6 py-2 bg-mainColor1 text-white rounded-md"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutPopUp;
