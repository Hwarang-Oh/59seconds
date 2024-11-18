import Link from 'next/link';
import Modal from '@/components/common/alertModal';
import LoginPopUp from '@/components/common/LoginPopUp';
import { useState } from 'react';
import { IoMdLock } from 'react-icons/io';
import { IoEnterOutline } from 'react-icons/io5';
import { MdOutlineRefresh } from 'react-icons/md';
import { EventIntroTabProps } from '@/types/eventDetail';
import { useEventDetail } from '@/hooks/eventDetailHook';
import { useMemberLogin } from '@/hooks/useMemberLoginHook';
import { FaGift, FaCalendarAlt, FaLink, FaEnvelope } from 'react-icons/fa';

export default function EventRoomPart({ event, creator, id }: Readonly<EventIntroTabProps>) {
  const { prizes = [], startTime, endTime, unlockCount } = event;
  const {
    inputCode,
    isCodeValid,
    lastUpdated,
    isModalOpen,
    modalMessage,
    openWindow,
    setInputCode,
    handleKeyDown,
    setIsModalOpen,
    handleCodeSubmit,
    refreshUnlockCount,
  } = useEventDetail(id);

  const [showTooltip, setShowTooltip] = useState(false);

  // IMP : Login 관련 Logic 추가
  const { member, isLoginPopUpOpen, openLoginPopUp, handleKakaoLogin, closeLoginPopUp } =
    useMemberLogin();

  return (
    <div className='max-w-sm'>
      <Modal message={modalMessage} onClose={() => setIsModalOpen(false)} isOpen={isModalOpen} />
      {!isCodeValid ? (
        <div className='flex flex-col items-center justify-center min-h-[60vh] bg-mainColor2 p-6 rounded-lg border'>
          <IoMdLock className='text-mainColor1 mb-4' size={40} />
          <p className='text-center text-mainColor1 font-bold text-xl mb-4'>이벤트 참여하기</p>
          <div className='flex items-center mb-4 border max-w-md rounded-lg shadow-md bg-white'>
            <input
              type='text'
              placeholder='참여 코드를 입력하세요'
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={(e) => {
                if (member.isLoggedIn) return;
                const userConfirmed = window.confirm(
                  '✨ 로그인을 하셔야 궁극의 선착순 59초를 경험하실 수 있습니다 ✨\n로그인하시겠습니까?'
                );
                if (userConfirmed) {
                  openLoginPopUp();
                  e.target.blur();
                } else {
                  e.target.blur();
                }
              }}
              className='flex-1 py-3 text-center outline-none bg-transparent text-mainColor1'
            />
            <div className='min-w-[40px] flex items-center justify-center pr-2'>
              <IoEnterOutline
                className='text-mainColor1 cursor-pointer'
                size={25}
                onClick={handleCodeSubmit}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className='sticky top-0 z-10 bg-white border rounded-lg shadow-lg px-5 pb-5 pt-2'>
          <div className='flex flex-row justify-end items-center my-1'>
            {showTooltip && lastUpdated ? (
              <div className='absolute bottom-full right-0 mb-2 whitespace-nowrap'>
                <div className='bg-gray-800 text-white text-[10px] px-2 py-1 rounded shadow-lg'>
                  {lastUpdated}에 업데이트됨
                </div>
                <div className='absolute -bottom-1 right-1.5 w-2 h-2 bg-gray-800 transform rotate-45' />
              </div>
            ) : null}
            <MdOutlineRefresh
              className='text-gray-400 cursor-pointer hover:text-gray-600 transition-colors duration-200'
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              onClick={refreshUnlockCount}
              size={18}
            />
          </div>
          <div className='text-center mb-4 border-b flex items-center justify-center'>
            <p className='text-gray-400 font-semibold mb-4'>현재 {unlockCount}명 참여 중 !</p>
          </div>

          {/* 이벤트 정보 */}
          <div className='p-3 mb-6'>
            {/* 상품 정보 */}
            <div className='flex items-center mb-2'>
              <FaGift className='text-mainColor1 mr-2' />
              <p className='text-gray-700 font-semibold'>상품 정보</p>
            </div>
            <div className='text-gray-600 ml-6 text-sm'>
              {prizes.map((product) => (
                <div key={product.prizeId}>
                  {product.prizeName} {product.winnerCount}개 <br />
                </div>
              ))}
            </div>

            {/* 이벤트 기간 */}
            <div className='flex items-center mt-4 mb-2'>
              <FaCalendarAlt className='text-mainColor1 mr-2' />
              <p className='text-gray-700 font-semibold'>이벤트 기간</p>
            </div>
            <p className='text-gray-600 ml-6 text-sm'>
              {startTime ? new Date(startTime).toLocaleString() : '시작 날짜 없음'}
              <span>&nbsp;~&nbsp;</span>
              {endTime ? new Date(endTime).toLocaleString() : '종료 날짜 없음'}
            </p>

            {/* 주최자 정보 */}
            <div className='flex items-center mt-4 mb-2'>
              <FaLink className='text-mainColor1 mr-2' />
              <p className='text-gray-700 font-semibold'>주최자 정보</p>
            </div>
            <p className='ml-6 text-sm text-gray-600'>
              {creator?.snsLink
                ? creator.snsLink.split(/[\s,]+/).map((link, index) => (
                    <span
                      key={link}
                      className='inline-block max-w-16 md:max-w-28 lg:max-w-40 xl:max-w-56 overflow-hidden text-ellipsis whitespace-nowrap align-middle'>
                      <Link
                        href={link.startsWith('http') ? link : `https://${link}`}
                        target='_blank'>
                        <span className='text-blue-500'>@ {link}</span>
                      </Link>
                      {index < creator.snsLink.split(/[\s,]+/).length - 1 && ', '}
                    </span>
                  ))
                : '입력된 정보 없음'}
            </p>

            {/* 요청 기한 */}
            <div className='flex items-center mt-4 mb-2'>
              <FaEnvelope className='text-mainColor1 mr-2' />
              <p className='text-gray-700 font-semibold'>요청 기한</p>
            </div>
            <p className='text-gray-600 text-sm ml-6'>당첨일로부터 3일 이내</p>
          </div>

          {/* 입장하기 버튼 */}
          <button
            onClick={openWindow}
            className='w-full bg-mainColor1 text-white font-bold py-2 rounded-lg tracking-widest'>
            입장하기
          </button>
        </div>
      )}
      {isLoginPopUpOpen && (
        <LoginPopUp handleKakaoLogin={handleKakaoLogin} closePopUp={closeLoginPopUp} />
      )}
    </div>
  );
}
