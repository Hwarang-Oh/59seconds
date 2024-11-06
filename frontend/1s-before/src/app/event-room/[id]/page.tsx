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
  const [isChatExpanded, setIsChatExpanded] = useState(false);
  const [messages, setMessages] = useState<EventRoomMessageInfo[]>([]);
  const [eventInfo, setEventInfo] = useState<EventRoomInfo | null>(null);
  const [eventStatus, setEventStatus] = useState<EventRoomCurrentInfo | null>(null);
  const toggleChatSize = () => {
    setIsChatExpanded(!isChatExpanded);
  };

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
        onEventRoomInfoReceived: (eventRoomInfo) => {
          setEventStatus(eventRoomInfo);
        },
        onMessageReceived: (messageInfo) => {
          setMessages((prevMessages) => [...prevMessages, messageInfo]);
        },
        onEventRoomResultReceived: (eventRoomResult) => {
          console.log('Event Room Result Received : ', eventRoomResult);
        },
        subscriptions: ['eventRoomInfo', 'eventRoomMessage', 'eventRoomResult'],
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
          <div className='flex gap-5'>
            <div className={`transition-all duration-300 ${isChatExpanded ? 'w-1/2' : 'w-2/3'}`}>
              <EventStatusArea
                participants={eventStatus?.userCount ?? 0}
                competitionRate={eventStatus?.userCount ?? 0}
                eventTime={eventInfo.eventTime}
              />
            </div>
            <div
              className={`transition-all duration-300 cursor-pointer ${
                isChatExpanded ? 'w-1/2' : 'w-1/3'
              }`}>
              <EventChatRoomArea
                onClick={toggleChatSize}
                eventId={eventInfo.eventId}
                participants={eventStatus?.userCount ?? 0}
                messages={messages}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
