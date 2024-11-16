import renderTime from '@/components/icon/renderTime';
import { CountdownTimerProps } from '@/types/eventRoom';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { getRemainingTimeInSeconds } from '@/utils/timeUtils';

export default function EventStatusCountdownTimer({
  eventTime,
  onComplete,
}: Readonly<CountdownTimerProps>) {
  const remainingTimeInSeconds = getRemainingTimeInSeconds(eventTime);
  return (
    <div className='flex flex-col items-center justify-center'>
      <CountdownCircleTimer
        isPlaying
        duration={remainingTimeInSeconds > 86400 ? remainingTimeInSeconds : 86400}
        initialRemainingTime={0}
        size={240}
        strokeWidth={10}
        colors={['#474972', '#4CAF50', '#FFBB28', '#FF0000']}
        colorsTime={[600, 300, 60]}
        trailColor='#e0e0e0'
        onComplete={() => {
          onComplete();
          return { shouldRepeat: false };
        }}>
        {({ remainingTime }) => renderTime(remainingTime)}
      </CountdownCircleTimer>
    </div>
  );
}
