import { SetStateAction, useState } from 'react';
import { useUserEdit } from '@/hooks/userEditHook';
import { FaPhoneAlt, FaEdit, FaMapMarkerAlt } from 'react-icons/fa';

export default function GeneralUserEdit() {
  const { userData, updateParticipateName, updateAddress, updatePhone } =
    useUserEdit();

  // 각각의 필드를 위한 수정 상태 추가
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);

  // 입력 필드의 로컬 상태 추가
  const [localName, setLocalName] = useState(userData.participateName);
  const [localPhone, setLocalPhone] = useState(userData.phone);
  const [localAddress, setLocalAddress] = useState(userData.address);

  if (!userData) {
    return <p className="mb-10">Loading...</p>; // 로딩 상태 또는 null 반환
  }

  // 수정 버튼 클릭 핸들러
  const handleEditClick = (
    setEditing: React.Dispatch<SetStateAction<boolean>>,
    setLocalValue: (value: string) => void,
    value: string
  ) => {
    setEditing(true);
    setLocalValue(value); // 로컬 상태를 현재 값으로 설정
  };

  // 저장 버튼 클릭 핸들러
  const handleSave = (
    setEditing: React.Dispatch<SetStateAction<boolean>>,
    updateFunc: (value: string) => void,
    localValue: string
  ) => {
    updateFunc(localValue); // 저장 버튼 클릭 시 API 호출
    setEditing(false);
  };

  return (
    <div className="mb-10">
      <header className="mb-6">
        <div className="flex flex-row space-x-5 mb-3">
          {isEditingName ? (
            <>
              <input
                type="text"
                value={localName}
                onChange={(e) => setLocalName(e.target.value)}
                placeholder="참여자 이름을 입력하세요"
                className="w-40 p-2 border rounded"
                autoFocus
              />
              <button
                onClick={() =>
                  handleSave(setIsEditingName, updateParticipateName, localName)
                }
                type="button"
                className="py-1 px-3 bg-mainColor1 text-white rounded"
              >
                저장
              </button>
            </>
          ) : (
            <>
              <h1 className="text-2xl font-bold">{userData.participateName}</h1>
              <button
                onClick={() =>
                  handleEditClick(
                    setIsEditingName,
                    setLocalName,
                    userData.participateName
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
        <p className="text-gray-500">
          참여 10회 <span className="text-sm"> | </span> 당첨 1회{' '}
        </p>
      </header>

      <section className="mb-6 p-4 border rounded">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <FaPhoneAlt className="mr-2 text-gray-600" />
            <span className="text-gray-700">전화번호</span>
          </div>
          <button
            onClick={() =>
              handleEditClick(setIsEditingPhone, setLocalPhone, userData.phone)
            }
            className="text-blue-500 flex items-center"
          >
            <FaEdit className="mr-1 text-mainColor1" />
          </button>
        </div>
        {isEditingPhone ? (
          <div className="flex flex-row space-x-5 mb-3">
            <input
              type="text"
              value={localPhone}
              onChange={(e) => setLocalPhone(e.target.value)}
              placeholder="전화번호를 입력하세요"
              className="w-48 p-2 border rounded"
              autoFocus
            />
            <button
              onClick={() =>
                handleSave(setIsEditingPhone, updatePhone, localPhone)
              }
              type="button"
              className="py-1 px-3 bg-mainColor1 text-white rounded"
            >
              저장
            </button>
          </div>
        ) : (
          <p className="text-gray-700">{userData.phone}</p>
        )}
      </section>
      <section className="mb-6 p-4 border rounded">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <FaMapMarkerAlt className="mr-2 text-gray-600" />
            <span className="text-gray-700">배송지 정보</span>
          </div>
          <button
            onClick={() =>
              handleEditClick(
                setIsEditingAddress,
                setLocalAddress,
                userData.address
              )
            }
            className="text-blue-500 flex items-center"
          >
            <FaEdit className="mr-1 text-mainColor1" />
          </button>
        </div>
        {isEditingAddress ? (
          <div className="flex flex-row space-x-5 mb-3">
            <input
              type="text"
              value={localAddress}
              onChange={(e) => setLocalAddress(e.target.value)}
              placeholder="배송지 정보를 입력하세요"
              className="w-[80%] p-2 border rounded"
              autoFocus
            />
            <button
              onClick={() =>
                handleSave(setIsEditingAddress, updateAddress, localAddress)
              }
              type="button"
              className="py-1 px-3 bg-mainColor1 text-white rounded"
            >
              저장
            </button>
          </div>
        ) : (
          <p className="text-gray-700">{userData.address}</p>
        )}
      </section>
    </div>
  );
}
