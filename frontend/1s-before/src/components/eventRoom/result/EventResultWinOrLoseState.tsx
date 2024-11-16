import Lottie from 'lottie-react';
import Animation_Tada from '@/assets/Animation_Tada.json';
import Animation_Prize from '@/assets/Animation_Prize.json';
import Animation_Crying from '@/assets/Animation_Crying.json';
import { Clock } from 'lucide-react';
import { EventWinOrLoseStateView } from '@/types/eventRoom';
import { formatTimeWithMilliseconds } from '@/utils/timeUtils';

export default function EventResultWinOrLoseState({
  eventId,
  isWinner,
  joinedAt,
  ranking,
  timeDifference,
  prize,
}: Readonly<EventWinOrLoseStateView>) {
  return (
    <>
      {isWinner ? (
        <div className='flex flex-col items-center gap-[105px] mt-[-40px]'>
          <div className='text-center'>
            <div className='flex flex-col items-center justify-center gap-6'>
              <Lottie animationData={Animation_Prize} loop={true} className='w-[300px] h-[80px]' />
              <div className='flex items-center gap-4'>
                <Lottie animationData={Animation_Tada} loop={true} className='w-[100] h-[100]' />
                <div className='text-2xl font-semibold text-[#1C1C1E] leading-[40px]'>
                  <p>축하합니다!</p>
                  <p>선착순 {ranking}등으로</p>
                  <p>{prize?.prizeName}에 당첨되셨습니다</p>
                </div>
                <Lottie
                  animationData={Animation_Tada}
                  loop={true}
                  className='w-[100] h-[100] transform scale-x-[-1]'
                />
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
          <button className='bg-[#474972] rounded-xl text-white text-xl font-bold py-3 px-20'>
            정보 입력하고 상품 GET!
          </button>
        </div>
      ) : (
        <div className='flex flex-col items-center gap-[105px]'>
          <div className='text-center'>
            <div className='flex flex-col items-center justify-center gap-6'>
              <p className='text-4xl font-bold text-[#1C1C1E]'>아쉽네요!</p>
              <div className='flex items-center gap-4'>
                <Lottie animationData={Animation_Crying} loop={true} className='w-20 h-20' />
                <div className='text-2xl font-semibold text-[#1C1C1E] leading-[40px]'>
                  <p>이번 이벤트에서는 당첨되지 않았습니다.</p>
                  <p>당신의 순위 : {ranking}등</p>
                </div>
                <Lottie animationData={Animation_Crying} loop={true} className='w-20 h-20' />
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
          <button className='bg-[#474972] rounded-xl text-white text-xl font-bold py-3 px-20'>
            메인페이지로 이동
          </button>
        </div>
      )}
    </>
  );
}
