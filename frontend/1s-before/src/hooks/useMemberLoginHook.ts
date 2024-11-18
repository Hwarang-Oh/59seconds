import { useState, useEffect } from 'react';
import { useMemberStore } from '@/store/memberStore';
import { getLogin, getLogout } from '@/apis/memberAPI';
import { useSearchParams, useRouter } from 'next/navigation';

/**
 * IMP : Member의 로그인 상태를 관리하는 Hook
 * @API : getLogin, getLogout
 * @returnData member, isCreatorMode, isLoginPopUpOpen
 * @returnMethod handleToggle, openLoginPopUp, closeLoginPopUp, handleKakaoLogin, handleLogout
 */
export const useMemberLogin = () => {
  // IMP : Router와 SearchParam을 가져와, Kakao의 인증 Token을 가져옵니다.
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get('code');
  const { member, setMember, clearMember, toggleCreatorMode } = useMemberStore();

  // IMP : Login PopUp을 관리하는 State와 Method
  const [isLoginPopUpOpen, setIsLoginPopUpOpen] = useState(false);
  const openLoginPopUp = () => setIsLoginPopUpOpen(true);
  const closeLoginPopUp = () => setIsLoginPopUpOpen(false);
  const handleKakaoLogin = () => {
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URL}&response_type=code`;
    window.location.href = KAKAO_AUTH_URL;
  };

  // IMP : Toggle Method => CreatorMode를 토글합니다 ( Member가 존재할 때만 CreatorMode를 토글 )
  const handleToggle = () => {
    if (member.isLoggedIn) toggleCreatorMode();
    else openLoginPopUp();
  };

  // IMP : useMemberLogin Hook이 선언된 곳에서, URL의 Query Param의 변화를 감지하고, KakaoLoginCallBack을 실행
  useEffect(() => {
    if (code) {
      handleKakaoLoginCallBack(code);
    }
  }, [code]);

  // IMP : KakaoLoginCallBack => Kakao로부터 받은 AuthCode를 이용해, Member의 정보를 가져옵니다.
  const handleKakaoLoginCallBack = async (authCode: string) => {
    try {
      const { memberId, participateName: nickname, creatorName } = await getLogin(authCode);
      setMember(memberId, nickname, creatorName);
      router.replace(window.location.pathname);
    } catch (error) {
      console.error('Error while fetching tokens:', error);
    }
  };

  // IMP : Logout Method => Member를 로그아웃 시키고, Store에서 Member를 제거합니다.
  const handleLogout = () => {
    getLogout();
    clearMember();
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
