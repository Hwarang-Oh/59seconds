"use client";
import EventDetailCreate from "@/components/eventCreate/EventDetailCreate";
import EventOwnerCreate from "@/components/eventCreate/EventOwnerCreate";
import PreviewComponent from "@/components/eventCreate/PreviewComponent";

export default function EventCreate() {
  return (
    <div className="max-w-screen-xl mx-auto p-10">
      <h1 className="text-mainColor1 text-3xl font-bold text-center mb-10">
        이벤트 생성하기
      </h1>
      <div className="grid grid-cols-3 gap-8">
        {/* 입력 폼: 2/3 */}
        <div className="col-span-2 border border-inherit p-10 rounded-lg shadow-lg">
          <EventDetailCreate />
          <EventOwnerCreate />
        </div>

        {/* 미리보기: 1/3 */}
        <div className="col-span-1 border border-inherit p-10 rounded-lg shadow-lg">
          <PreviewComponent />
        </div>
      </div>
    </div>
  );
}
