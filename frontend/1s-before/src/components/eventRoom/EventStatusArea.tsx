import EventResultArea from '@/components/eventRoom/EventResultArea';
import EventStatusStats from '@/components/eventRoom/status/EventStatusStats';
import EventStatusHeader from '@/components/eventRoom/status/EventStatusHeader';
import EventStatusActiveButton from '@/components/eventRoom/status/EventStatusActiveButton';
import EventStatusCountdownTimer from '@/components/eventRoom/status/EventStatusCountdownTimer';
import { useState } from 'react';
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
  const getBackgroundColor = () => {
    if (myResult?.isMine) {
      return myResult.isWinner ? 'bg-[#FFF9D5]' : 'bg-blue-200';
    }
  };

  return (
    <div
      className={`h-full max-h-[790px] px-7 rounded-md shadow-md border border-gray-300 shrink-0 ${getBackgroundColor()}`}>
      {isDrawing && (
        <EventResultArea
          eventId={eventId}
          prize={myResult.prize}
          ranking={myResult.ranking}
          isPending={!myResult.isMine}
          joinedAt={myResult.joinedAt}
          isWinner={myResult.isWinner}
          timeDifference={myResult.timeDifference}
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
                getMyEventResult(eventId);
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
