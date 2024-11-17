import Link from 'next/link';
import Image from 'next/image';
import Banner from '@/assets/defaultBanner.png';
import CreatorEdit from '@/components/mypage/CreatorEdit';
import PrizeInfoPopUp from '@/components/mypage/PrizeInfoPopUp';
import { useState } from 'react';
import { useEventRoom } from '@/hooks/eventRoomHook';

export default function EventCreatorPage() {
  const { createdRooms, loading, isPopupOpen, selectedRoom, openPopup, closePopup } =
    useEventRoom();
  // IMP: 필터 상태 ("전체", "진행중", "종료")
  const [filter, setFilter] = useState('전체');

  // IMP: 필터링된 이벤트 목록
  const filteredRooms = createdRooms.filter((room) => {
    const onGoing = room.status === 'ONGOING';
    const completed = room.status === 'COMPLETED' || room.status === 'COMPLETED_NO_WINNER_INFO';
    if (filter === '전체') return true;
    if (filter === '진행중') return onGoing;
    if (filter === '종료') return completed;
    return true;
  });

  return (
    <div>
      <CreatorEdit />

      <section>
        <div className='text-xl font-semibold border-b pb-4'>
          <span className='border-b-4 border-mainColor1 pb-4'>개설한 이벤트</span>
        </div>
        <div className='flex space-x-3 mt-10'>
          <button
            onClick={() => setFilter('전체')}
            className={`px-4 py-1 rounded-full ${
              filter === '전체' ? 'bg-mainColor1 text-white' : 'bg-gray-200 text-gray-700'
            }`}>
            전체
          </button>
          <button
            onClick={() => setFilter('진행중')}
            className={`px-4 py-1 rounded-full ${
              filter === '진행중' ? 'bg-mainColor1 text-white' : 'bg-gray-200 text-gray-700'
            }`}>
            진행중
          </button>
          <button
            onClick={() => setFilter('종료')}
            className={`px-4 py-1 rounded-full ${
              filter === '종료' ? 'bg-mainColor1 text-white' : 'bg-gray-200 text-gray-700'
            }`}>
            종료
          </button>
        </div>
      </section>

      {loading && <p>Loading...</p>}

      {filteredRooms.length === 0 && !loading ? (
        <p className='text-gray-500 text-center mt-10'>개설한 이벤트 없음</p>
      ) : (
        <div className='mt-6 grid grid-cols-1 gap-6'>
          {filteredRooms.map((room) => (
            <div
              key={room.eventId}
              className='flex flex-col border border-gray-300 rounded-lg overflow-hidden'>
              <Link href={`/event-detail/${room.eventId}`}>
                <div className='w-full h-56 relative'>
                  <Image src={room.bannerUrl ?? Banner} alt='배너' fill className='object-cover' />
                </div>
              </Link>
              <div className='flex flex-row justify-between items-center mx-1 my-4 px-3'>
                <span
                  className={`mr-3 rounded-2xl px-2 py-1 ${
                    room.status == 'ONGOING'
                      ? 'bg-subColor4 text-subColor5'
                      : 'bg-gray-200 text-subColor3'
                  }`}>
                  {room.status == 'ONGOING' ? '진행중' : '종료'}
                </span>
                <div className='text-subColor3 font-bold'>참여자 {room.unlockCount}명</div>
              </div>
              <div className='flex justify-between items-center mx-3 mb-4'>
                <Link href={`/event-detail/${room.eventId}`}>
                  <p className='mt-2 ml-2 text-gray-600 font-bold text-lg pb-3 pl-3 cursor-pointer'>
                    {room.title}
                  </p>
                </Link>
                {(room.status === 'COMPLETED' || room.status === 'COMPLETED_NO_WINNER_INFO') && (
                  <button
                    onClick={() => openPopup(room.eventId)}
                    className='px-4 py-2 bg-mainColor1 text-white rounded-lg'>
                    당첨자 정보 보기
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {isPopupOpen && <PrizeInfoPopUp roomId={selectedRoom} closePopup={closePopup} />}
    </div>
  );
}
