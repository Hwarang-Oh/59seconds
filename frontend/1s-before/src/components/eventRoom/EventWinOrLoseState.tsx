import { EventWinOrLoseStateView } from '@/types/eventRoom';

export default function EventWinOrLoseState({
  isWinner,
  eventId,
  joinedAt,
  ranking,
}: Readonly<EventWinOrLoseStateView>) {
  return (
    <div className='flex flex-col items-center gap-[105px]'>
      {isWinner ? (
        // Winner View
        <div className='text-center'>
          <div className='flex items-center justify-center space-x-8 mb-6'>
            <span className='text-5xl'>🎉</span>
            <div>
              <h2 className='text-xl font-bold text-gray-800'>축하합니다!</h2>
              <p className='text-lg font-semibold text-gray-700 mt-2'>
                선착순 <span className='text-green-600'>{ranking}등</span>으로
              </p>
              <p className='text-lg font-semibold text-gray-700'>이벤트에 당첨되셨습니다!</p>
            </div>
            <span className='text-5xl'>🎉</span>
          </div>
          <p className='text-gray-600 text-sm mb-8'>기록: {new Date(joinedAt).toLocaleString()}</p>
          <button className='bg-indigo-600 text-white py-3 px-6 rounded-md text-lg font-semibold hover:bg-indigo-700 transition'>
            정보 입력하고 상품 GET!
          </button>
        </div>
      ) : (
        // Loser View
        <div className='text-center'>
          <div className='flex items-center justify-center space-x-8 mb-6'>
            <span className='text-5xl'>😢</span>
            <div>
              <h2 className='text-2xl font-bold text-gray-800'>아쉽네요!</h2>
              <p className='text-lg font-semibold text-gray-700 mt-2'>
                이번 이벤트에서는 당첨되지 않으셨습니다.
              </p>
              <p className='text-lg font-semibold text-gray-700'>다음 기회를 노려보세요!</p>
            </div>
            <span className='text-5xl'>😢</span>
          </div>
          <button className='bg-gray-600 text-white py-3 px-6 rounded-md text-lg font-semibold hover:bg-gray-700 transition'>
            다른 이벤트 확인하기
          </button>
        </div>
      )}
    </div>
  );
}
