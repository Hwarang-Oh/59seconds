import { X } from 'lucide-react';
import AddressNeed from './AddressNeed';
import { RequestPopUpProps } from '@/types/common/common';
import { usePrizeRequest } from '@/hooks/prizeRequestHook';

export default function RequestPopUp({
  roomId,
  prizeType,
  onClose,
}: Readonly<RequestPopUpProps>) {
  const {
    formData,
    isSavedData,
    handleChange,
    handleSubmit,
    handleCheckboxChange,
  } = usePrizeRequest(roomId);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="relative bg-white p-10 rounded-lg text-center w-full max-w-xl md:max-w-2xl lg:max-w-4xl flex flex-col items-center">
        <X
          className="text-gray-500 mb-2 cursor-pointer absolute top-4 right-4"
          onClick={onClose}
        />
        <div className="text-3xl font-bold mb-4">당첨자 정보 입력</div>
        <p className="text-gray-600 mb-6">
          상품 배송을 위해 정확한 정보를 입력해주세요
        </p>
        <form onSubmit={handleSubmit} className="space-y-6 w-full">
          <label className="flex items-center mb-4">
            <input
              type="checkbox"
              checked={isSavedData}
              onChange={handleCheckboxChange}
              className="mr-2"
            />
            <span>저장된 정보와 동일</span>
          </label>
          <input
            type="text"
            name="winnerName"
            placeholder="이름을 입력하세요"
            value={formData.winnerName}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            disabled={isSavedData}
          />
          <input
            type="text"
            name="phone"
            placeholder="010-0000-0000"
            value={formData.phone}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            disabled={isSavedData}
          />
          {prizeType == '상품' && <AddressNeed roomId={roomId} />}
          <button
            type="submit"
            className="bg-mainColor1 text-white py-2 px-6 rounded-md w-[40%]"
          >
            {prizeType ?? ''} 요청하기
          </button>
        </form>
      </div>
    </div>
  );
}
