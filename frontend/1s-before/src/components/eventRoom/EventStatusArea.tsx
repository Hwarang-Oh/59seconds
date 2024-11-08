import EventStats from '@/components/eventRoom/EventStatus';
import EventResult from '@/components/eventRoom/EventResult';
import ActiveButton from '@/components/eventRoom/ActiveButton';
import CountdownTimer from '@/components/eventRoom/CountdownTimer';
import EventStatusHeader from '@/components/eventRoom/EventStatusHeader';
import { useState } from 'react';
import { useMemberStore } from '@/store/memberStore';
import { eventParticipate } from '@/apis/eventAPI';
import { EventStatusAreaProps } from '@/types/eventRoom';

export default function EventStatusArea({
  isDrawing,
  participants,
  competitionRate,
  eventTime,
  myResult,
  goDrawView,
}: Readonly<EventStatusAreaProps>) {
  const [isTimerCompleted, setIsTimerCompleted] = useState(false);
  const member = useMemberStore((state) => state.member);
  const getBackgroundColor = () => {
    if (myResult.isMine) {
      return myResult.isWinner ? 'bg-[#FFF9D5]' : 'bg-blue-200';
    }
  };

  return (
    <div
      className={`h-full max-h-[790px] px-7 rounded-md shadow-md border border-gray-300 shrink-0 ${getBackgroundColor()}`}>
      {isDrawing && (
        <EventResult
          isPending={!myResult.isMine}
          eventId={myResult.eventId}
          joinedAt={myResult.joinedAt}
          ranking={myResult.ranking}
          isWinner={myResult.isWinner}
          totalParticipants={participants}
          currentProccessed={0}
        />
      )}
      {!isDrawing && (
        <>
          <EventStatusHeader />
          <div className='flex flex-col gap-[105px] pb-20'>
            <EventStats />
            <CountdownTimer eventTime={eventTime} onComplete={() => setIsTimerCompleted(true)} />
            <ActiveButton
              isDisabled={!isTimerCompleted}
              onClick={() => {
                eventParticipate({ eventId: 1, memberId: member.memberId });
                goDrawView();
              }}
              text={isTimerCompleted ? '추첨 시작!' : '추첨 시작 전'}
            />
          </div>
        </>
      )}
    </div>
  );
}
