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
        duration={remainingTimeInSeconds > 86400 ? remainingTimeInSeconds : 86400} // 전체 남은 시간 또는 24시간
        initialRemainingTime={remainingTimeInSeconds} // 남은 시간에 따라 진행
        size={240} // 타이머의 크기를 픽셀 단위로 설정
        strokeWidth={10} // 타이머 원의 두께 설정
        colors={[
          '#474972', // 기본 색상 (회색)
          '#4CAF50', // 10분 이하 (초록색)
          '#FFBB28', // 5분 이하 (주황색)
          '#FF0000', // 1분 이하 (빨간색)
        ]}
        colorsTime={[
          600, // 남은 시간 10분 이하일 때 초록색
          300, // 남은 시간 5분 이하일 때 주황색
          60, // 남은 시간 1분 이하일 때 빨간색
        ]}
        trailColor='#e0e0e0'
        onComplete={() => {
          return { shouldRepeat: false };
        }}>
        {({ remainingTime }) => renderTime(remainingTime)}
      </CountdownCircleTimer>
    </div>
  );
}
