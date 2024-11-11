import { CreatorData } from '@/types/eventDetail';
import { HiUserCircle } from 'react-icons/hi2';
interface EventCreatorTabProps {
  creator: CreatorData;
}

export default function EventCreatorTab({
  creator,
}: Readonly<EventCreatorTabProps>) {
  return (
    <div className="p-6 mx-auto">
      <h2 className="text-xl font-bold mb-4">주최자 정보</h2>
      <div className="flex items-center my-6">
        <div className="flex flex-col items-center">
          {creator?.profileImage ? (
            <img
              src={creator.profileImage}
              alt={creator.creatorName || '프로필'}
              className="w-32 h-32 rounded-full object-cover mb-4 ml-2"
            />
          ) : (
            <HiUserCircle className="text-mainColor2" size={150} />
          )}
          <h2 className="text-lg">{creator?.creatorName}</h2>
        </div>
      </div>

      <div className="border p-4 rounded-lg mb-6">
        <h3 className="text-lg font-semibold mb-2">주최자 소개</h3>
        <div
          className="mb-4"
          dangerouslySetInnerHTML={{
            __html: creator?.creatorIntroduce,
          }}
        ></div>
      </div>
    </div>
  );
}
