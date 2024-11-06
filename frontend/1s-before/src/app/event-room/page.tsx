'use client';
import WebsocketAPI from '@/apis/webSocket';
import EventDummy from '@/mocks/EventDummy.json';
import BannerHeader from '@/components/eventRoom/BannerHeader';
import EventStatusArea from '@/components/eventRoom/EventStatusArea';
import EventChatRoomArea from '@/components/eventRoom/EventChatRoomArea';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { EventRoomInfo, EventRoomCurrentInfo, EventRoomMessageInfo } from '@/types/eventRoom';

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
  const [eventStatus, setEventStatus] = useState<EventRoomCurrentInfo | null>(null);
  const [messages, setMessages] = useState<EventRoomMessageInfo[]>([]);

  useEffect(() => {
    if (eventId) {
      setEventInfo({
        eventId: EventDummy.event.eventId,
        title: EventDummy.event.eventInfo.title,
        bannerImage: EventDummy.event.eventInfo.bannerImage,
        eventTime: EventDummy.event.eventPeriod.end,
      });
      WebsocketAPI.connect({
        eventId: Number(eventId),
        onEventRoomInfoReceived: (eventRoomInfo) => setEventStatus(eventRoomInfo),
        onMessageReceived: (messageInfo) => setMessages([...messages, messageInfo]),
        subscriptions: ['eventRoomInfo', 'eventRoomMessage'],
      });
    }
  }, [eventId]);

  return (
    <div className='flex flex-col max-w-screen-xl mx-auto px-7'>
      {eventInfo && (
        <div className='flex flex-col w-full gap-12 mb-7'>
          <BannerHeader bannerImage={eventInfo.bannerImage} />
          <div className='text-xl font-normal' style={{ color: '#1C1C1E', lineHeight: '33px' }}>
            [Event : {eventInfo.eventId}] <span className='font-bold'>{eventInfo.title}</span>
          </div>
          <div className='flex h-[800px] gap-5'>
            <EventStatusArea
              participants={eventStatus?.userCount ?? 0}
              competitionRate={eventStatus?.userCount ?? 0}
              eventTime={eventInfo.eventTime}
            />
            <EventChatRoomArea
              eventId={eventInfo.eventId}
              participants={eventStatus?.userCount ?? 0}
              messages={messages}
            />
          </div>
        </div>
      )}
    </div>
  );
}
