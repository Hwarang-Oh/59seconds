import { EventData } from '@/types/eventDetail';
import { RiCoupon3Line } from 'react-icons/ri';
import { FaGift, FaCalendarAlt } from 'react-icons/fa';

interface EventIntroTabProps {
  event: EventData;
}

export default function EventIntroTab({ event }: Readonly<EventIntroTabProps>) {
  const { title, description, startTime, endTime, prizes = [] } = event ?? {};

  return (
    <div className="p-8 max-w-screen-lg mx-auto">
      <h2 className="text-2xl font-bold mb-10 text-gray-800">
        {title || '이벤트 제목'}
      </h2>

      <div className="bg-white rounded-lg border p-4 mb-6">
        <h3 className="font-semibold text-lg mb-2">이벤트 설명</h3>
        <p
          className="text-gray-700"
          dangerouslySetInnerHTML={{
            __html: description || '이벤트 설명이 없습니다.',
          }}
        />
      </div>

      <div className="bg-white rounded-lg border p-4 mb-6">
        <h3 className="font-semibold text-lg mb-8">상품 소개</h3>
        <div className="flex space-x-4 m-5">
          {prizes.length > 0 ? (
            prizes.map((item) => (
              <div
                key={item.prizeId}
                className="flex-1 bg-white py-4 rounded-lg border text-center"
              >
                <p className="text-gray-800 text-lg mb-2">
                  <span className="font-bold mr-1">{item.ranking}등</span>
                  {item.prizeName || '상품 이름 없음'}
                </p>
                <div className="flex justify-center items-center mb-2">
                  {item.prizeType === '상품' ? (
                    <FaGift className="text-subColor3" size={85} />
                  ) : (
                    <RiCoupon3Line className="text-subColor3" size={90} />
                  )}
                </div>
                <p className="text-gray-600 bg-gray-100 rounded-full inline-block px-2 py-1 text-sm">
                  {item.winnerCount ?? 0}명
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-600">등록된 상품이 없습니다.</p>
          )}
        </div>
      </div>

      <div className="p-4 bg-white rounded-lg border">
        <h3 className="font-semibold text-lg mb-2">이벤트 기간</h3>
        <p className="text-gray-700 flex flex-row mb-1">
          <FaCalendarAlt className="text-mainColor1 mr-2 mt-1" />
          <span className="font-bold">시작:&nbsp;</span>
          {startTime ? new Date(startTime).toLocaleString() : '시작 날짜 없음'}
        </p>
        <p className="text-gray-700 flex flex-row">
          <FaCalendarAlt className="text-mainColor1 mr-2 mt-1" />
          <span className="font-bold">종료:&nbsp;</span>
          {endTime ? new Date(endTime).toLocaleString() : '종료 날짜 없음'}
        </p>
        <p className="text-sm text-gray-500 mt-2">
          상품 소진 시, 이벤트가 조기 마감될 수 있습니다.
        </p>
      </div>
    </div>
  );
}
