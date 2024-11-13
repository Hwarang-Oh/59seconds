'use client';
import Header from '@/components/common/Header';
import EventCreatorPage from '@/components/mypage/CreatorPage';
import GeneralUserPage from '@/components/mypage/GeneralUserPage';
import { useMemberStore } from '@/store/memberStore';

export default function MyPage() {
  const { member } = useMemberStore();

  return (
    <div className="p-6">
      <Header />
      <div className="m-10 p-10 border">
        {member?.isCreatorMode ? <EventCreatorPage /> : <GeneralUserPage />}
      </div>
    </div>
  );
}
