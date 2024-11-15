import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { fetchTokens } from '@/apis/memberAPI';
import { useMemberStore } from '@/store/memberStore';

export const useMemberLogin = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const code = searchParams.get('code');
  const { member, setMember, clearMember, toggleCreatorMode } = useMemberStore();
  const [isLoginPopUpOpen, setIsLoginPopUpOpen] = useState(false);
  const openLoginPopUp = () => setIsLoginPopUpOpen(true);
  const closeLoginPopUp = () => setIsLoginPopUpOpen(false);
  const handleKakaoLogin = () => {
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URL}&response_type=code`;
    window.location.href = KAKAO_AUTH_URL;
  };

  useEffect(() => {
    if (code) {
      console.log(code);
      handleKakaoLoginCallBack(code);
    }
  }, [code]);

  const handleKakaoLoginCallBack = async (authCode: string) => {
    try {
      const tokenData = await fetchTokens(authCode);
      console.log(tokenData);
      router.replace(window.location.pathname);
    } catch (error) {
      console.error('Error while fetching tokens:', error);
    }
  };

  const handleLogout = () => {
    clearMember();
  };

  const handleToggle = () => {
    if (member.isLoggedIn) toggleCreatorMode(); // Member가 존재할 때만 CreatorMode를 토글합니다.
    else openLoginPopUp();
  };

  return {
    member,
    isCreatorMode: member?.isCreatorMode ?? false,
    isLoginPopUpOpen,
    handleToggle,
    openLoginPopUp,
    closeLoginPopUp,
    handleKakaoLogin,
    handleLogout,
  };
};
