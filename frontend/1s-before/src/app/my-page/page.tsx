'use client';
import Header from '@/components/common/Header';
import React, { useState } from 'react';
import EventCreatorPage from '@/components/mypage/CreatorPage';
import GeneralUserPage from '@/components/mypage/GeneralUserPage';

export default function MyPage() {
  // IMP: 초기 모드를 "user"로 설정
  const [mode, setMode] = useState<'user' | 'creator'>('user');

  // IMP: 모드 변경 함수
  const toggleMode = () => {
    setMode((prevMode) => (prevMode === 'user' ? 'creator' : 'user'));
  };

  return (
    <div className="p-6">
      <Header />
      <button
        onClick={toggleMode}
        className="mb-6 px-4 py-2 bg-mainColor1 text-white rounded-lg"
      >
        {mode === 'user' ? '이벤트 개설자 모드' : '일반 사용자 모드'}
      </button>

      <div className="m-10 p-10 border">
        {mode === 'user' ? <GeneralUserPage /> : <EventCreatorPage />}
      </div>
    </div>
  );
}
