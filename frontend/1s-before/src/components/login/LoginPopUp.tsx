import React, { FC, useState } from 'react';
import { X } from 'lucide-react';
import Logo from '@/components/icon/MainLogo';
import { useMemberStore } from '@/store/memberStore';

interface LoginPopUpProps {
  closePopUp: () => void;
}

const LoginPopUp: FC<LoginPopUpProps> = ({ closePopUp }) => {
  const { setMember } = useMemberStore();
  const [memberId, setMemberId] = useState<number | ''>('');
  const [nickname, setNickname] = useState<string>('');

  const handleLogin = (): void => {
    if (memberId && nickname) {
      setMember(Number(memberId), nickname);
      closePopUp();
    } else {
      alert('모든 필드를 입력해주세요.');
    }
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50'>
      <div className='relative bg-white p-10 rounded-lg text-center w-full max-w-md md:max-w-lg lg:max-w-xl flex flex-col items-center'>
        <button
          onClick={closePopUp}
          className='absolute top-4 right-4 text-2xl cursor-pointer text-gray-400'
          aria-label='Close'>
          <X className='w-5 h-5 text-gray-500' />
        </button>

        <div className='mb-5'>
          <Logo />
        </div>

        <input
          type='number'
          placeholder='회원 ID'
          value={memberId}
          onChange={(e) => setMemberId(e.target.value ? Number(e.target.value) : '')}
          className='w-[70%] h-10 mb-4 px-3 border border-gray-300 rounded-md'
        />
        <input
          type='text'
          placeholder='닉네임'
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          className='w-[70%] h-10 mb-6 px-3 border border-gray-300 rounded-md'
        />

        <button
          onClick={handleLogin}
          className='w-[70%] h-12 rounded-lg bg-blue-500 text-white flex items-center justify-center mb-6 shadow-md'>
          로그인
        </button>

        <p className='text-xs text-gray-500'>
          로그인 시 서비스 이용약관과 개인정보 처리방침에 동의하게 됩니다.
        </p>
      </div>
    </div>
  );
};

export default LoginPopUp;

// IMP : 임시 코드를 위해 잠시 주석처리함 ( 화랑 )
/** 
import React, { FC } from 'react';
import { X } from 'lucide-react';
import Logo from '@/components/icon/MainLogo';

const KAKAO_AUTH_URL: string = `url 넣기`;

interface LoginPopUpProps {
  closePopUp: () => void;
}

const LoginPopUp: FC<LoginPopUpProps> = ({ closePopUp }) => {
  const handleKakaoLogin = (): void => {
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50'>
      <div className='relative bg-white p-10 rounded-lg text-center w-full max-w-md md:max-w-lg lg:max-w-xl flex flex-col items-center'>
        <button
          onClick={closePopUp}
          className='absolute top-4 right-4 text-2xl cursor-pointer text-gray-400'
          aria-label='Close'>
          <X className='w-5 h-5 text-gray-500' />
        </button>

        <div className='mb-10'>
          <Logo />
        </div>

        <button
          onClick={handleKakaoLogin}
          className='w-[70%] h-12 rounded-lg flex items-center justify-center mb-6 shadow-md'>
          <img src='/icon/kakao_login_large_wide.png' alt='카카오 로그인' />
        </button>

        <p className='text-xs text-gray-500'>
          로그인 시 서비스 이용약관과 개인정보 처리방침에 동의하게 됩니다.
        </p>
      </div>
    </div>
  );
};

export default LoginPopUp;
*/
