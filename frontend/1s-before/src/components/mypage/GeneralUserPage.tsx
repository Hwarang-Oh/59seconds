import Link from 'next/link';
import Image from 'next/image';
import GeneralUserEdit from './GeneralUserEdit';
import Banner from '@/assets/defaultBanner.png';
import RequestPopUp from '@/components/prizeRequest/RequestPopUp';
import { useState } from 'react';
import { useEventRoom } from '@/hooks/eventRoomHook';

export default function GeneralUserPage() {
  const { participatedRooms, loading } = useEventRoom();
  const [showRequestPopUp, setShowRequestPopUp] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);
  const [selectedPrizeType, setSelectedPrizeType] = useState<string | null>(
    null
  );

  const handleOpenPopUp = (eventId: number, prizeType: string) => {
    setSelectedEventId(eventId);
    setSelectedPrizeType(prizeType);
    setShowRequestPopUp(true);
  };

  const handleClosePopUp = () => {
    setShowRequestPopUp(false);
  };

  // IMP: 토글 상태 ("전체", "당첨", "미당첨")
  const [filter, setFilter] = useState('전체');

  // IMP: 필터링된 이벤트 목록
  const filteredRooms = participatedRooms.filter((room) => {
    if (filter === '전체') return true;
    if (filter === '당첨') return room.isWinner;
    if (filter === '미당첨') return !room.isWinner;
    return true;
  });

  return (
    <div>
      <GeneralUserEdit />

      <section>
        <div className="text-xl font-semibold border-b pb-4">
          <span className="border-b-4 border-mainColor1 pb-4">
            참여한 이벤트
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
            onClick={() => setFilter('당첨')}
            className={`px-4 py-1 rounded-full ${
              filter === '당첨'
                ? 'bg-mainColor1 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            당첨
          </button>
          <button
            onClick={() => setFilter('미당첨')}
            className={`px-4 py-1 rounded-full ${
              filter === '미당첨'
                ? 'bg-mainColor1 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            미당첨
          </button>
        </div>
      </section>

      {loading && <p>Loading...</p>}

      <div className="mt-6 grid grid-cols-1 gap-6">
        {filteredRooms.length === 0 ? (
          <p className="text-gray-500 text-center mt-10">참여한 이벤트 없음</p>
        ) : (
          filteredRooms.map((room) => (
            <div
              key={room.eventId}
              className="flex flex-col border border-gray-300 rounded-lg overflow-hidden"
            >
              <div className="w-full h-56 relative">
                <Link href={`/event-detail/${room.eventId}`}>
                  <Image
                    src={room.bannerImage ?? Banner}
                    alt="배너"
                    fill
                    className="object-cover"
                  />
                </Link>
              </div>
              <div className="flex flex-row justify-between items-center mx-1 px-3">
                <div
                  className={`mt-3 flex items-center ${
                    room.isWinner ? 'text-subColor5' : 'text-subColor3'
                  }`}
                >
                  <span
                    className={`mr-3 rounded-2xl px-2 py-1 ${
                      room.isWinner ? 'bg-subColor4' : 'bg-gray-200'
                    }`}
                  >
                    {room.isWinner ? '당첨' : '미당첨'}
                  </span>
                  <span>
                    {room.ranking} 등 / {room.totalParticipants} 명
                  </span>
                </div>
                {room.isWinner && (
                  <button
                    className="mt-3 bg-mainColor1 text-white py-2 px-4 rounded-md"
                    onClick={() =>
                      handleOpenPopUp(room.eventId, room.prizeType)
                    }
                  >
                    정보 입력하고 상품 GET!
                  </button>
                )}
              </div>
              <Link href={`/event-detail/${room.eventId}`}>
                <p className="mt-2 ml-2 text-gray-600 font-bold text-lg pb-3 pl-3 cursor-pointer">
                  {room.title}
                </p>
              </Link>
            </div>
          ))
        )}
      </div>

      {showRequestPopUp &&
        selectedEventId !== null &&
        selectedPrizeType !== null && (
          <RequestPopUp
            roomId={selectedEventId}
            prizeType={selectedPrizeType}
            onClose={handleClosePopUp}
          />
        )}
    </div>
  );
}
