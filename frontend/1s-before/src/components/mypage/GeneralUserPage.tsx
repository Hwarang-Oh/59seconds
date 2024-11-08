import React from 'react';
import GeneralUserEdit from './GeneralUserEdit';

const GeneralUserPage = () => {
  return (
    <div>
      <GeneralUserEdit />

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
        <div className="flex flex-row justify-between items-center mx-1">
          <div className="mt-3 flex items-center text-subColor5">
            <span className="mr-3 bg-subColor4 rounded-2xl px-2 py-1">
              당첨
            </span>
            <span>38 등 / 10,000 명</span>
          </div>
          <button className="mt-3 bg-mainColor1 text-white py-2 px-4 rounded-md">
            정보 입력하고 상품 GET!
          </button>
        </div>
        <p className="mt-2 ml-2 text-gray-600 font-bold text-lg">
          경수 500만 기념 이벤트
        </p>
      </div>

      <div className="mt-6 p-4 border border-gray-300 rounded-lg">
        <img
          src="/image/KyungSoo.jpg"
          alt="Event 1"
          className="w-full h-56 rounded-lg object-cover"
        />
        <div className="flex flex-row justify-between items-center mx-1">
          <div className="mt-3 flex items-center text-subColor3">
            <span className="mr-3 bg-gray-200 rounded-2xl px-2 py-1">
              미당첨
            </span>
            <span>38 등 / 10,000 명</span>
          </div>
        </div>
        <p className="mt-2 ml-2 text-gray-600 font-bold text-lg">
          경수 500만 기념 이벤트
        </p>
      </div>
    </div>
  );
};

export default GeneralUserPage;
