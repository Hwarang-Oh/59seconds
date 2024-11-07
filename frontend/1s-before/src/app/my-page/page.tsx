'use client';
import React, { useState } from 'react';
import GeneralUserPage from '@/components/mypage/GeneralUserPage';
import EventCreatorPage from '@/components/mypage/CreatorPage';

export default function MyPage() {
  // 초기 모드를 "user"로 설정
  const [mode, setMode] = useState<'user' | 'creator'>('user');

  // 모드 변경 함수
  const toggleMode = () => {
    setMode((prevMode) => (prevMode === 'user' ? 'creator' : 'user'));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">마이페이지</h1>

      <button
        onClick={toggleMode}
        className="mb-6 px-4 py-2 bg-mainColor1 text-white rounded-lg"
      >
        {mode === 'user'
          ? '이벤트 개설자 모드로 전환'
          : '일반 사용자 모드로 전환'}
      </button>

      {mode === 'user' ? <GeneralUserPage /> : <EventCreatorPage />}
    </div>
  );
}
