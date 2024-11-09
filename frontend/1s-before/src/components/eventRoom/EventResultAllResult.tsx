import EventEachResult from '@/components/eventRoom/EventResultEachResult';
import { EventRoomResultViewInfo } from '@/types/eventRoom';

export default function EventResultAllResult({ list }: { list: EventRoomResultViewInfo[] }) {
  return (
    <div>
      {list.map((item) => (
        <EventEachResult />
      ))}
    </div>
  );
}
