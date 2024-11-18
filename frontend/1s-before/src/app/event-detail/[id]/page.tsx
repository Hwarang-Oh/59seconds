'use client';
import Image from 'next/image';
import Header from '@/components/common/Header';
import Banner from '@/assets/defaultBanner.png';
import EventInfoTab from '@/components/eventDetail/EventInfoTab';
import EventIntroTab from '@/components/eventDetail/EventIntroTab';
import EventRoomPart from '@/components/eventDetail/EventRoomPart';
import EventRoomInfo from '@/components/eventDetail/EventRoomInfo';
import EventCreatorTab from '@/components/eventDetail/EventCreatorTab';
import { useState } from 'react';
import { useParams } from 'next/navigation';
import { FaRegSadTear } from 'react-icons/fa';
import { useEventDetail } from '@/hooks/eventDetailHook';

export default function EventDetail() {
  const params = useParams();
  const { id } = params as { id: string };
  const [activeTab, setActiveTab] = useState('event');
  const { eventData } = useEventDetail(Number(id));

  if (!eventData) {
    return (
      <p className='flex flex-col justify-center items-center h-screen text-mainColor1'>
        <FaRegSadTear className='mb-3' size={30} />
        이벤트를 찾을 수 없습니다.
      </p>
    );
  }

  // IMP: eventData에서 memberResponseDto를 creator로 설정
  const creator = eventData.memberResponseDto;

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <>
      <Header />
      <div className='m-10'>
        <div className='grid grid-cols-4 gap-8'>
          {/* 입력 폼: 2/3 */}
          <div className='col-span-3 border border-inherit p-10 rounded-lg shadow-lg'>
            <div>
              <div
                className='relative w-full h-auto mb-16 rounded-lg overflow-hidden'
                style={{ aspectRatio: '1920 / 460' }}>
                <Image
                  src={eventData.bannerImage ?? Banner}
                  alt='배너'
                  fill
                  sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                  className='w-full h-full object-cover rounded-lg'
                />
              </div>
              <div className='flex justify-around border-b mb-4'>
                <button
                  onClick={() => handleTabClick('event')}
                  className={`pb-2 ${
                    activeTab === 'event'
                      ? 'text-mainColor1 font-bold border-b-2 border-mainColor1'
                      : 'text-gray-600'
                  }`}>
                  이벤트 소개
                </button>
                <button
                  onClick={() => handleTabClick('creator')}
                  className={`pb-2 ${
                    activeTab === 'creator'
                      ? 'text-mainColor1 font-bold border-b-2 border-mainColor1'
                      : 'text-gray-600'
                  }`}>
                  주최자 소개
                </button>
                <button
                  onClick={() => handleTabClick('info')}
                  className={`pb-2 ${
                    activeTab === 'info'
                      ? 'text-mainColor1 font-bold border-b-2 border-mainColor1'
                      : 'text-gray-600'
                  }`}>
                  이용정보
                </button>
              </div>

              <div className='mt-6'>
                {activeTab === 'event' && <EventIntroTab event={eventData} />}
                {activeTab === 'creator' && <EventCreatorTab creator={creator} />}
                {activeTab === 'info' && <EventInfoTab />}
              </div>
            </div>
          </div>

          {/* 이벤트 참여 미리보기: 1/3 */}
          <div className='col-span-1 relative max-w-sm'>
            <EventRoomInfo event={eventData} creator={creator} id={Number(id)} />
            <div className='sticky top-2 z-10'>
              <EventRoomPart event={eventData} creator={creator} id={Number(id)} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
