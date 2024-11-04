import React, { useState } from "react";

interface EventOwnerData {
  name: string;
  snsLink: string;
  bio: string;
  profileImage: File | null;
}

export default function EventOwnerCreate() {
  const [ownerData, setOwnerData] = useState<EventOwnerData>({
    name: "",
    snsLink: "",
    bio: "",
    profileImage: null,
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Event Owner Data:", JSON.stringify(ownerData, null, 2));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 mx-auto max-w-screen-xl space-y-4"
    >
      <h1 className="text-2xl font-bold">개설자 정보</h1>

      <div className="flex items-center space-x-4">
        <div className="relative">
          <label htmlFor="profileImage" className="cursor-pointer">
            {ownerData.profileImage ? (
              <img
                src={URL.createObjectURL(ownerData.profileImage)}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover"
              />
            ) : (
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
                +
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

        <div className="flex-1 space-y-2">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              이름/닉네임
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={ownerData.name}
              onChange={handleInputChange}
              placeholder="이름 또는 닉네임을 입력하세요"
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label
              htmlFor="snsLink"
              className="block text-sm font-medium text-gray-700"
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
        <label
          htmlFor="bio"
          className="block text-sm font-medium text-gray-700"
        >
          소개글
        </label>
        <textarea
          id="bio"
          name="bio"
          value={ownerData.bio}
          onChange={handleInputChange}
          placeholder="당신에 대해 소개해주세요."
          className="w-full p-2 border rounded h-24"
        />
        <button type="button" className="text-blue-500">
          수정
        </button>
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
