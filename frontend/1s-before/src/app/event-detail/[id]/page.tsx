'use client';
import { useState } from 'react';
import { useParams } from 'next/navigation';
import EventIntroTab from '@/components/eventDetail/EventIntroTab';
import EventCreatorTab from '@/components/eventDetail/EventCreatorTab';
import EventInfoTab from '@/components/eventDetail/EventInfoTab';
import EventRoomPart from '@/components/eventDetail/EventRoomPart';
import Header from '@/components/common/Header';
import eventData from '@/mocks/event.json';
import CreatorData from '@/mocks/creatorData.json';
import { FaRegSadTear } from 'react-icons/fa';

export default function EventDetail() {
  const params = useParams();
  const { id } = params as { id: string };
  const [activeTab, setActiveTab] = useState('event'); // 기본 탭 설정

  const event = eventData.event.find((e) => e.id === Number(id));
  if (!event) {
    return (
      <p className="flex flex-col justify-center items-center h-screen text-mainColor1">
        <FaRegSadTear className="mb-3" size={30} />
        이벤트를 찾을 수 없습니다.
      </p>
    );
  }

  const creator = CreatorData.user.find((u) => u.id === Number(id));
  if (!creator) {
    return <p>사용자를 찾을 수 없습니다.</p>;
  }

  const safeEvent = {
    ...event,
    eventInfo: {
      ...event.eventInfo,
      bannerImage:
        typeof event.eventInfo.bannerImage === 'string'
          ? event.eventInfo.bannerImage
          : '',
      rectImage:
        typeof event.eventInfo.rectImage === 'string'
          ? event.eventInfo.rectImage
          : '',
    },
  };

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <>
      <Header />
      <div className="m-10">
        <div className="grid grid-cols-4 gap-8">
          {/* 입력 폼: 2/3 */}
          <div className="col-span-3 border border-inherit p-10 rounded-lg shadow-lg">
            <div>
              {typeof event.eventInfo.bannerImage === 'string' && (
                <div
                  className="w-full h-auto mb-16 rounded-lg overflow-hidden"
                  style={{ aspectRatio: '1920 / 460' }}
                >
                  <img
                    src={event.eventInfo.bannerImage}
                    alt={event.eventInfo.title}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              )}
              <div className="flex justify-around border-b mb-4">
                <button
                  onClick={() => handleTabClick('event')}
                  className={`pb-2 ${
                    activeTab === 'event'
                      ? 'text-mainColor1 font-bold border-b-2 border-mainColor1'
                      : 'text-gray-600'
                  }`}
                >
                  이벤트 소개
                </button>
                <button
                  onClick={() => handleTabClick('creator')}
                  className={`pb-2 ${
                    activeTab === 'creator'
                      ? 'text-mainColor1 font-bold border-b-2 border-mainColor1'
                      : 'text-gray-600'
                  }`}
                >
                  주최자 소개
                </button>
                <button
                  onClick={() => handleTabClick('info')}
                  className={`pb-2 ${
                    activeTab === 'info'
                      ? 'text-mainColor1 font-bold border-b-2 border-mainColor1'
                      : 'text-gray-600'
                  }`}
                >
                  이용정보
                </button>
              </div>

              <div className="mt-6">
                {activeTab === 'event' && <EventIntroTab event={safeEvent} />}
                {activeTab === 'creator' && (
                  <EventCreatorTab creator={creator} />
                )}
                {activeTab === 'info' && <EventInfoTab />}
              </div>
            </div>
          </div>

          {/* 미리보기: 1/3 */}
          <div className="col-span-1">
            <EventRoomPart
              event={safeEvent}
              creator={creator}
              id={Number(id)}
            />
          </div>
        </div>
      </div>
    </>
  );
}
