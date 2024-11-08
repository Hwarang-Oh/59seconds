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
  // IMP : Chat Size 조절을 위한 State
  // IMP : Event Result 조회를 위한 View 조절 State
  const [isChatExpanded, setIsChatExpanded] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);

  const toggleChatSize = () => {
    setIsChatExpanded(!isChatExpanded);
  };

  const getStatusAreaWidth = () => {
    if (isDrawing) return 'w-2/3';
    return isChatExpanded ? 'w-1/2' : 'w-2/3';
  };
  const getChatRoomAreaWidth = () => {
    if (isDrawing) return 'w-1/3';
    return isChatExpanded ? 'w-1/2' : 'w-1/3';
  };

  // IMP : eventInfo -> Event 정보 저장 ( API )
  // IMP : message -> Chat 내용 저장 ( WebSocket )
  // IMP : eventStatus -> Event 상태 저장 ( WebSocket )
  const [eventInfo, setEventInfo] = useState<EventRoomInfo | null>(null);
  const [messages, setMessages] = useState<EventRoomMessageInfo[]>([]);
  const [eventStatus, setEventStatus] = useState<EventRoomCurrentInfo | null>(null);

  useEffect(() => {
    if (eventId) {
      // TODO : Fetch Event Info from API ( API를 통한 호출로 발전해야 함 )
      setEventInfo({
        eventId: EventDummy.event.eventId,
        title: EventDummy.event.eventInfo.title,
        bannerImage: EventDummy.event.eventInfo.bannerImage,
        eventTime: EventDummy.event.eventPeriod.end,
      });
      // TODO : WebSocket Connection ( 안정성을 확보해줘야 한다 )
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
            <div className={`relative transition-all duration-300 ${getStatusAreaWidth()}`}>
              <EventStatusArea
                isDrawing={isDrawing}
                participants={eventStatus?.userCount ?? 0}
                competitionRate={eventStatus?.userCount ?? 0}
                eventTime={eventInfo.eventTime}
              />
            </div>

            <div className={`transition-all duration-300 cursor-pointer ${getChatRoomAreaWidth()}`}>
              <EventChatRoomArea
                eventId={eventInfo.eventId}
                participants={eventStatus?.userCount ?? 0}
                messages={messages}
                onClick={toggleChatSize}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
