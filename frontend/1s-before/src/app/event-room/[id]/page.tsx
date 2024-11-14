'use client';
import BannerHeader from '@/components/eventRoom/BannerHeader';
import EventStatusArea from '@/components/eventRoom/EventStatusArea';
import EventChatRoomArea from '@/components/eventRoom/EventChatRoomArea';
import EventResultAllResult from '@/components/eventRoom/EventResultAllResult';
import { useEventRoom } from '@/hooks/useEventRoomHook';

export default function EventRoom() {
  const {
    messages,
    myResult,
    isDrawing,
    eventInfo,
    eventStatus,
    eventResult,
    competitionRate,
    currentProcessed,
    toggleChatSize,
    getStatusAreaWidth,
    getChatRoomAreaWidth,
    getFrontEventResult,
    getMyEventResult,
    setIsDrawing,
  } = useEventRoom();
  console.log(eventInfo);

  return (
    <div className='flex flex-col max-w-screen-xl mx-auto px-7'>
      {eventInfo && (
        <div className='flex flex-col w-full gap-12 mb-7'>
          <BannerHeader bannerImage={eventInfo.bannerImage} />
          <div className='text-xl font-normal' style={{ color: '#1C1C1E', lineHeight: '33px' }}>
            [{eventInfo.creatorName}] <span className='font-bold'>{eventInfo.title}</span>
          </div>
          <div className='flex gap-5'>
            <div className={`transition-all duration-300 ${getStatusAreaWidth()}`}>
              <EventStatusArea
                myResult={myResult}
                isDrawing={isDrawing}
                eventTime={eventInfo.eventTime}
                eventId={eventInfo.eventId}
                getMyEventResult={getMyEventResult}
                goDrawView={() => setIsDrawing(true)}
                currentProccessed={currentProcessed}
                competitionRate={competitionRate}
                totalParticipants={eventStatus?.userCount ?? 0}
              />
              <EventResultAllResult list={eventResult} myResult={myResult} />
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
