import {
  FaMapMarkerAlt,
  FaExchangeAlt,
  FaClock,
  FaCalendarAlt,
  FaShippingFast,
  FaInfoCircle,
  FaBan,
} from 'react-icons/fa';
import { TbAlertTriangleFilled } from 'react-icons/tb';

export default function EventInfoTab() {
  return (
    <div className="p-6 max-w-screen-lg mx-auto">
      <h2 className="text-xl font-bold mb-4">이벤트 이용 정보</h2>
      <div className="flex items-start mb-10">
        <TbAlertTriangleFilled
          className="text-red-500 mr-2 mt-[1px]"
          size={20}
        />
        <p className="text-red-500 flex-row">이벤트 참여 전 꼭 확인해주세요!</p>
      </div>

      <div className="space-y-4">
        {/* 배송지 입력 */}
        <div className="flex items-start border-b pb-4">
          <FaMapMarkerAlt className="text-mainColor1 mr-4 mt-1" size={20} />
          <div>
            <p className="font-semibold">배송지 입력</p>
            <p>
              당첨일로부터{' '}
              <span className="text-red-500 font-bold">3일 이내</span> 배송지
              입력 필수
              <br />
              미입력 시 당첨이 자동 취소 될 수 있습니다
            </p>
          </div>
        </div>

        {/* 환불/교환 */}
        <div className="flex items-start border-b pb-4">
          <FaExchangeAlt className="text-mainColor1 mr-4 mt-1" size={20} />
          <div>
            <p className="font-semibold">환불/교환</p>
            <p>
              상품{' '}
              <span className="text-red-500 font-bold">교환/환불 불가</span>
              <br />
              이벤트 경품의 특성상 교환 및 환불이 불가능합니다
            </p>
          </div>
        </div>

        {/* 당첨 확인 */}
        <div className="flex items-start border-b pb-4">
          <FaClock className="text-mainColor1 mr-4 mt-1" size={20} />
          <div>
            <p className="font-semibold">당첨 확인</p>
            <p>
              이벤트 종료 <span className="font-bold">24시간 이내</span> 당첨자
              발표
              <br />
              마이페이지 및 등록된 연락처로 개별 통보
            </p>
          </div>
        </div>

        {/* 참여 기간 */}
        <div className="flex items-start border-b pb-4">
          <FaCalendarAlt className="text-mainColor1  mr-4 mt-1" size={20} />
          <div>
            <p className="font-semibold">참여 기간</p>
            <p>
              참여 기간 내 <span className="font-bold">1인 1회 참여 가능</span>
              <br />
              중복 참여는 자동으로 제한됩니다
            </p>
          </div>
        </div>

        {/* 경품배송 */}
        <div className="flex items-start border-b pb-4">
          <FaShippingFast className="text-mainColor1 mr-4 mt-1" size={20} />
          <div>
            <p className="font-semibold">경품배송</p>
            <p>
              배송지 입력 완료 후 <span className="font-bold">2주 이내</span>{' '}
              순차 배송
              <br />
              도서/산간 지역은 배송이 지연될 수 있습니다
            </p>
          </div>
        </div>

        {/* 문의 안내 */}
        <div className="flex items-start border-b pb-4">
          <FaInfoCircle className="text-mainColor1 mr-4 mt-1" size={20} />
          <div>
            <p className="font-semibold">문의 안내</p>
            <p>
              이벤트 관련 문의는 고객센터로 문의
              <br />
              평일 10:00~18:00 (주말/공휴일 제외)
            </p>
          </div>
        </div>

        {/* 부정참여 */}
        <div className="flex items-start border-b pb-4">
          <FaBan className="text-red-500 mr-4 mt-1" size={20} />
          <div>
            <p className="font-semibold">부정참여</p>
            <p>
              부정한 방법으로 참여 시{' '}
              <span className="text-red-500 font-bold">당첨취소</span>
              <br />
              매크로, 중복 계정 등 비정상적인 참여가 확인될 경우 당첨이
              취소됩니다
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
