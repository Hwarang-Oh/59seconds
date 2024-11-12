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
      if (member) {
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
  }, [member]);

  return (
    <div>
      {member?.isCreatorMode ? (
        <>
          <CreatorBanner bannerImage={bannerImage} />
          <div className='flex flex-col gap-20 px-7 py-20'>
            <CreatorCardBannerGrid Banners={createdRooms} />
            <NormalBannerList Banners={popularEvents} />
          </div>
          <CreatorEventMakeBanner />
        </>
      ) : (
        <>
          <LargeBannerCarousel Banners={popularEvents} />
          <div className='flex flex-col gap-20 px-7 py-20'>
            <NormalBannerList Banners={popularEvents} />
            <CardBannerGrid Banners={deadlineEvents} />
          </div>
        </>
      )}
    </div>
  );
}
