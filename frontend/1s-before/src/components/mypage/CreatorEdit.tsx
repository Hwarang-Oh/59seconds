import Modal from '@/components/common/alertModal';
import React, { useState } from 'react';
import { FaCirclePlus } from 'react-icons/fa6';
import { useUserEdit } from '@/hooks/userEditHook';
import { FaUserEdit, FaEdit, FaLink } from 'react-icons/fa';
import Tiptap from '@/components/common/TextEditor';

export default function CreatorEdit() {
  const {
    userData,
    isModalOpen,
    modalMessage,
    setIsModalOpen,
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
  const [localCreatorName, setLocalCreatorName] = useState(
    userData?.creatorName || ''
  );
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
    setLocalValue(value);
  };

  const handleSave = (
    setEditing: React.Dispatch<React.SetStateAction<boolean>>,
    updateFunc: (value: string) => void,
    localValue: string
  ) => {
    updateFunc(localValue);
    setEditing(false);
  };

  return (
    <>
      <form className="p-6 mb-8 mx-auto max-w-screen-2xl space-y-6">
        <div className="flex items-center space-x-12">
          <div className="flex flex-col justify-center items-center">
            <div className="relative mb-6">
              <label htmlFor="profileImage" className="cursor-pointer">
                {profileImageSrc ? (
                  <img
                    src={profileImageSrc}
                    alt="프로필"
                    className="w-40 h-40 sm:w-48 sm:h-48 md:w-52 md:h-52 lg:w-60 lg:h-60 rounded-full object-cover border-2"
                  />
                ) : (
                  <div className="w-40 h-40 sm:w-48 sm:h-48 md:w-52 md:h-52 lg:w-60 lg:h-60  bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
                    사진 없음
                  </div>
                )}
                <FaCirclePlus className="text-mainColor1 absolute right-1 bottom-1 bg-white rounded-full border-white border-4 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16" />
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
            <div className="flex flex-row space-x-4 mb-3">
              {isEditingName ? (
                <>
                  <input
                    type="text"
                    value={localCreatorName}
                    onChange={(e) => setLocalCreatorName(e.target.value)}
                    placeholder="이름 또는 닉네임을 입력하세요"
                    className="w-40 p-2 border rounded"
                    autoFocus
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleSave(
                          setIsEditingName,
                          updateCreatorName,
                          localCreatorName
                        );
                      }
                    }}
                  />
                  <button
                    onClick={() =>
                      handleSave(
                        setIsEditingName,
                        updateCreatorName,
                        localCreatorName
                      )
                    }
                    type="button"
                    className="py-1 px-3 bg-mainColor1 text-white rounded"
                  >
                    저장
                  </button>
                </>
              ) : (
                <>
                  <h1 className="text-2xl font-bold">
                    {userData.creatorName || '이름 없음'}
                  </h1>
                  <button
                    onClick={() =>
                      handleEditClick(
                        setIsEditingName,
                        setLocalCreatorName,
                        userData.creatorName || ''
                      )
                    }
                    type="button"
                    className="text-blue-500 flex items-center"
                  >
                    <FaEdit className=" text-mainColor1" />
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
                    className="w-[80%] p-2 border rounded"
                    autoFocus
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleSave(
                          setIsEditingSnsLink,
                          updateSnsLink,
                          localSnsLink
                        );
                      }
                    }}
                  />
                  <button
                    onClick={() =>
                      handleSave(
                        setIsEditingSnsLink,
                        updateSnsLink,
                        localSnsLink
                      )
                    }
                    type="button"
                    className="py-1 px-3 bg-mainColor1 text-white rounded"
                  >
                    저장
                  </button>
                </div>
              ) : (
                <p className="text-gray-700 inline-block max-w-xl overflow-hidden text-ellipsis whitespace-nowrap align-middle">
                  {userData.snsLink}
                </p>
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
      <Modal
        message={modalMessage}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
