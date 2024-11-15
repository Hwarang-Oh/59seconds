import EventStatusStats from '@/components/eventRoom/EventStatusStats';
import EventResultArea from '@/components/eventRoom/EventResultArea';
import EventStatusActiveButton from '@/components/eventRoom/EventStatusActiveButton';
import EventStatusCountdownTimer from '@/components/eventRoom/EventStatusCountdownTimer';
import EventStatusHeader from '@/components/eventRoom/EventStatusHeader';
import { useEffect, useState } from 'react';
import { useMemberStore } from '@/store/memberStore';
import { EventStatusAreaProps } from '@/types/eventRoom';

export default function EventStatusArea({
  eventId,
  myResult,
  eventTime,
  isDrawing,
  competitionRate,
  currentProccessed,
  totalParticipants,
  goDrawView,
  getMyEventResult,
}: Readonly<EventStatusAreaProps>) {
  const [isTimerCompleted, setIsTimerCompleted] = useState(false);
  const member = useMemberStore((state) => state.member);
  const getBackgroundColor = () => {
    if (myResult?.isMine) {
      return myResult.isWinner ? 'bg-[#FFF9D5]' : 'bg-blue-200';
    }
  };

  useEffect(() => {
    console.log(myResult);
  }, [myResult]);

  return (
    <div
      className={`h-full max-h-[790px] px-7 rounded-md shadow-md border border-gray-300 shrink-0 ${getBackgroundColor()}`}>
      {isDrawing && (
        <EventResultArea
          isPending={!myResult.isMine}
          eventId={eventId}
          joinedAt={myResult.joinedAt}
          ranking={myResult.ranking}
          isWinner={myResult.isWinner}
          totalParticipants={totalParticipants}
          currentProccessed={currentProccessed}
        />
      )}
      {!isDrawing && (
        <>
          <EventStatusHeader />
          <div className='flex flex-col gap-[105px] pb-20'>
            <EventStatusStats participants={totalParticipants} competitionRate={competitionRate} />
            <EventStatusCountdownTimer
              eventTime={eventTime}
              onComplete={() => setIsTimerCompleted(true)}
            />
            <EventStatusActiveButton
              isDisabled={!isTimerCompleted}
              onClick={() => {
                if (member) {
                  getMyEventResult(eventId);
                  goDrawView();
                }
              }}
              text={isTimerCompleted ? '추첨 시작!' : '추첨 시작 전'}
            />
          </div>
        </>
      )}
    </div>
  );
}
