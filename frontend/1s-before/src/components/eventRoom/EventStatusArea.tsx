import EventStats from '@/components/eventRoom/EventStatus';
import ActiveButton from '@/components/eventRoom/ActiveButton';
import CountdownTimer from '@/components/eventRoom/CountdownTimer';
import EventStatusHeader from '@/components/eventRoom/EventStatusHeader';
import { useState } from 'react';
import { EventStatusAreaProps } from '@/types/eventRoom';

export default function EventStatusArea({
  isDrawing,
  participants,
  competitionRate,
  eventTime,
}: Readonly<EventStatusAreaProps>) {
  const [isTimerCompleted, setIsTimerCompleted] = useState(false);

  return (
    <div className='h-full px-7 rounded-md shadow-md border border-gray-300 shrink-0'>
      <EventStatusHeader />
      <div className='flex flex-col gap-[105px] pb-20'>
        <EventStats />
        <CountdownTimer eventTime={eventTime} onComplete={() => setIsTimerCompleted(true)} />
        <ActiveButton
          isDisabled={!isTimerCompleted}
          onClick={() => console.log(1)}
          text={isTimerCompleted ? '추첨 시작!' : '추첨 시작 전'}
        />
      </div>
    </div>
  );
}
