import { EventRoomResultViewInfo } from '@/types/eventRoom';
import { formatTimeWithMilliseconds } from '@/utils/timeUtils';
import { Trophy, Clock, Medal, Award, Star, AlertCircle } from 'lucide-react';

export default function EventResultEachResult({
  isMine,
  prize,
  ranking,
  eventId,
  memberId,
  joinedAt,
  winner,
  winnerName,
  timeDifference,
}: Readonly<EventRoomResultViewInfo>) {
  const getResultStyle = (ranking: number, winner: boolean) => {
    if (!winner) {
      return {
        icon: AlertCircle,
        color: 'text-gray-400',
        bg: 'bg-gray-50',
        borderColor: 'border-gray-200',
      };
    }
    if (ranking === 1) {
      return {
        icon: Trophy,
        color: 'text-yellow-400',
        bg: 'bg-yellow-50',
        borderColor: 'border-yellow-200',
      };
    } else {
      return {
        icon: Star,
        color: 'text-blue-400',
        bg: 'bg-blue-50',
        borderColor: 'border-blue-200',
      };
    }
  };

  const { icon: ResultIcon, color, bg, borderColor } = getResultStyle(ranking, winner);

  return (
    <div
      className={`flex justify-between items-center rounded-lg shadow-md p-4 my-4 ${bg} ${borderColor} ${
        isMine ? 'ring-2 ring-blue-400' : ''
      } transition-all hover:shadow-lg`}>
      <div className='flex items-center gap-4'>
        <div className={`flex items-center justify-center w-12 h-12 rounded-full ${bg} ${color}`}>
          <ResultIcon className='w-6 h-6' />
        </div>
        <div className='flex flex-col'>
          <div className='flex items-center gap-3'>
            <span className={`text-2xl font-bold ${color}`}>{ranking}등</span>
            <span className='text-xl font-semibold text-gray-700'>{winnerName}</span>
            {isMine && (
              <span className='px-2 py-1 text-sm bg-blue-100 text-blue-600 rounded-full'>
                나의 기록
              </span>
            )}
          </div>
          <div className='flex items-center mt-1 text-gray-500'>
            <Clock className='w-4 h-4 mr-2' />
            <div className='flex gap-3 items-center'>
              <span className='font-mono'>{formatTimeWithMilliseconds(joinedAt)}</span>
              <span className='px-2 py-1 text-sm bg-red-100 text-red-600 rounded-full'>
                반응속도 : {timeDifference} 초
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className='flex items-center gap-2'>
        {winner ? (
          <>
            <div className={`px-3 py-1 rounded-full ${color} ${bg} font-medium`}>당첨</div>
            <div className='flex flex-col items-center text-sm text-gray-600 gap-1'>
              <p className='font-semibold'>당첨 상품</p>
              <span className='px-2 py-1 text-sm bg-gray-100 rounded-full'>
                {prize?.prizeName ?? '상품 정보 없음'}
              </span>
            </div>
          </>
        ) : (
          <div className='px-3 py-1 rounded-full bg-gray-100 text-gray-500 font-medium'>미당첨</div>
        )}
      </div>
    </div>
  );
}
