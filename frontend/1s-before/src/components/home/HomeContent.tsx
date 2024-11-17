'use client';
import NormalBannerList from '@/components/home/NormalBannerList';
import CreatorBanner from '@/components/home/creator/CreatorBanner';
import CardBannerGrid from '@/components/home/member/CardBannerGrid';
import LargeBannerCarousel from '@/components/home/member/LargeBannerCarousel';
import CreatorCardBannerGrid from '@/components/home/creator/CreatorCardBannerGrid';
import CreatorEventMakeBanner from '@/components/home/creator/CreatorEventMakeBanner';
import { CreatedRoom } from '@/types/user';
import { useState, useEffect } from 'react';
import { HomeContentProps } from '@/types/home';
import { getCreatorBanner } from '@/apis/eventAPI';
import { fetchCreatedRooms } from '@/apis/memberAPI';
import { useMemberStore } from '@/store/memberStore';

export default function HomeContent({ popularEvents, deadlineEvents }: Readonly<HomeContentProps>) {
  const { member } = useMemberStore();
  const [createdRooms, setCreatedRooms] = useState<CreatedRoom[]>([]);
  const [bannerImage, setBannerImage] = useState<string>(''); // 배너 이미지 상태 추가

  useEffect(() => {
    const loadCreatorData = async () => {
      if (member.isLoggedIn) {
        try {
          const [rooms, banner] = await Promise.all([
            fetchCreatedRooms(member.memberId),
            getCreatorBanner(member.memberId),
          ]);

          setCreatedRooms(rooms); // 방 목록 설정
          setBannerImage(banner); // 배너 이미지 설정
        } catch (error) {
          console.error('Failed to fetch creator data:', error);
        }
      }
    };
    loadCreatorData();
  }, [member.isLoggedIn]);

  // TODO : 빈 Array의 결과에 대한 View를 추가해야 한다.
  return (
    <div>
      {member.isCreatorMode ? (
        <>
          <CreatorBanner bannerImage={bannerImage} />
          <div className='flex flex-col gap-20 px-7 py-20'>
            {createdRooms.length > 0 ? (
              <CreatorCardBannerGrid Banners={createdRooms} />
            ) : (
              <div className='text-center py-10 text-gray-500'>생성한 방이 없습니다.</div>
            )}
            <NormalBannerList Banners={popularEvents} />
          </div>
          <CreatorEventMakeBanner />
        </>
      ) : (
        <>
          <LargeBannerCarousel Banners={popularEvents} />
          <div className='flex flex-col gap-20 px-7 py-20'>
            <NormalBannerList Banners={popularEvents} />
            {deadlineEvents.length > 0 ? (
              <CardBannerGrid Banners={deadlineEvents} />
            ) : (
              <div className='text-center py-10 text-gray-500'>마감 임박 이벤트가 없습니다.</div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
