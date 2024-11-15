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

  useEffect(() => {
    if (myResult.ranking === 0) return;
    const front = untilMyResult;
    setFrontSection(front);
    let index = 0;
    const interval = setInterval(() => {
      if (index < myResult.ranking) {
        setFrontSection((prev) => [...prev, front[index]]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 300);
    return () => clearInterval(interval);
  }, [myResult, untilMyResult]);

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
