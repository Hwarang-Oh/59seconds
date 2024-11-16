import EventChatRoom from '@/components/eventRoom/chat/EventChatRoom';
import EventChatRoomHeader from '@/components/eventRoom/chat/EventChatRoomHeader';
import EventChatInput from '@/components/eventRoom/chat/EventChatInput';
import { EventChatRoomAreaProps } from '@/types/eventRoom';

export default function EventChatRoomArea({
  eventId,
  participants,
  messages,
  onClick,
}: Readonly<EventChatRoomAreaProps>) {
  return (
    <div
      className='h-full max-h-[790px] px-7 rounded-md shadow-md border border-gray-300 shrink-0}'
      style={{ position: 'sticky', top: '0px' }}
      onClick={onClick}>
      <EventChatRoomHeader participants={participants} />
      <EventChatRoom messages={messages} />
      <EventChatInput eventId={eventId} />
    </div>
  );
}
