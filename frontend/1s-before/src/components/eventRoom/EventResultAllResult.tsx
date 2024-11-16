import EventEachResult from '@/components/eventRoom/result/EventResultEachResult';
import RenderSection from '@/components/eventRoom/result/EventResultRenderSection';
import { useEffect, useRef } from 'react';
import { useEventResult } from '@/hooks/useEventResult';
import { EventRoomAllResultProps } from '@/types/eventRoom';

export default function EventResultAllResult({
  list,
  myResult,
  untilMyResult,
  calculateCurrentProcessed,
  addCalculatedCurrentProcessed,
}: Readonly<EventRoomAllResultProps>) {
  const { frontSection, afterSection, expandedSection, handleExpand } = useEventResult(
    list,
    myResult,
    untilMyResult
  );

  useEffect(() => {
    calculateCurrentProcessed(frontSection.length);
  }, [frontSection]);

  useEffect(() => {
    addCalculatedCurrentProcessed(afterSection.length);
  }, [afterSection]);

  return (
    <div className='flex flex-col gap-3'>
      {/* untilMyResult 결과 */}
      <div className='animate-slideIn'>
        {frontSection.map((item) => (
          <EventEachResult key={item.memberId} {...item} />
        ))}
      </div>

      {/* 내 순위 이후 데이터 */}
      <RenderSection
        data={afterSection}
        expanded={expandedSection === 'after'}
        onExpand={() => handleExpand(expandedSection === 'after' ? null : 'after')}
      />
    </div>
  );
}
