import EventEachResult from '@/components/eventRoom/EventResultEachResult';
import { useState, useEffect, useCallback } from 'react';
import { EventRoomResultViewInfo, EventRoomAllResultProps } from '@/types/eventRoom';

export default function EventResultAllResult({
  list,
  myResult,
  untilMyResult,
}: Readonly<EventRoomAllResultProps>) {
  const [expandedSection, setExpandedSection] = useState<'after' | null>(null);

  // 섹션 계산 로직
  const getSections = useCallback(() => {
    // 초기값(ranking === 0)일 경우 빈 섹션 반환
    if (myResult?.ranking === 0) return { front: [], after: [] };

    const myRank = myResult.ranking;

    // untilMyResult는 그대로 사용
    const front = untilMyResult;

    // list에서 내 순위 이후 데이터만 필터링
    const after = list.filter((item) => item.ranking > myRank);

    return { front, after };
  }, [untilMyResult, list, myResult]);

  const { front, after } = getSections();

  // 접힌 섹션 렌더링
  const renderCollapsedSection = (count: number, onClick: () => void, label: string) => {
    if (count === 0) return null;
    return (
      <div
        onClick={onClick}
        className='cursor-pointer transition-all hover:bg-gray-100 rounded-lg p-4 flex items-center justify-center gap-2'>
        {[0, 0.2, 0.4].map((delay) => (
          <div
            key={delay}
            className='w-2 h-2 bg-gray-400 rounded-full animate-bounce'
            style={{ animationDelay: `${delay}s` }}
          />
        ))}
        <span className='ml-2 text-gray-600'>{`${count}개의 ${label}`}</span>
      </div>
    );
  };

  // 섹션 렌더링
  const renderSection = (data: EventRoomResultViewInfo[], expandedKey: 'after') => {
    return expandedSection === expandedKey ? (
      <div className='animate-fadeIn space-y-3'>
        {data.map((item) => (
          <div key={item.memberId} className='animate-slideIn'>
            <EventEachResult {...item} />
          </div>
        ))}
        <div
          onClick={() => setExpandedSection(null)}
          className='cursor-pointer text-center py-4 text-gray-600 hover:text-gray-800 transition-colors'>
          접기
        </div>
      </div>
    ) : (
      renderCollapsedSection(
        data.length,
        () => setExpandedSection(expandedKey),
        '다음 결과 더 보기'
      )
    );
  };

  return (
    <div className='flex flex-col gap-3'>
      {/* 실시간 업데이트 상태 표시 */}
      <div className='text-sm text-gray-500 text-center animate-pulse'>
        실시간 순위 업데이트 중...
      </div>

      {/* untilMyResult 결과 */}
      {front.map((item) => (
        <div key={item.memberId} className='animate-slideIn'>
          <EventEachResult {...item} />
        </div>
      ))}

      {/* 내 순위 이후 데이터 */}
      {renderSection(after, 'after')}

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
