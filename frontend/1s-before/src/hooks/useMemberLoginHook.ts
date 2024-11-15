'use client';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { fetchTokens } from '@/apis/memberAPI';
import { useMemberStore } from '@/store/memberStore';

export const useMemberLogin = () => {
  const [isClient, setIsClient] = useState(false); // 클라이언트 환경 확인
  const searchParams = isClient ? useSearchParams() : null;
  const router = useRouter();
  const code = searchParams?.get('code');
  const { member, setMember, clearMember, toggleCreatorMode } = useMemberStore();
  const [isLoginPopUpOpen, setIsLoginPopUpOpen] = useState(false);

  const openLoginPopUp = () => setIsLoginPopUpOpen(true);
  const closeLoginPopUp = () => setIsLoginPopUpOpen(false);

  const handleKakaoLogin = () => {
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URL}&response_type=code`;
    window.location.href = KAKAO_AUTH_URL;
  };

  const handleKakaoLoginCallBack = async (authCode: string) => {
    try {
      const tokenData = await fetchTokens(authCode);
      console.log(tokenData);
      router.replace(window.location.pathname); // URL에서 `code` 제거
    } catch (error) {
      console.error('Error while fetching tokens:', error);
    }
  };

  const handleLogout = () => {
    clearMember();
  };

  const handleToggle = () => {
    if (member.isLoggedIn) toggleCreatorMode();
    else openLoginPopUp();
  };

  useEffect(() => {
    setIsClient(true); // 클라이언트 환경 설정
  }, []);

  useEffect(() => {
    if (code) {
      console.log(`Auth Code: ${code}`);
      handleKakaoLoginCallBack(code);
    }
  }, [code]);

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
