import { getTimes } from '@/utils/timeUtils';

export default function renderTime(remainingTime: number) {
  const { days, hours, minutes, seconds } = getTimes(remainingTime);
  return (
    <div className='text-center'>
      <div className='text-4xl font-bold' style={{ color: '#474972', lineHeight: 'normal' }}>
        {days > 0
          ? `${days * 24 + hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(
              2,
              '0'
            )}`
          : `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(
              seconds
            ).padStart(2, '0')}`}
      </div>
      <p className='font-bold text-lg' style={{ color: '#8F96A8', lineHeight: 'normal' }}>
        남은 시간
      </p>
    </div>
  );
}
