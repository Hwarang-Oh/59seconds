import EventEachResult from '@/components/eventRoom/result/EventResultEachResult';
import RenderCollapsedSection from '@/components/eventRoom/result/EventResultRenderCollapsedSection';
import { EventRoomResultViewInfo } from '@/types/eventRoom';

interface RenderSectionProps {
  data: EventRoomResultViewInfo[];
  expanded: boolean;
  onExpand: () => void;
}

const RenderSection: React.FC<RenderSectionProps> = ({ data, expanded, onExpand }) => {
  return expanded ? (
    <div className='animate-fadeIn space-y-3'>
      {data.map((item) => (
        <div key={item.memberId} className='animate-slideIn'>
          <EventEachResult {...item} />
        </div>
      ))}
      <div
        onClick={onExpand}
        className='cursor-pointer text-center py-4 text-gray-600 hover:text-gray-800 transition-colors'>
        접기
      </div>
    </div>
  ) : (
    <RenderCollapsedSection count={data.length} onClick={onExpand} label='다음 결과 더 보기' />
  );
};

export default RenderSection;
