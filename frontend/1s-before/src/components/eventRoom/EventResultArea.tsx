import EventResultWinOrLoseState from '@/components/eventRoom/EventResultWinOrLoseState';
import EventResultPendingState from '@/components/eventRoom/EventResultPendingState';
import { EventStatusView } from '@/types/eventRoom';

export default function EventResultArea({
  isPending,
  eventId,
  joinedAt,
  ranking,
  isWinner,
  prize,
  totalParticipants,
  currentProccessed,
}: Readonly<EventStatusView>) {
  return (
    <div className='flex flex-col gap-[105px]'>
      <div className='flex flex-col items-center'>
        <div
          className='flex  pb-7 pt-12 text-5xl font-bold'
          style={{ color: '#474972', lineHeight: '42px' }}>
          이벤트 응모 결과
        </div>
        <p className='text-2xl mb-1' style={{ color: '#1C1C1E' }}>
          총 참가자 <span className='font-bold'>{totalParticipants}</span>명 중
        </p>
        <p className='text-2xl font-bold' style={{ color: '#1C1C1E' }}>
          {currentProccessed} 명 추첨!
        </p>
      </div>
      {isPending ? (
        <EventResultPendingState />
      ) : (
        <EventResultWinOrLoseState
          eventId={eventId}
          ranking={ranking}
          joinedAt={joinedAt}
          isWinner={isWinner}
          prize={prize}
        />
      )}
    </div>
  );
}
