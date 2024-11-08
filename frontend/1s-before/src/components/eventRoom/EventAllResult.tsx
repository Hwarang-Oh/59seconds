import EventEachResult from '@/components/eventRoom/EventEachResult';
import { EventRoomResultViewInfo } from '@/types/eventRoom';

export default function EventAllResult({ list }: { list: EventRoomResultViewInfo[] }) {
  return (
    <div>
      {list.map((item) => (
        <EventEachResult />
      ))}
    </div>
  );
}
