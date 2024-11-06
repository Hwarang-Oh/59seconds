import React from 'react';
import { EventIntroTabProps } from '@/types/eventDetail';
import { useEventDetail } from '@/hooks/eventDetailHook';
import {
  FaGift,
  FaCalendarAlt,
  FaLink,
  FaEnvelope,
  FaUser,
} from 'react-icons/fa';
import { IoMdLock } from 'react-icons/io';
import { IoShareSocial, IoEnterOutline } from 'react-icons/io5';
import SocialSharePopUp from './SocialSharePopUp';

export default function EventRoomPart({
  event,
  creator,
  id,
}: Readonly<EventIntroTabProps>) {
  const { title } = event.eventInfo;
  const { productsOrCoupons, eventPeriod, participationCode } = event;
  const {
    inputCode,
    setInputCode,
    isCodeValid,
    openWindow,
    handleCodeSubmit,
    handleKeyDown,
    openSharePopUp,
    closeSharePopUp,
    isSharePopupOpen,
  } = useEventDetail(id, participationCode);

  const totalProducts = productsOrCoupons.reduce(
    (sum, product) => sum + product.recommendedPeople,
    0
  );

  return (
    <div className="max-w-sm">
      <h2 className="text-lg font-bold text-gray-800 mb-1">
        [{creator.creatorName}] {title}
      </h2>
      <div className="flex flex-row justify-between">
        <p className="text-sm text-gray-500 mb-4">{totalProducts}명 추첨</p>
        <IoShareSocial
          className="text-mainColor1 cursor-pointer"
          size={18}
          onClick={openSharePopUp}
        />
      </div>
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
        <div className="bg-white border rounded-lg shadow-lg p-5">
          <div className="text-center py-4 mb-6 border-b">
            <p className="text-gray-400 font-semibold">
              현재 10,000명 참여 중!
            </p>
          </div>

          {/* 이벤트 정보 */}
          <div className="p-4 mb-6">
            {/* 상품 정보 */}
            <div className="flex items-center mb-2">
              <FaGift className="text-mainColor1 mr-2" />
              <p className="text-gray-700 font-semibold">상품 정보</p>
            </div>
            <p className="text-gray-600 ml-6 text-sm">
              {productsOrCoupons.map((product) => (
                <span key={product.order}>
                  {product.name} {product.recommendedPeople}개{' '}
                </span>
              ))}
            </p>

            {/* 이벤트 기간 */}
            <div className="flex items-center mt-4 mb-2">
              <FaCalendarAlt className="text-mainColor1 mr-2" />
              <p className="text-gray-700 font-semibold">이벤트 기간</p>
            </div>
            <p className="text-gray-600 ml-6 text-sm">
              {new Date(eventPeriod.start).toLocaleString()} ~{' '}
              {new Date(eventPeriod.end).toLocaleString()}
            </p>

            {/* 주최자 정보 */}
            <div className="flex items-center mt-4 mb-2">
              <FaLink className="text-mainColor1 mr-2" />
              <p className="text-gray-700 font-semibold">주최자 정보</p>
            </div>
            <p className="ml-6 text-sm">
              인스타 : {''}
              <a
                href="https://instagram.com/weareone.exo"
                target="_blank"
                className="text-blue-500"
              >
                @weareone.exo
              </a>
            </p>
            <p className="ml-6 text-sm">
              유튜브 : {''}
              <a
                href="https://www.youtube.com/user/SMTOWN"
                target="_blank"
                className="text-blue-500"
              >
                SMTOWN
              </a>
            </p>

            {/* 요청 기한 */}
            <div className="flex items-center mt-4 mb-2">
              <FaEnvelope className="text-mainColor1 mr-2" />
              <p className="text-gray-700 font-semibold">요청 기한</p>
            </div>
            <p className="text-gray-600 text-sm ml-6">당첨일로부터 3일 이내</p>
          </div>

          {/* 채팅방 모양 */}
          <div className="bg-gray-50 rounded-lg shadow-sm p-4 mb-5">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                실시간 채팅방
              </h3>
              <div className="flex items-center text-gray-700">
                <FaUser className="mr-2 size-4 text-mainColor1" />
                <span className="font-bold text-sm">100</span>
              </div>
            </div>

            <hr className="border-gray-200 mb-4" />

            {/* Chat messages */}
            <div className="space-y-4 blur-sm">
              <div className="flex flex-col">
                <span className="text-gray-500 text-sm">참여자 1</span>
                <div className="inline-block self-start bg-mainColor2 text-gray-500 rounded-2xl px-3 py-2 text-sm">
                  입장하면 볼 수 있음
                </div>
                <span className="text-gray-400 text-xs mt-1">오전 10:30</span>
              </div>

              <div className="flex flex-col">
                <span className="text-gray-500 text-sm">참여자 2</span>
                <div className="inline-block self-start bg-mainColor2 text-gray-500 rounded-2xl px-3 py-2 text-sm">
                  화이팅!
                </div>
                <span className="text-gray-400 text-xs mt-1">오전 10:35</span>
              </div>
            </div>
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
      {isSharePopupOpen && (
        <SocialSharePopUp
          onClose={closeSharePopUp}
          onCopyUrl={window.location.href}
        />
      )}
    </div>
  );
}
