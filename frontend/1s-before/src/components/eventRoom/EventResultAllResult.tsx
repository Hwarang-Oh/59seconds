import { EventRoomAllResultProps } from '@/types/eventRoom';
import { useEventResultHook } from '@/hooks/useEventResultHook';
import EventEachResult from '@/components/eventRoom/EventResultEachResult';
import RenderSection from '@/components/eventRoom/EventResultRenderSection';

export default function EventResultAllResult({
  list,
  myResult,
  untilMyResult,
}: Readonly<EventRoomAllResultProps>) {
  const { frontSection, afterSection, expandedSection, handleExpand } = useEventResultHook(
    list,
    myResult,
    untilMyResult
  );

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
