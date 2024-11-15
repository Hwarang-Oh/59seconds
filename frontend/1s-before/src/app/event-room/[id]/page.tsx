'use client';
import BannerHeader from '@/components/eventRoom/BannerHeader';
import EventStatusArea from '@/components/eventRoom/EventStatusArea';
import EventChatRoomArea from '@/components/eventRoom/EventChatRoomArea';
import EventResultAllResult from '@/components/eventRoom/EventResultAllResult';
import { useEventProgress } from '@/hooks/useEventProgressHook';

export default function EventRoom() {
  const {
    messages,
    myResult,
    isDrawing,
    eventInfo,
    eventStatus,
    eventResult,
    untilMyResult,
    competitionRate,
    currentProcessed,
    setIsDrawing,
    toggleChatSize,
    getStatusAreaWidth,
    getChatRoomAreaWidth,
    getUntilMyResult,
  } = useEventProgress();

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
                getMyEventResult={getUntilMyResult}
                goDrawView={() => setIsDrawing(true)}
                currentProccessed={currentProcessed}
                competitionRate={competitionRate}
                totalParticipants={eventStatus?.userCount ?? 0}
              />
              <EventResultAllResult
                list={eventResult}
                untilMyResult={untilMyResult}
                myResult={myResult}
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
