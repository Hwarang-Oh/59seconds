import EventStats from '@/components/eventRoom/EventStatus';
import CountdownTimer from '@/components/eventRoom/CountdownTimer';
import EventStatusHeader from '@/components/eventRoom/EventStatusHeader';
import { EventStatusProps } from '@/types/eventRoom';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { getRemainingTimeInSeconds, renderTime } from '@/utils/timeUtils';

export default function EventStatusArea({
  participants,
  competitionRate,
  eventTime,
}: Readonly<EventStatusProps>) {
  const remainingTimeInSeconds = getRemainingTimeInSeconds(eventTime);
  const { days, hours, minutes, seconds } = renderTime(remainingTimeInSeconds);

  return (
    <div className='w-[450px] px-7 rounded-md shadow-md border border-gray-300'>
      <EventStatusHeader />
      <EventStats />

      <button className='w-full mt-6 py-2 bg-gray-300 text-gray-700 rounded-md'>
        추첨 시작 전
      </button>
    </div>
  );
}
