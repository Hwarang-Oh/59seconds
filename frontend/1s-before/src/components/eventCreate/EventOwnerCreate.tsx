import React, { useState } from 'react';
import { EventOwnerData } from '@/types/eventCreate';
import { creatorInfoPut } from '@/apis/memberAPI';
import { FaCirclePlus } from 'react-icons/fa6';

export default function EventOwnerCreate() {
  const [ownerData, setOwnerData] = useState<EventOwnerData>({
    participateName: null,
    creatorName: '',
    address: null,
    phone: null,
    profileImage: null,
    creatorIntroduce: '',
    snsLink: '',
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setOwnerData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setOwnerData((prev) => ({ ...prev, profileImage: file }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('participateName', ownerData.participateName ?? '');
    formData.append('creatorName', ownerData.creatorName);
    formData.append('address', ownerData.address ?? '');
    formData.append('phone', ownerData.phone ?? '');
    formData.append('creatorIntroduce', ownerData.creatorIntroduce);
    formData.append('snsLink', ownerData.snsLink);
    if (ownerData.profileImage) {
      formData.append('profileImage', ownerData.profileImage);
    }

    try {
      const result = await creatorInfoPut(formData);
      console.log(result); // 성공 여부 출력
      alert('정보가 성공적으로 수정되었습니다.'); // 사용자에게 성공 메시지 알림
    } catch (error) {
      console.error('정보 수정 중 오류 발생:', error);
      alert('정보 수정에 실패했습니다. 다시 시도해 주세요.');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 mx-auto max-w-screen-xl space-y-6"
    >
      <div className="flex flex-row space-x-4">
        <span className="bg-mainColor1 px-[12px] py-[5px] rounded-full text-white">
          2
        </span>
        <h1 className="text-2xl font-bold">개설자 정보</h1>
      </div>

      <div className="flex items-center space-x-10">
        <div className="relative">
          <label htmlFor="profileImage" className="cursor-pointer">
            {ownerData.profileImage ? (
              <img
                src={URL.createObjectURL(ownerData.profileImage)}
                alt="Profile"
                className="w-40 h-40 rounded-full object-cover"
              />
            ) : (
              <div className="w-40 h-40 bg-gray-200 rounded-full flex items-end justify-end text-gray-500">
                <FaCirclePlus
                  className="text-mainColor1 absolute right-1 bottom-1 bg-white rounded-full border-white border-4"
                  size={42}
                />
              </div>
            )}
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
          <button type="button" className="text-blue-500 text-sm font-bold">
            수정
          </button>
        </div>
        <textarea
          id="creatorIntroduce"
          name="creatorIntroduce"
          value={ownerData.creatorIntroduce}
          onChange={handleInputChange}
          placeholder="당신에 대해 소개해주세요."
          className="w-full p-2 border rounded h-24"
        />
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          className="py-2 px-4 bg-gray-300 rounded text-gray-700"
        >
          이전
        </button>
        <button
          type="submit"
          className="py-2 px-4 bg-mainColor1 text-white rounded"
        >
          이벤트 생성하기
        </button>
      </div>
    </form>
  );
}
