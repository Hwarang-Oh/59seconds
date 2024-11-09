import { CreatorData } from '@/types/eventDetail';
interface EventCreatorTabProps {
  creator: CreatorData;
}

export default function EventCreatorTab({
  creator,
}: Readonly<EventCreatorTabProps>) {
  return (
    <div className="p-6 mx-auto">
      {/* 주최자 기본 정보 */}
      <h2 className="text-xl font-bold mb-4">주최자 정보</h2>
      <div className="flex items-center my-6">
        <div className="flex flex-col items-center">
          <img
            src={creator?.profileImage}
            alt={creator?.creatorName}
            className="w-32 h-32 rounded-full object-cover mb-4 ml-2"
          />
          <h2 className="text-lg">{creator?.creatorName}</h2>
        </div>
      </div>

      {/* 주최자 소개 */}
      <div className="border p-4 rounded-lg mb-6">
        <h3 className="text-lg font-semibold mb-2">주최자 소개</h3>

        {/* 소개 섹션 */}
        <div className="mb-4">{creator?.creatorIntroduce}</div>
      </div>
    </div>
  );
}
