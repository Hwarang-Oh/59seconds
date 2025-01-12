import Tiptap from '@/components/common/TextEditor';
import { FaCirclePlus } from 'react-icons/fa6';
import { useEventOwner } from '@/hooks/eventOwnerHook';

export default function EventOwnerCreate() {
  const {
    ownerData,
    imageUrl,
    getProfileImageSrc,
    handleInputChange,
    handleEditorChange,
    handleImageChange,
  } = useEventOwner();

  return (
    <>
      <div className="flex flex-row space-x-4">
        <span className="bg-mainColor1 px-[12px] py-[5px] rounded-full text-white">
          2
        </span>
        <h1 className="text-2xl font-bold">개설자 정보</h1>
      </div>

      <div className="flex items-center space-x-10">
        <div className="relative">
          <label htmlFor="profileImage" className="cursor-pointer">
            {imageUrl || typeof ownerData.profileImage === 'string' ? (
              <img
                src={getProfileImageSrc()}
                alt="프로필 이미지"
                className="w-40 h-40 rounded-full object-cover border-2"
              />
            ) : (
              <div className="w-40 h-40 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
                사진 없음
              </div>
            )}
            <FaCirclePlus
              className="text-mainColor1 absolute right-1 bottom-1 bg-white rounded-full border-white border-4"
              size={42}
            />
          </label>
          <input
            type="file"
            id="profileImage"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </div>

        <div className="flex-1 space-y-4">
          <div>
            <label
              htmlFor="creatorName"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              이름/닉네임
            </label>
            <input
              type="text"
              id="creatorName"
              name="creatorName"
              value={ownerData.creatorName}
              onChange={handleInputChange}
              placeholder="이름 또는 닉네임을 입력하세요"
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label
              htmlFor="snsLink"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              SNS 링크
            </label>
            <input
              type="url"
              id="snsLink"
              name="snsLink"
              value={ownerData.snsLink}
              onChange={handleInputChange}
              placeholder="https://"
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex flex-row justify-between items-center">
          <label
            htmlFor="creatorIntroduce"
            className="block text-sm font-medium text-gray-700"
          >
            소개글
          </label>
        </div>
        <div className="border p-2 rounded">
          <Tiptap
            value={ownerData.creatorIntroduce}
            onChange={handleEditorChange}
          />
        </div>
      </div>
    </>
  );
}
