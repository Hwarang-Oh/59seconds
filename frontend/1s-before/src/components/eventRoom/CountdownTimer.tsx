import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { CountdownTimerProps } from '@/types/eventRoom';

export default function CountdownTimer({ eventTime }: Readonly<CountdownTimerProps>) {
  const endTime = new Date(eventTime).getTime();
  const currentTime = Date.now();
  const remainingTimeInSeconds = Math.max(0, (endTime - currentTime) / 1000); // 초 단위로 계산

  const renderTime = (remainingTime: number) => {
    const days = Math.floor(remainingTime / (3600 * 24));
    const hours = Math.floor((remainingTime / 3600) % 24);
    const minutes = Math.floor((remainingTime / 60) % 60);
    const seconds = Math.floor(remainingTime % 60);

    return (
      <div className='text-center'>
        <div className='text-4xl font-bold'>
          {days > 0
            ? `${days * 24 + hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(
                2,
                '0'
              )}`
            : `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(
                seconds
              ).padStart(2, '0')}`}
        </div>
        <p className='text-gray-600'>남은 시간</p>
      </div>
    );
  };

  return (
    <div className='flex flex-col items-center justify-center'>
      <CountdownCircleTimer
        isPlaying
        duration={remainingTimeInSeconds > 86400 ? remainingTimeInSeconds : 86400}
        initialRemainingTime={remainingTimeInSeconds}
        size={240}
        strokeWidth={10}
        colors={['#474972', '#4CAF50', '#FFBB28', '#FF0000']}
        colorsTime={[600, 300, 60]}
        trailColor='#e0e0e0'
        onComplete={() => {
          return { shouldRepeat: false };
        }}>
        {({ remainingTime }) => renderTime(remainingTime)}
      </CountdownCircleTimer>
    </div>
  );
}
