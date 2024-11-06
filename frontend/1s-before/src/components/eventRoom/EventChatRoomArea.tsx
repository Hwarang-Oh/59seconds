import EventChatRoom from '@/components/eventRoom/EventChatRoom';
import EventChatRoomHeader from '@/components/eventRoom/EventChatRoomHeader';
import EventChatInput from '@/components/eventRoom/EventChatInput';
import { EventChatRoomAreaProps } from '@/types/eventRoom';

export default function EventChatRoomArea({
  eventId,
  participants,
  messages,
}: Readonly<EventChatRoomAreaProps>) {
  return (
    <div className='w-full px-7 rounded-md shadow-md border border-gray-300'>
      <EventChatRoomHeader participants={participants} />
      <EventChatRoom messages={messages} />
      <EventChatInput eventId={eventId} />
    </div>
  );
}
