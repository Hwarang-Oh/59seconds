import CountdownTimer from '@/components/eventRoom/CountdownTimer';
import { EventStatusProps } from '@/types/eventRoom';

export default function EventStatus({
  participants,
  competitionRate,
  eventTime,
}: Readonly<EventStatusProps>) {
  return (
    <div className='w-[450px] p-5 bg-white rounded-md shadow-md'>
      <div className='flex items-center justify-between mb-4'>
        <p className='text-lg font-semibold'>이벤트 현황</p>
        <span className='bg-blue-500 text-white px-2 py-1 rounded-lg text-sm'>311</span>
      </div>
      <div className='flex items-center justify-between mb-4'>
        <p className='text-gray-600'>현재 참여자</p>
        <span className='font-bold text-gray-900'>32,847명</span>
      </div>
      <div className='flex items-center justify-between mb-6'>
        <p className='text-gray-600'>예상 경쟁률</p>
        <span className='font-bold text-red-500'>3.28</span>
      </div>
      <CountdownTimer eventTime={eventTime} />
      <button className='w-full mt-6 py-2 bg-gray-300 text-gray-700 rounded-md'>
        추첨 시작 전
      </button>
    </div>
  );
}
