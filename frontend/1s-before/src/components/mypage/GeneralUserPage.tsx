import React from 'react';
import { FaPhoneAlt, FaEdit, FaMapMarkerAlt } from 'react-icons/fa';
import { AiOutlineCheckCircle } from 'react-icons/ai';

const GeneralUserPage = () => {
  return (
    <div className="p-5">
      <div className="mb-10">
        <header className="mb-6">
          <div className="flex flex-row space-x-5 mb-3">
            <h1 className="text-2xl font-bold">행복한 판다</h1>
            <button className="text-blue-500 flex items-center">
              <FaEdit className="mr-1 text-mainColor1" />
            </button>
          </div>
          <p className="text-gray-500">
            참여 10회 <span className="text-sm"> | </span> 당첨 1회{' '}
          </p>
        </header>

        <section className="mb-6 p-4 border border-gray-300 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <FaPhoneAlt className="mr-2 text-gray-600" />
              <span className="text-gray-700">전화번호</span>
            </div>
            <button className="text-blue-500 flex items-center">
              <FaEdit className="mr-1 text-mainColor1" />
            </button>
          </div>
          <p className="text-gray-700">010-0000-0000</p>
        </section>

        <section className="mb-6 p-4 border border-gray-300 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center mb-2">
              <FaMapMarkerAlt className="mr-2 text-gray-600" />
              <span className="text-gray-700">배송지 정보</span>
            </div>
            <button className="text-blue-500 flex items-center">
              <FaEdit className="mr-1 text-mainColor1" />
            </button>
          </div>
          <p className="text-gray-700">
            서울특별시 강남구 테헤란로 4길 30 (역삼동 648-11) 행복빌딩 4층
          </p>
        </section>
      </div>

      <section>
        <div className="text-xl font-semibold border-b pb-4">
          <span className="border-b-4 border-mainColor1 pb-4">
            참여한 이벤트
          </span>
        </div>
        <div className="flex space-x-3 mt-10">
          <button className="px-4 py-1 rounded-full bg-mainColor1 text-white">
            전체
          </button>
          <button className="px-4 py-1 rounded-full bg-gray-200 text-gray-700">
            당첨
          </button>
          <button className="px-4 py-1 rounded-full bg-gray-200 text-gray-700">
            미당첨
          </button>
        </div>
      </section>

      <div className="mt-6 p-4 border border-gray-300 rounded-lg">
        <img
          src="/image/KyungSoo.jpg"
          alt="Event 1"
          className="w-full h-56 rounded-lg object-cover"
        />
        <div className="mt-3 flex items-center text-green-600">
          <AiOutlineCheckCircle className="mr-1" />
          <span>남은 인원: 38 / 10,000 명</span>
        </div>
        <p className="mt-2 text-gray-600 font-bold text-lg">
          경수 500만 기념 이벤트
        </p>
        <button className="mt-4 bg-mainColor1 text-white py-2 px-4 rounded-md">
          정보 입력하고 상품 GET!
        </button>
      </div>

      <div className="mt-6 p-4 border border-gray-300 rounded-lg">
        <img
          src="/image/Yena.png"
          alt="Event 2"
          className="w-full rounded-lg"
        />
        <div className="mt-3 flex items-center text-gray-500">
          <AiOutlineCheckCircle className="mr-1" />
          <span>남은 인원: 11,818 / 20,000명</span>
        </div>
        <p className="mt-2 text-gray-600 font-bold text-lg">
          가을 맞이 선물 증정
        </p>
      </div>
    </div>
  );
};

export default GeneralUserPage;
