import { useState, useEffect, useCallback } from 'react';
import { EventRoomResultViewInfo } from '@/types/eventRoom';

/**
 * IMP : EventRoom의 결과를 관리하는 Hook
 * @param list : WebSocket을 통해 받은 EventRoom의 전체 Event Participation 결과 리스트
 * @param myResult : HTTP 요청을 통해 받은 나의 Event Participation 결과
 * @param untilMyResult : HTTP 요청을 통해 받은 나를 포함한 Event Participation 결과 이전의 리스트
 * @returnData frontSection, afterSection, expandedSection
 * @returnMethod handleExpand
 */
export const useEventResult = (
  list: EventRoomResultViewInfo[],
  myResult: EventRoomResultViewInfo,
  untilMyResult: EventRoomResultViewInfo[]
) => {
  /**
   * IMP : EventRoom의 결과를 Section으로 나누어 관리
   * @frontSection : 나의 Event Participation 결과 이전의 리스트
   * @afterSection : 나의 Event Participation 결과 이후의 리스트
   * @expandedSection : 확장된 Section의 상태
   * @currentIndex : frontSection에 추가할 항목의 Index
   */
  const [frontSection, setFrontSection] = useState<EventRoomResultViewInfo[]>([]);
  const [afterSection, setAfterSection] = useState<EventRoomResultViewInfo[]>([]);
  const [expandedSection, setExpandedSection] = useState<'after' | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  /**
   * IMP : unitlMyResult는 HTTP 요청으로 한번에 모두 받아옵니다.
   * * frontSection은 일정 간격으로 추가되는 UI적 특성을 가지기 위해, Interval을 사용하여 추가합니다.
   * * myResult가 존재할 때만 실행합니다. ( myResult는 1번만 받아오는 특성을 활용함 )
   */
  useEffect(() => {
    if (myResult.ranking === 0) return;
    const interval = setInterval(() => {
      setFrontSection((prev) => [...prev, untilMyResult[currentIndex]]);
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }, 200); // * 200ms 간격으로 추가 ( 원하면 변경 가능 )

    if (currentIndex >= untilMyResult.length) clearInterval(interval);
    return () => clearInterval(interval);
  }, [untilMyResult, currentIndex]);

  /**
   * IMP : 나의 Event Participation 결과 이후의 리스트를 설정합니다.
   * ! 주석 처리된 Logic은 모든 list를 지속적으로 filter하는 방식이기에, 비효율적입니다.
   */
  // useEffect(() => {
  //   if (myResult.ranking === 0) return;
  //   const myRank = myResult.ranking;
  //   const after = list.filter((item) => item.ranking > myRank);
  //   setAfterSection(after);
  // }, [list, myResult]);

  /**
   * IMP : 나의 Event Participation 결과 이후의 리스트를 설정합니다.
   * * 아래 방식은, WebSocket을 통해 받은 최신 결과 list에 대해서, myResult보다 뒤에 있는 것들만 추가하는 방식입니다.
   * * 해당 방식이 가능한 이유는 WebSocket을 통해 받아오는 결과 list가 중복되지 않고 순차적으로 오고 있기 때문임.
   */
  useEffect(() => {
    if (myResult.ranking === 0) return;
    const myRank = myResult.ranking;
    setAfterSection((prevAfter) => {
      const newResults = list.filter((item) => item.ranking > myRank);
      return [...prevAfter, ...newResults];
    });
  }, [list, myResult]);

  // IMP : After Section을 확장하는 Method
  const handleExpand = useCallback((section: 'after' | null) => {
    setExpandedSection(section);
  }, []);

  return {
    frontSection,
    afterSection,
    expandedSection,
    handleExpand,
  };
};
