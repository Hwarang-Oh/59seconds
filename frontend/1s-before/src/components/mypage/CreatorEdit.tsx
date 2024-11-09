import React, { useState } from 'react';
import { FaCirclePlus } from 'react-icons/fa6';
import { useUserEdit } from '@/hooks/userEditHook';
import { FaUserEdit, FaEdit, FaLink } from 'react-icons/fa';
import Tiptap from '@/components/common/TextEditor';

export default function CreatorEdit() {
  const {
    userData,
    updateCreatorName,
    updateProfileImage,
    updateCreatorIntroduce,
    updateSnsLink,
  } = useUserEdit();

  //각각의 필드를 위한 수정 상태 추가
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingSnsLink, setIsEditingSnsLink] = useState(false);
  const [isEditingIntroduce, setIsEditingIntroduce] = useState(false);

  // 각 필드에 대한 로컬 상태 추가
  const [localName, setLocalName] = useState(userData?.creatorName || '');
  const [localSnsLink, setLocalSnsLink] = useState(userData?.snsLink || '');
  const [localIntroduce, setLocalIntroduce] = useState(
    userData?.creatorIntroduce || ''
  );

  if (!userData) {
    return <p>Loading...</p>;
  }

  // 프로필 이미지 URL 처리
  let profileImageSrc: string | undefined;
  if (typeof userData?.profileImage === 'string') {
    profileImageSrc = userData.profileImage;
  } else if (userData?.profileImage instanceof File) {
    profileImageSrc = URL.createObjectURL(userData.profileImage);
  }

  // 수정 버튼 클릭 핸들러
  const handleEditClick = (
    setEditing: React.Dispatch<React.SetStateAction<boolean>>,
    setLocalValue: (value: string) => void,
    value: string
  ) => {
    setEditing(true);
    setLocalValue(value); // 로컬 상태를 현재 값으로 설정
  };

  // 저장 버튼 클릭 핸들러
  const handleSave = (
    setEditing: React.Dispatch<React.SetStateAction<boolean>>,
    updateFunc: (value: string) => void,
    localValue: string
  ) => {
    updateFunc(localValue); // 저장 버튼 클릭 시 API 호출
    setEditing(false);
  };

  return (
    <form className="p-6 mb-8 mx-auto max-w-screen-xl space-y-6">
      <div className="flex items-center space-x-10">
        <div className="flex flex-col justify-center items-center mr-6">
          <div className="relative mb-6">
            <label htmlFor="profileImage" className="cursor-pointer">
              {profileImageSrc ? (
                <img
                  src={profileImageSrc}
                  alt=""
                  className="w-60 h-60 rounded-full object-cover border-2"
                />
              ) : (
                <div className="w-60 h-60 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
                  사진 없음
                </div>
              )}
              <FaCirclePlus
                className="text-mainColor1 absolute right-1 bottom-1 bg-white rounded-full border-white border-4"
                size={52}
              />
            </label>
            <input
              type="file"
              id="profileImage"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  updateProfileImage(file).catch(console.error);
                }
              }}
              className="hidden"
            />
          </div>
          <div className="flex flex-row space-x-5 mb-3">
            {isEditingName ? (
              <>
                <input
                  type="text"
                  value={localName}
                  onChange={(e) => setLocalName(e.target.value)}
                  placeholder="이름 또는 닉네임을 입력하세요"
                  className="w-40 p-2 border rounded"
                  autoFocus
                />
                <button
                  onClick={() =>
                    handleSave(setIsEditingName, updateCreatorName, localName)
                  }
                  type="button"
                  className="py-1 px-3 bg-mainColor1 text-white rounded"
                >
                  저장
                </button>
              </>
            ) : (
              <>
                <h1 className="text-2xl font-bold">{userData.creatorName}</h1>
                <button
                  onClick={() =>
                    handleEditClick(
                      setIsEditingName,
                      setLocalName,
                      userData.creatorName || ''
                    )
                  }
                  type="button"
                  className="text-blue-500 flex items-center"
                >
                  <FaEdit className="mr-1 text-mainColor1" />
                </button>
              </>
            )}
          </div>
        </div>

        <div className="flex-1 space-y-4">
          <section className="mb-6 p-4 border rounded">
            <div className="flex items-center justify-between">
              <div className="flex items-center mb-2">
                <FaLink className="mr-2 text-gray-600" />
                <span className="text-gray-700">SNS 링크</span>
              </div>
              <button
                onClick={() =>
                  handleEditClick(
                    setIsEditingSnsLink,
                    setLocalSnsLink,
                    userData.snsLink || ''
                  )
                }
                className="text-blue-500 flex items-center"
                type="button"
              >
                <FaEdit className="mr-1 text-mainColor1" />
              </button>
            </div>
            {isEditingSnsLink ? (
              <div className="flex flex-row space-x-5 mb-3">
                <input
                  type="url"
                  value={localSnsLink}
                  onChange={(e) => setLocalSnsLink(e.target.value)}
                  placeholder="https://"
                  className="w-48 p-2 border rounded"
                  autoFocus
                />
                <button
                  onClick={() =>
                    handleSave(setIsEditingSnsLink, updateSnsLink, localSnsLink)
                  }
                  type="button"
                  className="py-1 px-3 bg-mainColor1 text-white rounded"
                >
                  저장
                </button>
              </div>
            ) : (
              <p className="text-gray-700">{userData.snsLink}</p>
            )}
          </section>

          <section className="flex-1 space-y-4">
            <div className="border p-4 rounded">
              <div className="mb-4 flex justify-between">
                <div className="flex flex-row items-center">
                  <FaUserEdit className="mr-2 text-mainColor1" />
                  <span className="text-sm font-bold">소개글</span>
                </div>
                <button
                  onClick={() =>
                    isEditingIntroduce
                      ? handleSave(
                          setIsEditingIntroduce,
                          updateCreatorIntroduce,
                          localIntroduce
                        )
                      : handleEditClick(
                          setIsEditingIntroduce,
                          setLocalIntroduce,
                          userData.creatorIntroduce || ''
                        )
                  }
                  type="button"
                  className="text-blue-500 text-sm font-bold"
                >
                  {isEditingIntroduce ? '저장' : '수정'}
                </button>
              </div>
              {isEditingIntroduce ? (
                <Tiptap
                  value={localIntroduce}
                  onChange={(content) => setLocalIntroduce(content)}
                />
              ) : (
                <div
                  className="text-gray-700"
                  dangerouslySetInnerHTML={{
                    __html: userData.creatorIntroduce,
                  }}
                />
              )}
            </div>
          </section>
        </div>
      </div>
    </form>
  );
}
