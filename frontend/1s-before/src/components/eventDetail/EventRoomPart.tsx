import React from 'react';
import { IoMdLock } from 'react-icons/io';
import { IoEnterOutline } from 'react-icons/io5';
import { EventIntroTabProps } from '@/types/eventDetail';
import { useEventDetail } from '@/hooks/eventDetailHook';
import { FaGift, FaCalendarAlt, FaLink, FaEnvelope } from 'react-icons/fa';

export default function EventRoomPart({
  event,
  creator,
  id,
}: Readonly<EventIntroTabProps>) {
  const { prizes = [], startTime, endTime, enterCode } = event;
  const {
    inputCode,
    setInputCode,
    isCodeValid,
    openWindow,
    handleCodeSubmit,
    handleKeyDown,
  } = useEventDetail(id, enterCode);

  return (
    <div className="max-w-sm">
      {!isCodeValid ? (
        <div className="flex flex-col items-center justify-center min-h-[80vh] bg-mainColor2 p-6 rounded-lg border">
          <IoMdLock className="text-mainColor1 mb-4" size={40} />
          <p className="text-center text-mainColor1 font-bold text-xl mb-4">
            이벤트 참여하기
          </p>
          <div className="flex items-center mb-4 border w-full rounded-lg shadow-md bg-white">
            <input
              type="text"
              placeholder="참여 코드를 입력하세요"
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 py-3 text-center outline-none bg-transparent text-mainColor1"
            />
            <IoEnterOutline
              className="text-mainColor1 pr-2 cursor-pointer"
              size={30}
              onClick={handleCodeSubmit}
            />
          </div>
        </div>
      ) : (
        <div className="sticky top-0 z-10 bg-white border rounded-lg shadow-lg p-5">
          <div className="text-center mb-4 border-b">
            <p className="text-gray-400 mb-4 font-semibold">
              현재 10,000명 참여 중 !
            </p>
          </div>

          {/* 이벤트 정보 */}
          <div className="p-3 mb-6">
            {/* 상품 정보 */}
            <div className="flex items-center mb-2">
              <FaGift className="text-mainColor1 mr-2" />
              <p className="text-gray-700 font-semibold">상품 정보</p>
            </div>
            <p className="text-gray-600 ml-6 text-sm">
              {prizes.map((product) => (
                <span key={product.prizeId}>
                  {product.prizeName} {product.winnerCount}개{' '}
                </span>
              ))}
            </p>

            {/* 이벤트 기간 */}
            <div className="flex items-center mt-4 mb-2">
              <FaCalendarAlt className="text-mainColor1 mr-2" />
              <p className="text-gray-700 font-semibold">이벤트 기간</p>
            </div>
            <p className="text-gray-600 ml-6 text-sm">
              {new Date(startTime).toLocaleString()} ~{' '}
              {new Date(endTime).toLocaleString()}
            </p>

            {/* 주최자 정보 */}
            <div className="flex items-center mt-4 mb-2">
              <FaLink className="text-mainColor1 mr-2" />
              <p className="text-gray-700 font-semibold">주최자 정보</p>
            </div>
            <p className="ml-6 text-sm">{creator?.snsLink}</p>

            {/* 요청 기한 */}
            <div className="flex items-center mt-4 mb-2">
              <FaEnvelope className="text-mainColor1 mr-2" />
              <p className="text-gray-700 font-semibold">요청 기한</p>
            </div>
            <p className="text-gray-600 text-sm ml-6">당첨일로부터 3일 이내</p>
          </div>

          {/* 입장하기 버튼 */}
          <button
            onClick={openWindow}
            className="w-full bg-mainColor1 text-white font-bold py-2 rounded-lg tracking-widest"
          >
            입장하기
          </button>
        </div>
      )}
    </div>
  );
}
