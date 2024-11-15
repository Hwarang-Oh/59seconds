import { useState, useEffect, useCallback } from 'react';
import { EventRoomResultViewInfo } from '@/types/eventRoom';

export const useEventResultHook = (
  list: EventRoomResultViewInfo[],
  myResult: EventRoomResultViewInfo,
  untilMyResult: EventRoomResultViewInfo[]
) => {
  const [frontSection, setFrontSection] = useState<EventRoomResultViewInfo[]>([]);
  const [afterSection, setAfterSection] = useState<EventRoomResultViewInfo[]>([]);
  const [expandedSection, setExpandedSection] = useState<'after' | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (myResult.ranking === 0) return;

    // 일정 간격으로 untilMyResult의 항목을 하나씩 frontSection에 추가
    const interval = setInterval(() => {
      setFrontSection((prev) => [...prev, untilMyResult[currentIndex]]);
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }, 200);

    // untilMyResult가 끝나면 interval 정지
    if (currentIndex >= untilMyResult.length) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [untilMyResult, currentIndex]);

  useEffect(() => {
    if (myResult.ranking === 0) return;
    const myRank = myResult.ranking;
    const after = list.filter((item) => item.ranking > myRank);
    setAfterSection(after);
  }, [list, myResult]);

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
