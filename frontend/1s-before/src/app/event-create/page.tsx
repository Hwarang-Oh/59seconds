'use client';
import EventDetailCreate from '@/components/eventCreate/EventDetailCreate';
import EventOwnerCreate from '@/components/eventCreate/EventOwnerCreate';
import PreviewComponent from '@/components/eventCreate/PreviewComponent';
import Header from '@/components/common/Header';

export default function EventCreate() {
  return (
    <>
      <Header />
      <div className="m-10">
        <h1 className="text-mainColor1 text-3xl font-bold text-center mb-10">
          이벤트 생성하기
        </h1>
        <div className="grid grid-cols-4 gap-8">
          {/* 입력 폼: 2/3 */}
          <div className="col-span-3 border border-inherit p-10 rounded-lg shadow-lg">
            <EventDetailCreate />
            <EventOwnerCreate />
          </div>

          {/* 미리보기: 1/3 */}
          <div className="col-span-1 max-h-[70vh] border border-inherit p-10 rounded-lg shadow-lg">
            <PreviewComponent />
          </div>
        </div>
      </div>
    </>
  );
}
