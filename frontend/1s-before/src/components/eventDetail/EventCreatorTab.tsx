import { CreatorData } from '@/types/eventDetail';
import { FaTrophy, FaStar, FaLink } from 'react-icons/fa';

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
            src={creator.profileImage}
            alt={creator.creatorName}
            className="w-32 h-32 rounded-full object-cover mb-4 ml-2"
          />
          <h2 className="text-lg">{creator.creatorName}</h2>
        </div>
      </div>

      {/* 주최자 소개 */}
      <div className="border p-4 rounded-lg mb-6">
        <h3 className="text-lg font-semibold mb-2">주최자 소개</h3>

        {/* 소개 섹션 */}
        <div className="mb-4">
          <h4 className="flex items-center text-md font-semibold mb-1">
            <FaStar className="text-yellow-500 mr-2" />
            소개
          </h4>
          <p className="ml-6 text-gray-700">대한민국의 가수 겸 배우</p>
          <p className="ml-6 text-gray-700">
            EXO의 메인보컬이며 솔로 가수로도 활동 중입니다.
          </p>
        </div>

        {/* 주요 수상 섹션 */}
        <div className="mb-4">
          <h4 className="flex items-center text-md font-semibold mb-1">
            <FaTrophy className="text-yellow-500 mr-2" />
            주요 수상
          </h4>
          <ul className="ml-6 list-disc text-gray-700">
            <li>2021 제42회 청룡영화제 인기스타상</li>
            <li>2019 제55회 백상예술대상 TV부문 남자 신인연기상</li>
            <li>2016 제37회 청룡영화제 신인남우상</li>
          </ul>
        </div>

        {/* SNS 섹션 */}
        <div>
          <h4 className="flex items-center text-md font-semibold mb-1">
            <FaLink className="text-yellow-500 mr-2" />
            SNS
          </h4>
          <p className="ml-6">
            Instagram:{' '}
            <a
              href="https://instagram.com/weareone.exo"
              target="_blank"
              className="text-blue-500"
            >
              @weareone.exo
            </a>
          </p>
          <p className="ml-6">
            YouTube:{' '}
            <a
              href="https://www.youtube.com/user/SMTOWN"
              target="_blank"
              className="text-blue-500"
            >
              SMTOWN
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
