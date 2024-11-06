'use client';
import WebsocketAPI from '@/apis/webSocket';
import EventDummy from '@/mocks/EventDummy.json';
import BannerHeader from '@/components/eventRoom/BannerHeader';
import EventStatusArea from '@/components/eventRoom/EventStatusArea';
import EventChatRoomArea from '@/components/eventRoom/EventChatRoomArea';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { EventRoomInfo, EventRoomCurrentInfo, EventRoomMessageInfo } from '@/types/eventRoom';

export default function EventRoom() {
  const params = useParams();
  const { id: eventId } = params as { id: string };
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

  useEffect(() => {
    console.log('Hello World!');
    console.log('messages', messages);
  }, [messages]);

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
