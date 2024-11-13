import PostCode from 'react-daum-postcode';
import { X } from 'lucide-react';
import { usePrizeRequest } from '@/hooks/prizeRequestHook';

export default function AddressNeed({ roomId }: Readonly<{ roomId: number }>) {
  const {
    formData,
    isSavedData,
    handleChange,
    showAddrModal,
    openAddrModal,
    closeAddrModal,
    detailedAddress,
    handleAddressComplete,
  } = usePrizeRequest(roomId);

  return (
    <div className="mb-10">
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <input
            type="text"
            name="address"
            placeholder="기본 주소"
            value={formData.address}
            onChange={handleChange}
            className="border p-2 rounded w-3/4"
            disabled={isSavedData}
          />
          <button
            type="button"
            onClick={openAddrModal}
            className="bg-gray-300 px-4 py-2 rounded"
          >
            주소 검색
          </button>
        </div>
        <input
          type="text"
          name="detailedAddress"
          value={detailedAddress}
          placeholder="상세 주소를 입력하세요"
          onChange={handleChange}
          className="border p-2 rounded w-full"
          disabled={isSavedData}
        />
      </div>
      {showAddrModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg min-w-[55vh]">
            <div className="flex flex-row justify-end">
              <X
                onClick={closeAddrModal}
                className="text-gray-500 mb-2 cursor-pointer"
              />
            </div>
            <PostCode onComplete={handleAddressComplete} />
          </div>
        </div>
      )}
    </div>
  );
}
