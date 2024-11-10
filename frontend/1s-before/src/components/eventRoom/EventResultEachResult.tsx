import { EventRoomResultViewInfo } from '@/types/eventRoom';

export default function EventResultEachResult({
  eventId,
  memberId,
  joinedAt,
  ranking,
  isWinner,
  isMine,
}: Readonly<EventRoomResultViewInfo>) {
  // 조건부 배경색 설정
  const getBackgroundColor = () => {
    if (isMine) return 'bg-[#A2A4BF]';
    return isWinner ? 'bg-[#DCDDEC]' : 'bg-[#CCCCCC]';
  };

  return (
    <div
      className={`flex ${getBackgroundColor()} justify-between items-center rounded-lg shadow-md py-3 px-6`}>
      <div className='flex gap-7 items-center'>
        <p
          className='text-white text-4xl font-semibold'
          style={{ textShadow: '0px 4px 4px rgba(0, 0, 0, 0.20)' }}>
          {ranking}등
        </p>
        <p className='text-2xl text-gray-600 font-semibold'>{memberId}</p>
      </div>
      <div className='text-2xl text-gray-600'>{joinedAt}</div>
    </div>
  );
}
