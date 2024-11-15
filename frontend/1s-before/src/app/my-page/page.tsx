'use client';
import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import EventCreatorPage from '@/components/mypage/CreatorPage';
import GeneralUserPage from '@/components/mypage/GeneralUserPage';
import { useMemberStore } from '@/store/memberStore';

export default function MyPage() {
  const { member } = useMemberStore();

  return (
    <>
      <div className="p-6">
        <Header />
        <div className="mx-20 my-10 p-10 border flex justify-center items-center">
          <div className="w-full max-w-screen-2xl">
            {member?.isCreatorMode ? <EventCreatorPage /> : <GeneralUserPage />}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
