'use client';
import EventDummy from '@/mocks/EventDummy.json';
import BannerHeader from '@/components/eventRoom/BannerHeader';
import EventStatusArea from '@/components/eventRoom/EventStatusArea';
import { useEffect, useState } from 'react';
import { EventRoomInfo } from '@/types/eventRoom';
import { useSearchParams } from 'next/navigation';

/**
 * TODO : Event Room Page
 * IMP : Link를 통해, 타고 들어오는 Event Room Page
 * IMP 1 - 1. 이동을 먼저 하고, Link에 있는 Parameter를 가져와서, Event ID를 추출한다.
 * IMP 1 - 2. Event 상세 페이지에서 Event ID를 기반으로, 동적으로 Event Room Page를 Render
 * * 2. eventID를 기반으로, Event Room Page를 랜더링 한다. ( API 호출을 통해, 정보를 가져온다 )
 * * 3. eventID를 기반으로, 해당 Event에 대한 Socket을 연결한다.
 * @returns
 */
export default function EventRoom() {
  const searchParams = useSearchParams();
  const eventId = searchParams.get('eventId');
  const [eventInfo, setEventInfo] = useState<EventRoomInfo | null>(null);

  useEffect(() => {
    if (eventId) {
      setEventInfo({
        id: EventDummy.event.id,
        title: EventDummy.event.eventInfo.title,
        bannerImage: EventDummy.event.eventInfo.bannerImage,
        eventTime: EventDummy.event.eventPeriod.end,
      });
      // TODO : WebSocket 연결 Code
    }
  }, []);

  return (
    <div className='flex flex-col max-w-screen-xl mx-auto px-7'>
      {eventInfo && (
        <div className='flex flex-col w-full gap-12'>
          <BannerHeader bannerImage={eventInfo.bannerImage} />
          <div className='text-xl font-normal' style={{ color: '#1C1C1E', lineHeight: '33px' }}>
            [Event : {eventInfo.id}] <span className='font-bold'>{eventInfo.title}</span>
          </div>
          <EventStatusArea participants={0} competitionRate={0} eventTime={eventInfo?.eventTime} />
        </div>
      )}
    </div>
  );
}
