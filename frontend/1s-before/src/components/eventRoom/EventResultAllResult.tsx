import EventEachResult from '@/components/eventRoom/EventResultEachResult';
import { useState, useEffect, useCallback } from 'react';
import { EventRoomResultViewInfo, EventRoomAllResultProps } from '@/types/eventRoom';

export default function EventResultAllResult({
  list,
  myResult,
}: Readonly<EventRoomAllResultProps>) {
  const [expandedSection, setExpandedSection] = useState<'before' | 'after' | null>(null);
  const [displayData, setDisplayData] = useState<EventRoomResultViewInfo[]>([]);

  // 초기 데이터 로드, myResult와 같은 memberId는 제외
  useEffect(() => {
    if (list.length > 0) {
      const filteredList = list.filter((item) => item.memberId !== myResult?.memberId);
      setDisplayData(filteredList);
    }
  }, [list, myResult]);

  // 현재까지의 데이터를 기반으로 표시할 항목 분류
  const getDisplaySections = useCallback(() => {
    const myIndex = displayData.findIndex((item) => item.memberId === myResult?.memberId);
    const myRank = myIndex >= 0 ? myIndex + 1 : null;

    // 상위 10개는 항상 표시
    const top10 = displayData.slice(0, 10);

    // 내 결과가 없거나 상위 10등 안에 있는 경우
    if (myRank === null || myRank <= 10) {
      return {
        top: top10,
        middle: displayData.slice(10),
        myResult: null,
        bottom: [],
      };
    }

    // 내 결과가 있고 10등 밖인 경우
    return {
      top: top10,
      middle: displayData.slice(10, myRank - 1),
      myResult,
      bottom: displayData.slice(myRank),
    };
  }, [displayData, myResult]);

  const renderCollapsedSection = (count: number, onClick: () => void, label: string) => {
    if (count === 0) return null;

    return (
      <div
        onClick={onClick}
        className='cursor-pointer transition-all hover:bg-gray-100 rounded-lg p-4 flex items-center justify-center gap-2'>
        <div
          className='w-2 h-2 bg-gray-400 rounded-full animate-bounce'
          style={{ animationDelay: '0s' }}></div>
        <div
          className='w-2 h-2 bg-gray-400 rounded-full animate-bounce'
          style={{ animationDelay: '0.2s' }}></div>
        <div
          className='w-2 h-2 bg-gray-400 rounded-full animate-bounce'
          style={{ animationDelay: '0.4s' }}></div>
        <span className='ml-2 text-gray-600'>{`${count}개의 ${label}`}</span>
      </div>
    );
  };

  const { top, middle, myResult: myResultInList, bottom } = getDisplaySections();

  return (
    <div className='flex flex-col gap-3'>
      {/* 실시간 업데이트 상태 표시 */}
      <div className='text-sm text-gray-500 text-center'>
        <div className='animate-pulse'>실시간 순위 업데이트 중...</div>
      </div>

      {/* 상위 10개 결과 */}
      {top.map((item) => (
        <div key={item.memberId} className='animate-slideIn'>
          <EventEachResult {...item} />
        </div>
      ))}

      {/* 중간 섹션 (접힌 결과들) */}
      {middle.length > 0 &&
        (expandedSection === 'before' ? (
          <div className='animate-fadeIn space-y-3'>
            {middle.map((item) => (
              <div key={item.memberId}>
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
            middle.length,
            () => setExpandedSection('before'),
            '이전 결과 더 보기'
          )
        ))}

      {/* 내 결과 (10등 밖일 경우) */}
      {myResultInList && (
        <div className='animate-slideIn'>
          <EventEachResult {...myResultInList} />
        </div>
      )}

      {/* 하단 섹션 */}
      {bottom.length > 0 &&
        (expandedSection === 'after' ? (
          <div className='animate-fadeIn space-y-3'>
            {bottom.map((item) => (
              <div key={item.memberId}>
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
            bottom.length,
            () => setExpandedSection('after'),
            '다음 결과 더 보기'
          )
        ))}

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
