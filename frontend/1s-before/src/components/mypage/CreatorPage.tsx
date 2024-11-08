import CreatorEdit from './CreatorEdit';
export default function EventCreatorPage() {
  return (
    <div>
      <CreatorEdit />

      <section>
        <div className="text-xl font-semibold border-b pb-4">
          <span className="border-b-4 border-mainColor1 pb-4">
            개설한 이벤트
          </span>
        </div>
        <div className="flex space-x-3 mt-10">
          <button className="px-4 py-1 rounded-full bg-mainColor1 text-white">
            전체
          </button>
          <button className="px-4 py-1 rounded-full bg-gray-200 text-gray-700">
            진행중
          </button>
          <button className="px-4 py-1 rounded-full bg-gray-200 text-gray-700">
            종료
          </button>
        </div>
      </section>
      <div className="mt-6 p-4 border border-gray-300 rounded-lg">
        <img
          src="/image/KyungSoo.jpg"
          alt="Event 1"
          className="w-full h-56 rounded-lg object-cover"
        />
        <div className="flex flex-row justify-between items-center mx-1 my-4">
          <span className="mr-3 bg-subColor4 text-subColor5 rounded-2xl px-2 py-1">
            진행중
          </span>
          <div className="text-subColor3 font-bold">참여자 10,000명</div>
        </div>
        <p className="ml-2 text-gray-600 font-bold text-lg">
          경수 500만 기념 이벤트
        </p>
      </div>
      <div className="mt-6 p-4 border border-gray-300 rounded-lg">
        <img
          src="/image/KyungSoo.jpg"
          alt="Event 1"
          className="w-full h-56 rounded-lg object-cover"
        />
        <div className="flex flex-row justify-between items-center mx-1 my-4">
          <div>
            <span className="mr-3 bg-gray-200  text-subColor3 rounded-2xl px-2 py-1">
              진행중
            </span>
            <span className="mr-3 bg-gray-200  text-subColor3 rounded-2xl px-2 py-1">
              입력완료
            </span>
          </div>
          <div className="text-subColor3 font-bold">참여자 10,000명</div>
        </div>
        <p className="ml-2 text-gray-600 font-bold text-lg">
          경수 500만 기념 이벤트
        </p>
      </div>
    </div>
  );
}
