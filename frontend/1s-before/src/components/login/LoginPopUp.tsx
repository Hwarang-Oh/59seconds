// IMP : 임시 코드를 위해 잠시 주석처리함 ( 화랑 )
import Logo from '@/components/icon/MainLogo';
import { X } from 'lucide-react';
import { LoginPopupProps } from '@/types/home';

export default function LoginPopUp({ handleKakaoLogin, closePopUp }: Readonly<LoginPopupProps>) {
  return (
    <div className='fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50'>
      <div className='relative h-[400px] justify-center bg-white p-10 rounded-lg text-center w-full max-w-md md:max-w-lg lg:max-w-xl flex flex-col items-center'>
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
}
