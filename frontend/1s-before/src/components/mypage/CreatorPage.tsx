import Image from 'next/image';
import CreatorEdit from './CreatorEdit';
import Banner from '@/assets/defaultBanner.png';
import { useState } from 'react';
import { useEventRoom } from '@/hooks/eventRoomHook';

export default function EventCreatorPage() {
  const { createdRooms, loading } = useEventRoom();

  // IMP: 필터 상태 ("전체", "진행중", "종료")
  const [filter, setFilter] = useState('전체');

  // IMP: 현재 시간을 기준으로 진행중인지 종료인지 판단
  const currentTime = new Date();

  // IMP: 필터링된 이벤트 목록
  const filteredRooms = createdRooms.filter((room) => {
    const endTime = new Date(room.endTime);
    if (filter === '전체') return true;
    if (filter === '진행중') return endTime > currentTime;
    if (filter === '종료') return endTime <= currentTime;
    return true;
  });

  return (
    <div>
      <CreatorEdit />

      <section>
        <div className="text-xl font-semibold border-b pb-4">
          <span className="border-b-4 border-mainColor1 pb-4">
            개설한 이벤트
          </span>
        </div>
        <div className="flex space-x-3 mt-10">
          <button
            onClick={() => setFilter('전체')}
            className={`px-4 py-1 rounded-full ${
              filter === '전체'
                ? 'bg-mainColor1 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            전체
          </button>
          <button
            onClick={() => setFilter('진행중')}
            className={`px-4 py-1 rounded-full ${
              filter === '진행중'
                ? 'bg-mainColor1 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            진행중
          </button>
          <button
            onClick={() => setFilter('종료')}
            className={`px-4 py-1 rounded-full ${
              filter === '종료'
                ? 'bg-mainColor1 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            종료
          </button>
        </div>
      </section>

      {loading && <p>Loading...</p>}

      {filteredRooms.length === 0 && !loading ? (
        <p className="text-gray-500 text-center mt-10">개설한 이벤트 없음</p>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-6">
          {filteredRooms.map((room) => (
            <div
              key={room.eventId}
              className="flex flex-col border border-gray-300 rounded-lg overflow-hidden"
            >
              <div className="w-full h-56 relative">
                <Image
                  src={room.bannerUrl ?? Banner}
                  alt="배너"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-row justify-between items-center mx-1 my-4 px-3">
                <span
                  className={`mr-3 rounded-2xl px-2 py-1 ${
                    new Date(room.endTime) > currentTime
                      ? 'bg-subColor4 text-subColor5'
                      : 'bg-gray-200 text-subColor3'
                  }`}
                >
                  {new Date(room.endTime) > currentTime ? '진행중' : '종료'}
                </span>
                <div className="text-subColor3 font-bold">
                  참여자 {room.unlockCount}명
                </div>
              </div>
              <p className="ml-2 text-gray-600 font-bold text-lg pl-3">
                {room.title}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
