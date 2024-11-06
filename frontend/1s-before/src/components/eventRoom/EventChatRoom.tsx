import { EventChatRoomProps } from '@/types/eventRoom';
import EventChatMessage from '@/components/eventRoom/EventChatMessage';

export default function EventChatRoom({ messages }: Readonly<EventChatRoomProps>) {
  return (
    <div className='h-[600px] overflow-y-auto'>
      {messages.map((message) => (
        <EventChatMessage
          key={message.sentAt}
          eventId={message.eventId}
          sender={message.sender}
          content={message.content}
          sentAt={message.sentAt}
        />
      ))}
    </div>
  );
}
